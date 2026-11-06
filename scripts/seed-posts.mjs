#!/usr/bin/env node
/**
 * Copies the posts in content/posts.ts into Supabase (table public.posts), matched by slug.
 * Once Supabase is configured the blog reads only from the database, so run this once at launch.
 *
 *   node --env-file=.env.local scripts/seed-posts.mjs              dry run: shows what would be written
 *   node --env-file=.env.local scripts/seed-posts.mjs --write      saves them as DRAFTS (review in /admin, then schedule)
 *   node --env-file=.env.local scripts/seed-posts.mjs --write --publish   saves them as PUBLISHED with their dates
 *
 * Existing rows with the same slug are updated; nothing is deleted. Needs Node 22.18+ (reads the TypeScript file
 * directly), SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY.
 */
import { localPosts } from '../content/posts.ts';

const args = new Set(process.argv.slice(2));
const write = args.has('--write');
const publish = args.has('--publish');
const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const rows = localPosts.map((p) => ({
  title: p.title,
  slug: p.slug,
  content: p.content,
  excerpt: p.excerpt,
  cover_image: p.coverImage,
  category: p.category,
  status: publish ? 'published' : 'draft',
  published_at: publish ? p.publishedAt : null,
}));

console.log(`${rows.length} post(s), status: ${publish ? 'published' : 'draft'}`);
for (const r of rows) console.log(`- ${r.slug} (${r.category}${r.published_at ? `, ${r.published_at}` : ''})`);

if (!write) {
  console.log('\nDry run. Add --write to save.');
  process.exit(0);
}
if (!url || !key) {
  console.error('Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) or SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const res = await fetch(`${url}/rest/v1/posts?on_conflict=slug`, {
  method: 'POST',
  headers: {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'content-type': 'application/json',
    Prefer: 'resolution=merge-duplicates,return=minimal',
  },
  body: JSON.stringify(rows),
});
if (!res.ok) {
  console.error(`Supabase ${res.status}: ${await res.text()}`);
  process.exit(1);
}
console.log('Saved.');
