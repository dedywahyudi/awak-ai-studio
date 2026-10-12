export const postCategories = ['AI untuk UMKM', 'Studi Kasus', 'Tips Digital'] as const;
export type PostCategory = (typeof postCategories)[number];

export interface Post {
  title: string;
  slug: string;
  /** Markdown. */
  content: string;
  excerpt: string;
  coverImage: string | null;
  category: PostCategory | string;
  /** ISO 8601. */
  publishedAt: string;
}
