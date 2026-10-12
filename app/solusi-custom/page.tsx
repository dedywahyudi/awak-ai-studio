import { Building2, Plug, Smartphone, Workflow } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { customProduct, discoveryRange } from '@/lib/pricing';
import { shortIdr } from '@/lib/utils';
import { Container, Hl, PageHeader, Section } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { Steps } from '@/components/sections/Steps';

export const metadata = pageMeta({
  title: 'Solusi Custom',
  description:
    'Web app, aplikasi mobile, integrasi sistem, dan fitur AI khusus. Dari ide sampai rilis, mulai dari Rp 20 jt.',
  path: '/solusi-custom',
});

const cases = [
  { icon: Building2, title: 'Banyak outlet atau cabang', body: 'Stok, penjualan, dan laporan perlu tergabung dalam satu sistem.' },
  { icon: Smartphone, title: 'Butuh aplikasi mobile', body: 'Pelanggan atau tim lapangan Anda bekerja dari ponsel.' },
  { icon: Plug, title: 'Terhubung ke sistem yang ada', body: 'Kasir, akuntansi, atau software lain harus saling bicara.' },
  { icon: Workflow, title: 'Fitur AI khusus', body: 'Booking otomatis, prakiraan stok, atau asisten untuk proses internal.' },
];

const steps = [
  { title: 'Discovery berbayar', body: `Kami susun spesifikasi, estimasi, dan lingkup tertulis. Biaya sekitar ${discoveryRange} tergantung lingkup.` },
  { title: 'Proposal dan kontrak', body: 'Harga tetap per milestone, dengan batas revisi yang jelas di setiap tahap.' },
  { title: 'Build bertahap', body: 'Anda melihat hasil di tiap milestone dan membayar sesuai kemajuan.' },
  { title: 'Rilis dan rawat', body: 'Peluncuran, pelatihan tim, lalu maintenance bulanan.' },
];

export default function SolusiCustomPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solusi Custom"
        title={
          <>
            Dari ide sampai rilis, <Hl>dibangun untuk Anda</Hl>.
          </>
        }
        description={`Untuk kebutuhan yang tidak muat di paket standar. Estimasi mulai dari ${shortIdr(customProduct.setup ?? 0)}, dikonfirmasi tertulis setelah discovery.`}
      />

      <Section eyebrow="Kapan cocok" title="Pakai solusi custom bila...">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-3 rounded-card border border-line bg-card p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-link">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold text-strong">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="section" eyebrow="Prosesnya" title="Harga jelas sebelum Anda berkomitmen.">
        <Steps steps={steps} />
      </Section>

      <section id="form" className="bg-page py-16 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-strong md:text-4xl">
              Ceritakan <Hl>idenya</Hl>.
            </h2>
            <p className="text-lg leading-relaxed text-body">
              Tidak perlu spesifikasi lengkap. Cukup gambaran masalahnya. Kami balas dengan pertanyaan
              lanjutan dan langkah berikutnya.
            </p>
          </div>
          <div className="rounded-pricing border border-line bg-card p-6 md:p-8">
            <LeadForm variant="custom" />
          </div>
        </Container>
      </section>
    </>
  );
}
