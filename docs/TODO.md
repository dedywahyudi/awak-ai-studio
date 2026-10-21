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

- [ ] **IoT examples on `/layanan` (Solusi Custom).** Only the Smart City platform and the geospatial command center are
      from your real projects. CCTV, sensors, smart meters, PLC, RFID and access control are listed as integration
      types. Remove any you would not take on, or add real details for the ones you have done (`iotExamples`).

## Projects (new)

- [ ] **Privacy of the screenshots** (`public/images/projects/`). Several show real client names and people:
      "ERP Estrada Group", the Digital Tactical Plan login and police emblems, "PT Socfin Indonesia" with worker
      names in the harvest app, "Enterprisers", and a real person on video in the personalization platform. The site
      no longer says the projects are anonymous. Confirm you may show each one, or blur names and faces first.
      Originals stay local in `public/projects/` (git-ignored, 30 MB).
- [ ] **AI per project.** The "AI di proyek ini" block appears only where AI is clear from the screens: medical
      imaging, sentiment, the personalization platform, the OpenAI integration. For ERP, Smart City, command
      center, marketplace valuation and the harvest app, tell me if AI is used (for example camera analysis, anomaly
      alerts, forecasting) and what model or method, and I will add it. Do not claim AI that is not there.
- [ ] **Smart City features not visible in screenshots.** Vehicle movement prediction from plates, DPO face search
      from CCTV and event crowd hotspots were added from your brief, with the AI block. Confirm the wording and
      that you may publish them (face recognition on wanted persons is sensitive), and add a screenshot if you have one.
- [ ] **Review the "AI yang dipakai" wording** (`aiUsed` in `content/projects.ts`, shown on each card and detail
      page). Written from the screens and your briefs, not from the code: confirm the model or method per project
      (medical: model type; personalization: which LLM; sentiment: model/API and languages; Smart City: own vs
      third-party plate, face and crowd detection and the prediction method) and the "Tanpa AI" labels for command
      center, ERP, marketplace and harvest app.
- [ ] **Harvest app AI features** (janjang counting, truck plate detection, harvest forecast, monthly forecast map)
      were added from your brief, not from the screenshots. Confirm the wording and method, and add a screenshot if you have one.
- [ ] **Command center AI features** (crowded-road prediction on closure, alternate-route suggestion, ETA with traffic)
      were added from your brief, not from the screenshots. Confirm the wording and method, and say whether the
      "Tanpa AI" label removal is right.
- [ ] **ERP AI features** (budget forecast, sales prediction, natural-language Q&A on ERP data, executive summaries)
      were added from the recommended list, not from the screenshots. Confirm each is real, or remove it, and say
      which method or model is used.
- [ ] **Add what only you know**, per project, in `content/projects.ts`: your role, team size, duration, the problem
      it solved, and real results (numbers only if true). Periods are missing for the ERP and marketplace projects.
- [ ] Optional: a short client quote per project, if you have permission.

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
