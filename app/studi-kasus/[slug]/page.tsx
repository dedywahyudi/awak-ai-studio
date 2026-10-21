import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { getProject, projects } from '@/content/profile';
import { pageMeta } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';
import { Container, Eyebrow, Hl } from '@/components/ui/Section';
import { ClosingCta } from '@/components/sections/ClosingCta';

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

  return (
    <>
      <article className="bg-page pb-16 pt-12 md:pb-24 md:pt-20">
        <Container className="flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/studi-kasus" className="inline-flex items-center gap-1.5 text-sm text-link hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" /> Semua studi kasus
            </Link>
            <Eyebrow>{project.period}</Eyebrow>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-strong md:text-5xl">
              {project.title}
            </h1>
            <p className="text-lg leading-relaxed text-body">{project.intro}</p>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-bold text-strong">
              <Hl>Yang dikerjakan</Hl>
            </h2>
            <ul className="flex flex-col gap-3">
              {project.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 leading-relaxed text-body">
                  <Check size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-link" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-bold text-strong">
              <Hl>Teknologi</Hl>
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Badge tone="neutral">{s}</Badge>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-sm text-muted">
            Ditampilkan tanpa nama klien atau produk. Detail lebih lengkap bisa kami bahas langsung.
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
