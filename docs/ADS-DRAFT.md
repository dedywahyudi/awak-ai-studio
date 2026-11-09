# Ads draft: Google Ads + ChatGPT Ads (budget about US$50 total / Rp 900.000)

Drafted 2026-11-09. Status: DRAFT, nothing is live. Landing page for both: `/audit-gratis`.

## Recommendation

Spend about 60% on Google Search, about 40% on ChatGPT Ads. Treat the US$50 as a message test, not a lead engine.

| Channel | Rp | About US$ | Schedule |
|---|---|---|---|
| Google Search (Medan) | 540.000 | 30 | Rp 45.000/day for 12 days |
| ChatGPT Ads | 360.000 | 20 | Rp 90.000/day for 4 days (daily minimum x 4) |

Why this split: Google is intent-based (people typing "jasa chatbot whatsapp") and Indonesian CPCs are low, so it carries most of the spend. ChatGPT Ads has no keywords and no Indonesian benchmarks yet; 4 days at the minimum is enough to see whether your buyers are reachable there.

Expected result: roughly 80 to 150 Google clicks and 20 to 50 ChatGPT clicks, so 1 to 5 leads. That tells you which message and channel work. It will not prove ROI.

Both platforms may bill up to 2x the daily budget on a single day (the total stays capped). Keep about Rp 10.000 to 20.000 of headroom or accept landing slightly over US$50.

If you meant US$50 per channel, double both rows.

## Fix before spending anything

1. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_SITE_URL` on Vercel. Without the number, ad clicks land on buttons that fall back to the form.
2. No conversion tracking exists. Add UTM parameters to every ad URL (below) and read leads from Supabase `leads.source_page`, or add a Google Ads conversion on form submit and WhatsApp click. At this budget, UTMs plus manual counting is enough.
3. Do not name clients (IBM, GE, Comcast etc.) or claim results in ads. Logo permission and team wording are still open in `docs/TODO.md`, and ad policies treat unverifiable claims as violations.
4. Prices are hidden on the site (`showPrices = false`). Keep them out of the ads too; the free audit is the offer.

## A. Google Ads (Search only)

**Account:** create it in IDR (currency cannot be changed later). Choose Expert Mode, not Smart campaign, so you control keywords and locations.

**Campaign settings**
- Type: Search. Goal: Leads. Uncheck Search Partners and Display expansion.
- Locations: Medan, Deli Serdang. Option "Presence" only (people physically there). Language: Indonesian.
- Budget: Rp 45.000/day, 12 days. Then pause.
- Bidding: Manual CPC with max CPC Rp 4.000. (Maximize Clicks has no data to learn from at this volume; manual cap prevents one expensive click burning a day.) Raise cap to Rp 6.000 if impressions are near zero after day 2.
- Schedule: 08:00 to 21:00 WIB, Monday to Saturday.
- Final URL: `https://[DOMAIN]/audit-gratis?utm_source=google&utm_medium=cpc&utm_campaign=audit-medan`

**Ad group 1: Chatbot WhatsApp** (keywords, phrase match)
- "chatbot whatsapp bisnis"
- "jasa chatbot whatsapp"
- "chatbot whatsapp medan"
- "asisten ai untuk toko"
- "chatbot ai untuk umkm"

**Ad group 2: Otomatisasi / aplikasi** (phrase match)
- "otomatisasi bisnis"
- "jasa otomatisasi admin"
- "jasa aplikasi custom medan"
- "jasa web app medan"

Skip generic "jasa website medan": crowded, low intent for your offer.

**Negative keywords (campaign level):** gratis, free, tutorial, cara membuat, belajar, kursus, pelatihan, lowongan, kerja, loker, apk, download, github, open source, template, bot telegram, chatgpt login, murah banget, skripsi

**Responsive Search Ad** (limits: headline 30, description 90)

G-H01: Chatbot WhatsApp untuk Bisnis
G-H02: Asisten AI Jawab 24 Jam
G-H03: Studio AI di Medan
G-H04: Audit Gratis untuk Bisnis Anda
G-H05: Ditangani Engineer Senior
G-H06: Otomatisasi Kerja Admin
G-H07: Bukan Template, Dibuat Khusus
G-H08: Jawab dari Data Bisnis Anda
G-H09: Hasil Audit Tertulis 3 Hari
G-H10: Konsultasi via WhatsApp

