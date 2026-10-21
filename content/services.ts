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
      'Asisten AI yang menjawab pelanggan Anda 24 jam di WhatsApp dan website, berdasarkan data bisnis Anda sendiri.',
    forWho: 'Bisnis yang dibanjiri pertanyaan berulang: harga, stok, jam buka, cara pesan.',
    bullets: [
      'Jawaban berasal dari data Anda, bukan karangan model',
      'Diteruskan ke tim Anda saat bot tidak yakin',
      'Laporan bulanan pertanyaan yang belum bisa dijawab',
      'Data tetap di database Anda dan tidak dipakai melatih model',
      'Modul booking dan pengingat janji temu untuk klinik, salon, bengkel, dan kursus (opsional)',
    ],
  },
  {
    id: 'otomatisasi',
    icon: 'workflow',
    title: 'Otomatisasi',
    summary:
      'Pekerjaan administratif yang berulang berjalan sendiri: dari form, WhatsApp, dan spreadsheet ke sistem Anda.',
    forWho: 'Bisnis yang waktunya habis untuk salin-tempel data, bikin invoice, dan menyusun laporan.',
    bullets: [
      'Hingga 5 alur kerja, mulai dari satu paket awal yang paling mendesak',
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
      'Web app, aplikasi mobile, atau keduanya',
      'Integrasi dengan sistem yang sudah Anda pakai',
      'Fitur AI khusus: booking, inventori, prakiraan',
      'Dirilis bertahap dengan milestone yang jelas',
    ],
  },
];
