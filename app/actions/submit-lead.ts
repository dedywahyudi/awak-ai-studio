'use server';

import { headers } from 'next/headers';
import { leadSchema, type LeadFormState, type LeadInput } from '@/lib/schema';
import { getServiceClient } from '@/lib/supabase/server';
import { sendLeadEmail } from '@/lib/email';
import { sendLeadWebhook } from '@/lib/notify';

/**
 * Lead pipeline: validate (Zod) -> save (Supabase) -> notify (email + webhook) -> confirm.
 * - A lead counts as received if it was saved OR at least one notification went out.
 * - Notification failures never fail the request for the visitor.
 * - Spam defence in v1: honeypot + best-effort in-memory rate limit. On serverless the
 *   limiter resets per instance; for real protection add Cloudflare Turnstile / Upstash.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound.
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const OK_MESSAGE = 'Terima kasih. Pesan Anda sudah kami terima dan kami akan menghubungi Anda secepatnya.';
const FAIL_MESSAGE = 'Pesan belum terkirim. Silakan coba lagi atau chat kami lewat WhatsApp.';

export async function submitLead(formData: FormData): Promise<LeadFormState> {
  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    raw[key] = typeof value === 'string' ? value : '';
  }

  // Honeypot: real people never fill this field. Pretend success so bots learn nothing.
  if (raw.website) return { ok: true, message: OK_MESSAGE };

  const h = headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return { ok: false, message: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.' };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<keyof LeadInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof LeadInput | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { ok: false, message: 'Periksa kembali isian Anda.', errors };
  }
  const lead = parsed.data;

  // 1) Persist.
  let saved = false;
  let leadId: string | null = null;
  const db = getServiceClient();
  if (db) {
    const { data, error } = await db.from('leads').insert({
      nama: lead.nama,
      nama_bisnis: lead.namaBisnis,
      kontak: lead.kontak,
      jenis_kebutuhan: lead.jenisKebutuhan,
      budget_range: lead.budgetRange || null,
      deskripsi: lead.deskripsi,
      source_page: lead.sourcePage,
      status: 'new',
    }).select('id').single();
    if (error) console.error('[lead] save failed:', error.message);
    else {
      saved = true;
      leadId = data?.id ?? null;
    }
  }

  // 2) Notify (in parallel, never throws).
  const results = await Promise.allSettled([sendLeadEmail(lead), sendLeadWebhook(lead, leadId)]);
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('[lead] notify failed:', r.reason);
  });
  const notified = results.some((r) => r.status === 'fulfilled' && r.value === true);

  // 3) Confirm.
  if (saved || notified) return { ok: true, message: OK_MESSAGE };

  // Local development without any backend configured: log and pretend it worked.
  if (process.env.NODE_ENV !== 'production') {
    console.info('[lead] dev mode, nothing configured. Lead:', lead);
    return { ok: true, message: `${OK_MESSAGE} (mode pengembangan: belum tersimpan)` };
  }

  console.error('[lead] not saved and not notified. Check Supabase / Resend env vars.');
  return { ok: false, message: FAIL_MESSAGE };
}
