import { redirect } from 'next/navigation';
import { Container } from '@/components/ui/Section';
import { LoginForm } from '@/components/admin/LoginForm';
import { adminConfigured, getAdminUser } from '@/lib/supabase/auth';

export default async function AdminLoginPage() {
  if (!adminConfigured()) {
    return (
      <Container className="max-w-md">
        <h1 className="font-display text-2xl font-extrabold text-strong">Admin belum aktif</h1>
        <p className="mt-3 text-body">
          Isi NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, dan ADMIN_EMAILS
          di environment, lalu jalankan ulang aplikasi.
        </p>
      </Container>
    );
  }
  if (await getAdminUser()) redirect('/admin');
  return (
    <Container className="flex max-w-md flex-col gap-6">
      <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-strong">Masuk admin</h1>
      <div className="rounded-card border border-line bg-card p-6">
        <LoginForm />
      </div>
    </Container>
  );
}
