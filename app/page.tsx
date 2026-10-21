import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, Clock, Code2, HeartPulse, MessageCircle, ShieldCheck, Wallet, Workflow, Zap } from 'lucide-react';
import { site } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow, Hl, Section } from '@/components/ui/Section';
import { StarfieldBackground } from '@/components/ui/starfield-background';
import { HeroServiceFlip, ServiceProvider } from '@/components/sections/active-service';
import { HeroVisual } from '@/components/sections/HeroVisual';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { PricingCards } from '@/components/sections/PricingCards';
import { AuditBand } from '@/components/sections/AuditBand';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata: Metadata = {
  title: { absolute: `${site.name}: AI Chat, otomatisasi, dan solusi custom untuk bisnis` },
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
    body: 'Bukan dioper ke tim junior. AI mempercepat pekerjaan, penanggung jawabnya tetap manusia.',
  },
  {
    icon: Zap,
    title: 'AI-native, bukan template',
    body: 'Setiap solusi dibangun khusus untuk alur kerja dan data bisnis Anda.',
  },
];

const forSmallBusiness = [
  {
    icon: MessageCircle,
    kind: 'Layanan',
    title: 'Menjawab pelanggan',
    body: 'Asisten di WhatsApp dan website menjawab dari data bisnis Anda, lalu meneruskan ke tim saat tidak yakin.',
  },
  {
    icon: Workflow,
    kind: 'Layanan',
    title: 'Mengurus pekerjaan admin',
    body: 'Follow-up lead, penawaran, dan pengingat berjalan otomatis, disetujui Anda sebelum terkirim.',
  },
];

/** Anonymised past projects (see content/profile.ts). */
const forEnterprise = [
  {
    icon: HeartPulse,
    kind: 'Proyek',
    title: 'Analisis data medis',
    body: 'Aplikasi web yang menganalisis pola aliran darah dan memprediksi hasil pascaprosedur.',
  },
  {
    icon: BarChart3,
    kind: 'Proyek',
    title: 'Analisis sentimen',
    body: 'Dasbor, laporan, dan peringatan untuk memantau reputasi online sebuah bisnis.',
  },
  {
    icon: Code2,
    kind: 'Proyek',
    title: 'Platform berbasis AI',
    body: 'Platform tantangan coding dengan integrasi OpenAI, dibangun di atas React dan Django.',
  },
  {
    icon: Wallet,
    kind: 'Proyek',
    title: 'Sistem anggaran',
    body: 'Penganggaran keuangan enterprise dengan kolaborasi multi-kota dan pelacakan real-time.',
  },
];

function UseCaseGroup({
  heading,
  items,
  columns,
}: {
  heading: string;
  items: typeof forSmallBusiness;
  columns: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-display text-sm font-bold uppercase tracking-widest text-link">{heading}</h3>
      <ul className={`grid gap-5 ${columns}`}>
        {items.map(({ icon: Icon, kind, title, body }) => (
          <li key={title} className="flex flex-col gap-4 rounded-card border border-line bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-link">
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">{kind}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-display text-lg font-bold text-strong">{title}</h4>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative -mt-16 overflow-hidden bg-page pb-20 pt-[7.5rem] md:pb-28 md:pt-40 lg:flex lg:min-h-[680px] lg:flex-col lg:justify-center lg:pb-24">
        <StarfieldBackground />
        <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <ServiceProvider>
            <div className="flex flex-col gap-8">
              <Eyebrow>{`${site.city} — Studio AI untuk bisnis`}</Eyebrow>
              <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] text-strong sm:text-5xl md:text-[56px]">
                <span className="sr-only">AI Chat, Otomatisasi, dan Solusi Custom untuk Bisnis Anda.</span>
                <span aria-hidden="true" className="flex flex-col items-start gap-3">
                  <HeroServiceFlip />
                  <span>untuk Bisnis Anda.</span>
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-body md:text-xl">
                Biarkan AI mengurus pekerjaan yang berulang, tim Anda fokus pada yang penting. Dibangun di atas data
                dan alur kerja Anda, dengan manusia tetap memegang keputusan.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href="/audit-gratis" arrow>
                  Minta Audit Gratis
                </Button>
                <Button variant="secondary" href="#layanan-harga">
                  Lihat Harga
                </Button>
              </div>
            </div>
            <HeroVisual />
          </ServiceProvider>
        </Container>
      </section>

      <ClientLogos />

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
        eyebrow="01 — AI dalam praktik"
        title={
          <>
            AI yang bekerja di <Hl>banyak jenis</Hl> proyek.
          </>
        }
        description="Dari menjawab pelanggan sampai membaca data. Setiap sistem dibangun di atas data dan alur kerja klien, dengan manusia tetap memegang keputusan."
      >
        <div className="flex flex-col gap-10">
          <UseCaseGroup heading="Untuk bisnis kecil dan menengah" items={forSmallBusiness} columns="md:grid-cols-2" />
          <UseCaseGroup
            heading="Untuk perusahaan dan organisasi"
            items={forEnterprise}
            columns="md:grid-cols-2 lg:grid-cols-4"
          />
        </div>
        <div className="mt-8">
          <Button variant="secondary" href="/studi-kasus" arrow>
            Lihat Studi Kasus
          </Button>
        </div>
      </Section>

      <Section
        id="layanan-harga"
        tone="section"
        eyebrow="02 — Layanan dan harga"
        title={
          <>
            Mulai dari tes gratis, <Hl>lanjut saat siap</Hl>.
          </>
        }
        description="Biaya bulanan menjaga sistem Anda tetap diperbarui dan dipantau oleh engineer yang membangunnya."
      >
        <div className="flex flex-col gap-5">
          <AuditBand />
          <PricingCards />
          <p className="text-sm text-muted">
            Harga di atas adalah titik awal; angka final kami tulis setelah konsultasi.{' '}
            <Link href="/layanan" className="font-semibold text-link hover:text-white">
              Lihat detail layanan dan FAQ
            </Link>
          </p>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
