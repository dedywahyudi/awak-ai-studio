import type { Metadata } from 'next';
import { Clock, ShieldCheck, Zap } from 'lucide-react';
import { site } from '@/lib/site';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow, Hl, Section } from '@/components/ui/Section';
import { DemoPlayer } from '@/components/sections/DemoPlayer';
import { PricingCards } from '@/components/sections/PricingCards';
import { CustomBand } from '@/components/sections/CustomBand';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata: Metadata = {
  title: { absolute: `${site.name}: AI untuk UMKM di ${site.city}` },
  description: site.description,
  alternates: { canonical: '/' },
};

const trust = [
  {
    icon: Clock,
    title: '10+ tahun pengalaman',
    body: 'Senior Product Engineer. Proyek untuk klien enterprise seperti IBM, GE, dan T-Mobile lewat Topcoder.',
  },
  {
    icon: ShieldCheck,
    title: 'Langsung ke engineer senior',
    body: 'Bukan dioper ke tim junior. Sistem AI membantu delivery lebih cepat, bukan menggantikan penanggung jawab.',
  },
  {
    icon: Zap,
    title: 'AI-native, bukan template',
    body: 'Setiap solusi dibangun khusus untuk alur kerja dan data bisnis Anda.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-page pb-16 pt-14 md:pb-24 md:pt-24">
        <Container className="flex flex-col gap-8">
          <Eyebrow>{`${site.city} — AI untuk UMKM`}</Eyebrow>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] text-strong sm:text-5xl md:text-[68px]">
            Bisnis Anda tetap <Hl>melayani</Hl> saat toko tutup.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-body md:text-xl">
            Chatbot WhatsApp, konten rutin, dan otomatisasi untuk UMKM {site.city}. Dibangun khusus untuk
            bisnis Anda dan ditangani langsung oleh engineer senior.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="whatsapp" href={waLink(waConsultMessage())}>
              Chat WhatsApp
            </Button>
            <Button variant="secondary" href="/demo" arrow>
              Lihat Demo
            </Button>
          </div>
        </Container>
      </section>

      <section aria-label="Alasan memilih kami" className="border-y border-line bg-section py-10 md:py-12">
        <Container>
          <ul className="grid gap-8 md:grid-cols-3">
            {trust.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-link">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold text-strong">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section
        eyebrow="01 — Demo"
        title={
          <>
            Lihat cara kerjanya <Hl>sebelum</Hl> memutuskan.
          </>
        }
        description="Video singkat: dari pertanyaan pelanggan sampai jawaban otomatis, dan kapan percakapan diteruskan ke tim Anda."
      >
        <DemoPlayer />
        <div className="mt-8">
          <Button variant="secondary" href="/demo" arrow>
            Lihat Cara Kerja
          </Button>
        </div>
      </Section>

      <Section
        tone="section"
        eyebrow="02 — Layanan dan harga"
        title={
          <>
            Tiga layanan, <Hl>harga mulai jelas</Hl> di depan.
          </>
        }
        description="Pilih satu untuk mulai. Setiap layanan punya biaya bulanan agar sistem Anda tetap diperbarui dan dipantau oleh engineer yang membangunnya."
      >
        <div className="flex flex-col gap-5">
          <PricingCards />
          <CustomBand />
          <p className="max-w-2xl text-sm text-muted">
            Harga di atas adalah titik awal. Lingkup dan angka final kami tulis setelah konsultasi,
            sebelum Anda membayar apa pun.
          </p>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
