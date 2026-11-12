import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProject, projects } from '@/content/projects';
import { pageMeta } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';
import { Container, Eyebrow } from '@/components/ui/Section';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { ProjectDetail } from '@/components/sections/ProjectDetail';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return pageMeta({ title: project.title, description: project.intro, path: `/studi-kasus/${project.slug}` });
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;
  const facts = [
    { label: 'Industri', value: project.industry },
    { label: 'Platform', value: project.platform },
    { label: 'AI', value: project.aiUsed.detail },
  ];

  return (
    <>
      <article className="bg-page pb-12 pt-10 md:pb-20 md:pt-14">
        <Container className="flex max-w-4xl flex-col gap-8 md:gap-10">
          <header className="flex flex-col gap-3">
            <Link href="/studi-kasus" className="inline-flex items-center gap-1.5 text-sm text-link hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" /> Semua studi kasus
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>{project.period}</Eyebrow>
              {project.beta && <Badge size="sm">Beta</Badge>}
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-strong md:text-4xl">
              {project.title}
            </h1>
            <p className="leading-relaxed text-body md:text-lg">{project.intro}</p>
            <dl className="mt-1 flex flex-wrap gap-x-8 gap-y-2 rounded-card border border-line bg-card px-5 py-3">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline gap-2">
                  <dt className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">{f.label}</dt>
                  <dd className="text-sm text-body">{f.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <ProjectDetail project={project} />

          <Link
            href={`/studi-kasus/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-card border border-line bg-card px-5 py-4 transition duration-200 hover:border-accent-ring"
          >
            <span className="flex flex-col gap-1">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">Proyek berikutnya</span>
              <span className="font-display text-base font-bold text-strong">{next.title}</span>
            </span>
            <ArrowRight size={20} className="shrink-0 text-link transition group-hover:translate-x-1" aria-hidden="true" />
          </Link>

          <p className="text-sm text-muted">
            Tangkapan layar berasal dari proyek nyata. Hasil terukur dan detail lainnya kami bahas langsung.
          </p>
        </Container>
      </article>
      <ClosingCta
        title="Punya kebutuhan serupa?"
        description="Ceritakan konteksnya. Kami bantu menilai apa yang masuk akal dikerjakan."
      />
    </>
  );
}
