import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { PostForm } from '@/components/admin/PostForm';
import { requireAdmin } from '@/lib/supabase/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { allColumns, type AdminPost } from '@/lib/admin';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const db = getServiceClient();
  if (!db || !/^[0-9a-f-]{36}$/i.test(params.id)) notFound();
  const { data } = await db.from('posts').select(allColumns).eq('id', params.id).maybeSingle();
  if (!data) notFound();

  return (
    <Container className="flex max-w-4xl flex-col gap-6">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-link hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" /> Semua tulisan
      </Link>
      <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-strong">Sunting tulisan</h1>
      <PostForm post={data as AdminPost} />
    </Container>
  );
}
