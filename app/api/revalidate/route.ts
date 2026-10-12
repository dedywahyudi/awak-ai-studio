import { revalidatePath } from 'next/cache';
import { authFailureResponse, checkAutomationAuth } from '@/lib/automation-auth';

export const dynamic = 'force-dynamic';

/**
 * Called by n8n right after a post is approved (status -> published) so the blog and
 * sitemap update immediately instead of waiting for the hourly revalidation.
 */
export function POST(request: Request) {
  const auth = checkAutomationAuth(request);
  if (auth !== 'ok') return authFailureResponse(auth);

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/sitemap.xml');
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
