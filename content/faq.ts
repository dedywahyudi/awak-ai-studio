import type { FaqItem } from '@/components/sections/Faq';
import { auditProduct, discoveryRange, showPrices } from '@/lib/pricing';

/** Pricing FAQ. Rendered on /layanan and also fed to the AI assistants via /api/knowledge. */
export const pricingFaq: FaqItem[] = [
  {
    q: 'Apa isi Audit Kebutuhan Gratis, dan apakah benar-benar gratis?',
    a: `Ya, gratis dan tanpa kewajiban. Kami mengobrol tentang bisnis, alur kerja, dan masalah Anda, lalu mengirim ringkasan tertulis dalam ${auditProduct.turnaroundDays} hari kerja: apa yang Anda butuhkan dan layanan mana yang paling masuk akal. Bila Anda ingin lanjut, kami tulis estimasi biaya sebelum Anda membayar apa pun.`,
  },
  {
    q: 'Apakah ada batas jumlah percakapan?',
    a: 'Paket AI Chat sudah termasuk pemakaian wajar. Bila volume percakapan Anda jauh di atas itu, kami sampaikan di proposal dan menyepakati batas serta biaya tambahannya sebelum mulai. Tidak ada tagihan kejutan.',
  },
  {
    q: 'Kenapa ada biaya bulanan?',
    a: 'Sistem AI perlu dipantau, diperbarui, dan diperbaiki saat ada yang berubah: harga baru, produk baru, atau alur yang gagal. Biaya bulanan membayar hosting, pemakaian model AI sampai batas wajar, pembaruan data, dan peninjauan rutin oleh engineer yang membangunnya.',
  },
  {
    q: 'Apakah data bisnis saya aman?',
    a: 'Data Anda disimpan di database milik Anda. Saat pelanggan bertanya, hanya potongan data yang relevan yang dikirim ke penyedia model AI, dan data API tidak dipakai untuk melatih model. Penyedia model dapat menyimpan data sementara untuk pemantauan penyalahgunaan sesuai kebijakan mereka. Kami mencantumkan penanganan data dalam kontrak dan mengikuti UU Pelindungan Data Pribadi (UU 27/2022) bila percakapan memuat data pribadi.',
  },
  {
    q: 'Bila dipasang di WhatsApp, apakah biaya WhatsApp Business API sudah termasuk?',
    a: 'Belum. Biaya dari penyedia WhatsApp Business API dibayar langsung oleh Anda sesuai pemakaian, tanpa tambahan margin dari kami. Menurut ketentuan Meta saat ini, balasan bebas dalam 24 jam setelah pelanggan menulis tidak dikenai biaya per pesan, sedangkan pesan template seperti pengingat janji temu dikenai biaya per pesan. Tarif ditentukan Meta dan bisa berubah; kami jelaskan perkiraannya di proposal.',
  },
  {
    q: 'Apa syarat memakai WhatsApp Business API, dan apakah AI Chat harus di WhatsApp?',
    a: 'Umumnya Anda perlu NIB, NPWP, nomor +62 yang belum terdaftar di WhatsApp, halaman bisnis, dan website. PT biasanya juga diminta akta pendirian. Syarat bisa berbeda per penyedia, jadi kami cek bersama Anda di awal. AI Chat tidak harus di WhatsApp: bisa dipasang di website, aplikasi Anda, Instagram, Telegram, atau email, dan WhatsApp bisa ditambahkan belakangan.',
  },
  {
    q: 'Bagaimana dengan kontrak dan berhenti berlangganan?',
    a: 'Layanan berjalan bulanan setelah setup selesai. Data dan akun tetap milik Anda bila Anda berhenti.',
  },
  {
    q: 'Apa itu sesi discovery pada Solusi Custom?',
    a: `Sebelum membangun, kami menyusun spesifikasi, estimasi, dan lingkup tertulis bersama Anda. ${showPrices ? `Biayanya sekitar ${discoveryRange} tergantung lingkup.` : 'Biayanya disesuaikan dengan lingkup dan kami sampaikan lebih dulu.'} Dengan ini Anda mendapat harga yang jelas sebelum berkomitmen ke biaya build.`,
  },
  {
    q: 'Apakah harga bisa berubah setelah konsultasi?',
    a: showPrices
      ? 'Ya. Harga di halaman ini adalah titik awal. Angka final bergantung pada lingkup yang kita sepakati, dan kami menuliskannya sebelum Anda membayar apa pun.'
      : 'Harga disesuaikan dengan lingkup yang kita sepakati. Kami menuliskannya sebelum Anda membayar apa pun, dan semua layanan berbayar punya biaya bulanan setelah setup selesai.',
  },
];
