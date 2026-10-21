import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { getPostsByCategory } from '@/lib/posts';
import { categoryLabel, postCategories } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Container, Hl, PageHeader } from '@/components/ui/Section';
import { PostCard } from '@/components/sections/Cards';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Blog',
  description: 'Catatan praktis dari proyek AI nyata: AI Chat, otomatisasi, analisis data, dan platform berbasis AI untuk bisnis.',
  path: '/blog',
});

// Re-fetch from Supabase at most once an hour; publishing a post shows up within the hour.
export const revalidate = 3600;

export default async function BlogPage({ searchParams }: { searchParams: { kategori?: string } }) {
  const active = postCategories.find((c) => c === searchParams.kategori);
  const posts = await getPostsByCategory(active);

  const tab = (href: string, label: string, on: boolean) => (
    <Link
      key={label}
      href={href}
      aria-current={on ? 'page' : undefined}
      className={cn(
        'inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition',
        on ? 'border-accent bg-accent text-white' : 'border-line-strong text-body hover:border-accent-ring hover:text-white',
      )}
    >
      {label}
    </Link>
  );

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Panduan AI dari <Hl>proyek nyata</Hl>.
          </>
        }
        description="Catatan praktis dari membangun AI Chat, otomatisasi, analisis data, dan platform berbasis AI. Bahasa sehari-hari, tanpa istilah yang bikin pusing."
      />
      <section className="bg-page pb-16 pt-0 md:pb-28">
        <Container className="flex flex-col gap-8">
          <nav aria-label="Kategori blog" className="flex flex-wrap gap-2">
            {tab('/blog', 'Semua', !active)}
            {postCategories.map((c) => tab(`/blog?kategori=${encodeURIComponent(c)}`, categoryLabel(c), c === active))}
          </nav>
          {posts.length === 0 ? (
            <p className="text-body">Belum ada tulisan di kategori ini.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </Container>
      </section>
      <ClosingCta
        title="Punya pertanyaan soal AI di bisnis Anda?"
        description="Ceritakan konteksnya. Kami bantu menjawab, tanpa kewajiban."
      />
    </>
  );
}
