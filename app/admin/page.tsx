import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { requireAdmin } from '@/lib/supabase/auth';
import { getServiceClient } from '@/lib/supabase/server';
import { formatWib, listColumns, type AdminPost } from '@/lib/admin';
import { categoryLabel } from '@/lib/types';
import { logout } from '@/app/admin/actions';

const statusTone = { draft: 'neutral', scheduled: 'soft', published: 'popular' } as const;
const statusLabel = { draft: 'Draf', scheduled: 'Terjadwal', published: 'Terbit' } as const;
const igLabel = { none: '-', pending: 'Menunggu', posted: 'Terposting', failed: 'Gagal', skipped: 'Dilewati' } as const;

export default async function AdminHome() {
  const user = await requireAdmin();
  const db = getServiceClient();
  const { data } = db
    ? await db.from('posts').select(listColumns).order('updated_at', { ascending: false })
    : { data: null };
  const posts = (data ?? []) as AdminPost[];

  return (
    <Container className="flex max-w-5xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-strong">Tulisan blog</h1>
          <p className="text-sm text-muted">Masuk sebagai {user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <form action={logout}>
            <button type="submit" className="min-h-11 rounded-[10px] px-4 text-sm font-semibold text-link hover:text-white">
              Keluar
            </button>
          </form>
          <Link
            href="/admin/posts/new"
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-accent px-5 font-display text-[15px] font-bold text-white hover:bg-accent-hover"
          >
            <Plus size={16} aria-hidden="true" /> Tulisan baru
          </Link>
        </div>
      </div>

      {!db && <p className="text-danger">Supabase belum dikonfigurasi.</p>}
      {db && posts.length === 0 && <p className="text-body">Belum ada tulisan di database.</p>}

      <ul className="flex flex-col gap-3">
        {posts.map((p) => (
          <li key={p.id}>
            <Link
              href={`/admin/posts/${p.id}`}
              className="flex flex-col gap-2 rounded-card border border-line bg-card p-5 transition hover:border-accent-ring md:flex-row md:items-center md:justify-between"
            >
              <span className="flex flex-col gap-1">
                <span className="font-display text-lg font-bold text-strong">{p.title}</span>
                <span className="font-mono text-xs text-muted">
                  {categoryLabel(p.category)} / {p.slug}
                </span>
              </span>
              <span className="flex flex-wrap items-center gap-3 text-sm text-body">
                <Badge tone={statusTone[p.status]} size="sm">
                  {statusLabel[p.status]}
                </Badge>
                <span>{p.status === 'scheduled' ? formatWib(p.scheduled_at) : p.status === 'published' ? formatWib(p.published_at) : '-'}</span>
                <span className="text-muted">Instagram: {igLabel[p.instagram_status]}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
