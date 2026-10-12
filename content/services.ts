import type { ProductId } from '@/lib/pricing';

export interface Service {
  id: ProductId;
  icon: 'pen-line' | 'message-circle' | 'workflow' | 'globe';
  title: string;
  summary: string;
  forWho: string;
  bullets: string[];
}

/** Longer descriptions for /layanan. Prices come from lib/pricing.ts, not from here. */
export const services: Service[] = [
  {
    id: 'marketing-ai',
    icon: 'pen-line',
    title: 'Marketing AI',
    summary:
      'Blog dan konten media sosial dibuat rutin dengan bantuan AI, lalu direview manusia sebelum tayang.',
    forWho: 'Bisnis yang ingin konsisten tampil tapi tidak punya waktu atau tim konten.',
    bullets: [
      'Panduan gaya bahasa agar konten terdengar seperti bisnis Anda',
      'Kalender konten bulanan yang disepakati bersama',
      'AI untuk draf dan caption, foto produk asli untuk visual',
      'Artikel blog yang membantu bisnis Anda ditemukan di pencarian',
    ],
  },
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
      'Lead baru otomatis masuk ke Sheets atau CRM',
      'Penawaran, invoice, dan laporan dibuat otomatis',
      'Notifikasi ke tim saat ada yang perlu ditindaklanjuti',
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
