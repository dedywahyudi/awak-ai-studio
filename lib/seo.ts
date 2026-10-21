import type { Metadata } from 'next';
import { site } from '@/lib/site';
import type { Post } from '@/lib/types';

interface PageMetaInput {
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical URL and og:url. */
  path: string;
  type?: 'website' | 'article';
}

/** Search snippets cut off near 160 characters: clamp at a word boundary. */
const clamp = (text: string, max = 158) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,:;.\s]+$/, '')}…`;
};

/** Default share image (app/opengraph-image.tsx). A page's own openGraph replaces the root one, so it is set here. */
const shareImage = { url: '/opengraph-image', width: 1200, height: 630, alt: `${site.name}: AI untuk bisnis semua skala` };

/** Unique title, description, canonical and Open Graph per page. */
export function pageMeta({ title, description: rawDescription, path, type = 'website' }: PageMetaInput): Metadata {
  const description = clamp(rawDescription);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      images: [shareImage],
    },
    twitter: { card: 'summary_large_image', title: `${title} | ${site.name}`, description, images: [shareImage.url] },
  };
}

const abs = (path: string) => `${site.url}${path}`;

export function localBusinessJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: site.description,
    url: site.url,
    logo: abs('/images/logo-mark.png'),
    image: abs('/opengraph-image'),
    ...(site.email ? { email: site.email } : {}),
    ...(site.whatsappNumber ? { telephone: `+${site.whatsappNumber}` } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: { '@type': 'City', name: site.city },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function articleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
    ...(post.coverImage ? { image: post.coverImage } : {}),
  };
}
