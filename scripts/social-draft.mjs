#!/usr/bin/env node
/**
 * Drafts the Instagram caption (and default image path) for blog posts from the post's own text.
 * Rules live in content/social.ts. It only writes drafts: you review the caption, then approve the post by setting
 * status 'scheduled' and instagram_status 'pending' in Supabase. Nothing is published here.
 *
 *   node scripts/social-draft.mjs                  print captions for all local posts (content/posts.ts)
 *   node scripts/social-draft.mjs <slug>           print one
 *   node scripts/social-draft.mjs --write [slug]   save to Supabase posts where instagram_caption is empty
 *   node scripts/social-draft.mjs --write --force  also overwrite existing captions
 *
 * Needs Node 22.18+ (runs the TypeScript files directly). --write needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */
import { existsSync } from 'node:fs';
import { socialConfig } from '../content/social.ts';
import { localPosts } from '../content/posts.ts';
import { buildCaption } from '../lib/social.ts';

const args = process.argv.slice(2);
const write = args.includes('--write');
const force = args.includes('--force');
const slug = args.find((a) => !a.startsWith('--'));

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const rest = async (path, init = {}) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'content-type': 'application/json', Prefer: 'return=minimal', ...init.headers },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return init.method === 'PATCH' ? null : res.json();
};

let posts;
if (write) {
  if (!SUPABASE_URL || !KEY) {
    console.error('--write needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
  }
  const filter = slug ? `&slug=eq.${encodeURIComponent(slug)}` : '';
  posts = await rest(`posts?select=id,slug,title,excerpt,content,category,instagram_caption,instagram_image${filter}`);
} else {
  posts = localPosts.filter((p) => !slug || p.slug === slug);
}
if (!posts.length) {
  console.error(slug ? `No post with slug "${slug}".` : 'No posts found.');
  process.exit(1);
}

for (const post of posts) {
  const caption = buildCaption(post, socialConfig);
  const image = `/images/blog/${post.slug}.jpg`;
  const hasImage = existsSync(new URL(`../public${image}`, import.meta.url));
  console.log(`\n=== ${post.slug} (${caption.length}/${socialConfig.maxLength}) ===\n${caption}\nImage: ${hasImage ? image : 'none found in public/images/blog'}`);
  if (!write) continue;
  if (post.instagram_caption && !force) {
    console.log('-> kept: caption already set (use --force to overwrite).');
    continue;
  }
  const body = { instagram_caption: caption };
  if (hasImage && !post.instagram_image) body.instagram_image = image;
  await rest(`posts?id=eq.${post.id}`, { method: 'PATCH', body: JSON.stringify(body) });
  console.log('-> saved as a draft. Review it, then set instagram_status to pending and the post to scheduled.');
}
