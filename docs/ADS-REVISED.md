# Ads revision (Google Ads + ChatGPT Ads), aligned to the site as of 2026-11-13

Status: DRAFT, nothing is live. **Replaces the ad copy, keywords and creative** in `docs/ADS-DRAFT.md` (section A and B) and `docs/ADS-ANGLE-ANTI-HYPE-CUSTOM-APP.md`. Budget split, bidding caps, schedule, negatives, eligibility and the day plan in `ADS-DRAFT.md` still stand.

## What changed on the site, and what it means for the ads

| Site now | Old ads | Revision |
|---|---|---|
| Home hero: "Tiga cara AI bekerja untuk bisnis Anda": AI Chat, Otomatisasi, Solusi Custom | One mixed ad set, WhatsApp-led | **Three ad groups, one per service**, each with its own ads, keywords and `?kebutuhan=` link |
| AI Chat is channel-agnostic (WhatsApp, website, app, Instagram, Telegram, email) | "Chatbot WhatsApp" in every headline | Keep "whatsapp" in keywords (that is what people type), but headlines say "bisnis Anda" and name several channels |
| Otomatisasi has three named starter packages (Follow-up Lead, Penawaran Otomatis, Pengingat dan Ulasan) | Generic "Otomatisasi Kerja Admin" | Headlines use the package names; they are concrete and match `/layanan` |
| Solusi Custom: web app, mobile app, system integration, "bukan template" | Separate anti-hype doc | Folded in as ad group 3 |
| Prices hidden, but every paid service has a **monthly fee after setup** (`priceDisclaimer`) | "Prices hidden, keep out of ads" | Same, plus: never write "gratis" next to anything except the audit; ads say "estimasi tertulis sebelum bayar", which the site backs |
| Audit page: one session, written summary in 3 working days, "termasuk bila belum perlu AI", written estimate before paying | Same | Used as the main offer in every ad |
| Trust strip: "15+ tahun pengalaman", "Langsung ke engineer senior", "AI-native, bukan template" | "Ditangani Engineer Senior" only | Safe to use "engineer senior" and "bukan template" (on site). Skip "15+ tahun" in ad text for now (see Before launch) |
| Dark starry theme, blue accent, 3D studio machine hero | Logo on flat light background | Ad image matches the dark theme (below) |

## Before launch (new or changed items)

1. **Add `custom: 'Solusi Custom'` to `needFromQuery` in `lib/lead-options.ts`.** The query parameter is `kebutuhan` (not `need`, as the old anti-hype doc said). Today only `audit`, `ai-chat` and `otomatisasi` are mapped, so the Custom ad group cannot preselect the form. Until you add it, use `?kebutuhan=audit` for that group and rely on `utm_campaign`.
2. Confirm you can deliver the audit promise (3 working days) and that the "estimasi tertulis" promise matches how you quote (both in `docs/TODO.md`).
3. Do not use these claims in ads until verified: "15+ tahun" (on the site, but ad policies need substantiation), IoT/CCTV/sensor integrations (only two real projects back this, per `docs/TODO.md`), "data tidak dipakai melatih model" (FAQ claims still unverified), any client name or result.
4. Items 1 to 4 under "Fix before spending anything" in `ADS-DRAFT.md` (WhatsApp number and site URL env vars, UTMs, no client names, no prices) still apply.

## A. Google Search

Same campaign settings as `ADS-DRAFT.md`. Three ad groups, one responsive search ad each. Phrase match. Add the existing campaign negatives, plus for group 3: template, wordpress, source code, kuliah.

URL pattern: `https://[DOMAIN]/audit-gratis?kebutuhan=<value>&utm_source=google&utm_medium=cpc&utm_campaign=<group>`

### Group 1: AI Chat (`kebutuhan=ai-chat`, `utm_campaign=ai-chat`)

Keywords: "chatbot whatsapp bisnis", "jasa chatbot whatsapp", "chatbot whatsapp medan", "asisten ai untuk toko", "chatbot ai untuk umkm"

