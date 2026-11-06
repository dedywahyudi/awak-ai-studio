import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

/**
 * Admin sign-in with Supabase Auth. The session lives in httpOnly cookies (refreshed by middleware.ts).
 * Being signed in is not enough: the email must also be in ADMIN_EMAILS (comma separated), so a stray
 * Supabase user can never open the admin. Server components and actions call requireAdmin() every time.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const adminEmails = () =>
  (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

/** All four are needed: Supabase URL, anon key, service key (for writes) and at least one admin email. */
export const adminConfigured = () =>
  Boolean(url && anonKey && process.env.SUPABASE_SERVICE_ROLE_KEY && adminEmails().length > 0);

export function createAuthClient() {
  if (!url || !anonKey) throw new Error('Supabase is not configured.');
  const store = cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a server component: middleware refreshes the session instead.
        }
      },
    },
  });
}

export async function getAdminUser(): Promise<User | null> {
  if (!adminConfigured()) return null;
  const { data } = await createAuthClient().auth.getUser();
  const email = data.user?.email?.toLowerCase();
  return email && adminEmails().includes(email) ? data.user : null;
}

export async function requireAdmin(): Promise<User> {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
  return user;
}
