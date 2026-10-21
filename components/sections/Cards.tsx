import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart3, Lightbulb, MessageCircle, type LucideIcon } from 'lucide-react';
import type { Project } from '@/content/profile';
import { Badge } from '@/components/ui/Badge';
import { categoryLabel, type Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/studi-kasus/${project.slug}`}
      className="group flex h-full flex-col gap-4 rounded-card border border-line bg-card p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent-ring"
    >
      <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">{project.period}</span>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-bold leading-snug text-strong">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-link transition group-hover:text-white">
        Baca selengkapnya
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

const coverIcons: Record<string, LucideIcon> = {
  'AI untuk UMKM': MessageCircle,
  'Studi Kasus': BarChart3,
  'Tips Digital': Lightbulb,
};

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-card transition duration-200 hover:-translate-y-0.5 hover:border-accent-ring"
    >
      {post.coverImage ? (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[16/9] w-full items-center justify-center bg-section text-link"
        >
          <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-accent-soft">
            {(() => {
              const Icon = coverIcons[post.category] ?? Lightbulb;
              return <Icon size={32} />;
            })()}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono font-medium uppercase tracking-[0.1em] text-eyebrow">{categoryLabel(post.category)}</span>
          <time dateTime={post.publishedAt} className="text-subtle">
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-strong">{post.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
