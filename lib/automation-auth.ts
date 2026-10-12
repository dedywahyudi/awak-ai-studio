import { timingSafeEqual } from 'node:crypto';

/**
 * Shared-secret auth for machine-to-machine endpoints (/api/knowledge, /api/revalidate).
 * Callers (n8n, Supabase webhooks) send the secret in the `x-automation-secret` header.
 * If AUTOMATION_SECRET is not set the endpoints are disabled (503), never open.
 */
export function checkAutomationAuth(request: Request): 'ok' | 'unauthorized' | 'disabled' {
  const secret = process.env.AUTOMATION_SECRET;
  if (!secret) return 'disabled';

  const given = request.headers.get('x-automation-secret') ?? '';
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b) ? 'ok' : 'unauthorized';
}

export function authFailureResponse(result: 'unauthorized' | 'disabled') {
  return Response.json(
    { error: result === 'disabled' ? 'Endpoint disabled: AUTOMATION_SECRET not set' : 'Unauthorized' },
    { status: result === 'disabled' ? 503 : 401 },
  );
}
