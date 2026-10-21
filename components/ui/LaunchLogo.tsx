'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

/** 'Bangun. Otomatisasi. Lepas Landas.' without the periods. */
const TAGLINE = site.tagline
  .split(/(?<=\.)\s+/)
  .map((w) => w.replace(/\.$/, ''))
  .join('  ·  ');

/**
 * Full logo lockup: mark, wordmark, then the tagline. Hovering the mark ignites the engine (a small
 * flat flame under the rocket cutout), lifts it slightly and shows the tagline under the wordmark;
 * a `liftoff` event bubbles up so the sky behind (StarfieldBackground) rushes down and streaks
 * (comets hide). Moving the pointer away settles everything back. Decorative; visitors who prefer
 * reduced motion get none of it.
 */
export function LaunchLogo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lifting, setLifting] = useState(false);

  const set = (active: boolean) => {
    if (active && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setLifting(active);
    ref.current?.dispatchEvent(new CustomEvent('liftoff', { bubbles: true, detail: active }));
  };

  return (
    <div ref={ref} className={cn('flex flex-col items-center gap-7', className)}>
      <div
        data-lifting={lifting}
        className="launch-logo relative w-48 md:w-64"
        onMouseEnter={() => set(true)}
        onMouseLeave={() => set(false)}
      >
        <div className="launch-body relative">
          <Image src="/images/logo-mark.png" alt="" width={600} height={594} priority className="relative z-10 h-auto w-full" />
          <span aria-hidden="true" className="launch-flame">
            <span className="launch-flame-core" />
          </span>
        </div>
      </div>

      <Image src="/images/logo-wordmark.png" alt={site.name} width={900} height={308} priority className="h-auto w-56 md:w-72" />

      <p
        aria-hidden="true"
        className={cn(
          'h-4 whitespace-pre text-center font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow transition-opacity duration-200',
          lifting ? 'opacity-100' : 'opacity-0',
        )}
      >
        {TAGLINE}
      </p>
    </div>
  );
}
