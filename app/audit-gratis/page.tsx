import { Check } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { auditProduct } from '@/lib/pricing';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container, Hl, PageHeader } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { needFromQuery } from '@/lib/lead-options';

export const metadata = pageMeta({
  title: 'Audit Gratis',
  description: `${auditProduct.tagline} Hasil tertulis dalam ${auditProduct.turnaroundDays} hari kerja.`,
  path: '/audit-gratis',
});

export default function AuditGratisPage() {
  return (
    <>
      <PageHeader
        eyebrow="Audit gratis"
        title={
          <>
            Ketahui dulu apa yang <Hl>sebenarnya</Hl> Anda butuhkan.
          </>
        }
        description={auditProduct.tagline}
      />
      <section className="bg-page pb-12 pt-0 md:pb-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-6">
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
    </>
  );
}
