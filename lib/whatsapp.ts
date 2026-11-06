import { site } from '@/lib/site';

/**
 * Build a WhatsApp click-to-chat link with a prefilled message.
 * Falls back to /audit-gratis when no number is configured so buttons never dead-end.
 */
export function waLink(message?: string): string {
  if (!site.whatsappNumber) return '/audit-gratis';
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${site.whatsappNumber}${text}`;
}

export const waConsultMessage = (topic?: string) =>
  `Halo ${site.shortName}, saya mau konsultasi${topic ? ` soal ${topic}` : ''}.`;
