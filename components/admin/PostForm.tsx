'use client';

import { useState, useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { CalendarClock, FileEdit, Save, Wand2 } from 'lucide-react';
import { draftCaption, savePost } from '@/app/admin/actions';
import type { AdminFormState, AdminPost } from '@/lib/admin';
import { toWibInput } from '@/lib/admin';
import { postCategories, categoryLabel } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const field =
  'w-full rounded-[10px] border border-line-strong bg-field px-4 py-3 text-base text-strong placeholder:text-subtle focus:border-accent-ring focus:outline-none focus:ring-[3px] focus:ring-[rgba(19,144,251,.45)]';
const btn =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 font-display text-[15px] font-bold transition disabled:cursor-not-allowed disabled:opacity-60';

function Submit({ intent, children, className }: { intent: string; children: React.ReactNode; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" name="intent" value={intent} disabled={pending} className={cn(btn, className)}>
      {children}
    </button>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-strong">
      {label}
      {children}
      {hint && !error && <span className="text-xs font-normal text-muted">{hint}</span>}
      {error && <span className="text-xs font-normal text-danger">{error}</span>}
    </label>
  );
}

export function PostForm({ post }: { post: AdminPost | null }) {
  const [state, action] = useFormState<AdminFormState, FormData>(savePost.bind(null, post?.id ?? null), null);
  const [caption, setCaption] = useState(post?.instagram_caption ?? '');
  const [igOn, setIgOn] = useState(Boolean(post?.instagram_caption) || post?.instagram_status === 'pending');
  const [drafting, startDrafting] = useTransition();
  const err = (name: string) => (state && !state.ok ? (state.errors as Record<string, string> | undefined)?.[name] : undefined);
  const posted = post?.instagram_status === 'posted';
  const published = post?.status === 'published';

  function generate(form: HTMLFormElement | null) {
    if (!form) return;
    const data = new FormData(form);
    startDrafting(async () => setCaption(await draftCaption(data)));
  }

  return (
    <form action={action} className="flex flex-col gap-6" id="post-form">
      <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
        <Field label="Judul" error={err('title')}>
          <input name="title" defaultValue={post?.title} required className={field} />
        </Field>
        <Field label="Kategori" error={err('category')}>
          <select name="category" defaultValue={post?.category ?? postCategories[0]} className={cn(field, 'select-field')}>
            {postCategories.map((c) => (
              <option key={c} value={c}>
                {categoryLabel(c)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Slug (alamat URL)" error={err('slug')} hint="Huruf kecil dan tanda hubung. Jangan diubah setelah terbit.">
          <input name="slug" defaultValue={post?.slug} required readOnly={published} className={cn(field, published && 'opacity-70')} />
        </Field>
        <Field label="Gambar sampul" error={err('coverImage')} hint="Contoh: /images/blog/nama.jpg">
          <input name="coverImage" defaultValue={post?.cover_image ?? ''} className={field} />
        </Field>
      </div>

      <Field label="Ringkasan" error={err('excerpt')} hint="Tampil di kartu blog dan hasil pencarian. Maksimal 300 karakter.">
        <textarea name="excerpt" defaultValue={post?.excerpt ?? ''} rows={3} className={field} />
      </Field>

      <Field label="Isi tulisan (Markdown)" error={err('content')} hint="Gunakan ## untuk subjudul. Subjudul dipakai sebagai poin di caption Instagram.">
        <textarea name="content" defaultValue={post?.content} rows={16} required className={cn(field, 'font-mono text-sm')} />
      </Field>

      <fieldset className="flex flex-col gap-4 rounded-card border border-line bg-card p-5">
        <legend className="px-2 font-display text-lg font-bold text-strong">Instagram</legend>
        {posted ? (
          <p className="text-sm text-body">
            Sudah diposting <span className="font-mono text-xs text-muted">({post?.instagram_media_id})</span>. Caption dan gambar dikunci.
          </p>
        ) : (
          <>
            <label className="flex items-center gap-3 text-sm font-medium text-strong">
              <input type="checkbox" name="instagramEnabled" checked={igOn} onChange={(e) => setIgOn(e.target.checked)} className="size-5 accent-[var(--accent)]" />
              Posting juga ke Instagram saat tulisan terbit
            </label>
            <Field label="Gambar Instagram" error={err('instagramImage')} hint="JPEG publik, persegi 1080 px. Contoh: /images/blog/nama.jpg">
              <input name="instagramImage" defaultValue={post?.instagram_image ?? ''} className={field} />
            </Field>
            <Field label={`Caption (${caption.length}/2200)`} error={err('instagramCaption')}>
              <textarea
                name="instagramCaption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={12}
                className={cn(field, 'text-sm')}
              />
            </Field>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={drafting}
                onClick={(e) => generate(e.currentTarget.form)}
                className={cn(btn, 'border border-line-strong text-strong hover:border-accent-ring')}
              >
                <Wand2 size={16} aria-hidden="true" /> {drafting ? 'Membuat caption...' : 'Buat caption otomatis'}
              </button>
              <span className="text-xs text-muted">Dari judul, ringkasan, dan subjudul tulisan. Aturan hashtag ada di content/social.ts.</span>
            </div>
          </>
        )}
        {post?.instagram_status === 'failed' && (
          <p className="text-sm text-danger">Gagal posting: {post.instagram_error}. Perbaiki lalu jadwalkan ulang.</p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-4 rounded-card border border-line-featured bg-featured p-5">
        <legend className="px-2 font-display text-lg font-bold text-strong">Jadwal terbit</legend>
        <Field
          label="Tanggal dan jam (WIB)"
          error={err('scheduledAt')}
          hint="Menjadwalkan berarti Anda menyetujui tulisan ini. Terbit otomatis dalam 15 menit setelah waktunya."
        >
          <input type="datetime-local" name="scheduledAt" defaultValue={toWibInput(post?.scheduled_at ?? null)} className={cn(field, 'md:max-w-xs')} />
        </Field>
        <div className="flex flex-wrap items-center gap-3">
          <Submit intent="schedule" className="bg-accent text-white hover:bg-accent-hover">
            <CalendarClock size={16} aria-hidden="true" /> {post?.status === 'scheduled' ? 'Perbarui jadwal' : 'Setujui dan jadwalkan'}
          </Submit>
          <Submit intent="save" className="border border-line-strong text-strong hover:border-accent-ring">
            <Save size={16} aria-hidden="true" /> Simpan
          </Submit>
          {post?.status === 'scheduled' && (
            <Submit intent="draft" className="border border-line-strong text-strong hover:border-accent-ring">
              <FileEdit size={16} aria-hidden="true" /> Kembalikan ke draf
            </Submit>
          )}
          {post && <Badge tone={post.status === 'published' ? 'popular' : post.status === 'scheduled' ? 'soft' : 'neutral'}>{post.status}</Badge>}
        </div>
      </fieldset>

      {state && (
        <p role="status" className={cn('text-sm font-medium', state.ok ? 'text-link' : 'text-danger')}>
          {state.message}
        </p>
      )}
    </form>
  );
}
