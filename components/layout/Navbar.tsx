'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const wa = waLink(waConsultMessage());

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(8,8,10,.78)] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-container items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" aria-label={`${site.name}, beranda`} className="relative block h-8 w-[100px] shrink-0">
          <Image
            src="/images/logo-wordmark.png"
            alt={site.name}
            fill
            sizes="100px"
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-body transition hover:bg-[rgba(255,255,255,.06)] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="whatsapp" href={wa} className="hidden min-h-10 sm:inline-flex">
            Chat WhatsApp
          </Button>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-lg text-strong hover:bg-[rgba(255,255,255,.06)] lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-page lg:hidden">
          <nav aria-label="Navigasi seluler" className="mx-auto flex max-w-container flex-col gap-1 px-5 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-body hover:bg-[rgba(255,255,255,.06)] hover:text-white"
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
