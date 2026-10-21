export const postCategories = ['AI untuk UMKM', 'Studi Kasus', 'Tips Digital'] as const;
export type PostCategory = (typeof postCategories)[number];

/** The stored value 'AI untuk UMKM' is kept (DB check constraint); this is what visitors read. */
export const categoryLabel = (category: string) => (category === 'AI untuk UMKM' ? 'AI untuk Bisnis' : category);

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
