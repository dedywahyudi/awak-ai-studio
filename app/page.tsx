import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Camera, Clock, Globe, HeartPulse, MessageCircle, ShieldCheck, Sparkles, Workflow, Zap, type LucideIcon } from 'lucide-react';
import { site } from '@/lib/site';
import { priceDisclaimer } from '@/lib/pricing';
import { getProject } from '@/content/projects';
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
    title: '15+ tahun pengalaman',
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

interface UseCase {
  icon: LucideIcon;
  kind: string;
  title: string;
  body: string;
  href: string;
  /** Small line at the bottom of the card, for example the AI used in a project. */
  meta?: string;
}

/** The three services, each linking to its card on /layanan. */
const forSmallBusiness: UseCase[] = [
  {
    icon: MessageCircle,
    kind: 'Layanan',
    title: 'Menjawab pelanggan',
    body: 'Asisten AI menjawab dari data bisnis Anda di kanal mana pun, lalu meneruskan ke tim saat tidak yakin.',
    href: '/layanan#ai-chat',
  },
  {
    icon: Workflow,
    kind: 'Layanan',
    title: 'Mengurus pekerjaan admin',
    body: 'Follow-up lead, penawaran, dan pengingat berjalan otomatis, disetujui Anda sebelum terkirim.',
    href: '/layanan#otomatisasi',
  },
  {
    icon: Globe,
    kind: 'Layanan',
    title: 'Membangun sistem khusus',
    body: 'Web app, aplikasi mobile, dan integrasi perangkat seperti CCTV dan sensor, dibuat sesuai alur bisnis Anda.',
    href: '/layanan#custom',
  },
];

/** Real projects, read from content/projects.ts so the titles, AI labels and links never go stale. */
const showcaseProjects: { slug: string; icon: LucideIcon }[] = [
  { slug: 'aplikasi-web-ai-bidang-medis', icon: HeartPulse },
  { slug: 'analisis-sentimen-media-sosial', icon: BarChart3 },
  { slug: 'dashboard-smart-city', icon: Camera },
];

const forEnterprise: UseCase[] = showcaseProjects.flatMap(({ slug, icon }) => {
  const project = getProject(slug);
  if (!project) return [];
  return [
    {
      icon,
      kind: project.period,
      title: project.title,
      body: project.summary,
      href: `/studi-kasus/${project.slug}`,
      meta: project.aiUsed.none ? project.aiUsed.label : `AI: ${project.aiUsed.label}`,
    },
  ];
});

function UseCaseGroup({ heading, items, columns }: { heading: string; items: UseCase[]; columns: string }) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-display text-sm font-bold uppercase tracking-widest text-link">{heading}</h3>
      <ul className={`grid gap-5 ${columns}`}>
        {items.map(({ icon: Icon, kind, title, body, href, meta }) => (
          <li key={title} className="flex">
            <Link
              href={href}
              className="group flex w-full flex-col gap-4 rounded-card border border-line bg-card p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent-ring"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-link">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">{kind}</span>
              </span>
              <span className="flex flex-col gap-2">
                <h4 className="font-display text-lg font-bold text-strong">{title}</h4>
                <span className="text-sm leading-relaxed text-muted">{body}</span>
              </span>
              <span className="mt-auto flex flex-col gap-3">
                {meta && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-body">
                    <Sparkles size={14} className="text-link" aria-hidden="true" />
                    {meta}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-link transition group-hover:text-white">
                  {kind === 'Layanan' ? 'Lihat layanan' : 'Baca selengkapnya'}
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
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
            <Button variant="secondary" href="#layanan">
              Lihat Layanan
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
            Dari bisnis kecil sampai <Hl>sistem enterprise</Hl>.
          </>
        }
        description="Tiga layanan yang bisa Anda mulai hari ini, dan proyek nyata yang pernah kami bangun. Setiap sistem memakai data dan alur kerja Anda sendiri, dengan manusia tetap memegang keputusan."
      >
        <div className="flex flex-col gap-10">
          <UseCaseGroup heading="Layanan untuk bisnis Anda" items={forSmallBusiness} columns="md:grid-cols-3" />
          <UseCaseGroup
            heading="Proyek nyata untuk perusahaan dan organisasi"
            items={forEnterprise}
            columns="md:grid-cols-3"
          />
        </div>
        <div className="mt-8">
          <Button variant="secondary" href="/studi-kasus" arrow>
            Lihat Studi Kasus
          </Button>
        </div>
      </Section>

      <Section
        id="layanan"
        tone="section"
        eyebrow="02 — Layanan"
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
            {priceDisclaimer}{' '}
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
