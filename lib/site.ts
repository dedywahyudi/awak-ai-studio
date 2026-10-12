/**
 * Single source of truth for brand + contact details.
 * Brand name is not final in the brief: rename it here and it propagates everywhere.
 */
export const site = {
  name: 'Awak AI Studio',
  shortName: 'Awak',
  tagline: 'Bangun. Otomatisasi. Lepas Landas.',
  description:
    'Agensi digital berbantuan AI di Medan. Chatbot WhatsApp, konten rutin, otomatisasi, dan web app custom untuk UMKM. Ditangani langsung engineer senior.',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  locale: 'id_ID',
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
  city: 'Medan',
  region: 'Sumatera Utara',
  country: 'ID',
  // Fill the ones you use; empty values are not rendered.
  social: {
    instagram: '',
    linkedin: '',
    youtube: '',
    facebook: '',
  },
  founder: {
    name: 'Dedy Wahyudi',
    role: 'Founder & Senior Product Engineer',
  },
} as const;

export const nav = [
  { href: '/layanan', label: 'Layanan' },
  { href: '/demo', label: 'Demo' },
  { href: '/studi-kasus', label: 'Studi Kasus' },
  { href: '/harga', label: 'Harga' },
  { href: '/blog', label: 'Blog' },
  { href: '/tentang', label: 'Tentang' },
] as const;

export const footerLinks = {
  layanan: [
    { href: '/layanan#marketing-ai', label: 'Marketing AI' },
    { href: '/layanan#ai-chat', label: 'AI Chat' },
    { href: '/layanan#otomatisasi', label: 'Otomatisasi' },
    { href: '/solusi-custom', label: 'Solusi Custom' },
  ],
  perusahaan: [
    { href: '/tentang', label: 'Tentang Kami' },
    { href: '/studi-kasus', label: 'Studi Kasus' },
    { href: '/blog', label: 'Blog' },
    { href: '/kontak', label: 'Kontak' },
  ],
} as const;
