import { Resend } from 'resend';
import type { LeadInput } from '@/lib/schema';

/** Plain-text only on purpose: user input is never interpolated into HTML. */
export async function sendLeadEmail(lead: LeadInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !from || !to) return false;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Lead baru: ${lead.nama} (${lead.namaBisnis})`,
    text: [
      `Nama: ${lead.nama}`,
      `Bisnis: ${lead.namaBisnis}`,
      `Kontak: ${lead.kontak}`,
      `Kebutuhan: ${lead.jenisKebutuhan}`,
      `Budget: ${lead.budgetRange || '-'}`,
      `Halaman: ${lead.sourcePage}`,
      '',
      lead.deskripsi,
    ].join('\n'),
  });
  if (error) throw new Error(error.message);
  return true;
}
