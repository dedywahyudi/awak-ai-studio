import { shortIdr } from '@/lib/utils';

/**
 * Single source of truth for prices. Every page (home, /layanan,
 * /solusi-custom, JSON-LD) reads from here, so a price change is a one-line edit.
 * All amounts are IDR. `setup: null` = no setup fee.
 */
export type ProductId = 'ai-chat' | 'otomatisasi' | 'custom';
export type CategoryId = 'layani-pelanggan' | 'operasional' | 'bangun';

/**
 * Service categories group products by the job the customer wants done, not by technology.
 * Add a new product by giving it a categoryId; add a new category only for a new job.
 */
export const categories: { id: CategoryId; name: string; job: string }[] = [
  { id: 'layani-pelanggan', name: 'Layani Pelanggan', job: 'Balas, catat, dan tindak lanjuti pelanggan Anda.' },
  { id: 'operasional', name: 'Operasional', job: 'Pekerjaan admin yang berulang berjalan sendiri.' },
  { id: 'bangun', name: 'Bangun', job: 'Aplikasi dan sistem khusus yang dibuat dari nol.' },
];

/**
 * Starter packages inside Otomatisasi. Each is one workflow; the Rp 10 jt setup covers up to
 * five workflows, so packages carry no separate price. Only status 'live' is shown on the site.
 */
export const otomatisasiPackages = [
  {
    id: 'follow-up-lead',
    name: 'Follow-up Lead',
    job: 'Lead baru yang tidak dibalas diingatkan otomatis ke tim dan ke calon klien.',
    status: 'live',
  },
  {
    id: 'penawaran-otomatis',
    name: 'Penawaran Otomatis',
    job: 'Penawaran dan invoice dibuat dari data permintaan, siap dikirim setelah Anda setujui.',
    status: 'live',
  },
  {
    id: 'pengingat-ulasan',
    name: 'Pengingat dan Ulasan',
    job: 'Pengingat janji temu atau pembayaran, lalu permintaan ulasan setelah layanan selesai.',
    status: 'live',
  },
] as const;

export interface Product {
  id: ProductId;
  categoryId: CategoryId;
  name: string;
  tagline: string;
  setup: number | null;
  monthly: number;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
  badge?: string;
}

/** Optional add-on for AI Chat: appointment booking and WhatsApp reminders. Monthly range, IDR. */
export const bookingModule = { name: 'Booking dan pengingat', from: 500_000, to: 1_000_000 } as const;

export const products: Product[] = [
  {
    id: 'ai-chat',
    categoryId: 'layani-pelanggan',
    name: 'AI Chat',
    tagline: 'Asisten yang menjawab dari data bisnis Anda, 24 jam di WhatsApp dan website.',
    setup: 10_000_000,
    monthly: 2_000_000,
    features: [
      'Menjawab harga, stok, dan jam buka dari data Anda',
      'Aktif di WhatsApp dan website',
      'Diteruskan ke tim Anda saat perlu',
      'Data tetap di database Anda, tidak dipakai melatih model',
      'Laporan pertanyaan yang belum terjawab tiap bulan',
      `Modul booking dan pengingat (opsional, +${shortIdr(bookingModule.from)} sampai ${shortIdr(bookingModule.to)} / bulan)`,
    ],
    ctaLabel: 'Chat WhatsApp',
    featured: true,
    badge: 'Mulai dari sini',
  },
  {
    id: 'otomatisasi',
    categoryId: 'operasional',
    name: 'Otomatisasi',
    tagline: 'Pekerjaan berulang jalan sendiri: dari form, WhatsApp, dan spreadsheet ke sistem Anda.',
    setup: 15_000_000,
    monthly: 2_500_000,
    features: [
      'Hingga 5 alur kerja, dimulai dari satu paket: Follow-up Lead, Penawaran Otomatis, atau Pengingat dan Ulasan',
      'Lead baru masuk ke Sheets atau CRM, tim Anda langsung diberi tahu',
      'Penawaran dan invoice dibuat otomatis, disetujui Anda sebelum terkirim',
      'Dipantau dan diperbaiki bila alur gagal',
      'Pengingat janji temu atau pembayaran dan permintaan ulasan terkirim otomatis',
      'Akun dan data tetap milik Anda',
    ],
    ctaLabel: 'Cek Alur Kerja Anda',
  },
  {
    id: 'custom',
    categoryId: 'bangun',
    name: 'Solusi Custom',
    tagline: 'Dari ide sampai rilis: web app, aplikasi mobile, atau integrasi sistem.',
    setup: 25_000_000,
    monthly: 3_000_000,
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

/** The two products shown as cards. Custom is shown as a separate contact band. */
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

/**
 * Free entry offer, shown as a band above the cards (not a card). It is a lead magnet:
 * keep it bounded (one conversation, one short written summary) so it stays cheap to deliver.
 */
export const auditProduct = {
  name: 'Audit Kebutuhan Gratis',
  turnaroundDays: 3,
  tagline: 'Sebelum mulai, kami audit apa yang sebenarnya dibutuhkan bisnis Anda. Gratis dan tanpa kewajiban.',
  features: [
    'Satu sesi konsultasi: kami pelajari bisnis, alur kerja, dan masalah yang ingin Anda selesaikan',
    'Ringkasan tertulis dalam 3 hari kerja: kebutuhan Anda dan layanan yang paling masuk akal, termasuk bila jawabannya belum perlu AI',
    'Bila Anda mau lanjut, kami tulis estimasi biaya sebelum Anda membayar apa pun',
  ],
  ctaLabel: 'Minta Audit Gratis',
  href: '/audit-gratis',
} as const;
