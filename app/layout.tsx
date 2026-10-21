import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { site } from '@/lib/site';
import { localBusinessJsonLd } from '@/lib/seo';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/ui/JsonLd';

// Self-hosted variable fonts: no third-party request, no layout shift.
const display = localFont({
  src: './fonts/PlusJakartaSans-variable.woff2',
  weight: '200 800',
  variable: '--font-display',
  display: 'swap',
});
const sans = localFont({
  src: './fonts/Inter-variable.woff2',
  weight: '100 900',
  variable: '--font-body',
  display: 'swap',
});
const mono = localFont({
  src: './fonts/JetBrainsMono-variable.woff2',
  weight: '100 800',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: AI untuk bisnis semua skala`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    title: `${site.name}: AI untuk bisnis semua skala`,
    description: site.description,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#07080c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={localBusinessJsonLd()} />
        <Analytics />
      </body>
    </html>
  );
}
