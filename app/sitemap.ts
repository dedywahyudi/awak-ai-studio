import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { caseStudies } from '@/content/case-studies';
import { getAllPosts } from '@/lib/posts';

export const revalidate = 3600;

const staticRoutes = [
  '',
  '/layanan',
  '/demo',
  '/studi-kasus',
  '/harga',
  '/solusi-custom',
  '/tentang',
  '/blog',
  '/kontak',
  '/kebijakan-privasi',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
    })),
    ...caseStudies.map((c) => ({
      url: `${site.url}/studi-kasus/${c.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
