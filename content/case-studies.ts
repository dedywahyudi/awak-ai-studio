export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  challenge: string;
  approach: { title: string; body: string }[];
  stack: string[];
  result: string;
}

/**
 * Case studies are static content on purpose: few, hand-written, rarely changed.
 * Add a new object here and /studi-kasus, the detail page, and the sitemap pick it up.
 * Add real metrics only when you have them; never invent numbers.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'membangun-awak-ai-studio',
    title: 'Membangun agensi AI satu orang, dengan sistem AI',
    client: 'Awak AI Studio (internal)',
    category: 'Studi kasus internal',
    summary:
      'Bagaimana kami membangun website, alur lead, dan mesin konten kami sendiri dengan alat yang sama yang kami tawarkan ke klien.',
    challenge:
      'Agensi dengan satu engineer senior harus tampil profesional, merespons calon klien cepat, dan rutin menerbitkan konten, tanpa tim besar dan tanpa biaya bulanan yang berat.',
    approach: [
      {
        title: 'Website cepat dan ringan biaya',
        body: 'Next.js di Vercel, Supabase untuk data, dan Resend untuk email. Biaya operasional awal mendekati nol, dengan jalur upgrade yang jelas bila trafik naik.',
      },
      {
        title: 'Lead tidak boleh hilang',
        body: 'Setiap formulir tersimpan di database, mengirim email ke pemilik, dan memicu notifikasi lewat otomatisasi. Tombol WhatsApp ada di semua halaman karena itu kanal utama calon klien.',
      },
      {
        title: 'Konten dibantu AI, disetujui manusia',
        body: 'Draf artikel dan caption dibuat dengan bantuan AI, lalu ditinjau sebelum tayang. Tidak ada auto-publish tanpa persetujuan.',
      },
      {
        title: 'Harga jelas di depan',
        body: 'Semua harga berasal dari satu file konfigurasi, jadi perubahan harga tidak perlu menyentuh banyak halaman.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Resend', 'n8n', 'Vercel'],
    result:
      'Website, formulir lead, dan blog berjalan dari satu codebase. Hasil terukur (jumlah lead dan waktu respons) akan ditambahkan di sini setelah ada data nyata.',
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug) ?? null;
