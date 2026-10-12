import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { waConsultMessage, waLink } from '@/lib/whatsapp';

/** Floating WhatsApp pill, bottom-right on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={waLink(waConsultMessage())}
      target={waLink().startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-wa px-5 font-display text-[15px] font-bold text-[#07140c] shadow-lg transition hover:bg-wa-hover md:bottom-6 md:right-6"
    >
      <WhatsAppIcon size={22} />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
