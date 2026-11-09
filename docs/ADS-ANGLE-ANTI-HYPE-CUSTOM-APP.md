# Ad angle: "Anti-hype" + custom app (Solusi Custom)

Status: DRAFT. Goes with `docs/ADS-DRAFT.md` (budget, settings, negatives). This file replaces the ad copy for the Solusi Custom angle.

## The idea

Target owners who have been burned by AI promises, templates, or agencies that sell a chatbot nobody needs. The offer is honesty: a free audit that says what you actually need, "including when the answer is not AI yet" (this is already in `auditProduct`, so the claim is true on the site today). Then a custom app built around their workflow, with an estimate in writing before they pay.

Message in one line: "Kami tidak jual AI. Kami cari masalah Anda dulu."

Do not claim: results, rankings, speed numbers, client names, team size. Do not show prices (showPrices is off).

## Google Search ads

Keywords (phrase match), ad group "Aplikasi custom":
- "jasa aplikasi custom medan"
- "jasa pembuatan aplikasi bisnis"
- "jasa web app medan"
- "aplikasi untuk bisnis sesuai kebutuhan"
- "sistem informasi custom umkm"

Add negatives from ADS-DRAFT.md plus: template, wordpress, skripsi, source code, kuliah.

Final URL: `https://[DOMAIN]/audit-gratis?utm_source=google&utm_medium=cpc&utm_campaign=custom-antihype`

Headlines (max 30):
C-H01: Aplikasi Custom Bukan Template
C-H02: Audit Gratis Sebelum Bayar
C-H03: Tidak Semua Butuh AI
C-H04: Studio Aplikasi di Medan
C-H05: Kami Cari Masalahnya Dulu
C-H06: Estimasi Tertulis di Awal
C-H07: Dikerjakan Engineer Senior
C-H08: Aplikasi Sesuai Alur Bisnis
C-H09: Web App & Aplikasi Mobile
C-H10: Konsultasi via WhatsApp

Descriptions (max 90):
C-D01: Kami audit dulu apa yang sebenarnya Anda butuhkan, termasuk bila belum perlu AI.
C-D02: Web app, aplikasi mobile, atau integrasi sistem. Estimasi biaya tertulis sebelum bayar.
C-D03: Bukan template. Dibangun dari alur kerja bisnis Anda, dirilis bertahap per milestone.
C-D04: Satu sesi konsultasi dan ringkasan tertulis dalam 3 hari kerja. Gratis, tanpa kewajiban.

## ChatGPT Ads

Objective Clicks, CPC bid, same caps as ADS-DRAFT.md. Landing URL with `utm_source=chatgpt&utm_campaign=custom-antihype`.

Context hints (conversations to appear next to):
- apakah bisnis saya butuh aplikasi custom
- jasa pembuatan aplikasi untuk UMKM
- apakah perlu AI untuk bisnis kecil
- aplikasi custom vs template
- cara menyusun kebutuhan aplikasi bisnis

Ads (headline max 50, description max 100):
P-H01: Awak AI: Aplikasi Custom Medan
P-D01: Audit gratis dulu. Kami bilang jujur bila Anda belum butuh AI.

P-H02: Awak AI: Audit Gratis
P-D02: Satu sesi + ringkasan tertulis. Estimasi biaya sebelum Anda bayar.

P-H03: Awak AI: Bukan Template
P-D03: Aplikasi dibangun dari alur kerja bisnis Anda, oleh engineer senior.

Image: square 1:1, the logo mark on a flat light background, no text.

## Landing page: `/audit-gratis` hero (suggested copy)

The current page headline is "Ketahui dulu apa yang sebenarnya Anda butuhkan", which already fits. Add a sub-line and a three-item list above the form for this angle:

Sub-line: "Banyak bisnis dijanjikan AI yang tidak mereka butuhkan. Kami mulai dari masalah Anda, bukan dari teknologi."

Three items:
- Satu sesi: kami pelajari bisnis, alur kerja, dan masalah yang ingin Anda selesaikan.
- Ringkasan tertulis dalam 3 hari kerja: apa yang Anda butuhkan, termasuk bila belum perlu AI.
- Mau lanjut? Estimasi biaya kami tulis sebelum Anda membayar apa pun.

Optional code change: `needFromQuery` in `lib/lead-options.ts` has no `custom` key, so the form cannot be prefilled for custom apps from the URL. Adding one line (`custom: 'Solusi Custom'`, if that value exists in `jenisKebutuhanGeneral`) lets the ad link use `?need=custom` and tags the lead correctly. Without it, rely on `utm_campaign` to see which leads came from this ad.

## Proof element: 30 to 45 second screen recording (script)

Show the real thing, no voice-over claims.

1. (0 to 5s) Text card: "Sebelum membangun apa pun, kami tanya dulu."
2. (5 to 20s) Screen: a real audit summary page or document from your own agency's process, with business details blurred. Highlight the section "Yang belum perlu dibangun."
3. (20 to 35s) Screen: a custom internal tool you built (pick one from `content/profile.ts` whose screenshots you are allowed to show; see the privacy item in `docs/TODO.md`).
4. (35 to 45s) End card: logo, "Audit gratis" and the WhatsApp number.

## Why this angle can fail

- People searching "jasa aplikasi custom" often have a quote shopping mindset. Without prices on the site, some will bounce. Watch the bounce on day 3 and consider showing "mulai dari" for Solusi Custom if bounce is high.
- Custom apps are a bigger purchase with a long sales cycle. At this budget a single lead is a good result, and a sale inside 12 days is unlikely.
- The ChatGPT Ads half depends on your hints matching real conversations. If it gets impressions but no clicks after 2 days, stop it and move the remaining budget to Google.
