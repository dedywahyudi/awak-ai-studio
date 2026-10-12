import { authFailureResponse, checkAutomationAuth } from '@/lib/automation-auth';
import { buildKnowledgeBase } from '@/lib/knowledge';

export const dynamic = 'force-dynamic';

/** Current services, prices, and FAQ as plain text, for n8n to inject into AI prompts. */
export function GET(request: Request) {
  const auth = checkAutomationAuth(request);
  if (auth !== 'ok') return authFailureResponse(auth);

  return new Response(buildKnowledgeBase(), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}