Headlines (max 30):
- Asisten AI Jawab 24 Jam
- Chatbot untuk Bisnis Anda
- Jawab dari Data Bisnis Anda
- WhatsApp, Web, atau Aplikasi
- Diteruskan ke Tim Bila Ragu
- Audit Gratis Sebelum Bayar
- Studio AI di Medan
- Ditangani Engineer Senior

Descriptions (max 90):
- Asisten AI menjawab dari data bisnis Anda di WhatsApp, website, aplikasi, atau kanal lain.
- Bot tidak yakin? Pertanyaan diteruskan ke tim Anda. Audit gratis dulu, tanpa kewajiban.
- Dipasang di kanal yang sudah Anda pakai. Estimasi biaya tertulis sebelum Anda membayar.

### Group 2: Otomatisasi (`kebutuhan=otomatisasi`, `utm_campaign=otomatisasi`)

Keywords: "otomatisasi bisnis", "jasa otomatisasi admin", "follow up lead otomatis", "invoice otomatis", "otomatisasi whatsapp bisnis"

Headlines:
- Otomatisasi Kerja Admin
- Follow-up Lead Otomatis
- Penawaran & Invoice Otomatis
- Pengingat Janji dan Ulasan
- Anda Setujui Sebelum Terkirim
- Terhubung ke Sistem Anda
- Audit Gratis Sebelum Bayar
- Ditangani Engineer Senior

Descriptions:
- Follow-up lead, penawaran, dan pengingat berjalan otomatis. Anda setujui sebelum terkirim.
- Hubungkan WhatsApp, email, form, spreadsheet, dan CRM. Dipantau dan diperbaiki bila gagal.
- Mulai dari satu alur yang paling mendesak. Audit gratis, estimasi tertulis di awal.

### Group 3: Solusi Custom (`kebutuhan=custom` once added, else `audit`; `utm_campaign=custom`)

Keywords: "jasa aplikasi custom medan", "jasa pembuatan aplikasi bisnis", "jasa web app medan", "jasa aplikasi mobile medan", "sistem informasi custom umkm"

Headlines:
- Aplikasi Custom Bukan Template
- Web App & Aplikasi Mobile
- Sesuai Alur Bisnis Anda
- Tidak Semua Butuh AI
- Kami Cari Masalahnya Dulu
- Estimasi Tertulis di Awal
- Dirilis Bertahap per Milestone
- Studio Aplikasi di Medan

Descriptions:
- Kami audit dulu apa yang sebenarnya Anda butuhkan, termasuk bila belum perlu AI.
- Web app, aplikasi mobile, atau integrasi sistem. Estimasi biaya tertulis sebelum bayar.
- Bukan template. Dibangun dari alur kerja bisnis Anda, dirilis bertahap per milestone.

### Assets

- Sitelinks (match the nav): Layanan (`/layanan`), Studi Kasus (`/studi-kasus`), Audit Gratis (`/audit-gratis`), Tentang (`/tentang`). Add descriptions from the site text, no numbers.
- Structured snippet, header "Layanan": AI Chat, Otomatisasi, Solusi Custom.
- Call/WhatsApp asset only after the number is live.

## B. ChatGPT Ads

Same objective, bids, location and budget as `ADS-DRAFT.md`. Three ads, one per service, each with its own landing link:
`https://[DOMAIN]/audit-gratis?kebutuhan=<value>&utm_source=chatgpt&utm_medium=cpc&utm_campaign=<service>`

The site now explains three services, so the ads match the intent of the conversation instead of one generic pitch.

| Ad | Headline (max 50) | Description (max 100) | kebutuhan |
|---|---|---|---|
| 1 | Awak AI: Asisten AI untuk Bisnis | Menjawab dari data Anda di WhatsApp atau website. Audit gratis dulu. | ai-chat |
| 2 | Awak AI: Otomatisasi Kerja Admin | Follow-up lead, penawaran, dan pengingat jalan sendiri. Anda setujui dulu. | otomatisasi |
| 3 | Awak AI: Aplikasi Custom, Bukan Template | Dibangun dari alur kerja Anda. Estimasi tertulis sebelum Anda bayar. | custom |

