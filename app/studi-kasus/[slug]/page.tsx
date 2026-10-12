import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { caseStudies, getCaseStudy } from '@/content/case-studies';
import { pageMeta } from '@/lib/seo';
import { Container, Eyebrow, Hl } from '@/components/ui/Section';
import { ClosingCta } from '@/components/sections/ClosingCta';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return pageMeta({ title: study.title, description: study.summary, path: `/studi-kasus/${study.slug}` });
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  return (
    <>
      <article className="bg-page pb-16 pt-12 md:pb-24 md:pt-20">
        <Container className="flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Link href="/studi-kasus" className="inline-flex items-center gap-1.5 text-sm text-link hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" /> Semua studi kasus
            </Link>
            <Eyebrow>{study.category}</Eyebrow>
            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] text-strong md:text-5xl">
              {study.title}
            </h1>
            <p className="text-lg leading-relaxed text-body">{study.summary}</p>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-bold text-strong">
              <Hl>Tantangan</Hl>
            </h2>
            <p className="leading-relaxed text-body">{study.challenge}</p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="font-display text-2xl font-bold text-strong">
              <Hl>Pendekatan</Hl>
            </h2>
            <ol className="flex flex-col gap-4">
              {study.approach.map((a, i) => (
                <li key={a.title} className="rounded-card border border-line bg-card p-5">
                  <p className="font-mono text-xs text-eyebrow">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-strong">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-bold text-strong">
              <Hl>Teknologi</Hl>
            </h2>
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <li key={s} className="rounded-full border border-line-strong px-3 py-1 text-sm text-body">
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-bold text-strong">
              <Hl>Hasil</Hl>
            </h2>
            <p className="leading-relaxed text-body">{study.result}</p>
          </section>
        </Container>
      </article>
      <ClosingCta />
    </>
  );
}
