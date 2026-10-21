'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface NavTab {
  href: string;
  label: string;
}

interface Box {
  left: number;
  width: number;
}

/** Active when the current path is the tab's path or a child of it. Query-string tabs never match. */
const isActive = (pathname: string, href: string) =>
  !href.includes('?') && (pathname === href || pathname.startsWith(`${href}/`));

/**
 * Navigation tabs with a sliding hover highlight and an active underline, adapted from the Vercel
 * tabs component: real links (keyboard and screen-reader friendly), active tab follows the URL,
 * and the design-system blue replaces the black/white of the original. Dark theme only.
 */
export function NavTabs({ tabs, className }: { tabs: readonly NavTab[]; className?: string }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [hoverBox, setHoverBox] = useState<Box | null>(null);
  const [activeBox, setActiveBox] = useState<Box | null>(null);

  const activeIndex = tabs.findIndex((t) => isActive(pathname, t.href));

  const measure = useCallback((index: number): Box | null => {
    const el = linkRefs.current[index];
    return el ? { left: el.offsetLeft, width: el.offsetWidth } : null;
  }, []);

  useLayoutEffect(() => {
    setActiveBox(activeIndex >= 0 ? measure(activeIndex) : null);
  }, [activeIndex, measure]);

  useEffect(() => {
    if (hovered !== null) setHoverBox(measure(hovered));
  }, [hovered, measure]);

  // Re-measure when the layout changes (window resize, web fonts finishing loading).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => {
      setActiveBox(activeIndex >= 0 ? measure(activeIndex) : null);
      if (hovered !== null) setHoverBox(measure(hovered));
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [activeIndex, hovered, measure]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      {/* Hover highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 h-9 rounded-lg bg-[rgba(255,255,255,.06)] transition-all duration-300 ease-out motion-reduce:transition-none"
        style={{ left: hoverBox?.left ?? 0, width: hoverBox?.width ?? 0, opacity: hovered !== null ? 1 : 0 }}
      />
      {/* Active underline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[10px] h-0.5 rounded-full bg-accent-ring transition-all duration-300 ease-out motion-reduce:transition-none"
        style={{ left: activeBox?.left ?? 0, width: activeBox?.width ?? 0, opacity: activeBox ? 1 : 0 }}
      />

      <div className="relative flex items-center gap-1">
        {tabs.map((tab, index) => {
          const active = index === activeIndex;
          return (
            <Link
              key={tab.href}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              className={cn(
                'inline-flex h-11 items-center whitespace-nowrap rounded-lg px-3 text-[15px] font-medium transition-colors duration-300',
                active ? 'text-link' : 'text-body hover:text-white',
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
