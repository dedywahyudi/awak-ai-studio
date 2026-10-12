import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail } from 'lucide-react';
import { footerLinks, site } from '@/lib/site';
import { Container } from '@/components/ui/Section';

const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  facebook: 'Facebook',
};

export function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-line bg-black pb-24 pt-14 md:pb-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="relative block h-9 w-[112px]">
              <Image
                src="/images/logo-wordmark.png"
                alt={site.name}
                fill
                sizes="112px"
                className="object-contain object-left"
              />
            </div>
            <p className="font-display text-base font-bold text-strong">{site.tagline}</p>
            <p className="max-w-xs text-sm text-muted">
              Tim lokal di {site.city}. Setiap klien ditangani langsung oleh engineer senior.
            </p>
          </div>

          <FooterColumn title="Layanan" links={footerLinks.layanan} />
          <FooterColumn title="Perusahaan" links={footerLinks.perusahaan} />

          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">Kontak</h3>
            <p className="flex items-start gap-2 text-sm text-body">
              <MapPin size={16} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
              {site.city}, {site.region}
            </p>
            {site.email && (
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm text-body hover:text-white">
                <Mail size={16} className="shrink-0 text-muted" aria-hidden="true" />
                {site.email}
              </a>
            )}
            {socials.length > 0 && (
              <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-body hover:text-white">
                      {socialLabels[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-subtle md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Semua hak dilindungi.
          </p>
          <Link href="/kebijakan-privasi" className="hover:text-white">
            Kebijakan Privasi
          </Link>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-body hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
