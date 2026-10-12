import { getPublicClient } from '@/lib/supabase/server';
import { localPosts } from '@/content/posts';
import type { Post } from '@/lib/types';

/**
 * Blog data access. Reads published posts from Supabase when configured, otherwise
 * falls back to the seed posts in content/posts.ts so the site works out of the box.
 * Pages call these functions only; they never touch Supabase directly.
 */
interface PostRow {
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string;
  published_at: string;
}

const toPost = (row: PostRow): Post => ({
  title: row.title,
  slug: row.slug,
  content: row.content,
  excerpt: row.excerpt ?? '',
  coverImage: row.cover_image,
  category: row.category,
  publishedAt: row.published_at,
});

const byDateDesc = (a: Post, b: Post) => b.publishedAt.localeCompare(a.publishedAt);

export async function getAllPosts(): Promise<Post[]> {
  const db = getPublicClient();
  if (!db) return [...localPosts].sort(byDateDesc);

  const { data, error } = await db
    .from('posts')
    .select('title, slug, content, excerpt, cover_image, category, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error || !data) {
    console.error('[posts] Supabase read failed, using local posts:', error?.message);
    return [...localPosts].sort(byDateDesc);
  }
  return (data as PostRow[]).map(toPost);
}

export async function getPostsByCategory(category?: string): Promise<Post[]> {
  const all = await getAllPosts();
  return category ? all.filter((p) => p.category === category) : all;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
