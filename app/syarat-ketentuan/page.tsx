import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container, PageHeader } from '@/components/ui/Section';

export const metadata = pageMeta({
  title: 'Syarat dan Ketentuan',
  description: `Syarat dan ketentuan layanan ${site.name}: cakupan layanan, pembayaran, kepemilikan data dan hasil kerja, serta batas tanggung jawab.`,
  path: '/syarat-ketentuan',
});

/**
 * TEMPLATE from the commercial terms already on the site (pricing rules, FAQ). Have a legal advisor review it
 * (including liability, governing law and intellectual property) before launch. Signed proposals and contracts
 * override this page.
 */
const sections = [
  {
    title: 'Cakupan',
    body: [
      `Syarat ini berlaku untuk penggunaan situs dan layanan ${site.name}: AI Chat, Otomatisasi, dan Solusi Custom. Proposal atau kontrak tertulis untuk proyek Anda lebih utama bila berbeda dengan halaman ini.`,
    ],
  },
  {
    title: 'Konsultasi dan Audit Gratis',
    body: [
      'Audit Kebutuhan Gratis tidak mewajibkan Anda membeli apa pun. Hasilnya berupa ringkasan tertulis tentang kebutuhan Anda dan layanan yang paling masuk akal.',
    ],
  },
  {
    title: 'Harga dan pembayaran',
    body: [
      'Harga disesuaikan dengan kebutuhan dan dikirim tertulis setelah konsultasi, sebelum Anda membayar apa pun. Tidak ada biaya kejutan.',
      'Layanan berbayar terdiri dari biaya setup (atau biaya build untuk Solusi Custom) dan biaya bulanan setelah setup selesai. Biaya bulanan mencakup hosting, pemakaian model AI sampai batas wajar, pembaruan data, dan peninjauan rutin.',
      'Solusi Custom diawali sesi discovery berbayar, dengan pembayaran bertahap per milestone sesuai proposal. Biaya pihak ketiga, seperti WhatsApp Business API, dibayar langsung oleh Anda ke penyedianya.',
    ],
  },
  {
    title: 'Data dan hasil kerja',
    body: [
      'Data dan akun Anda tetap milik Anda, termasuk bila Anda berhenti berlangganan. Penanganan data dijelaskan di Kebijakan Privasi dan halaman Keamanan, serta dicantumkan dalam kontrak.',
      'Kepemilikan kode dan hasil kerja untuk Solusi Custom, serta hak pakai atas materi yang kami buat, ditulis dalam kontrak proyek.',
    ],
  },
  {
    title: 'Penggunaan AI dan tinjauan manusia',
    body: [
      'Keluaran AI dapat keliru. Anda bertanggung jawab meninjau keluaran yang dipakai atas nama bisnis Anda, dan kami membantu menyiapkan langkah peninjauan di setiap alur. Kami tidak menjanjikan hasil bisnis tertentu.',
    ],
  },
  {
    title: 'Berhenti berlangganan',
    body: [
      'Layanan berjalan bulanan setelah setup selesai. Ketentuan pemberitahuan dan masa berlaku ditulis dalam proposal atau kontrak Anda.',
    ],
  },
  {
    title: 'Batas tanggung jawab',
    body: [
      'Kami berupaya menyediakan layanan dengan baik, tetapi tidak menjamin layanan bebas gangguan, termasuk gangguan dari penyedia pihak ketiga seperti penyedia model AI, WhatsApp, hosting, atau Instagram. Batas tanggung jawab yang berlaku untuk proyek Anda ditulis dalam kontrak.',
    ],
  },
  {
    title: 'Perubahan syarat dan hukum yang berlaku',
    body: [
      'Kami dapat memperbarui halaman ini, dan tanggal pembaruan terakhir tercantum di bawah judul. Syarat ini tunduk pada hukum Republik Indonesia.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Syarat dan Ketentuan" description="Terakhir diperbarui: Oktober 2026." />
      <section className="bg-page pb-16 pt-0 md:pb-28">
        <Container className="max-w-3xl">
          <div className="prose-awak text-base leading-relaxed">
            {sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
            <p>
              Pertanyaan tentang syarat ini? <Link href="/audit-gratis">Hubungi kami</Link>
              {site.email ? ` atau ${site.email}` : ''}. Lihat juga <Link href="/kebijakan-privasi">Kebijakan Privasi</Link> dan{' '}
              <Link href="/keamanan">Keamanan</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
