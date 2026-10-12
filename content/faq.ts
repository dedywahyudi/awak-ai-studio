import type { FaqItem } from '@/components/sections/Faq';
import { discoveryRange } from '@/lib/pricing';

/** Pricing FAQ. Rendered on /harga and also fed to the AI assistants via /api/knowledge. */
export const pricingFaq: FaqItem[] = [
  {
    q: 'Kenapa ada biaya bulanan?',
    a: 'Sistem AI perlu dipantau, diperbarui, dan diperbaiki saat ada yang berubah: harga baru, produk baru, atau alur yang gagal. Biaya bulanan membayar hosting, pemakaian model AI sampai batas wajar, pembaruan data, dan peninjauan rutin oleh engineer yang membangunnya.',
  },
  {
    q: 'Apakah data bisnis saya aman?',
    a: 'Data Anda disimpan di database milik Anda. Saat pelanggan bertanya, hanya potongan data yang relevan yang dikirim ke penyedia model AI, dan data API tidak dipakai untuk melatih model. Penyedia model dapat menyimpan data sementara untuk pemantauan penyalahgunaan sesuai kebijakan mereka. Kami mencantumkan penanganan data dalam kontrak dan mengikuti UU Pelindungan Data Pribadi (UU 27/2022) bila percakapan memuat data pribadi.',
  },
  {
    q: 'Apakah biaya WhatsApp Business API sudah termasuk?',
    a: 'Belum. Biaya dari penyedia WhatsApp Business API dibayar langsung oleh Anda sesuai pemakaian, tanpa tambahan margin dari kami.',
  },
  {
    q: 'Bagaimana dengan kontrak dan berhenti berlangganan?',
    a: 'Marketing AI memakai kontrak minimal 3 bulan karena hasil konten baru terlihat setelah beberapa siklus. Layanan lain berjalan bulanan setelah setup selesai. Data dan akun tetap milik Anda bila Anda berhenti.',
  },
  {
    q: 'Apa itu sesi discovery pada Solusi Custom?',
    a: `Sebelum membangun, kami menyusun spesifikasi, estimasi, dan lingkup tertulis bersama Anda. Biayanya sekitar ${discoveryRange} tergantung lingkup. Dengan ini Anda mendapat harga yang jelas sebelum berkomitmen ke biaya build.`,
  },
  {
    q: 'Apakah harga bisa berubah setelah konsultasi?',
    a: 'Ya. Harga di halaman ini adalah titik awal. Angka final bergantung pada lingkup yang kita sepakati, dan kami menuliskannya sebelum Anda membayar apa pun.',
  },
];
