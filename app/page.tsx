import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, Clock, Code2, HeartPulse, MessageCircle, ShieldCheck, Wallet, Workflow, Zap } from 'lucide-react';
import { site } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { Container, Hl, PageHeader, Section } from '@/components/ui/Section';
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
    body: 'Senior Product Engineer. Proyek untuk klien lokal dan enterprise di seluruh dunia, termasuk lewat Topcoder dan Distributed.',
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
      <PageHeader
        eyebrow={`${site.city} — Studio AI untuk bisnis`}
        title={
          <>
            Tiga cara AI <Hl>bekerja untuk bisnis</Hl> Anda.
          </>
        }
        description="AI Chat, Otomatisasi, dan Solusi Custom, dibangun di atas data dan alur kerja bisnis Anda sendiri, dengan manusia tetap memegang keputusan."
        actions={
          <>
            <Button href="/audit-gratis" arrow>
              Minta Audit Gratis
            </Button>
            <Button variant="secondary" href="#layanan-harga">
              Lihat Harga
            </Button>
          </>
        }
      />

      <ClientLogos />

      <section aria-label="Alasan memilih kami" className="border-y border-line bg-section py-12 md:py-16">
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
