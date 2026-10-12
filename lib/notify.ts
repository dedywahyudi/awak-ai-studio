import type { LeadInput } from '@/lib/schema';

/**
 * Pushes each new lead to an external automation (n8n, Make, Zapier...).
 * Use it to fan out to WhatsApp (Twilio / 360dialog / WA Cloud API), Slack, a CRM, etc.
 * without baking a WhatsApp provider into the website code.
 */
export async function sendLeadWebhook(lead: LeadInput): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(secret ? { 'x-webhook-secret': secret } : {}),
    },
    body: JSON.stringify({ event: 'lead.created', lead, createdAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}
