# To do (needs your input)

Things the site cannot finish without facts or files from you. Nothing here is invented on the site; each item
is either a placeholder or a gap found in the first-time-visitor review.

## Content that needs your facts

- [ ] **Team wording.** The site says "Klien dan tim remote dari seluruh dunia" and "kru" (`app/tentang/page.tsx`), while the internal case study
      calls it a one-person agency. Decide the honest description (one engineer plus AI tools, or a team) and make
      the wording match across `/tentang`, the footer, and `lib/site.ts`.
- [ ] **`/keamanan` page.** What customer data is sent where, retention, human review, UU PDP. Larger buyers ask for
      this first. Needs your real data-handling facts (see the FAQ answers in `content/faq.ts` as a starting point).
- [ ] **Client logos.** The clients are listed in `content/profile.ts` (`clients`), 40 in total. Logos come from your
      uploaded `public/clients/` files, converted to light grey in `public/images/clients/`. All clients have a logo. Comcast, Chevron, Canon and Zurich are from Wikimedia Commons (SVG, public domain, trademarked). You need permission to show client logos, and
      the list (including Pemprovsu, Korlantas, Kemenpar) is yours to confirm. `public/clients/clients.psd` is
      4 MB: do not commit it.
- [ ] **Results for projects and case studies.** Cards on `/studi-kasus` have no outcomes. Add real numbers only
      (`content/profile.ts`). Never invent metrics.
- [ ] **AI details of the budgeting system.** The card is titled "Sistem anggaran berbasis AI" but describes no AI
      feature (`content/profile.ts`). Say what the AI does (forecasting, anomaly detection, ...).
- [ ] **Dates and stack of the anonymous beta platform** (`content/profile.ts`, last project).
- [ ] **Review the three new blog posts** in `content/posts.ts` (written from your real projects, general lessons only,
      no invented results). Add real details and numbers where you can. Posts already saved in Supabase are not
      replaced by this file: delete or unpublish the old ones there.
- [ ] **Audit promise.** The free audit now promises one session plus a written summary in 3 working days
      (`lib/pricing.ts`, `auditProduct`). Confirm you can deliver that.
- [ ] **FAQ claims** about data and WhatsApp fees: verify against your providers' terms before launch.

- [ ] **IoT examples on `/solusi-custom`.** Only the Smart City platform and the geospatial command center are
      from your real projects. CCTV, sensors, smart meters, PLC, RFID and access control are listed as integration
      types. Remove any you would not take on, or add real details for the ones you have done (`iotExamples`).

## Setup and config

- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER`, Supabase, Resend, `NEXT_PUBLIC_SITE_URL` (see README, "Before launch").
- [ ] Email and social links in `lib/site.ts` (empty values are hidden).
- [ ] Legal review of `/kebijakan-privasi` against UU PDP.
- [ ] Supabase: the blog category value is still `AI untuk UMKM` in the database (shown to visitors as
      "AI untuk Bisnis"). Add a migration only if you want the stored value renamed too.
- [ ] Submit `/sitemap.xml` to Google Search Console; claim the Google Business Profile.

## Decisions

- [ ] **Pick one primary audience.** The copy targets "small to enterprise". The home page now splits into
      "kecil dan menengah" and "perusahaan", but a single focus segment would sell better.
- [ ] **Address field** (forms): the address is stored as a prefix on the description. Add a real `alamat`
      column if you want to filter leads by it.
- [ ] Client logos on the site: confirm you have permission before publishing real logo files.
