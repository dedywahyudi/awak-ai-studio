import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Two clients, two trust levels:
 * - getPublicClient(): anon key. Read-only by RLS (published posts only). Safe for pages.
 * - getServiceClient(): service role key. Bypasses RLS. Server actions ONLY. Never import
 *   this from a client component or expose the key with a NEXT_PUBLIC_ prefix.
 * Both return null when env is missing so the site still builds and runs without Supabase.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const options = { auth: { persistSession: false, autoRefreshToken: false } } as const;

export function getPublicClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, options);
}

export function getServiceClient(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, options);
}
