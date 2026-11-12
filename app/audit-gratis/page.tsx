import { Check } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { auditProduct } from '@/lib/pricing';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow, Hl } from '@/components/ui/Section';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import { LeadForm } from '@/components/forms/LeadForm';
import { needFromQuery } from '@/lib/lead-options';

export const metadata = pageMeta({
  title: 'Audit Gratis',
  description: `${auditProduct.tagline} Hasil tertulis dalam ${auditProduct.turnaroundDays} hari kerja.`,
  path: '/audit-gratis',
});

export default function AuditGratisPage() {
  return (
    <section className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden bg-page pb-12 pt-28 md:pb-10">
      <StarfieldBackground />
      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Eyebrow>Audit gratis</Eyebrow>
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-strong md:text-[48px]">
              Ketahui dulu apa yang <Hl>sebenarnya</Hl> Anda butuhkan.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-body">{auditProduct.tagline}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {auditProduct.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 leading-snug text-body">
                <Check size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button variant="whatsapp" href={waLink(waConsultMessage(auditProduct.name))} className="self-start">
            Chat WhatsApp
          </Button>
        </div>
        <div className="rounded-pricing border border-line bg-card p-6 md:p-8">
          <LeadForm defaultNeed={needFromQuery.audit} />
        </div>
      </Container>
    </section>
  );
}
