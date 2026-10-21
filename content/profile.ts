import { siVodafone, siWipro } from 'simple-icons';

/**
 * Track record shown on /tentang. Every fact here comes from the founder's own professional
 * profile; add or edit entries here, not in the page. Keep names and numbers exactly as stated.
 */
export const stats = [
  { value: '10+', label: 'tahun pengalaman sebagai engineer' },
  { value: '329+', label: 'proyek global untuk klien enterprise' },
  { value: '95%+', label: 'tingkat keberhasilan proyek' },
  { value: '82+', label: 'kemenangan kompetisi UI/UX dan frontend' },
] as const;

export interface Client {
  name: string;
  /** SVG path (24x24 viewBox) or an image under /public. Without either, the name shows as text. */
  path?: string;
  src?: string;
}

/**
 * Clients as given by the founder. Logos are monochrome versions of the files in public/clients/
 * (public/images/clients/); where none was uploaded, the name shows as text. Brand names and marks
 * belong to their owners.
 */
export const clients: Client[] = [
  { name: 'IBM', src: '/images/clients/ibm.png' },
  { name: 'GE', src: '/images/clients/ge-oil-gas.png' },
  { name: 'Topcoder', src: '/images/clients/topcoder.png' },
  { name: 'Distributed.com', src: '/images/clients/distributed.png' },
  { name: 'Vodafone', path: siVodafone.path },
  { name: 'Wipro', path: siWipro.path },
  { name: 'ABB', src: '/images/clients/abb.png' },
  { name: 'Cisco', src: '/images/clients/cisco.png' },
  { name: 'Hewlett Packard Enterprise', src: '/images/clients/hewlett-packard.png' },
  { name: 'BT', src: '/images/clients/bt.png' },
  { name: 'Manulife', src: '/images/clients/manulife.png' },
  { name: 'Comcast', src: '/images/clients/comcast.png' },
  { name: 'PepsiCo', src: '/images/clients/pepsico.png' },
  { name: 'Chevron', src: '/images/clients/chevron.png' },
  { name: 'Canon', src: '/images/clients/canon.png' },
  { name: 'Eaton', src: '/images/clients/eaton.png' },
  { name: 'Zurich', src: '/images/clients/zurich.png' },
  { name: 'John Hancock', src: '/images/clients/john-hancock.png' },
  { name: 'Ferguson', src: '/images/clients/ferguson.png' },
  { name: 'U.S. Department of Energy', src: '/images/clients/us-energy.png' },
  { name: 'PLN', src: '/images/clients/pln.png' },
  { name: 'Socfindo', src: '/images/clients/socfindo.png' },
  { name: 'Pemprovsu', src: '/images/clients/pemprovsu.png' },
  { name: 'Korlantas', src: '/images/clients/korlantas.png' },
  { name: 'Kemala Bhayangkari', src: '/images/clients/kemala-bhayangkari.png' },
  { name: 'Kemenpar', src: '/images/clients/kemenpar.png' },
  { name: 'HubDrajacoffee', src: '/images/clients/hub-draja.png' },
  { name: 'Alta Ski School', src: '/images/clients/alta-ski.png' },
  { name: 'Chill Bill', src: '/images/clients/chill-bill.png' },
  { name: 'Estrada', src: '/images/clients/estrada.png' },
  { name: 'Global Greens', src: '/images/clients/global-greens.png' },
  { name: 'Halo', src: '/images/clients/halo.png' },
  { name: 'MSC', src: '/images/clients/msc.png' },
  { name: 'Nterprisers', src: '/images/clients/nterprisers.png' },
  { name: 'Planet Freedom', src: '/images/clients/planet-freedom.png' },
  { name: 'RMA Architects', src: '/images/clients/rma.png' },
  { name: 'Sabatini Architects', src: '/images/clients/sabatini.png' },
  { name: 'ScrapsKC', src: '/images/clients/scrapskc.png' },
  { name: 'Titan', src: '/images/clients/titan.png' },
  { name: 'Treanor HL', src: '/images/clients/treanorhl.png' },
];

export interface Project {
  slug: string;
  title: string;
  /** Shown above the title; for client work under NDA or without a public name, keep it anonymous. */
  period: string;
  /** Card text. */
  summary: string;
  tags: string[];
  /** Detail page: a short intro, what was done, and the technologies. Facts only, no invented results. */
  intro: string;
  points: string[];
  stack: string[];
}

