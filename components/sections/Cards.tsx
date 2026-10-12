import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/content/case-studies';
import type { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/studi-kasus/${study.slug}`}
      className="group flex h-full flex-col gap-4 rounded-card border border-line bg-card p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent-ring"
    >
      <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">
        {study.category}
      </span>
      <h3 className="font-display text-xl font-bold leading-snug text-strong">{study.title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-muted">{study.summary}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-link transition group-hover:text-white">
        Baca studi kasus
        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

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
          className="aspect-[16/9] w-full bg-[repeating-linear-gradient(135deg,var(--surface-card)_0_14px,var(--surface-section)_14px_28px)]"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono font-medium uppercase tracking-[0.1em] text-eyebrow">{post.category}</span>
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
