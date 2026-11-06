import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Admin | Awak AI Studio' },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[70vh] bg-page pb-16 pt-24 md:pt-28">{children}</div>;
}
