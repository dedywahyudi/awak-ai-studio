/** @type {import('next').NextConfig} */

// Allow cover images stored in Supabase Storage (host derived from env, if set).
const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: supabaseHost
      ? [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/**' }]
      : [],
  },
  async redirects() {
    return [
      { source: '/harga', destination: '/layanan', permanent: true },
      { source: '/demo', destination: '/studi-kasus', permanent: true },
      { source: '/studi-kasus/membangun-awak-ai-studio', destination: '/studi-kasus', permanent: true },
      // Old audit link (the contact form with ?kebutuhan=audit) now has its own page.
      { source: '/kontak', has: [{ type: 'query', key: 'kebutuhan', value: 'audit' }], destination: '/audit-gratis', permanent: true },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