/** Selected projects, kept anonymous where the client or product is not named. */
export const projects: Project[] = [
  {
    slug: 'platform-tantangan-coding-ai',
    title: 'Platform tantangan coding berbasis AI',
    period: '2022 – sekarang',
    summary:
      'Memimpin pengembangan platform dengan arsitektur React dan Django, integrasi OpenAI, serta optimasi performa dan SEO.',
    tags: ['React', 'Django', 'OpenAI'],
    intro:
      'Platform tantangan coding yang memakai AI. Kami memimpin pengembangannya dan juga mengelola tantangan di situs komunitasnya.',
    points: [
      'Memimpin pengembangan platform tantangan coding berbasis AI.',
      'Merancang arsitektur frontend dan backend yang skalabel dengan React dan Django.',
      'Mengintegrasikan OpenAI ke dalam fitur platform.',
      'Meningkatkan performa frontend dan skalabilitas sistem, termasuk SEO dan struktur konten.',
      'Mengelola tantangan dari pembuatan sampai pengumuman pemenang, dan merancang tugas coding untuk komunitas.',
    ],
    stack: ['React', 'Django', 'Python', 'PostgreSQL', 'OpenAI'],
  },
  {
    slug: 'aplikasi-web-ai-bidang-medis',
    title: 'Aplikasi web AI untuk bidang medis',
    period: '2024 – 2025',
    summary:
      'Aplikasi web yang menganalisis pola aliran darah dan memprediksi hasil pascaprosedur. Kami mengerjakan frontend dan backend-nya.',
    tags: ['React', 'PostgreSQL', 'AI'],
    intro:
      'Aplikasi web berbasis AI untuk membantu prosedur medis, dengan menganalisis pola aliran darah dan memprediksi hasil pascaprosedur.',
    points: [
      'Mengembangkan dan memelihara frontend dan backend aplikasi.',
      'Menganalisis pola aliran darah sebagai dasar prediksi.',
      'Memprediksi hasil pascaprosedur untuk mendukung keputusan tenaga ahli.',
    ],
    stack: ['React', 'PostgreSQL'],
  },
  {
    slug: 'analisis-sentimen-media-sosial',
    title: 'Analisis sentimen media sosial',
    period: '2023 – 2024',
    summary: 'Aplikasi web dengan dasbor, laporan, dan peringatan untuk memantau reputasi online bisnis.',
    tags: ['UI/UX', 'Dasbor', 'Laporan'],
    intro:
      'Aplikasi web untuk menganalisis sentimen media sosial secara real-time, supaya bisnis bisa mengelola reputasi online dan menyusun strategi pemasaran.',
    points: [
      'Memimpin pengembangan aplikasi web analisis sentimen secara real-time.',
      'Membangun dasbor, laporan, dan peringatan.',
      'Membantu bisnis mengelola reputasi online dan mengoptimalkan strategi pemasaran.',
    ],
    stack: ['UI/UX', 'Desain aplikasi web'],
  },
  {
    slug: 'dashboard-command-center',
    title: 'Dashboard command center',
    period: '2023 – 2024',
    summary:
      'Sistem geospasial dengan peta 2D dan 3D: visualisasi real-time, pemantauan lalu lintas, animasi rute, dan pelacakan dinamis untuk manajemen acara.',
    tags: ['React', 'Mapbox', 'PostgreSQL'],
    intro:
      'Sistem geospasial untuk manajemen acara, dengan peta 2D dan 3D yang menampilkan data secara real-time.',
    points: [
      'Memimpin desain dan pengembangan sistem geospasial dengan Mapbox.',
      'Pemetaan 3D dan 2D untuk visualisasi real-time.',
      'Pemantauan lalu lintas, animasi rute, dan pelacakan dinamis.',
    ],
    stack: ['React', 'Mapbox', 'PostgreSQL'],
  },
  {
    slug: 'sistem-anggaran-ai',
    title: 'Sistem anggaran berbasis AI',
    period: '2019 – 2020',
    summary:
      'Sistem penganggaran keuangan enterprise untuk perusahaan skala nasional, dengan kolaborasi multi-kota dan pelacakan keuangan real-time.',
    tags: ['Enterprise', 'Keuangan', 'Real-time'],
    intro:
      'Sistem penganggaran keuangan enterprise untuk perusahaan skala nasional, dengan kolaborasi antar kota dan pelacakan keuangan real-time.',
    points: [
      'Memimpin pengembangan sistem penganggaran dari awal sampai akhir.',
      'Merancang arsitektur yang memungkinkan kolaborasi multi-kota.',
      'Pelacakan keuangan real-time dan alur kerja yang kompleks lintas tim.',
    ],
    stack: ['Aplikasi web', 'Enterprise'],
  },
  {
    slug: 'platform-personalisasi-kondisi-diri',
    title: 'Platform personalisasi kondisi diri dan performa',
    period: 'Tahap beta',
    summary:
      'Platform yang memilih dan menyusun sesi latihan sesuai momen pengguna, lalu mengukur perubahannya untuk personalisasi berikutnya.',
    tags: ['Personalisasi', 'Rekomendasi sesi', 'Beta'],
    intro:
      'Platform beta yang membantu pengguna bersiap menghadapi momen penting atau pulih setelahnya, lewat sesi yang disusun sesuai kebutuhan mereka.',
    points: [
      'Pengguna menceritakan momen yang sedang dihadapi.',
      'Pengguna memilih kondisi yang diinginkan, misalnya tenang atau fokus.',
      'Sistem memilih dan menyusun sesi latihan yang sesuai.',
      'Pengguna mencatat perubahan, supaya pengalaman berikutnya makin personal.',
    ],
    stack: ['Personalisasi', 'Rekomendasi sesi'],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug) ?? null;
