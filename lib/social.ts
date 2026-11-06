import type { SocialConfig } from '@/content/social';

/** The post fields the caption needs (works for local posts and Supabase rows alike). */
export interface CaptionSource {
  title: string;
  excerpt?: string | null;
  content: string;
  category: string;
}

const stripMarkdown = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Section headings of the post, in order: they become the short list of points. */
const headings = (markdown: string) =>
  [...markdown.matchAll(/^##\s+(.+)$/gm)].map((m) => stripMarkdown(m[1] ?? '')).filter(Boolean);

function hashtagsFor(post: CaptionSource, config: SocialConfig): string[] {
  const haystack = `${post.title} ${post.excerpt ?? ''} ${post.content}`;
  const keyword = config.keywordHashtags.filter((k) => k.match.test(haystack)).map((k) => k.tag);
  const all = [...config.baseHashtags, ...(config.categoryHashtags[post.category] ?? []), ...keyword];
  return [...new Set(all)].slice(0, config.maxHashtags);
}

/**
 * Instagram caption drafted only from the post itself: title as the hook, the excerpt, the section headings
 * as points, a closing line by category and hashtags. No facts are added, so it stays true to the article.
 */
export function buildCaption(post: CaptionSource, config: SocialConfig): string {
  const parts: string[] = [post.title.trim()];
  if (post.excerpt?.trim()) parts.push(stripMarkdown(post.excerpt));

  const points = headings(post.content).slice(0, config.maxPoints);
  if (points.length) parts.push(points.map((p) => `• ${p}`).join('\n'));

  parts.push(config.callToAction[post.category] ?? config.defaultCallToAction);

  const tags = hashtagsFor(post, config).join(' ');
  const body = parts.join('\n\n');
  const room = config.maxLength - tags.length - 2;
  const trimmed = body.length > room ? `${body.slice(0, room - 1).trimEnd()}…` : body;
  return tags ? `${trimmed}\n\n${tags}` : trimmed;
}
