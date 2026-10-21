'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectImage } from '@/content/projects';

/**
 * Screenshot showcase. Two layouts, chosen from the images themselves:
 * - web: one large screenshot in a browser frame, with a thumbnail strip to switch between them (tall
 *   pages are cropped to the top);
 * - phone: the screens side by side in phone frames, scrolling sideways on small screens.
 */
/** Brand watermark: white logo mark and wordmark, centred over a screenshot. */
function Watermark({ className, logoClass = 'h-[12%]' }: { className?: string; logoClass?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center gap-[3%] opacity-30 drop-shadow-[0_1px_6px_rgba(0,0,0,.6)]',
        className,
      )}
    >
      <Image src="/images/logo-mark.png" alt="" width={600} height={594} className={cn(logoClass, 'w-auto brightness-0 invert')} />
      <Image src="/images/logo-wordmark.png" alt="" width={900} height={308} className={cn(logoClass, 'w-auto brightness-0 invert')} />
    </span>
  );
}

export function ProjectShowcase({ gallery }: { gallery: ProjectImage[] }) {
  const [index, setIndex] = useState(0);
  if (gallery.length === 0) return null;

  const phone = gallery.every((s) => s.width <= 600 && s.height > s.width);

  if (phone) {
    return (
      <ul
        aria-label="Layar aplikasi"
        className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
      >
        {gallery.map((shot) => (
          <li key={shot.src} className="w-[170px] shrink-0 snap-start md:w-[190px]">
            <div className="flex flex-col gap-2">
              <span className="block rounded-[26px] border border-line-strong bg-black p-1.5">
                <span className="relative block aspect-[9/19] overflow-hidden rounded-[20px] bg-section">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="190px"
                    className="size-full object-cover object-top"
                  />
                  <Watermark logoClass="h-[8%]" />
                </span>
              </span>
              <span className="text-center text-xs leading-snug text-muted">{shot.alt}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  const current = gallery[index]!;
  const go = (delta: number) => setIndex((i) => (i + delta + gallery.length) % gallery.length);

  return (
    <div className="flex flex-col gap-3">
      <figure className="overflow-hidden rounded-card border border-line-strong bg-card">
        <div className="flex items-center gap-3 border-b border-line bg-section px-4 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
            <span className="size-2.5 rounded-full bg-line-strong" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-md bg-card px-3 py-1 text-center text-xs text-muted">
            {current.alt}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-section">
          {gallery.map((shot, i) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 896px) 880px, 100vw"
              priority={i === 0}
              aria-hidden={i === index ? undefined : true}
              className={cn(
                'absolute inset-0 size-full transition-opacity duration-300',
                shot.height > shot.width * 0.75 ? 'object-cover object-top' : 'object-contain',
                i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
            />
          ))}
          <Watermark />
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Tangkapan layar sebelumnya"
                className="absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-[rgba(8,8,10,.78)] text-strong backdrop-blur-md hover:border-accent-ring"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Tangkapan layar berikutnya"
                className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-[rgba(8,8,10,.78)] text-strong backdrop-blur-md hover:border-accent-ring"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        <figcaption className="flex items-center justify-between gap-3 border-t border-line px-4 py-2 text-xs text-muted">
          <span>{current.alt}</span>
          <span className="font-mono">
            {index + 1} / {gallery.length}
          </span>
        </figcaption>
      </figure>

      {gallery.length > 1 && (
        <ul aria-label="Pilih tangkapan layar" className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-7">
          {gallery.map((shot, i) => (
            <li key={shot.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={shot.alt}
                aria-current={i === index ? 'true' : undefined}
                className={cn(
                  'relative block aspect-[16/10] w-full overflow-hidden rounded-lg border bg-section transition',
                  i === index ? 'border-accent-ring ring-2 ring-[rgba(19,144,251,.45)]' : 'border-line opacity-70 hover:opacity-100',
                )}
              >
                <Image
                  src={shot.src}
                  alt=""
                  width={shot.width}
                  height={shot.height}
                  sizes="120px"
                  className="size-full object-cover object-top"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
