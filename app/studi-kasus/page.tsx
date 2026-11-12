import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { projects } from '@/content/projects';
import { JsonLd } from '@/components/ui/JsonLd';
import { HeroSlider, type HeroSlide } from '@/components/sections/HeroSlider';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Studi Kasus',
  description: 'Proyek AI dan sistem yang pernah kami bangun untuk bisnis dan organisasi, lengkap dengan alur kerja, peran AI, dan tangkapan layar.',
  path: '/studi-kasus',
});

const slides: HeroSlide[] = projects.map((p) => {
  const cover = p.gallery[p.coverIndex ?? 0];
  const phone = p.gallery.length > 0 && p.gallery.every((s) => s.width <= 600 && s.height > s.width);
  return {
    id: p.slug,
    href: `/studi-kasus/${p.slug}`,
    eyebrow: p.period,
    beta: p.beta,
    title: p.title,
    summary: p.summary,
    meta: p.aiUsed.none ? p.aiUsed.label : `AI: ${p.aiUsed.label}`,
    metaIcon: 'ai',
    tags: p.tags,
    kind: phone ? 'phone' : 'website',
    image: cover,
  };
});

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Studi kasus',
  url: `${site.url}/studi-kasus`,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${site.url}/studi-kasus/${p.slug}`,
    })),
  },
};

export default function StudiKasusPage() {
  return (
    <>
      <HeroSlider
        slides={slides}
        heading="Studi Kasus"
        label="Studi kasus pilihan"
        prevLabel="Studi kasus sebelumnya"
        nextLabel="Studi kasus berikutnya"
      />

      <ClosingCta
        title="Punya bisnis yang ingin dibantu?"
        description="Ceritakan masalah yang ingin Anda selesaikan. Kami bantu memetakan solusinya."
      />
      <JsonLd data={collectionJsonLd} />
    </>
  );
}