G-D01: Asisten AI menjawab pelanggan dari data bisnis Anda, di WhatsApp, website, atau aplikasi.
G-D02: Ikuti audit gratis: satu sesi dan ringkasan tertulis dalam 3 hari kerja. Tanpa kewajiban.
G-D03: Follow-up lead, penawaran, dan pengingat berjalan otomatis. Anda setujui sebelum terkirim.
G-D04: Studio AI di Medan. Dikerjakan langsung engineer senior, bukan dioper ke tim junior.

Pin G-H03 to position 2 only if you want the Medan angle fixed; otherwise leave unpinned.

**Assets:** add 4 sitelinks (Layanan, Studi Kasus, Blog, Tentang) and a call/WhatsApp asset only after the number is live.

## B. ChatGPT Ads (OpenAI Ads Manager, ads.openai.com)

**Eligibility:** the advertising and billing legal entity must be based in Indonesia (Indonesia is listed as self-service). New accounts may need identity verification first, and some are restricted to the home country until they reach a spend threshold. Starting verification now saves days.

**Minimum budget, verify in the UI:** sources conflict. Indonesia launched at Rp 14.000/day and was reported raised to Rp 90.000/day (about US$5) in October. I could not open OpenAI's own page, so the number shown in Ads Manager wins. If it is Rp 14.000/day, run it for 12 days or so at the same Rp 360.000 total.

**Campaign settings**
- Objective: Clicks. Bid: CPC. OpenAI's suggested starting CPC is US$3 to 5 (US-driven); Indonesian prices are likely far lower but there is no published benchmark. Start with the suggested bid but cap at Rp 8.000. If nothing delivers in 6 hours, raise to Rp 12.000.
- Location: Indonesia (Medan targeting depth varies; set Sumatera Utara if offered).
- Budget: the platform minimum per day, 4 days.
- There are no keywords. Instead add context hints, the kinds of conversations your ad should appear next to:
  - cara membuat chatbot WhatsApp untuk toko
  - otomatisasi admin untuk UMKM
  - AI untuk melayani pelanggan 24 jam
  - jasa pembuatan aplikasi custom
  - follow-up lead otomatis
- Landing: `https://[DOMAIN]/audit-gratis?utm_source=chatgpt&utm_medium=cpc&utm_campaign=audit-id`

**Ad creative** (limits: headline 50, description 100; recommended 16 to 24 and 32 to 48 characters; image square, at least 256x256)

O-H01: Awak AI: Chatbot WhatsApp
O-H02: Awak AI: Audit Gratis
O-H03: Awak AI: Otomatisasi Admin

O-D01: Asisten AI jawab dari data bisnis Anda, 24 jam.
O-D02: Satu sesi + ringkasan tertulis. Gratis.
O-D03: Kerja admin berulang jalan sendiri.

Variant pairing to load (Ads Manager can rotate): H01+D01, H02+D02, H03+D03. Image: the logo mark on a flat light background, no text in the image.

Call to action: "Learn more" is the only documented option.

## Day plan

- Day 0: fix the pre-launch list, create both accounts, submit OpenAI verification.
- Day 1: launch Google. Launch ChatGPT Ads when verified.
- Days 3, 6, 9, 12: check search terms report, add negatives, pause keywords with 5+ clicks and no form or WhatsApp.
- Day 12: write down clicks, leads, and cost per lead per channel. Only then decide whether to add budget.

## Sources

- OpenAI Ads Manager availability and campaign help: help.openai.com/en/articles/20001245-ads-manager-availability
- Indonesia minimum budget reports: indexlab.ai/blog/chatgpt-ads-89-countries, inpromptads.com/chatgpt-ads/countries
- Creative limits: strikesocial.com (ChatGPT ad specs, Oct 29 2026), martech.org 7-step guide
- Indonesian local-service CPC range (about US$0.15 to 0.32): adwservice.com.ua/en/google-contextual-ads-in-indonesia
