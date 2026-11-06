/**
 * Rules for the Instagram caption drafted from a blog post (see lib/social.ts and scripts/social-draft.mjs).
 * Edit this file to change the style; no code change needed. Hashtags are plain starting points: replace them
 * with the ones you want to be known for. Never add claims or numbers here: captions only reuse the post's own text.
 */
export interface SocialConfig {
  /** Added to every caption. */
  baseHashtags: string[];
  /** Added by post category. */
  categoryHashtags: Record<string, string[]>;
  /** Added when the post title, excerpt or body matches. */
  keywordHashtags: { match: RegExp; tag: string }[];
  /** Total hashtags per caption, in the order: base, category, keyword. */
  maxHashtags: number;
  /** Closing line by category. Instagram captions cannot hold clickable links, so the link lives in the bio. */
  callToAction: Record<string, string>;
  defaultCallToAction: string;
  /** How many section headings from the post are listed as points. */
  maxPoints: number;
  /** Instagram allows 2,200 characters. */
  maxLength: number;
}

export const socialConfig: SocialConfig = {
  baseHashtags: ['#AwakAIStudio', '#AIuntukBisnis'],
  categoryHashtags: {
    'AI untuk UMKM': ['#AIChat', '#BisnisDigital'],
    'Studi Kasus': ['#StudiKasus', '#TransformasiDigital'],
    'Tips Digital': ['#TipsBisnis', '#OtomatisasiBisnis'],
  },
  keywordHashtags: [
    { match: /whatsapp/i, tag: '#WhatsAppBisnis' },
    { match: /otomatisasi/i, tag: '#OtomatisasiBisnis' },
    { match: /dasbor|dashboard/i, tag: '#DasborData' },
    { match: /sentimen/i, tag: '#AnalisisSentimen' },
    { match: /data sensitif|pelindungan data/i, tag: '#KeamananData' },
    { match: /\b(iot|cctv|sensor)\b/i, tag: '#IoT' },
  ],
  maxHashtags: 7,
  callToAction: {
    'AI untuk UMKM': 'Ingin tahu apa yang cocok untuk bisnis Anda? Baca selengkapnya, link di bio.',
    'Studi Kasus': 'Baca cerita lengkap proyeknya, link di bio.',
    'Tips Digital': 'Baca tipsnya selengkapnya, link di bio.',
  },
  defaultCallToAction: 'Baca selengkapnya, link di bio.',
  maxPoints: 4,
  maxLength: 2200,
};
