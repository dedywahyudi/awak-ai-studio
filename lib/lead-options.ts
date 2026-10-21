export const jenisKebutuhanGeneral = [
  'Audit Kebutuhan Gratis',
  'AI Chat',
  'Otomatisasi',
  'Solusi Custom',
  'Belum tahu, mau konsultasi dulu',
] as const;

export const jenisProyekCustom = [
  'Web App',
  'Mobile App',
  'Web + Mobile',
  'Sistem custom lainnya',
] as const;

export const budgetOptions = [
  '< Rp 25 jt',
  'Rp 25–50 jt',
  'Rp 50 jt+',
  'Belum tahu',
] as const;

/** ?kebutuhan= values on /kontak mapped to the option label they preselect. */
export const needFromQuery: Record<string, (typeof jenisKebutuhanGeneral)[number]> = {
  audit: 'Audit Kebutuhan Gratis',
  'ai-chat': 'AI Chat',
  otomatisasi: 'Otomatisasi',
};
