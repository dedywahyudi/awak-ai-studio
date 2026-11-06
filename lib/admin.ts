import { z } from 'zod';
import { postCategories } from '@/lib/types';

/** Shape of a row in public.posts as the admin sees it. */
export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  status: 'draft' | 'scheduled' | 'published';
  published_at: string | null;
  scheduled_at: string | null;
  instagram_caption: string | null;
  instagram_image: string | null;
  instagram_status: 'none' | 'pending' | 'posted' | 'failed' | 'skipped';
  instagram_media_id: string | null;
  instagram_error: string | null;
  updated_at: string;
}

export const listColumns =
  'id, title, slug, category, status, scheduled_at, published_at, instagram_status, updated_at';
export const allColumns =
  'id, title, slug, category, excerpt, content, cover_image, status, published_at, scheduled_at, instagram_caption, instagram_image, instagram_status, instagram_media_id, instagram_error, updated_at';

/** Times are entered and shown in WIB (UTC+7), stored as UTC. */
const WIB = 'Asia/Jakarta';
export const fromWibInput = (value: string) => (value ? new Date(`${value}:00+07:00`) : null);
export const toWibInput = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('sv-SE', { timeZone: WIB, hour12: false }).slice(0, 16).replace(' ', 'T')
    : '';
export const formatWib = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('id-ID', { timeZone: WIB, dateStyle: 'medium', timeStyle: 'short' }) + ' WIB'
    : '-';

export const postSchema = z.object({
  title: z.string().trim().min(5, 'Judul minimal 5 huruf').max(160, 'Judul maksimal 160 karakter'),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug hanya huruf kecil, angka, dan tanda hubung'),
  category: z.enum(postCategories),
  excerpt: z.string().trim().max(300, 'Ringkasan maksimal 300 karakter').default(''),
  content: z.string().trim().min(50, 'Isi tulisan minimal 50 karakter'),
  coverImage: z.string().trim().max(300).default(''),
  instagramEnabled: z.boolean().default(false),
  instagramCaption: z.string().trim().max(2200, 'Caption maksimal 2.200 karakter').default(''),
  instagramImage: z.string().trim().max(300).default(''),
  scheduledAt: z.string().trim().default(''),
});

export type PostInput = z.infer<typeof postSchema>;

export type AdminFormState =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: Partial<Record<keyof PostInput, string>> }
  | null;
