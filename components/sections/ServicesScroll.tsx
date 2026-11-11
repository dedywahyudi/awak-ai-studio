import type { CSSProperties } from 'react';
import DimensionalWorkflowHero, { type ScrollExperienceContent } from '@/components/ui/dimensional-workflow-hero';

/**
 * Scroll-driven tour of the three services on the home page.
 * Copy mirrors content/services.ts. No prices here: those live in lib/pricing.ts.
 * The diagrams are illustrative, not live data.
 */
function buildContent(eyebrow: string, seeAllHref: string): ScrollExperienceContent {
  return {
  ariaLabel: 'Tiga layanan Awak AI Studio',
  skip: { label: 'Lewati demonstrasi animasi', target: '#layanan-selesai' },
  intro: {
    eyebrow,
    title: { lines: ['Tiga layanan.', 'Satu alur kerja.'], emphasis: 'Satu alur kerja.' },
    description: [
      'Jawab pelanggan, otomatiskan pekerjaan admin,',
      'dan bangun sistem sesuai bisnis Anda.',
    ],
    cta: 'Lihat cara kerjanya',
  },
  chapters: [
    {
      kind: 'workflow',
      name: 'AI Chat',
      tag: 'MENJAWAB PELANGGAN',
      title: ['Jawaban dari data Anda.', 'Tim turun tangan saat perlu.'],
      description:
        'Asisten AI menjawab berdasarkan data bisnis Anda di kanal mana pun, lalu meneruskan ke tim saat tidak yakin.',
      color: '#47cffb',
      steps: [
        { title: 'Pelanggan bertanya', body: 'Pertanyaan masuk lewat WhatsApp, website, atau kanal lain.' },
        { title: 'Asisten AI', body: 'Mencari jawaban dari data yang sudah Anda setujui.' },
        { title: 'Dijawab atau diteruskan', body: 'Menjawab pelanggan, atau menyerahkan percakapan ke tim Anda.' },
      ],
      status: 'Data bisnis terhubung',
      diagram: {
        nodes: [
          { icon: 'message-square', label: 'Pelanggan bertanya', caption: 'WHATSAPP / WEBSITE', x: 5, y: 34, step: 0, color: '#5aa2ff' },
          { icon: 'bot', label: 'Asisten AI', caption: 'DATA ANDA', x: 35, y: 34, step: 1, color: '#47cffb' },
          { icon: 'check', label: 'Kirim jawaban', caption: 'JAWABAN DITEMUKAN', x: 74, y: 17, step: 2, color: '#55e2a0' },
          { icon: 'user-round', label: 'Serahkan ke tim', caption: 'BUTUH TIM ANDA', x: 74, y: 57, step: 2, color: '#ffc66c' },
        ],
        edges: [
          { from: 0, to: 1 },
          { from: 1, to: 2 },
          { from: 1, to: 3 },
        ],
        note: 'SATU PERCAKAPAN · DUA KEMUNGKINAN HASIL',
      },
    },
    {
      kind: 'workflow',
      name: 'Otomatisasi',
      tag: 'PEKERJAAN ADMIN',
      title: ['Satu pemicu.', 'Semua langkah berjalan.'],
      description:
        'Follow-up lead, penawaran, dan pengingat berjalan otomatis, disetujui Anda sebelum terkirim.',
      color: '#1390fb',
      steps: [
        { title: 'Permintaan masuk', body: 'Dari form, chat, atau email.' },
        { title: 'Periksa data', body: 'Memeriksa kelengkapan dan aturan persetujuan.' },
        { title: 'Jalankan tindakan', body: 'Memperbarui data Anda dan memberi tahu tim.' },
      ],
      status: 'Aturan persetujuan aktif',
      diagram: {
        nodes: [
          { icon: 'mail', label: 'Permintaan baru', caption: 'FORM / EMAIL', x: 5, y: 19, step: 0, color: '#5aa2ff' },
          { icon: 'shield-check', label: 'Periksa data', caption: 'ATURAN & PERSETUJUAN', x: 35, y: 19, step: 1, color: '#47cffb' },
          { icon: 'database', label: 'Perbarui data', caption: 'TERSINKRON', x: 72, y: 19, step: 2, color: '#55e2a0' },
          { icon: 'bell', label: 'Beri tahu tim', caption: 'PEMILIK DIKABARI', x: 35, y: 65, step: 2, color: '#ffc66c' },
        ],
        edges: [
          { from: 0, to: 1 },
          { from: 1, to: 2 },
          { from: 1, to: 3, out: 'bottom', in: 'top' },
        ],
        note: 'SATU PEMICU · DUA TINDAKAN TERHUBUNG',
      },
    },
    {
      kind: 'build',
      name: 'Solusi Custom',
      tag: 'WEB, MOBILE & INTEGRASI',
      title: ['Bukan template.', 'Dibuat untuk bisnis Anda.'],
      description:
        'Web app, aplikasi mobile, dan integrasi perangkat seperti CCTV dan sensor, dibuat sesuai alur bisnis Anda.',
      color: '#5aa2ff',
      steps: [
        { title: 'Susun data', body: 'Mulai dari informasi yang perlu disimpan sistem Anda.' },
        { title: 'Bangun logika', body: 'Hubungkan data ke fitur dan interaksi yang berguna.' },
        { title: 'Wujudkan', body: 'Ubah sistem yang berjalan menjadi aplikasi siap pakai.' },
      ],
      status: 'Dari struktur ke layar',
      footer: 'Web app · Aplikasi mobile · Integrasi perangkat',
    },
  ],
  finale: {
    eyebrow: 'MULAI DARI AUDIT GRATIS',
    title: { lines: ['Pekerjaan berjalan otomatis.', 'Keputusan tetap di tangan Anda.'], emphasis: 'Keputusan tetap di tangan Anda.' },
    secondaryCta: { label: 'Lihat Semua Layanan', href: seeAllHref },
    cta: { label: 'Minta Audit Gratis', href: '/audit-gratis' },
  },
  navLabel: 'Pilih layanan',
  footer: { disclaimer: 'ALUR ILUSTRATIF · BUKAN DASHBOARD LIVE', scrollHint: 'GULIR UNTUK MELIHAT' },
  };
}

