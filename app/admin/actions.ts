'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { allColumns, fromWibInput, postSchema, type AdminFormState, type AdminPost, type PostInput } from '@/lib/admin';
import { createAuthClient, adminEmails, requireAdmin } from '@/lib/supabase/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { buildCaption } from '@/lib/social';
import { socialConfig } from '@/content/social';

export type LoginState = { ok: false; message: string } | null;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  // Same message for every failure, so the form never reveals which emails are admins.
  const fail = { ok: false as const, message: 'Email atau kata sandi salah.' };
  if (!email || !password || !adminEmails().includes(email)) return fail;
  const { error } = await createAuthClient().auth.signInWithPassword({ email, password });
  if (error) return fail;
  redirect('/admin');
}

export async function logout() {
  await createAuthClient().auth.signOut();
  redirect('/admin/login');
}

/** Caption drafted from the form's own text (rules in content/social.ts). Nothing is saved or posted. */
export async function draftCaption(formData: FormData): Promise<string> {
  await requireAdmin();
  return buildCaption(
    {
      title: String(formData.get('title') ?? ''),
      excerpt: String(formData.get('excerpt') ?? ''),
      content: String(formData.get('content') ?? ''),
      category: String(formData.get('category') ?? ''),
    },
    socialConfig,
  );
}

const fieldErrors = (error: import('zod').ZodError) =>
  Object.fromEntries(error.issues.map((i) => [i.path[0], i.message])) as Partial<Record<keyof PostInput, string>>;

/**
 * Save, schedule, or move back to draft. Scheduling is the human approval step: automation only ever
 * publishes posts that were set to 'scheduled' here. New posts always start as drafts.
 */
export async function savePost(id: string | null, _prev: AdminFormState, formData: FormData): Promise<AdminFormState> {
  await requireAdmin();
  const db = getServiceClient();
  if (!db) return { ok: false, message: 'Supabase belum dikonfigurasi.' };

  const intent = String(formData.get('intent') ?? 'save');
  const parsed = postSchema.safeParse({
    title: formData.get('title') ?? '',
    slug: formData.get('slug') ?? '',
    category: formData.get('category') ?? '',
    excerpt: formData.get('excerpt') ?? '',
    content: formData.get('content') ?? '',
    coverImage: formData.get('coverImage') ?? '',
    instagramEnabled: formData.get('instagramEnabled') === 'on',
    instagramCaption: formData.get('instagramCaption') ?? '',
    instagramImage: formData.get('instagramImage') ?? '',
    scheduledAt: formData.get('scheduledAt') ?? '',
  });
  if (!parsed.success) return { ok: false, message: 'Periksa kolom yang ditandai.', errors: fieldErrors(parsed.error) };
  const input = parsed.data;

  let existing: AdminPost | null = null;
  if (id) {
    const { data } = await db.from('posts').select(allColumns).eq('id', id).maybeSingle();
    existing = data as AdminPost | null;
    if (!existing) return { ok: false, message: 'Tulisan tidak ditemukan.' };
  }

  const alreadyPosted = existing?.instagram_status === 'posted';
  const errors: Partial<Record<keyof PostInput, string>> = {};
  const scheduledAt = fromWibInput(input.scheduledAt);
  if (input.instagramImage && !/\.jpe?g$/i.test(input.instagramImage)) {
    errors.instagramImage = 'Gambar Instagram harus JPEG (.jpg atau .jpeg).';
  }

  let status: AdminPost['status'] = existing?.status ?? 'draft';
  if (intent === 'schedule') {
    if (!scheduledAt || Number.isNaN(scheduledAt.getTime())) errors.scheduledAt = 'Pilih tanggal dan jam terbit.';
    else if (scheduledAt.getTime() < Date.now() + 60_000) errors.scheduledAt = 'Waktu terbit harus di masa depan.';
    if (input.instagramEnabled && !alreadyPosted) {
      if (!input.instagramCaption) errors.instagramCaption = 'Isi caption Instagram atau matikan posting Instagram.';
      if (!input.instagramImage) errors.instagramImage = 'Isi gambar Instagram atau matikan posting Instagram.';
    }
    status = 'scheduled';
  } else if (intent === 'draft') {
    if (existing?.status === 'published') return { ok: false, message: 'Tulisan yang sudah terbit tidak bisa dikembalikan ke draf dari sini.' };
    status = 'draft';
  }
  if (status === 'scheduled' && !scheduledAt && !existing?.scheduled_at) errors.scheduledAt = 'Pilih tanggal dan jam terbit.';
  if (Object.keys(errors).length) return { ok: false, message: 'Periksa kolom yang ditandai.', errors };

  // Instagram: pending only while the post is approved (scheduled or published) and the box is ticked.
  let instagramStatus: AdminPost['instagram_status'] = existing?.instagram_status ?? 'none';
  if (!alreadyPosted) {
    const approved = status === 'scheduled' || status === 'published';
    instagramStatus = approved && input.instagramEnabled && input.instagramCaption && input.instagramImage ? 'pending' : 'none';
  }

  const scheduledIso =
    status === 'scheduled' && scheduledAt && !Number.isNaN(scheduledAt.getTime())
      ? scheduledAt.toISOString()
      : existing?.scheduled_at ?? null;

  const row = {
    title: input.title,
    slug: input.slug,
    category: input.category,
    excerpt: input.excerpt || null,
    content: input.content,
    cover_image: input.coverImage || null,
    status,
    scheduled_at: status === 'draft' ? null : scheduledIso,
    instagram_caption: input.instagramCaption || null,
    instagram_image: input.instagramImage || null,
    instagram_status: instagramStatus,
    ...(instagramStatus === 'pending' ? { instagram_error: null } : {}),
  };

  const query = id ? db.from('posts').update(row).eq('id', id) : db.from('posts').insert(row);
  const { data, error } = await query.select('id').single();
  if (error) {
    const duplicate = error.code === '23505';
    return {
      ok: false,
      message: duplicate ? 'Slug sudah dipakai tulisan lain.' : 'Gagal menyimpan. Coba lagi.',
      ...(duplicate ? { errors: { slug: 'Slug sudah dipakai.' } } : {}),
    };
  }

  revalidatePath('/admin');
  revalidatePath('/blog');
  if (!id) redirect(`/admin/posts/${data.id}`);
  const labels = { save: 'Perubahan disimpan.', schedule: 'Dijadwalkan. Akan terbit otomatis pada waktunya.', draft: 'Dikembalikan ke draf.' } as const;
  return { ok: true, message: labels[intent as keyof typeof labels] ?? labels.save };
}
