import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container, PageHeader } from '@/components/ui/Section';

export const metadata = pageMeta({
  title: 'Kebijakan Privasi',
  description: `Bagaimana ${site.name} mengumpulkan, memakai, dan melindungi data yang Anda kirim lewat formulir.`,
  path: '/kebijakan-privasi',
});

/**
 * TEMPLATE. Have a legal advisor review it against UU PDP (UU No. 27 Tahun 2022)
 * before launch, and update it whenever you add analytics, cookies, or new processors.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Kebijakan Privasi" description="Terakhir diperbarui: Oktober 2026." />
      <section className="bg-page py-12 md:py-16">
        <Container className="max-w-3xl">
          <div className="prose-awak text-base leading-relaxed">
            <h2>Data yang kami kumpulkan</h2>
            <p>
              Saat Anda mengisi formulir, kami menerima nama, nama bisnis, nomor WhatsApp atau email, jenis
              kebutuhan, perkiraan budget (opsional), dan deskripsi yang Anda tulis. Kami juga mencatat
              halaman asal formulir.
            </p>
            <h2>Untuk apa data dipakai</h2>
            <p>
              Hanya untuk menghubungi Anda terkait permintaan tersebut dan menyiapkan penawaran. Kami tidak
              menjual data Anda.
            </p>
            <h2>Siapa yang memprosesnya</h2>
            <p>
              Data disimpan di Supabase, notifikasi dikirim lewat Resend dan sistem otomatisasi kami, dan
              situs berjalan di Vercel. Analitik memakai Vercel Analytics tanpa cookie pelacak lintas situs.
            </p>
            <h2>Berapa lama disimpan</h2>
            <p>
              Selama diperlukan untuk menindaklanjuti permintaan Anda. Anda dapat meminta data Anda dihapus
              kapan saja.
            </p>
            <h2>Hak Anda</h2>
            <p>
              Sesuai UU Pelindungan Data Pribadi, Anda berhak mengakses, memperbaiki, dan meminta penghapusan
              data Anda. Hubungi kami lewat halaman <a href="/kontak">Kontak</a>
              {site.email ? ` atau ${site.email}` : ''}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