/** Maps the site's CSS-variable tokens (app/globals.css) onto the component's theme variables. */
const theme = {
  '--color-background': 'var(--surface-page)',
  '--color-foreground': 'var(--text-strong)',
  '--color-card': 'var(--surface-card)',
  '--color-card-foreground': 'var(--text-strong)',
  '--color-muted-foreground': 'var(--text-muted)',
  '--color-border': 'var(--border-default)',
  '--color-primary': 'var(--blue-500)',
  '--color-primary-foreground': '#ffffff',
  '--color-hero-accent': 'var(--blue-400)',
  '--workflow-panel-accent': 'var(--blue-400)',
  '--workflow-panel-background': 'var(--surface-card)',
  '--workflow-canvas-background': 'var(--surface-section)',
  '--workflow-panel-muted': 'var(--text-muted)',
  '--workflow-shadow-color': 'var(--black-1000)',
  '--workflow-signal-color': 'var(--blue-200)',
  '--workflow-code-purple': 'var(--blue-450)',
  '--workflow-code-blue': 'var(--blue-300)',
  '--workflow-code-gold': '#ffc66c',
  '--font-hero-body': 'var(--font-body), system-ui, sans-serif',
  '--font-hero-display': 'var(--font-display), system-ui, sans-serif',
  '--font-hero-mono': 'var(--font-mono), ui-monospace, monospace',
} as CSSProperties;

interface ServicesScrollProps {
  /** Small label above the intro title. */
  eyebrow?: string;
  /** Where "Lihat Semua Layanan" points: another page, or an anchor on the same page. */
  seeAllHref?: string;
  /** Use 1 when this is the page's main heading. */
  headingLevel?: 1 | 2;
}

export function ServicesScroll({ eyebrow = '01 — LAYANAN', seeAllHref = '/layanan', headingLevel = 2 }: ServicesScrollProps) {
  return (
    <>
      <DimensionalWorkflowHero content={buildContent(eyebrow, seeAllHref)} style={theme} headingLevel={headingLevel} />
      <div id="layanan-selesai" tabIndex={-1} className="h-px" />
    </>
  );
}
