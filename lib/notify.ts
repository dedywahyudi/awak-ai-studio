import type { LeadInput } from '@/lib/schema';

/**
 * Pushes each new lead to n8n (or Make, Zapier...). The workflow in
 * automation/workflows/01-lead-qualifier.json classifies the lead, drafts a first reply,
 * and alerts you. `leadId` lets the workflow write its results back to the `leads` row.
 */
export async function sendLeadWebhook(lead: LeadInput, leadId?: string | null): Promise<boolean> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;

  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(secret ? { 'x-webhook-secret': secret } : {}),
    },
    body: JSON.stringify({
      event: 'lead.created',
      leadId: leadId ?? null,
      lead,
      createdAt: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}