Context hints:
- Ad 1: cara membuat chatbot WhatsApp untuk toko; AI untuk melayani pelanggan 24 jam; chatbot untuk bisnis kecil
- Ad 2: otomatisasi admin untuk UMKM; follow-up lead otomatis; invoice dan penawaran otomatis
- Ad 3: apakah bisnis saya butuh aplikasi custom; aplikasi custom vs template; apakah perlu AI untuk bisnis kecil; jasa pembuatan aplikasi untuk UMKM

CTA: "Learn more" (only documented option).

Note: with a US$20 / 4-day budget, run only ads 1 and 3 if the platform splits delivery too thin; ad 2 is the weakest for conversational intent.

## C. Ad look (both platforms)

The site is now dark (`--surface-page` #07080c, blue accent #0560F3, white headlines, starry background). Make the ad image match so the click does not feel like a different brand.

- **ChatGPT Ads image (square 1:1, min 256x256, export 1080x1080):** background #07080c with a faint starfield, `public/images/logo-mark.png` centered, one blue (#0560F3 to #47CFFB) glow behind it, no text in the image. No purple-blue gradients, no robot/brain/circuit imagery (project design rules).
- **Google Search:** text only. Optionally add the logo mark as a business logo asset (square, on the dark background).
- **Reuse:** the three services have Lucide icons on the site (message-circle, workflow, globe). For three image variants, put the matching icon in a blue-tinted rounded square (radius under 20px at 1080 scale is fine) next to the logo mark, still no text.
- **Landing continuity:** the ad promises "audit gratis", and `/audit-gratis` headline is "Ketahui dulu apa yang sebenarnya Anda butuhkan" with the same three audit bullets. No landing copy change needed. Optional: the anti-hype sub-line from the old doc, if Custom bounce is high.

## Proof element (optional, unchanged)

The 30 to 45 second screen recording script in `ADS-ANGLE-ANTI-HYPE-CUSTOM-APP.md` still works. Pick screens only from case studies you may show (`docs/TODO.md`, privacy of screenshots).

## Measure

At this budget compare by `utm_campaign` (ai-chat, otomatisasi, custom) in Supabase `leads.source_page`. After 12 days, keep the group with the most leads and drop the others; do not read the numbers as ROI.

---

# Campaign ideas to compare

Six campaigns, each with everything needed to launch it. Landing for all: `/audit-gratis` unless noted. URL pattern: `https://[DOMAIN]/audit-gratis?kebutuhan=<value>&utm_source=<google|chatgpt>&utm_medium=cpc&utm_campaign=<campaign>`.

## Comparison

Scores 1 (worst) to 5 (best) are judgment calls from the site content, not data. Replace them with real numbers after the test.

| # | Campaign | Search volume | Intent | Deal value | Sales speed | Message fits site | Competition | Total /30 |
|---|---|---|---|---|---|---|---|---|
| 1 | Generic free audit | 3 | 3 | 3 | 3 | 5 | 3 | 20 |
| 2 | Anti-hype custom app | 3 | 3 | 5 | 1 | 5 | 3 | 20 |
| 3 | Pain: lead/chat tidak dibalas | 2 | 3 | 3 | 3 | 4 | 4 | 19 |
| **4** | **Vertical: booking for klinik, salon, bengkel, kursus** | **3** | **5** | **3** | **4** | **4** | **4** | **23** |
| 5 | Excel to custom app | 2 | 4 | 4 | 2 | 4 | 3 | 19 |
| 6 | Case-study proof (enterprise) | 1 | 2 | 5 | 1 | 3 | 4 | 16 |

| # | Best channel | Funnel stage | Main risk | Kill rule (day 6) |
|---|---|---|---|---|
| 1 | Google | Broad, early | Vague, attracts tire-kickers | Under 2% form rate on 40+ clicks |
| 2 | Google | Late, quote shoppers | Bounce without prices; long cycle | 20+ clicks, 0 forms |
| 3 | ChatGPT | Problem-aware | Few searches | No clicks in 2 days |
| 4 | Google (+ ChatGPT) | Need-aware, local | Searchers want a cheap ready-made app | 20+ clicks, 0 forms |
| 5 | Google | Problem-aware | Few searches; long cycle | 20+ clicks, 0 forms |
| 6 | Outreach / LinkedIn, not Google | Enterprise | Case-study results and screenshot privacy still open in `docs/TODO.md` | Do not run on this budget |

## 1. Generic free audit

Offer: the audit itself.
- Keywords: "audit kebutuhan bisnis", "konsultasi ai untuk bisnis", "konsultasi digitalisasi umkm", "studio ai medan", "konsultasi otomatisasi bisnis"
- Headlines: Audit Gratis untuk Bisnis Anda / Ketahui Dulu Kebutuhan Anda / Hasil Tertulis dalam 3 Hari / Tanpa Kewajiban / Studio AI di Medan / Konsultasi via WhatsApp / Ditangani Engineer Senior
- Descriptions: Satu sesi konsultasi dan ringkasan tertulis dalam 3 hari kerja. Gratis, tanpa kewajiban. / Kami pelajari alur kerja bisnis Anda dan sarankan layanan yang paling masuk akal.
- Link: `kebutuhan=audit`, `utm_campaign=audit-umum`
- ChatGPT: "Awak AI: Audit Kebutuhan Gratis" / "Satu sesi + ringkasan tertulis dalam 3 hari kerja. Gratis, tanpa kewajiban."; hints: apakah bisnis saya butuh AI; cara mulai pakai AI untuk bisnis kecil

## 2. Anti-hype custom app

Offer: "kami cari masalahnya dulu, estimasi tertulis sebelum bayar". Full copy is ad group 3 in section A above.
- ChatGPT: "Awak AI: Aplikasi Custom, Bukan Template" (ad 3 in section B)
- Link: `kebutuhan=custom` (after the `lib/lead-options.ts` change), `utm_campaign=custom`

## 3. Pain: lead and chat tidak dibalas

Offer: follow-up that runs by itself, approved by the owner.
- Keywords: "chat pelanggan tidak dibalas", "lead tidak ditindaklanjuti", "admin kewalahan balas chat", "cara follow up calon pelanggan", "follow up lead otomatis"
- Headlines: Lead Lupa Di-follow-up? / Chat Pelanggan Tak Terbalas? / Follow-up Jalan Sendiri / Tim Anda Tetap Memutuskan / Audit Gratis Sebelum Bayar / Hubungkan WhatsApp dan Email
- Descriptions: Lead yang tidak dibalas diingatkan otomatis ke tim dan calon klien. Anda setujui dulu. / Mulai dari satu alur yang paling mendesak. Audit gratis, estimasi tertulis di awal.
- Link: `kebutuhan=otomatisasi`, `utm_campaign=pain-followup`
- ChatGPT (strongest here, problem phrased as a question): "Awak AI: Follow-up Lead Otomatis" / "Lead tidak dibalas diingatkan otomatis. Anda setujui sebelum terkirim."; hints: kenapa lead tidak dibalas; cara follow up pelanggan otomatis; admin kewalahan balas chat

## 4. Vertical: booking and reminders (recommended)

Offer: AI Chat with the optional "Booking dan pengingat" module, for klinik, salon, bengkel, kursus.
- Keywords: "chatbot klinik", "reminder janji temu whatsapp", "aplikasi booking salon medan", "sistem booking bengkel", "booking online kursus"
- Headlines: Booking & Pengingat Otomatis / Untuk Klinik, Salon, Bengkel / Asisten AI Jawab 24 Jam / Pengingat Janji Temu Otomatis / Pelanggan Booking via Chat / Audit Gratis Sebelum Bayar / Studio AI di Medan
- Descriptions: Pelanggan booking dan dapat pengingat lewat chat. Diteruskan ke tim bila bot ragu. / Dijawab dari data bisnis Anda, 24 jam. Audit gratis dulu, estimasi tertulis sebelum bayar.
- Link: `kebutuhan=ai-chat`, `utm_campaign=vertikal-booking`
- ChatGPT: "Awak AI: Booking dan Pengingat Otomatis" / "Untuk klinik, salon, bengkel, kursus. Audit gratis dulu, tanpa kewajiban."; hints: cara membuat booking online untuk salon; pengingat janji temu otomatis untuk klinik; chatbot untuk bengkel
- Add negatives: aplikasi gratis, saas, template, wordpress plugin, download

## 5. Excel to custom app

Offer: replace spreadsheets and copy-paste with a system built around the workflow.
- Keywords: "aplikasi pengganti excel", "sistem inventori custom", "aplikasi stok barang custom", "laporan otomatis dari excel", "dashboard laporan bisnis"
- Headlines: Capek Kerja di Excel? / Ganti Excel dengan Aplikasi / Laporan Tanpa Salin-Tempel / Dibangun dari Alur Anda / Estimasi Tertulis di Awal / Bukan Template
- Descriptions: Data tersebar di spreadsheet? Kami bangun aplikasi sesuai alur kerja bisnis Anda. / Audit gratis dulu. Dirilis bertahap per milestone, estimasi biaya tertulis sebelum bayar.
- Link: `kebutuhan=custom` (or `audit`), `utm_campaign=excel-custom`
- ChatGPT: "Awak AI: Dari Excel ke Aplikasi" / "Dibangun dari alur kerja Anda, bukan template. Audit gratis dulu."; hints: aplikasi pengganti excel; cara membuat sistem inventori untuk toko; kapan bisnis butuh aplikasi custom
- Add negatives: template excel, rumus, tutorial excel, download

## 6. Case-study proof (enterprise)

Offer: real projects as credibility (medis, analisis sentimen, smart city, marketplace valuation). Not for Google Search at US$50.
- Run as manual outreach or a LinkedIn post, landing on `/studi-kasus?utm_source=linkedin&utm_campaign=bukti-enterprise`.
- If used in Google anyway: keywords "dashboard smart city", "aplikasi ai medis", "analisis sentimen media sosial"; headlines Sistem AI Skala Perusahaan / Lihat Studi Kasus Nyata / Dibangun Engineer Senior; landing `/studi-kasus`.
- Blockers first: results on case studies are not filled in, and screenshot privacy is open (`docs/TODO.md`). Do not name clients or claim outcomes.

## Test plan with US$50

| Option | Google (Rp 540.000, 12 days) | ChatGPT (Rp 360.000, 4 days) |
|---|---|---|
| A (recommended) | #4 Rp 300.000, #1 Rp 140.000, #2 Rp 100.000 | #3 and #4 hints, 2 ads |
| B (custom-led) | #2 Rp 270.000, #5 Rp 270.000 | #2 and #5 ads |
| C (broad) | #1 Rp 540.000 | #1 ad |

Run Option A. Check search terms on days 3, 6, 9, 12. Apply the kill rules above and move the freed budget to the group with the most forms. After 12 days replace the scores in the comparison table with real clicks, forms, and cost per lead.

## Manual outreach script (free, run in parallel)

You send these yourself. Automation must never message a lead. Target: 20 klinik, salon, bengkel, kursus in Medan, one message each, no copy-paste blasts.

> Halo [nama], saya Dedy dari Awak AI Studio di Medan. Saya lihat [nama usaha] menerima booking lewat [WhatsApp/Instagram]. Kami membantu usaha seperti Anda menjawab pelanggan dan mengirim pengingat janji temu secara otomatis. Kami tawarkan audit gratis: satu sesi, lalu ringkasan tertulis dalam 3 hari kerja, termasuk bila Anda belum perlu AI. Apakah boleh kami kirim detailnya?

Track replies in a sheet with the business type. If outreach beats ads in replies per hour, shift effort there.
