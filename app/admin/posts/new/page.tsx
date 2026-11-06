import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { PostForm } from '@/components/admin/PostForm';
import { requireAdmin } from '@/lib/supabase/auth';

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <Container className="flex max-w-4xl flex-col gap-6">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-link hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" /> Semua tulisan
      </Link>
      <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-strong">Tulisan baru</h1>
      <p className="text-sm text-muted">Tulisan baru selalu mulai sebagai draf. Terbit hanya setelah Anda menjadwalkannya.</p>
      <PostForm post={null} />
    </Container>
  );
}
