import type { AiTool } from '@/content/ai-tools';

/** A brand icon with its name, styled like the tech stack chips. No icon: the name alone. */
export function IconChip({ tool }: { tool: AiTool }) {
  return (
    <span className="inline-flex h-14 items-center gap-3 rounded-card border border-line bg-card px-5 text-sm font-semibold text-body">
      {tool.path && (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="currentColor"
          fillRule={tool.evenodd ? 'evenodd' : undefined}
          aria-hidden="true"
          className="text-muted"
        >
          <path d={tool.path} />
        </svg>
      )}
      {tool.name}
    </span>
  );
}
