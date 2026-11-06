#!/usr/bin/env node
/**
 * Publishes posts you have already approved (status 'scheduled', scheduled_at in the past):
 *   1. website: status -> 'published', then revalidate the site
 *   2. Instagram: image post from instagram_caption + instagram_image (only when instagram_status = 'pending')
 *
 * Drafts are never touched. Run by .github/workflows/publish-scheduled.yml, or locally:
 *   DRY_RUN=1 node --env-file=.env.local scripts/publish-scheduled.mjs
 *
 * Env: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY, SITE_URL, AUTOMATION_SECRET,
 *      IG_USER_ID, IG_ACCESS_TOKEN (Instagram is skipped, not failed, when the two IG vars are missing).
 */

const env = (name) => process.env[name]?.trim() || '';
const SUPABASE_URL = (env('SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL')).replace(/\/$/, '');
const SERVICE_KEY = env('SUPABASE_SERVICE_ROLE_KEY');
const SITE_URL = env('SITE_URL').replace(/\/$/, '');
const AUTOMATION_SECRET = env('AUTOMATION_SECRET');
const IG_USER_ID = env('IG_USER_ID');
const IG_TOKEN = env('IG_ACCESS_TOKEN');
const DRY_RUN = env('DRY_RUN') === '1' || env('DRY_RUN') === 'true';
const GRAPH = 'https://graph.facebook.com/v21.0';

if (!SUPABASE_URL || !SERVICE_KEY || !SITE_URL) {
  console.error('Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY or SITE_URL.');
  process.exit(1);
}

const rest = async (path, init = {}) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'content-type': 'application/json',
      Prefer: 'return=representation',
      ...init.headers,
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res.json();
};

const patch = (id, body) => rest(`posts?id=eq.${id}`, { method: 'PATCH', body: JSON.stringify(body) });
const absolute = (src) => (src.startsWith('/') ? `${SITE_URL}${src}` : src);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function graph(path, params, method = 'POST') {
  const url = new URL(`${GRAPH}/${path}`);
  const body = new URLSearchParams({ ...params, access_token: IG_TOKEN });
  const res = await fetch(method === 'GET' ? `${url}?${body}` : url, method === 'GET' ? {} : { method, body });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error?.message ?? `Graph API ${res.status}`);
  return json;
}

/** Instagram image post: create a container, wait until it is ready, then publish it. */
async function postToInstagram(post) {
  const imageUrl = absolute(post.instagram_image);
  if (!/\.jpe?g(\?|$)/i.test(imageUrl)) throw new Error('Instagram image must be a public JPEG URL.');
  const container = await graph(`${IG_USER_ID}/media`, { image_url: imageUrl, caption: post.instagram_caption });
  for (let i = 0; i < 12; i += 1) {
    const { status_code: status } = await graph(container.id, { fields: 'status_code' }, 'GET');
    if (status === 'FINISHED') break;
    if (status === 'ERROR' || status === 'EXPIRED') throw new Error(`Instagram container ${status}.`);
    await sleep(5000);
  }
  const published = await graph(`${IG_USER_ID}/media_publish`, { creation_id: container.id });
  return published.id;
}

async function revalidateSite() {
  if (!AUTOMATION_SECRET) return console.warn('AUTOMATION_SECRET not set: site cache not refreshed (it refreshes within the hour).');
  const res = await fetch(`${SITE_URL}/api/revalidate`, { method: 'POST', headers: { 'x-automation-secret': AUTOMATION_SECRET } });
  console.log(`Revalidate: ${res.status}`);
}

let failures = 0;
const now = new Date().toISOString();

// 1. Website: publish what is due.
const due = await rest(`posts?status=eq.scheduled&scheduled_at=lte.${encodeURIComponent(now)}&select=id,slug,scheduled_at`);
console.log(`${due.length} scheduled post(s) due.`);
for (const post of due) {
  console.log(`${DRY_RUN ? '[dry run] would publish' : 'Publishing'} ${post.slug}`);
  if (!DRY_RUN) await patch(post.id, { status: 'published', published_at: post.scheduled_at });
}
if (due.length && !DRY_RUN) await revalidateSite();

// 2. Instagram: published posts waiting for it (also retries nothing that already failed or posted).
const pending = await rest(
  `posts?status=eq.published&instagram_status=eq.pending&select=id,slug,instagram_caption,instagram_image`,
);
console.log(`${pending.length} Instagram post(s) pending.`);
for (const post of pending) {
  if (!post.instagram_caption || !post.instagram_image) {
    console.warn(`${post.slug}: caption or image missing, skipped.`);
    if (!DRY_RUN) await patch(post.id, { instagram_status: 'skipped', instagram_error: 'Caption or image missing.' });
    continue;
  }
  if (!IG_USER_ID || !IG_TOKEN) {
    console.warn(`${post.slug}: IG_USER_ID / IG_ACCESS_TOKEN not set, left pending.`);
    continue;
  }
  if (DRY_RUN) {
    console.log(`[dry run] would post ${post.slug} to Instagram`);
    continue;
  }
  try {
    const mediaId = await postToInstagram(post);
    await patch(post.id, { instagram_status: 'posted', instagram_media_id: mediaId, instagram_posted_at: new Date().toISOString(), instagram_error: null });
    console.log(`Instagram posted: ${post.slug} (${mediaId})`);
  } catch (error) {
    failures += 1;
    console.error(`Instagram failed: ${post.slug}: ${error.message}`);
    await patch(post.id, { instagram_status: 'failed', instagram_error: String(error.message).slice(0, 500) });
  }
}

process.exit(failures ? 1 : 0);
