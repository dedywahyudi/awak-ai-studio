# Deploy: Vercel + Supabase

The code is ready: `npm run lint && npm run typecheck && npm run build` pass, every integration is optional, and `vercel.json` pins the functions to Singapore (`sin1`, closest to Indonesia). Follow the steps in order.

## Launching on Vercel first, Supabase later

You can deploy with no Supabase at all. Skip sections 1, 3 and 4 and set only the Vercel variables that do not mention Supabase:

- Needed: `NEXT_PUBLIC_SITE_URL` (the real domain, or the sitemap and canonical links point to localhost).
- Recommended: `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL`, and `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFY_EMAIL`.
- Leave out: every `SUPABASE` variable and `ADMIN_EMAILS`.

What works and what does not:

| Part | Without Supabase |
|---|---|
| All public pages | Work as usual (content lives in the code). |
| Blog, blog posts, sitemap | Read from `content/posts.ts` (the built-in fallback), so the four posts and their covers show. To change a post, edit that file and redeploy. |
| Contact and audit forms | Work **only if Resend is set**: leads go to `LEAD_NOTIFY_EMAIL`. With neither Supabase nor Resend, visitors see an error and the lead is lost. |
| `/admin` | Shows "Admin belum aktif" and redirects to the login page. |
| Scheduled publishing, `seed:posts` | Do not run. |

Two things to do on GitHub while Supabase is on hold:

- Disable the **Publish scheduled posts** workflow (Actions tab > the workflow > ... > Disable workflow). It runs every 15 minutes and fails without its secrets.
- Leave CI (`ci.yml`) on: it builds without any secrets.

**Adding Supabase later:** follow sections 1 to 4, add the Supabase and `ADMIN_EMAILS` variables in Vercel, redeploy, and run `npm run seed:posts` once. Once Supabase is configured the blog reads only from the database, so an empty table means an empty blog.

## 1. Supabase

1. Create a project at supabase.com. **Region: Southeast Asia (Singapore)**, same as Vercel. Save the database password.
2. SQL editor, run in this order, each as its own query:
   1. `supabase/migrations/0001_init.sql` (leads, posts, row level security)
   2. `supabase/migrations/0002_automation.sql` (topics, social drafts)
   3. `supabase/migrations/0003_scheduling.sql` (scheduled publishing, Instagram columns)
3. Authentication > Providers > Email: **turn off "Allow new users to sign up"**. The admin is protected by `ADMIN_EMAILS` anyway; this closes the door a second time.
4. Authentication > Users > Add user: your email and a strong password (tick "Auto confirm").
5. Settings > API: copy the **Project URL**, the **anon key** and the **service_role key**. The service_role key bypasses all security rules: it goes only into Vercel and GitHub secrets, never into the repo or a `NEXT_PUBLIC_` variable.
6. Optional, if you want to upload cover images instead of keeping them in the repo: Storage > new **public** bucket `blog`. The site already allows images from `https://<project>.supabase.co/storage/v1/object/public/**`.
7. Settings > Database > Backups: check what your plan includes. Free projects pause after about a week of no use; upgrade or keep it active before launch.

## 2. Vercel

1. vercel.com > Add New > Project > import `dedywahyudi/awak-ai-studio`. Framework: Next.js (detected). Leave build settings as they are.
2. Settings > Environment Variables. Add each for **Production** (add the same for Preview only if you want previews to use real data; safer to leave `SUPABASE_SERVICE_ROLE_KEY` out of Preview):

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | the real domain, e.g. `https://awakai.studio`, no trailing slash |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | international format, no "+" (empty = buttons go to `/kontak`) |
   | `NEXT_PUBLIC_CONTACT_EMAIL` | public email |
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role key (server only) |
   | `ADMIN_EMAILS` | the email(s) allowed into `/admin`, comma separated |
   | `RESEND_API_KEY`, `RESEND_FROM`, `LEAD_NOTIFY_EMAIL` | from Resend (verify the sending domain first) |
   | `AUTOMATION_SECRET` | `openssl rand -hex 32` (same value later in GitHub secrets and n8n) |
   | `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` | only when n8n is running |

3. Deploy. Then Settings > Domains: add the domain and set the DNS records Vercel shows. Make the domain primary so the canonical URLs match `NEXT_PUBLIC_SITE_URL`.
4. Optional: enable Vercel Analytics (the code already includes it) and set a Deployment Protection rule for previews.

## 3. Move the content

The blog reads only from Supabase once it is configured, so the table must not stay empty:

```bash
# in .env.local put NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (the production ones), then:
npm run seed:posts                       # dry run
npm run seed:posts -- --write            # saves the 4 posts as drafts, review them in /admin
npm run seed:posts -- --write --publish  # or save them as published, with their original dates
```

Run it once; re-running updates posts with the same slug and deletes nothing. Delete `.env.local` values for production when done.

## 4. GitHub (scheduled publishing and CI)

Repo > Settings > Secrets and variables > Actions: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SITE_URL`, `AUTOMATION_SECRET`, `IG_USER_ID`, `IG_ACCESS_TOKEN` (see `docs/SCHEDULING.md`). Run "Publish scheduled posts" once as a dry run. CI (`ci.yml`) already builds on every push and pull request without secrets.

## 5. Check the live site

```bash
npm run seo -- https://your-domain        # crawls the sitemap, writes seo-report.md
curl -sI https://your-domain/admin | head -3     # expect a redirect to /admin/login and x-robots-tag: noindex
curl -s https://your-domain/robots.txt           # expect Disallow: /admin
```

By hand: send a test lead (it should land in Supabase `leads` and in your inbox), sign in at `/admin/login`, schedule a test post, click a WhatsApp button, and open `/sitemap.xml` (every URL should show the real domain, not localhost).

Then submit `/sitemap.xml` in Google Search Console.

## Rollback

Vercel keeps every deployment: Deployments > the previous one > Promote to Production. Database changes (the migrations) are additive, so an older deployment keeps working.
