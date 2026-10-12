import { pageMeta, faqJsonLd } from '@/lib/seo';
import { cardProducts, discoveryRange, headlinePrice, priceNote } from '@/lib/pricing';
import { Hl, PageHeader, Section } from '@/components/ui/Section';
import { PricingCards } from '@/components/sections/PricingCards';
import { CustomBand } from '@/components/sections/CustomBand';
import { Faq, type FaqItem } from '@/components/sections/Faq';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { JsonLd } from '@/components/ui/JsonLd';

export const metadata = pageMeta({
  title: 'Harga',
  description:
    'Harga mulai dari jelas untuk Marketing AI, AI Chat, dan Otomatisasi. Setiap layanan punya biaya bulanan. Solusi custom mulai Rp 20 jt.',
  path: '/harga',
});

const faq: FaqItem[] = [
  {
    q: 'Kenapa ada biaya bulanan?',
    a: 'Sistem AI perlu dipantau, diperbarui, dan diperbaiki saat ada yang berubah: harga baru, produk baru, atau alur yang gagal. Biaya bulanan membayar hosting, pemakaian model AI sampai batas wajar, pembaruan data, dan peninjauan rutin oleh engineer yang membangunnya.',
  },
  {
    q: 'Apakah data bisnis saya aman?',
    a: 'Data Anda disimpan di database milik Anda. Saat pelanggan bertanya, hanya potongan data yang relevan yang dikirim ke penyedia model AI, dan data API tidak dipakai untuk melatih model. Penyedia model dapat menyimpan data sementara untuk pemantauan penyalahgunaan sesuai kebijakan mereka. Kami mencantumkan penanganan data dalam kontrak dan mengikuti UU Pelindungan Data Pribadi (UU 27/2022) bila percakapan memuat data pribadi.',
  },
  {
    q: 'Apakah biaya WhatsApp Business API sudah termasuk?',
    a: 'Belum. Biaya dari penyedia WhatsApp Business API dibayar langsung oleh Anda sesuai pemakaian, tanpa tambahan margin dari kami.',
  },
  {
    q: 'Bagaimana dengan kontrak dan berhenti berlangganan?',
    a: 'Marketing AI memakai kontrak minimal 3 bulan karena hasil konten baru terlihat setelah beberapa siklus. Layanan lain berjalan bulanan setelah setup selesai. Data dan akun tetap milik Anda bila Anda berhenti.',
  },
  {
    q: 'Apa itu sesi discovery pada Solusi Custom?',
    a: `Sebelum membangun, kami menyusun spesifikasi, estimasi, dan lingkup tertulis bersama Anda. Biayanya sekitar ${discoveryRange} tergantung lingkup. Dengan ini Anda mendapat harga yang jelas sebelum berkomitmen ke biaya build.`,
  },
  {
    q: 'Apakah harga bisa berubah setelah konsultasi?',
    a: 'Ya. Harga di halaman ini adalah titik awal. Angka final bergantung pada lingkup yang kita sepakati, dan kami menuliskannya sebelum Anda membayar apa pun.',
  },
];

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
        <Faq items={faq} />
      </Section>

      <ClosingCta title="Belum yakin mana yang cocok?" description="Ceritakan bisnis Anda. Kami bantu pilih yang paling masuk akal, termasuk bila jawabannya adalah belum perlu AI." />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
