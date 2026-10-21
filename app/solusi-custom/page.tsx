import { Building2, Cog, Gauge, KeyRound, LayoutDashboard, MapPin, Plug, ScanLine, Smartphone, Thermometer, Video, Workflow } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { customProduct, discoveryRange } from '@/lib/pricing';
import { shortIdr } from '@/lib/utils';
import { Container, Hl, PageHeader, Section } from '@/components/ui/Section';
import { LeadForm } from '@/components/forms/LeadForm';
import { Steps } from '@/components/sections/Steps';

export const metadata = pageMeta({
  title: 'Solusi Custom',
  description:
    `Web app, aplikasi mobile, integrasi sistem dan perangkat IoT, serta fitur AI khusus. Dari ide sampai rilis, mulai dari ${shortIdr(customProduct.setup ?? 0)}.`,
  path: '/solusi-custom',
});

const cases = [
  { icon: Building2, title: 'Banyak outlet atau cabang', body: 'Stok, penjualan, dan laporan perlu tergabung dalam satu sistem.' },
  { icon: Smartphone, title: 'Butuh aplikasi mobile', body: 'Pelanggan atau tim lapangan Anda bekerja dari ponsel.' },
  { icon: Plug, title: 'Terhubung ke sistem yang ada', body: 'Kasir, akuntansi, atau software lain harus saling bicara.' },
  { icon: Workflow, title: 'Fitur AI khusus', body: 'Booking otomatis, prakiraan stok, atau asisten untuk proses internal.' },
];

/** Integration examples: what the software layer can connect to. Not claims of past work, except the two named projects. */
const iotExamples = [
  { icon: Video, title: 'CCTV dan kamera', body: 'Hitung orang atau kendaraan, deteksi kejadian, dan kirim peringatan ke tim.' },
  { icon: Thermometer, title: 'Sensor lingkungan', body: 'Suhu, kelembapan, kualitas udara, atau level air, dipantau dan dianalisis terus-menerus.' },
  { icon: MapPin, title: 'GPS dan pelacak aset', body: 'Posisi real-time, animasi rute, dan peringatan saat kendaraan keluar area.' },
  { icon: Gauge, title: 'Meter pintar', body: 'Konsumsi listrik, air, atau gas, dengan deteksi pemakaian yang tidak wajar.' },
  { icon: Cog, title: 'Mesin dan PLC', body: 'Pantau kondisi mesin dan rencanakan perawatan sebelum terjadi gangguan.' },
  { icon: ScanLine, title: 'RFID dan barcode', body: 'Lacak pergerakan stok dan barang di gudang tanpa pencatatan manual.' },
  { icon: KeyRound, title: 'Kontrol akses dan absensi', body: 'Hubungkan pintu atau mesin absensi ke sistem kehadiran dan laporan Anda.' },
  { icon: LayoutDashboard, title: 'Dasbor command center', body: 'Semua data perangkat dalam satu layar: peta, grafik, dan peringatan.' },
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

      <Section flushTop eyebrow="Kapan cocok" title="Pakai solusi custom bila...">
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

      <Section
        tone="section"
        eyebrow="IoT dan AI"
        title={
          <>
            Hubungkan perangkat Anda ke <Hl>AI</Hl>.
          </>
        }
        description="Kami membangun lapisan perangkat lunaknya: pengumpulan data, dasbor, peringatan, dan analisis AI. Bukan menjual perangkat keras. Pengalaman kami antara lain platform Smart City (IoT dan analitik data) dan dasbor command center geospasial."
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {iotExamples.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col gap-3 rounded-card border border-line bg-card p-6">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent-soft text-link">
                <Icon size={24} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold text-strong">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Contoh di atas menunjukkan jenis integrasi yang bisa dibangun. Perangkat dan protokol yang cocok kami
          pastikan saat discovery.
        </p>
      </Section>

      <Section eyebrow="Prosesnya" title="Harga jelas sebelum Anda berkomitmen.">
        <Steps steps={steps} />
      </Section>

      <section id="form" className="bg-section py-16 md:py-28">
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
