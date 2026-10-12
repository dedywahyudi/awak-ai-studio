import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { getPostsByCategory } from '@/lib/posts';
import { postCategories } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Container, Hl, PageHeader } from '@/components/ui/Section';
import { PostCard } from '@/components/sections/Cards';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Blog',
  description: 'Panduan praktis AI dan digital untuk UMKM: chatbot, konten, otomatisasi, dan tips tampil di pencarian.',
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
            Panduan AI yang <Hl>masuk akal</Hl> untuk UMKM.
          </>
        }
        description="Tulisan praktis, bahasa sehari-hari, tanpa istilah yang bikin pusing."
      />
      <section className="bg-page py-10 md:py-16">
        <Container className="flex flex-col gap-8">
          <nav aria-label="Kategori blog" className="flex flex-wrap gap-2">
            {tab('/blog', 'Semua', !active)}
            {postCategories.map((c) => tab(`/blog?kategori=${encodeURIComponent(c)}`, c, c === active))}
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
      <ClosingCta />
    </>
  );
}
