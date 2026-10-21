import type { ProductId } from '@/lib/pricing';

export interface Service {
  id: ProductId;
  icon: 'message-circle' | 'workflow' | 'globe';
  title: string;
  summary: string;
  forWho: string;
  bullets: string[];
}

/** Longer descriptions for /layanan. Prices come from lib/pricing.ts, not from here. */
export const services: Service[] = [
  {
    id: 'ai-chat',
    icon: 'message-circle',
    title: 'AI Chat',
    summary:
      'Asisten AI yang menjawab 24 jam berdasarkan data bisnis Anda sendiri, dan bisa dipasang di mana saja: WhatsApp, website, aplikasi, atau kanal lain yang Anda pakai.',
    forWho: 'Bisnis yang dibanjiri pertanyaan berulang dari pelanggan, tim, atau mitra: harga, stok, jam buka, cara pesan, prosedur internal.',
    bullets: [
      'Dipasang di kanal pilihan Anda: WhatsApp, website, aplikasi, Instagram, Telegram, atau email',
      'Terhubung ke data online maupun offline: dokumen PDF, spreadsheet, database, atau arsip',
      'Jawaban berasal dari data Anda, bukan karangan model',
      'Diteruskan ke tim saat bot tidak yakin, dengan laporan bulanan pertanyaan yang belum terjawab',
      'Data tetap di database Anda dan tidak dipakai melatih model',
      'Modul booking dan pengingat janji temu (opsional) untuk klinik, salon, bengkel, dan kursus',
    ],
  },
  {
    id: 'otomatisasi',
    icon: 'workflow',
    title: 'Otomatisasi',
    summary:
      'Pekerjaan yang berulang berjalan sendiri, dari kanal atau sistem apa pun: form, chat, email, spreadsheet, API, sampai perangkat IoT.',
    forWho: 'Bisnis yang waktunya habis untuk salin-tempel data, bikin invoice, menyusun laporan, dan memindahkan data antar sistem.',
    bullets: [
      'Hingga 5 alur kerja, mulai dari satu paket awal yang paling mendesak',
      'Terhubung ke WhatsApp, email, form, spreadsheet, CRM, kalender, API, dan lainnya',
      'Follow-up Lead: lead yang tidak dibalas diingatkan otomatis ke tim dan calon klien',
      'Penawaran Otomatis: penawaran dan invoice dibuat dari data, terkirim setelah Anda setujui',
      'Pengingat dan Ulasan: pengingat janji temu atau pembayaran, lalu permintaan ulasan',
      'Dipantau dan diperbaiki bila alur gagal',
    ],
  },
  {
    id: 'custom',
    icon: 'globe',
    title: 'Solusi Custom',
    summary:
      'Bukan template. Kami bangun website atau aplikasi sesuai kebutuhan bisnis Anda, dari company profile sampai sistem internal.',
    forWho: 'Bisnis dengan kebutuhan khusus: multi-outlet, aplikasi mobile, atau integrasi sistem yang sudah ada.',
    bullets: [
      'Web app, aplikasi mobile, atau keduanya, dirancang sesuai alur bisnis Anda',
      'Integrasi dengan sistem yang sudah Anda pakai: kasir, akuntansi, CRM, atau ERP',
      'Otomatisasi alur kerja khusus untuk proses bisnis Anda, dengan persetujuan di titik penting',
      'Integrasi perangkat IoT: CCTV, sensor, GPS, meter pintar, dan lainnya',
      'Fitur AI khusus: booking, inventori, prakiraan, atau asisten proses internal',
      'Dirilis bertahap dengan milestone yang jelas dan maintenance bulanan',
    ],
  },
];
