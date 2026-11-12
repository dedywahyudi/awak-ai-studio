import { Check, Sparkles } from 'lucide-react';
import type { Project } from '@/content/projects';
import { Badge } from '@/components/ui/Badge';
import { Hl } from '@/components/ui/Section';
import { ProcessFlow } from '@/components/sections/ProcessFlow';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';

const sectionTitle = 'font-display text-xl font-bold text-strong md:text-2xl';

/**
 * Body of a case study: screenshots, workflow, AI usage, features and stack.
 * Shared by /studi-kasus (inline, sub-headings are h3) and /studi-kasus/[slug] (sub-headings are h2).
 * `idPrefix` keeps heading ids unique when several projects share one page.
 */
export function ProjectDetail({
  project,
  level = 2,
  idPrefix = '',
}: {
  project: Project;
  level?: 2 | 3;
  idPrefix?: string;
}) {
  const Sub = level === 3 ? 'h3' : 'h2';
  const Item = level === 3 ? 'h4' : 'h3';
  const id = (name: string) => `${idPrefix}${name}`;

  return (
    <>
      <ProjectShowcase gallery={project.gallery} />

      <section aria-labelledby={id('alur')} className="flex flex-col gap-4">
        <Sub id={id('alur')} className={sectionTitle}>
          Alur <Hl>kerja</Hl>
        </Sub>
        <ProcessFlow steps={project.process} />
      </section>

      {project.ai && (
        <section aria-labelledby={id('ai')} className="flex flex-col gap-4">
          <Sub id={id('ai')} className={sectionTitle}>
            AI di <Hl>proyek ini</Hl>
          </Sub>
          <ul className="grid gap-3 md:grid-cols-2">
            {project.ai.map((a) => (
              <li key={a.title} className="flex flex-col gap-2 rounded-card border border-line-featured bg-featured p-4">
                <Item className="flex items-center gap-2 font-display text-base font-bold text-strong">
                  <Sparkles size={16} className="text-link" aria-hidden="true" />
                  {a.title}
                </Item>
                <p className="text-sm leading-relaxed text-body">{a.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <section aria-labelledby={id('fitur')} className="flex flex-col gap-3">
          <Sub id={id('fitur')} className={sectionTitle}>
            Fitur <Hl>utama</Hl>
          </Sub>
          <ul className="flex flex-col gap-2">
            {project.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-body">
                <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={id('teknologi')} className="flex flex-col gap-3">
          <Sub id={id('teknologi')} className={sectionTitle}>
            <Hl>Teknologi</Hl>
          </Sub>
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
    </>
  );
}
