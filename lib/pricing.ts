import { shortIdr } from '@/lib/utils';

/**
 * Single source of truth for prices. Every page (home, /harga, /layanan,
 * /solusi-custom, JSON-LD) reads from here, so a price change is a one-line edit.
 * All amounts are IDR. `setup: null` = no setup fee.
 */
export type ProductId = 'marketing-ai' | 'ai-chat' | 'otomatisasi' | 'custom';

export interface Product {
  id: ProductId;
  name: string;
  tagline: string;
  setup: number | null;
  monthly: number;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'marketing-ai',
    name: 'Marketing AI',
    tagline: 'Konten rutin untuk media sosial dan blog, dibantu AI dan direview manusia.',
    setup: null,
    monthly: 2_500_000,
    features: [
      '8 postingan + 2 artikel blog per bulan',
      'Draf dari AI, direview manusia sebelum tayang',
      'Foto produk asli dirapikan, bukan produk rekayasa',
      'Panduan gaya bahasa dan kalender konten',
      'Kontrak minimal 3 bulan',
    ],
    ctaLabel: 'Konsultasi Gratis',
  },
  {
    id: 'ai-chat',
    name: 'AI Chat',
    tagline: 'Chatbot yang menjawab dari data bisnis Anda, 24 jam di WhatsApp dan website.',
    setup: 5_000_000,
    monthly: 1_500_000,
    features: [
      'Menjawab harga, stok, dan jam buka dari data Anda',
      'Aktif di WhatsApp dan website',
      'Diteruskan ke tim Anda saat perlu',
      'Data tetap di database Anda, tidak dipakai melatih model',
      'Laporan pertanyaan yang belum terjawab tiap bulan',
    ],
    ctaLabel: 'Chat WhatsApp',
    featured: true,
    badge: 'Mulai dari sini',
  },
  {
    id: 'otomatisasi',
    name: 'Otomatisasi',
    tagline: 'Pekerjaan berulang jalan sendiri: dari form, WhatsApp, dan spreadsheet ke sistem Anda.',
    setup: 10_000_000,
    monthly: 1_500_000,
    features: [
      'Hingga 5 alur kerja otomatis',
      'Lead baru masuk ke Sheets atau CRM, tim Anda langsung diberi tahu',
      'Penawaran, invoice, dan laporan dibuat otomatis',
      'Dipantau dan diperbaiki bila alur gagal',
      'Akun dan data tetap milik Anda',
    ],
    ctaLabel: 'Cek Alur Kerja Anda',
  },
  {
    id: 'custom',
    name: 'Solusi Custom',
    tagline: 'Dari ide sampai rilis: web app, aplikasi mobile, atau integrasi sistem.',
    setup: 20_000_000,
    monthly: 1_500_000,
    features: [
      'Diawali sesi discovery berbayar',
      'Lingkup dan estimasi tertulis sebelum mulai',
      'Pembayaran bertahap per milestone',
      'Dikerjakan langsung oleh engineer senior',
      'Maintenance bulanan setelah rilis',
    ],
    ctaLabel: 'Hubungi Kami',
  },
];

/** The three products shown as cards. Custom is shown as a separate contact band. */
export const cardProducts = products.filter((p) => p.id !== 'custom');
export const customProduct = products.find((p) => p.id === 'custom') as Product;

export const getProduct = (id: ProductId) => products.find((p) => p.id === id) as Product;

/** Big number on a card: the first thing the buyer pays. */
export const headlinePrice = (p: Product) => shortIdr(p.setup ?? p.monthly);

/** Small line under the big number. */
export const priceNote = (p: Product) =>
  p.setup === null
    ? '/ bulan, tanpa biaya setup'
    : `${p.id === 'custom' ? 'build' : 'setup'} + ${shortIdr(p.monthly)} / bulan`;

/** Used in the discovery FAQ. Edit if you change the discovery fee. */
export const discoveryRange = 'Rp 2–5 jt';
