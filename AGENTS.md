# Instructions for AI coding agents

Read `README.md` and `docs/ARCHITECTURE.md` first.

## Rules

- **Language:** all user-facing copy is Bahasa Indonesia, address the reader as "Anda", sentence-case headlines, Title Case CTAs, no emoji, max one exclamation mark per screen. English only for terms owners already use (website, chatbot, SEO, AI).
- **Prices and brand data:** never hard-code a price, brand name, or contact detail in a component. Use `lib/pricing.ts` and `lib/site.ts`.
- **No invented facts:** no made-up statistics, client names, testimonials, or metrics. Use a clearly marked placeholder instead.
- **Server components by default.** Add `'use client'` only for state, effects, or browser APIs.
- **Secrets:** `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and the webhook secret are server-only. Never import `lib/supabase/server.ts#getServiceClient` from a client component.
- **Every integration must stay optional:** a missing env var must not break the build or a page.
- **Design:** use the CSS-variable tokens in `app/globals.css` (Tailwind names: `bg-card`, `text-strong`, `border-line`, ...). No purple-blue gradients, no robot/brain/circuit imagery, Lucide icons only (WhatsApp glyph excepted), radii never above 20px.
- **Content approval:** never add code that publishes AI-generated content without a human step. New posts default to `draft`.
- **Accessibility:** real `<button>`/`<a>`, labelled inputs, visible focus, 44px touch targets, 4.5:1 contrast.

## Before finishing a change

```bash
npm run lint && npm run typecheck && npm run build
```

## Automation rules

- Prices and services live only in `lib/pricing.ts`, `content/services.ts`, `content/faq.ts`. `/api/knowledge` reads them; never paste prices into prompts.
- Change workflows by editing `automation/build.mjs` or `automation/prompts/*.md`, then run `npm run automation:build`. Do not hand-edit `automation/workflows/*.json`.
- Automation must never publish, post, or message a lead on its own. Drafts only.
- Automation routes (`/api/*`) must call `checkAutomationAuth`.

## SEO checklist for new pages

Use `pageMeta()` from `lib/seo.ts` (unique title/description, canonical, Open Graph), add the route to `app/sitemap.ts`, add alt text to images.
