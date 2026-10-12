import { Globe, MessageCircle, PenLine, Workflow, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { services } from '@/content/services';
import { getProduct, headlinePrice, priceNote } from '@/lib/pricing';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container, Hl, PageHeader } from '@/components/ui/Section';
import { ChatPreview } from '@/components/sections/ChatPreview';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Layanan',
  description:
    'Marketing AI, AI Chat, Otomatisasi, dan Solusi Custom untuk UMKM. Dibangun khusus, bukan template.',
  path: '/layanan',
});

const icons = { 'pen-line': PenLine, 'message-circle': MessageCircle, workflow: Workflow, globe: Globe };

export default function LayananPage() {
  return (
    <>
      <PageHeader
        eyebrow="Layanan"
        title={
          <>
            Empat cara AI <Hl>bekerja untuk bisnis</Hl> Anda.
          </>
        }
        description="Dari balas pelanggan sampai bikin laporan. Semuanya dibangun di atas data dan alur kerja bisnis Anda sendiri."
      />

      <section className="bg-page py-12 md:py-20">
        <Container className="grid gap-5 md:grid-cols-2">
          {services.map((s) => {
            const Icon = icons[s.icon];
            const product = getProduct(s.id);
            return (
              <article key={s.id} id={s.id} className="flex flex-col gap-5 rounded-pricing border border-line bg-card p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-link">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-strong">{s.title}</h2>
                  <p className="leading-relaxed text-body">{s.summary}</p>
                  <p className="text-sm text-muted">
                    <span className="font-semibold text-body">Cocok untuk:</span> {s.forWho}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-body">
                      <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <p className="text-sm text-muted">
                    Mulai dari{' '}
                    <span className="font-display text-lg font-extrabold text-strong tabular-nums">
                      {headlinePrice(product)}
                    </span>{' '}
                    {priceNote(product)}
                  </p>
                  <Button
                    variant="secondary"
                    href={s.id === 'custom' ? '/solusi-custom' : waLink(waConsultMessage(s.title))}
                    arrow
                  >
                    {s.id === 'custom' ? 'Hubungi Kami' : 'Tanya Layanan Ini'}
                  </Button>
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      <section className="border-y border-line bg-section py-16 md:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-strong md:text-4xl">
              Seperti inilah AI Chat <Hl>menjawab pelanggan</Hl> Anda.
            </h2>
            <p className="text-lg leading-relaxed text-body">
              Jawaban diambil dari data bisnis Anda: harga, stok, jam buka. Saat bot tidak yakin, percakapan
              diteruskan ke tim Anda lengkap dengan riwayatnya.
            </p>
            <Link href="/demo" className="inline-flex items-center gap-1.5 font-semibold text-link hover:text-white">
              Lihat cara kerja lengkap <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ChatPreview />
        </Container>
      </section>

      <div className="pt-16 md:pt-24">
        <ClosingCta />
      </div>
    </>
  );
}
