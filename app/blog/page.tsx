import { pageMeta } from '@/lib/seo';
import { getPostsByCategory } from '@/lib/posts';
import { categoryLabel } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Hl, PageHeader } from '@/components/ui/Section';
import { HeroSlider, type HeroSlide } from '@/components/sections/HeroSlider';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Blog',
  description: 'Catatan praktis dari proyek AI nyata: AI Chat, otomatisasi, analisis data, dan sistem berbasis AI untuk bisnis dari skala kecil sampai besar.',
  path: '/blog',
});

// Re-fetch from Supabase at most once an hour; publishing a post shows up within the hour.
export const revalidate = 3600;

export default async function BlogPage() {
  // The hero lists every post (newest first), so none is left without a link from this page.
  const posts = (await getPostsByCategory(undefined)).slice(0, 10);
  const slides: HeroSlide[] = posts.map((p) => ({
    id: p.slug,
    href: `/blog/${p.slug}`,
    eyebrow: `${categoryLabel(p.category)} · ${formatDate(p.publishedAt)}`,
    title: p.title,
    summary: p.excerpt,
    kind: 'cover',
    image: p.coverImage ? { src: p.coverImage, alt: p.title, width: 1080, height: 1080 } : undefined,
  }));

  return (
    <>
      {slides.length > 0 ? (
        <HeroSlider
          slides={slides}
          heading="Blog"
          label="Tulisan terbaru"
          prevLabel="Tulisan sebelumnya"
          nextLabel="Tulisan berikutnya"
          ctaLabel="Baca Tulisan"
        />
      ) : (
        <PageHeader
          eyebrow="Blog"
          title={
            <>
              Panduan AI dari <Hl>proyek nyata</Hl>.
            </>
          }
          description="Catatan praktis dari membangun AI Chat, otomatisasi, analisis data, dan sistem berbasis AI. Bahasa sehari-hari, tanpa istilah yang bikin pusing."
        />
      )}
      <ClosingCta
        title="Punya pertanyaan soal AI di bisnis Anda?"
        description="Ceritakan konteksnya. Kami bantu menjawab, tanpa kewajiban."
      />
    </>
  );
}
