import type { TechItem } from '@/content/tech-stack';

export function TechChip({ tech }: { tech: TechItem }) {
  return (
    <span className="inline-flex h-14 items-center gap-3 rounded-card border border-line bg-card px-5 text-sm font-semibold text-body">
      {tech.path && (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="currentColor"
          fillRule={tech.evenodd ? 'evenodd' : undefined}
          aria-hidden="true"
          className="text-muted"
        >
          <path d={tech.path} />
        </svg>
      )}
      {tech.name}
    </span>
  );
}
