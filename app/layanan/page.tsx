import { Globe, MessageCircle, Workflow, Check } from 'lucide-react';
import { pageMeta, faqJsonLd } from '@/lib/seo';
import { services } from '@/content/services';
import { pricingFaq } from '@/content/faq';
import { categories, getProduct, headlinePrice, priceNote } from '@/lib/pricing';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { ServicesHero } from '@/components/sections/ServicesHero';
import { AuditBand } from '@/components/sections/AuditBand';
import { Faq } from '@/components/sections/Faq';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata = pageMeta({
  title: 'Layanan dan Harga',
  description:
    'AI Chat, Otomatisasi, dan Solusi Custom untuk bisnis dari skala kecil sampai besar, dengan harga mulai dari yang jelas. Dibangun khusus, bukan template.',
  path: '/layanan',
});

const icons = { 'message-circle': MessageCircle, workflow: Workflow, globe: Globe };

export default function LayananPage() {
  return (
    <>
      <ServicesHero eyebrow="Layanan dan harga" secondaryHref="#layanan" secondaryLabel="Lihat Harga" />

      <section className="bg-page pb-16 pt-0 md:pb-28">
        <Container className="flex flex-col gap-5">
          <AuditBand />
          <div id="layanan" className="grid scroll-mt-24 gap-5 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = icons[s.icon];
              const product = getProduct(s.id);
              const category = categories.find((c) => c.id === product.categoryId);
              const custom = s.id === 'custom';
              return (
                <article
                  key={s.id}
                  id={s.id}
                  className={`flex flex-col gap-5 rounded-pricing border p-7 ${
                    s.id === 'ai-chat' ? 'border-line-featured bg-featured shadow-featured' : 'border-line bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-link">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    {category && (
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">
                        {category.name}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-strong">{s.title}</h2>
                    <p className="leading-relaxed text-body">{s.summary}</p>
                    <p className="text-sm text-muted">
                      <span className="font-semibold text-body">Cocok untuk:</span> {s.forWho}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-body">
                        <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-4 border-t border-line pt-5">
                    <p className="flex flex-col gap-1 text-sm text-muted">
                      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Mulai dari</span>
                      <span className="font-display text-2xl font-extrabold text-strong tabular-nums">
                        {headlinePrice(product)}
                      </span>
                      <span>{priceNote(product)}</span>
                    </p>
                    <Button
                      variant={s.id === 'ai-chat' ? 'primary' : 'secondary'}
                      href={custom ? '/solusi-custom' : waLink(waConsultMessage(s.title))}
                      arrow
                      fullWidth
                    >
                      {custom ? 'Hubungi Kami' : 'Tanya Layanan Ini'}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <Section tone="section" eyebrow="FAQ" title="Pertanyaan yang sering muncul.">
        <Faq items={pricingFaq} />
      </Section>

      <ClosingCta title="Belum tahu layanan mana yang cocok?" />
      <JsonLd data={faqJsonLd(pricingFaq)} />
    </>
  );
}
