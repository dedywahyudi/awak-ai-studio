import { pageMeta, faqJsonLd } from '@/lib/seo';
import { cardProducts, headlinePrice, priceNote } from '@/lib/pricing';
import { pricingFaq } from '@/content/faq';
import { Hl, PageHeader, Section } from '@/components/ui/Section';
import { PricingCards } from '@/components/sections/PricingCards';
import { CustomBand } from '@/components/sections/CustomBand';
import { Faq } from '@/components/sections/Faq';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata = pageMeta({
  title: 'Harga',
  description:
    'Harga mulai dari jelas untuk Marketing AI, AI Chat, dan Otomatisasi. Setiap layanan punya biaya bulanan. Solusi custom mulai Rp 20 jt.',
  path: '/harga',
});

const comparison = [
  { label: 'Biaya awal', value: (i: number) => { const p = cardProducts[i]; return p && p.setup ? headlinePrice(p) : 'Tanpa setup'; } },
  { label: 'Biaya bulanan', value: (i: number) => { const p = cardProducts[i]; return p ? `mulai ${(p.monthly / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} jt` : ''; } },
  { label: 'Kontrak', value: (i: number) => (cardProducts[i]?.id === 'marketing-ai' ? 'Minimal 3 bulan' : 'Bulanan') },
  {
    label: 'Cocok untuk',
    value: (i: number) =>
      ['Tampil konsisten tanpa tim konten', 'Balas pelanggan 24 jam', 'Kurangi kerja admin berulang'][i] ?? '',
  },
];

export default function HargaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Harga"
        title={
          <>
            Harga <Hl>mulai jelas</Hl> di depan.
          </>
        }
        description="Pilih satu untuk mulai. Kami tidak bersaing di harga termurah. Kami bersaing di solusi yang dibangun khusus untuk bisnis Anda."
      />

      <Section>
        <div className="flex flex-col gap-5">
          <PricingCards />
          <CustomBand />
        </div>
      </Section>

      <Section tone="section" eyebrow="Perbandingan" title="Sekilas, tiga layanan kami.">
        <div className="overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Perbandingan layanan Marketing AI, AI Chat, dan Otomatisasi</caption>
            <thead>
              <tr className="bg-card">
                <th scope="col" className="p-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow" />
                {cardProducts.map((p) => (
                  <th key={p.id} scope="col" className="p-4 font-display text-base font-bold text-strong">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="p-4 font-semibold text-strong">
                    {row.label}
                  </th>
                  {cardProducts.map((p, i) => (
                    <td key={p.id} className="p-4 text-body">
                      {row.value(i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          {cardProducts.map((p) => `${p.name}: ${headlinePrice(p)} ${priceNote(p)}`).join('. ')}.
        </p>
      </Section>

      <Section eyebrow="FAQ" title="Pertanyaan yang sering muncul.">
        <Faq items={pricingFaq} />
      </Section>

      <ClosingCta title="Belum yakin mana yang cocok?" description="Ceritakan bisnis Anda. Kami bantu pilih yang paling masuk akal, termasuk bila jawabannya adalah belum perlu AI." />
      <JsonLd data={faqJsonLd(pricingFaq)} />
    </>
  );
}
