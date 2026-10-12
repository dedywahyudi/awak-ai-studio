# Automation (n8n + Claude)

Four workflows that run next to the website. Everything that reaches the public needs your approval: nothing auto-publishes, nothing auto-messages a lead, backlinks are never inserted automatically.

| # | Workflow | Trigger | What it does | You do |
|---|---|---|---|---|
| 01 | Lead qualifier | Website form (webhook) | Claude classifies the lead, scores priority, drafts a WhatsApp reply, saves it on the `leads` row, emails you. Reminds you after 24h if status is still `new`. | Tap the `wa.me` link, edit the draft, send. |
| 02 | Blog draft | Monday 08:00, or manual webhook | Takes the next topic from `content_topics`, writes a draft with Claude, saves it as `status='draft'`, emails the full text. | Fact-check, then set `status='published'` in Supabase. |
| 03 | Social captions | Supabase webhook when a post becomes published | Revalidates the site, drafts Instagram, TikTok and carousel copy into `social_drafts`, emails it. | Post it yourself. |
| 04 | WhatsApp assistant | WhatsApp Cloud API webhook | Answers questions about your services from the live knowledge base, remembers the last 10 messages, hands off to you when needed. | Take over when you get a handoff email. |

Build order: 01 and 02 first (they pay back immediately), then 03, then 04 once you have a WhatsApp Business number.

## How it fits

```
Website form -> Supabase (leads) -> webhook -> n8n 01 -> Claude -> leads row + email
Supabase (posts, draft) --you publish--> DB webhook -> n8n 03 -> /api/revalidate + captions
n8n 02 -> Claude -> posts (draft) -> email
WhatsApp -> n8n 04 -> /api/knowledge + Claude -> WhatsApp reply
```

Prices and services are never copied into prompts. n8n fetches `/api/knowledge` from the site, which is built from `lib/pricing.ts`, `content/services.ts` and `content/faq.ts`. Change a price once, and automation follows.

## Setup

1. **Website**: run `supabase/migrations/0002_automation.sql` in the Supabase SQL editor. Add `AUTOMATION_SECRET`, `LEAD_WEBHOOK_URL` (`https://<n8n host>/webhook/lead-created`) and `LEAD_WEBHOOK_SECRET` to the site's environment (Vercel) and redeploy.
2. **VPS** (1 vCPU / 2 GB is enough; point a DNS A record at it):
   ```bash
   cd automation
   cp .env.example .env     # fill it in
   docker compose up -d
   ```
3. **n8n**: open `https://<N8N_HOST>`, create the owner account, then Workflows > Import from file for each JSON in `workflows/`. Open each one once, check the nodes, and toggle Active.
4. **Supabase webhook for 03**: Database > Webhooks > create on table `posts`, events Insert and Update, URL `https://<N8N_HOST>/webhook/post-published`, add header `x-automation-secret: <AUTOMATION_SECRET>`.
5. **WhatsApp for 04**: in Meta for Developers, set the callback URL to `https://<N8N_HOST>/webhook/whatsapp` and the verify token to `WA_VERIFY_TOKEN`, then subscribe to `messages`.

Credentials are read from environment variables (`$env.X`), so nothing secret is stored inside the workflow JSON.

## Test it

```bash
# Site endpoints
curl -s -H "x-automation-secret: $AUTOMATION_SECRET" $SITE_URL/api/knowledge | head
curl -s -X POST -H "x-automation-secret: $AUTOMATION_SECRET" $SITE_URL/api/revalidate

# 01: fake lead (use the production URL once the workflow is Active)
curl -X POST https://$N8N_HOST/webhook/lead-created \
  -H "content-type: application/json" -H "x-webhook-secret: $LEAD_WEBHOOK_SECRET" \
  -d '{"event":"lead.created","leadId":null,"lead":{"nama":"Budi","namaBisnis":"Kopi Medan","kontak":"081234567890","jenisKebutuhan":"AI Chat","budgetRange":"","deskripsi":"Banyak yang tanya harga lewat WA tiap malam.","sourcePage":"/kontak"}}'

# 02: draft a post on demand
curl -X POST https://$N8N_HOST/webhook/blog-draft \
  -H "content-type: application/json" -H "x-automation-secret: $AUTOMATION_SECRET" \
  -d '{"topic":"Cara membalas pesan pelanggan WhatsApp lebih cepat","keyword":"balas pesan whatsapp"}'
```

Use the `/webhook-test/` URL while building in the editor, `/webhook/` once Active.

## Editing

Prompts live in `prompts/*.md`. After editing a prompt or a node body in `build.mjs`:

```bash
node automation/build.mjs   # regenerates and validates workflows/*.json
```

Then re-import the JSON (or paste the changed prompt into the node). `build.mjs` checks JSON structure, connection targets, unreachable nodes and Code-node syntax.

## Not automated, on purpose

- **Backlinks**: no auto-insertion or mass outreach (it is spam and gets sites penalised). Let Claude draft personalised outreach emails and a target list (local directories, Medan business associations, supplier and partner pages, guest posts); you send them.
- **Competitor watch**: a monthly scheduled Claude task that searches the web and emails a summary is simpler than a workflow.
- **Case studies**: only from real client results. Feed Claude your notes and numbers and let it draft; never invent.
- **Faceless video**: image carousels from templates are feasible later (HTML to PNG); video generation is costly and not worth it for v1.

## Costs (rough)

VPS about Rp 80 to 150 rb per month. Claude usage for 01 to 03 is small (a few hundred rupiah per lead, a few thousand per blog draft; check current pricing). Workflow 04 costs per conversation, so set a monthly spend limit in the Anthropic console.

## Limits and risks

- **Not yet run against live services.** The JSON is validated structurally and the Code nodes were smoke-tested with mock data, but not imported into a running n8n. Expect to adjust a node or two on first import, especially after n8n version changes. Test with the curls above before activating.
- **WhatsApp 04 does not verify Meta's request signature** (n8n does not expose the raw body easily). The webhook path is guessable only if you leak it; treat the path as secret or put a signature check in a small proxy before going to production.
- **WhatsApp owner alert** in 01 is disabled. Business-initiated messages need an approved template named `lead_alert` (two text variables). Email alerts work without it.
- **WhatsApp history is personal data.** `wa_messages` holds customer messages. Mention it in the privacy policy and purge periodically: `delete from wa_messages where created_at < now() - interval '30 days';`
- **Model output is untrusted.** Prompts treat user text as data, outputs are schema-checked, and nothing sends without you. A prompt injection in a lead can at worst produce a bad draft that you read before sending.
