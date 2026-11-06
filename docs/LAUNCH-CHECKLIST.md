# Launch checklist

What is needed to make the whole app work, in order. Tick items as you finish them.
`docs/TODO.md` still holds the long list of content questions; this file is the order to do things in.

## 1. The site runs in production (must have)

Step by step with exact settings: `docs/DEPLOY.md`.

- [ ] **Domain.** Buy or choose the production domain and point it at Vercel.
- [ ] **Vercel.** Import the GitHub repo, add the environment variables below, deploy. Pushes to `main` auto-deploy.
- [ ] **Environment variables** (Vercel > Settings > Environment Variables; see `.env.example`):
  - [ ] `NEXT_PUBLIC_SITE_URL` = the real domain, no trailing slash (wrong value = wrong canonical URLs and sitemap)
  - [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` (international format, no "+"). Empty = every WhatsApp button goes to `/audit-gratis`.
  - [ ] `NEXT_PUBLIC_CONTACT_EMAIL`
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY` (server only, never `NEXT_PUBLIC_`)
  - [ ] `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFY_EMAIL`
  - [ ] `ADMIN_EMAILS` (for `/admin`)
  - [ ] `AUTOMATION_SECRET` (`openssl rand -hex 32`), and later `LEAD_WEBHOOK_URL` / `LEAD_WEBHOOK_SECRET`
- [ ] **Supabase project.** Create it, then run in the SQL editor, in order:
  - [ ] `supabase/migrations/0001_init.sql` (leads, posts)
  - [ ] `supabase/migrations/0002_automation.sql` (topics, social drafts)
  - [ ] `supabase/migrations/0003_scheduling.sql` (scheduled publishing, Instagram columns)
- [ ] **Resend.** Create the account, verify the sending domain, use that sender in `RESEND_FROM`.
- [ ] **Smoke test on the live URL:** send a test lead (it should reach Supabase and your email), open `/sitemap.xml` and `/robots.txt`, check one WhatsApp button.
- [ ] **Search.** Submit `/sitemap.xml` to Google Search Console. Claim the Google Business Profile.
- [ ] **Links.** Fill the email and social links in `lib/site.ts` (empty ones are hidden).

## 2. Admin pages work

- [ ] Supabase > Authentication > Users: add your email and a strong password.
- [ ] Put the same email in `ADMIN_EMAILS` and redeploy.
- [ ] Sign in at `/admin/login`. Create a test post, use "Buat caption otomatis", schedule it, then cancel it.
- [ ] Copy the four existing posts into Supabase: `npm run seed:posts` (see `docs/DEPLOY.md`). The blog reads only from Supabase once it is configured, so an empty table means an empty blog.
- [ ] Supabase Auth: turn off public sign-ups.
- [ ] Optional later: rename the stored category `AI untuk UMKM` (needs a migration).

## 3. Scheduled publishing to the website and Instagram

- [ ] **Instagram.** A Business or Creator account linked to a Facebook Page.
- [ ] **Meta developer app** with `instagram_basic`, `instagram_content_publish`, `pages_show_list`. Create a long-lived token, note the Instagram user ID. Put a reminder in your calendar to renew the token every 60 days.
- [ ] **GitHub secrets** (repo > Settings > Secrets and variables > Actions): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SITE_URL`, `AUTOMATION_SECRET`, `IG_USER_ID`, `IG_ACCESS_TOKEN`.
- [ ] Push `.github/workflows/publish-scheduled.yml` and `scripts/publish-scheduled.mjs`, then run the workflow once manually as a **dry run**.
- [ ] Schedule a real test post (website only first, then with Instagram) and watch it publish.
- [ ] Decide posting days and times (WIB) and who approves.
- [ ] Review and set the hashtags in `content/social.ts` (they are a neutral starting set).

## 4. Optional automation (n8n), only when you want it

- [ ] A small VPS (1 vCPU / 2 GB), a DNS record, `automation/.env` (see `automation/.env.example`), `docker compose up -d`.
- [ ] Anthropic API key (paid per use), then import the workflows and activate them: 01 lead qualifier, 02 blog drafts, 03 TikTok and carousel drafts, 04 WhatsApp assistant (needs a WhatsApp Business number).
- [ ] Supabase webhook on `posts` for workflow 03. `AUTOMATION_SECRET` must match on both sides.
- [ ] Before using 04: hidden prices. `showPrices` is `false`, so the knowledge feed tells the assistant not to quote prices. Re-run `npm run automation:build` and re-import if you change prompts.

## 5. Content and files only you can supply

Do these before announcing the site. Details are in `docs/TODO.md`.

- [ ] **Blog images** (`public/images/blog/`): regenerate text fixes (medical "Akurat, Aman" and brain icon, sentiment "The Real Dashboard", "Menambahkan AI" English labels). Confirm the angiogram is anonymised. Add a 4th image style decision if you want more posts.
- [ ] **Project screenshots:** confirm you may show client names, worker names and faces, or blur them.
- [ ] **Project facts:** confirm every "AI yang dipakai" label and the AI features added from your briefs (Smart City, command center, ERP, harvest app, sentiment's offline sources). Remove any that are not real.
- [ ] **Roles of multi-role access** in the harvest app (names of the roles).
- [ ] **Client logos:** confirm permission to show each one.
- [ ] **Team wording** (one engineer or a team) and a **`/keamanan` page** (data handling, UU PDP).
- [ ] **Audit promise** (3 working days) and the **FAQ claims** about data and WhatsApp fees: check them against your providers' terms.
- [ ] **Prices:** when you decide to publish them, set `showPrices = true` in `lib/pricing.ts`.
- [ ] Legal review of `/kebijakan-privasi`.

## 6. Housekeeping

- [ ] Commit and push the work done after `f036ae2` (tablet layout, blog covers, scheduling, social drafts, admin pages) once you have reviewed it.
- [ ] `npm run lint && npm run typecheck && npm run build` before each push.
- [ ] Remove stale items from `docs/TODO.md` (the budgeting-system card and the project periods items no longer apply).
- [ ] Stop the old dev server still holding port 3000.
