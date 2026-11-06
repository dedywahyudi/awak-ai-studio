# Scheduled publishing (website + Instagram)

Approved posts go out on their own at the time you set. Drafts never do: setting a post to `scheduled` is the human approval step.

## How it works

1. A post lives in Supabase `posts` as `draft`.
2. Draft the Instagram caption from the post: `npm run social:draft -- <slug>` prints it, `npm run social:draft -- --write <slug>` saves it as `instagram_caption` (and the default image path). The rules (hashtags, closing lines) are in `content/social.ts`; the caption only reuses the post's own text. Edit it if you like. Then review the post and set `status = 'scheduled'` and `scheduled_at` (UTC; WIB = UTC+7). For Instagram also fill `instagram_caption` (max 2,200 characters), `instagram_image` (public JPEG, a site path such as `/images/blog/x.jpg` or a full URL) and set `instagram_status = 'pending'`.
3. `.github/workflows/publish-scheduled.yml` runs every 15 minutes (GitHub may be a few minutes late) and calls `scripts/publish-scheduled.mjs`:
   - due `scheduled` posts become `published` (the site shows them, `/api/revalidate` refreshes the cache),
   - published posts with `instagram_status = 'pending'` are posted to Instagram, then marked `posted` (or `failed` with `instagram_error`; the run fails so GitHub emails you).
4. The existing Supabase webhook (n8n workflow 03) still fires when a post becomes published and drafts the TikTok and carousel copy. You post those yourself.

## Admin pages (/admin)

A small admin replaces editing rows in Supabase: list of posts with status, an editor (title, category, slug, excerpt, Markdown, cover), the Instagram caption with a "Buat caption otomatis" button, and the schedule. "Setujui dan jadwalkan" is the approval step. New posts always start as drafts.

- Sign-in is Supabase Auth (email + password, session in httpOnly cookies). Being signed in is not enough: the email must be in `ADMIN_EMAILS`. Every page and action re-checks this on the server.
- Setup: Supabase > Authentication > Users > add user (email + password); set `ADMIN_EMAILS=you@example.com` in the site environment (server only, never `NEXT_PUBLIC_`). Without it `/admin` stays off.
- `/admin` is `noindex`, disallowed in `robots.txt`, not in the sitemap, and never cached.
- Times are entered in WIB and stored as UTC.

## One-time setup

1. Run `supabase/migrations/0003_scheduling.sql` in the Supabase SQL editor.
2. GitHub repo > Settings > Secrets and variables > Actions, add: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SITE_URL` (production URL, public), `AUTOMATION_SECRET`, and for Instagram `IG_USER_ID`, `IG_ACCESS_TOKEN`.
3. Instagram: a Business or Creator account linked to a Facebook Page, a Meta developer app with `instagram_basic`, `instagram_content_publish` and `pages_show_list`, then a long-lived token (about 60 days: renew it before it expires). Without the two IG secrets the script publishes the website and leaves Instagram `pending`.
4. Test first: Actions > Publish scheduled posts > Run workflow (dry run is on by default).

## Notes

- Instagram needs a public JPEG. The blog covers in `public/images/blog/` are JPEG and square (1080 px), so they work as they are. The site must be publicly reachable, not localhost.
- Instagram's API has no scheduler, which is why the 15-minute job does the timing.
- GitHub pauses scheduled workflows after 60 days without repository activity: re-enable under the Actions tab.
- The service-role key stays in GitHub Secrets. Never put it in the repo or in a client component.
