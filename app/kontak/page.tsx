import { Mail, MapPin } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container, Hl, PageHeader } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { needFromQuery } from '@/lib/lead-options';

export const metadata = pageMeta({
  title: 'Kontak',
  description: `Hubungi ${site.name} di ${site.city}. Konsultasi gratis lewat WhatsApp atau formulir.`,
  path: '/kontak',
});

export default function KontakPage({ searchParams }: { searchParams?: { kebutuhan?: string } }) {
  const defaultNeed = needFromQuery[searchParams?.kebutuhan ?? ''] ?? '';
  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title={
          <>
            Mari <Hl>ngobrol</Hl> soal bisnis Anda.
          </>
        }
        description="Konsultasi pertama gratis. Cara tercepat adalah WhatsApp. Atau tinggalkan pesan di formulir ini."
      />
      <section className="bg-page pb-12 pt-0 md:pb-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-6">
            <Button variant="whatsapp" href={waLink(waConsultMessage())} className="self-start">
              Chat WhatsApp
            </Button>
            <ul className="flex flex-col gap-3 text-body">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-muted" aria-hidden="true" />
                {site.city}, {site.region}. Bisa ketemu langsung.
              </li>
              {site.email && (
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-muted" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="hover:text-white">
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="rounded-pricing border border-line bg-card p-6 md:p-8">
            <LeadForm defaultNeed={defaultNeed} />
          </div>
        </Container>
      </section>
    </>
  );
}
