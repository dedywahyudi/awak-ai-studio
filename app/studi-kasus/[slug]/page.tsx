import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { getProject, projects } from '@/content/projects';
import { pageMeta } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';
import { Container, Eyebrow, Hl } from '@/components/ui/Section';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { ProcessFlow } from '@/components/sections/ProcessFlow';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return pageMeta({ title: project.title, description: project.intro, path: `/studi-kasus/${project.slug}` });
}

const sectionTitle = 'font-display text-xl font-bold text-strong md:text-2xl';

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

          <ProjectShowcase gallery={project.gallery} />

          <section aria-labelledby="alur" className="flex flex-col gap-4">
            <h2 id="alur" className={sectionTitle}>
              Alur <Hl>kerja</Hl>
            </h2>
            <ProcessFlow steps={project.process} />
          </section>

          {project.ai && (
            <section aria-labelledby="ai" className="flex flex-col gap-4">
              <h2 id="ai" className={sectionTitle}>
                AI di <Hl>proyek ini</Hl>
              </h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {project.ai.map((a) => (
                  <li key={a.title} className="flex flex-col gap-2 rounded-card border border-line-featured bg-featured p-4">
                    <h3 className="flex items-center gap-2 font-display text-base font-bold text-strong">
                      <Sparkles size={16} className="text-link" aria-hidden="true" />
                      {a.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-body">{a.body}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <section aria-labelledby="fitur" className="flex flex-col gap-3">
              <h2 id="fitur" className={sectionTitle}>
                Fitur <Hl>utama</Hl>
              </h2>
              <ul className="flex flex-col gap-2">
                {project.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-body">
                    <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="teknologi" className="flex flex-col gap-3">
              <h2 id="teknologi" className={sectionTitle}>
                <Hl>Teknologi</Hl>
              </h2>
              <ul className="flex flex-wrap content-start gap-2">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Badge tone="neutral" size="sm">
                      {s}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>
          </div>

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
