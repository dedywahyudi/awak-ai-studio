import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { Container, PageHeader } from '@/components/ui/Section';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Keamanan',
  description: `Bagaimana ${site.name} menangani data bisnis dan pelanggan Anda: di mana data disimpan, apa yang dikirim ke penyedia AI, siapa yang meninjau, dan apa yang tidak pernah kami lakukan.`,
  path: '/keamanan',
});

/**
 * Only statements the product and the FAQ already support. Have a legal advisor review it against UU PDP
 * (UU No. 27 Tahun 2022) and your providers' terms before launch, and update it when the setup changes.
 */
const sections = [
  {
    title: 'Di mana data Anda disimpan',
    body: [
      'Data yang dipakai asisten AI, seperti harga, stok, jam buka, dan dokumen, disimpan di database milik Anda. Akun dan data tetap milik Anda, termasuk bila Anda berhenti berlangganan.',
      'Data yang Anda kirim lewat formulir di situs ini disimpan di Supabase. Kunci akses server tidak pernah dikirim ke browser.',
    ],
  },
  {
    title: 'Apa yang dikirim ke penyedia model AI',
    body: [
      'Saat pelanggan bertanya, hanya potongan data yang relevan yang dikirim ke penyedia model AI untuk menyusun jawaban, bukan seluruh database Anda.',
      'Data yang dikirim lewat API tidak dipakai untuk melatih model. Penyedia model dapat menyimpan data sementara untuk pemantauan penyalahgunaan sesuai kebijakan mereka. Kami menyebut penyedia yang dipakai dan penanganan datanya dalam proposal.',
    ],
  },
  {
    title: 'Manusia tetap memutuskan',
    body: [
      'Tidak ada konten dari AI yang terbit tanpa ditinjau dan disetujui manusia. Tulisan blog dan postingan media sosial berstatus draf sampai disetujui dan dijadwalkan.',
      'Sistem otomatisasi kami tidak mengirim pesan ke calon klien atas namanya sendiri. Penawaran dan invoice disetujui Anda sebelum terkirim.',
      'Untuk data sensitif seperti bidang medis, AI diposisikan sebagai pendukung keputusan, dan ahli yang memutuskan.',
    ],
  },
  {
    title: 'Bagaimana kami menjaga sistem',
    body: [
      'Koneksi ke situs memakai HTTPS. Tabel data pelanggan di database dilindungi aturan akses (row level security), sehingga pengunjung tidak bisa membacanya.',
      'Kunci dan rahasia (kunci API, kunci server) disimpan sebagai environment variable di sisi server, bukan di kode atau di browser.',
      'Halaman admin hanya bisa dibuka oleh akun yang terdaftar dan masuk lewat autentikasi. Formulir di situs memakai perlindungan dasar terhadap pengiriman otomatis oleh bot.',
      'Alur otomatisasi dipantau dan diperbaiki bila gagal.',
    ],
  },
  {
    title: 'Data pribadi dan UU PDP',
    body: [
      'Bila percakapan atau data Anda memuat data pribadi, kami mengikuti UU Pelindungan Data Pribadi (UU No. 27 Tahun 2022) dan mencantumkan penanganan data dalam kontrak.',
      'Kami hanya memakai data untuk tujuan yang disepakati dan tidak menjual data Anda. Anda berhak meminta akses, perbaikan, dan penghapusan data. Lihat juga Kebijakan Privasi kami.',
    ],
  },
  {
    title: 'Pelaporan masalah keamanan',
    body: [
      'Bila Anda menemukan celah atau melihat sesuatu yang mencurigakan, beri tahu kami lewat formulir di halaman Audit Gratis atau lewat WhatsApp. Kami membacanya dan menindaklanjuti.',
    ],
  },
];

export default function KeamananPage() {
  return (
    <>
      <PageHeader
        eyebrow="Keamanan"
        title="Data Anda tetap milik Anda."
        description="Ringkasan jujur tentang di mana data disimpan, apa yang dikirim ke penyedia AI, dan siapa yang tetap memegang keputusan."
      />
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
              Halaman ini adalah ringkasan, bukan kontrak. Detail penanganan data untuk proyek Anda ditulis dalam
              proposal dan kontrak. Lihat <Link href="/kebijakan-privasi">Kebijakan Privasi</Link>,{' '}
              <Link href="/syarat-ketentuan">Syarat dan Ketentuan</Link>, atau <Link href="/audit-gratis">hubungi kami</Link>
              {site.email ? ` di ${site.email}` : ''}.
            </p>
          </div>
        </Container>
      </section>
      <ClosingCta />
    </>
  );
}
