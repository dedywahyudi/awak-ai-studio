import { shortIdr } from '@/lib/utils';

/**
 * Single source of truth for prices. Every page (home, /layanan,
 * JSON-LD) reads from here, so a price change is a one-line edit.
 * All amounts are IDR. `setup: null` = no setup fee.
 */
/**
 * Price display switch. false = "Harga sesuai permintaan": no amounts anywhere (cards, pages, FAQ, AI knowledge
 * feed), but every service still says there is a monthly fee after setup. The amounts below stay as the
 * internal reference. Set to true to show "mulai dari" prices again.
 */
export const showPrices = false;

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
    tagline: 'Asisten yang menjawab dari data bisnis Anda, 24 jam, di kanal mana pun yang Anda pakai.',
    setup: 10_000_000,
    monthly: 2_000_000,
    features: [
      'Menjawab dari data Anda, online maupun offline',
      'Dipasang di WhatsApp, website, aplikasi, atau kanal lain',
      'Diteruskan ke tim Anda saat bot tidak yakin',
      'Data tetap di database Anda, tidak melatih model',
      'Laporan pertanyaan yang belum terjawab tiap bulan',
    ],
    ctaLabel: 'Hubungi Kami',
    featured: true,
    badge: 'Mulai dari sini',
  },
  {
    id: 'otomatisasi',
    categoryId: 'operasional',
    name: 'Otomatisasi',
    tagline: 'Pekerjaan berulang jalan sendiri, dari kanal atau sistem apa pun: form, chat, email, spreadsheet, API, dan lainnya.',
    setup: 15_000_000,
    monthly: 2_500_000,
    features: [
      'Hingga 5 alur kerja, mulai dari satu paket awal',
      'Terhubung ke WhatsApp, email, form, spreadsheet, CRM, dan API',
      'Penawaran dan invoice dibuat otomatis, Anda setujui dulu',
      'Dipantau dan diperbaiki bila alur gagal',
      'Akun dan data tetap milik Anda',
    ],
    ctaLabel: 'Hubungi Kami',
  },
  {
    id: 'custom',
    categoryId: 'bangun',
    name: 'Solusi Custom',
    tagline: 'Dari ide sampai rilis: web app, aplikasi mobile, atau integrasi sistem.',
    setup: 25_000_000,
    monthly: 3_000_000,
    features: [
      'Web app, aplikasi mobile, atau keduanya, sesuai kebutuhan',
      'Otomatisasi alur kerja dan integrasi IoT seperti CCTV dan sensor',
      'Diawali sesi discovery berbayar untuk menetapkan lingkup',
      'Pembayaran bertahap per milestone yang disepakati',
      'Dikerjakan langsung engineer senior, dengan maintenance bulanan',
    ],
    ctaLabel: 'Hubungi Kami',
  },
];

/** The two products shown as cards. Custom is shown as a separate contact band. */
export const customProduct = products.find((p) => p.id === 'custom') as Product;

export const getProduct = (id: ProductId) => products.find((p) => p.id === id) as Product;

/** Small label above the big price. */
export const priceLabel = showPrices ? 'Mulai dari' : 'Harga';

/** Big line on a card: the first thing the buyer pays, or "Hubungi untuk penawaran". */
export const headlinePrice = (p: Product) => (showPrices ? shortIdr(p.setup ?? p.monthly) : 'Hubungi untuk penawaran');

/** Small line under the big price. Always says there is a monthly fee. */
export const priceNote = (p: Product) => {
  if (!showPrices) {
    return p.setup === null
      ? 'Biaya bulanan, tanpa biaya setup'
      : `${p.id === 'custom' ? 'Biaya build' : 'Biaya setup'} sekali, lalu biaya bulanan`;
  }
  return p.setup === null
    ? '/ bulan, tanpa biaya setup'
    : `${p.id === 'custom' ? 'build' : 'setup'} + ${shortIdr(p.monthly)} / bulan`;
};

/** Sentence under the price section: how the number is reached. */
export const priceDisclaimer = showPrices
  ? 'Harga di atas adalah titik awal; angka final kami tulis setelah konsultasi.'
  : 'Harga disesuaikan dengan kebutuhan dan dikirim tertulis setelah konsultasi, sebelum Anda membayar. Semua layanan berbayar punya biaya bulanan setelah setup selesai.';

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
