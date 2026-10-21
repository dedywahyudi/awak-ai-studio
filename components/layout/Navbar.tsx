'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { NavTabs } from '@/components/ui/vercel-tabs';

/** Active when the current path is the item's path or a child of it. Query-string items never match. */
const isActive = (pathname: string, href: string) =>
  !href.includes('?') && (pathname === href || pathname.startsWith(`${href}/`));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const wa = waLink(waConsultMessage());

  // Transparent over the hero (its animation shows behind), solid blurred bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled || open
          ? 'border-line bg-[rgba(8,8,10,.78)] backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" aria-label={`${site.name}, beranda`} className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain"
          />
          <span className="relative block h-8 w-[100px]">
          <Image
            src="/images/logo-wordmark.png"
            alt={site.name}
            fill
            sizes="100px"
            priority
            className="object-contain object-left"
          />
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <NavTabs tabs={nav} />
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="whatsapp" href={wa} className="min-h-10 px-4">
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Chat WhatsApp</span>
          </Button>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-lg text-strong hover:bg-[rgba(255,255,255,.06)] xl:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-page xl:hidden">
          <nav aria-label="Navigasi seluler" className="mx-auto flex max-w-container flex-col gap-1 px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className={`rounded-lg px-3 py-3 text-base font-medium hover:bg-[rgba(255,255,255,.06)] ${
                  isActive(pathname, item.href) ? 'bg-accent-soft text-link' : 'text-body hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="whatsapp" href={wa} fullWidth className="mt-2">
              Chat WhatsApp
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
