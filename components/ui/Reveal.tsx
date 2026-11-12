'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * Content is fully visible until the page has loaded (no JavaScript = nothing hidden), and for
 * visitors who prefer reduced motion. Plays once. `delay` (ms) staggers items in the same row.
 * The animation sits on this wrapper, so hover effects on the children keep working.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setArmed(true);
    let observer: IntersectionObserver | undefined;
    // Observe on the next frame so the hidden state is painted first and the transition plays.
    const frame = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShown(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      observer.observe(el);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  const style: CSSProperties | undefined = armed ? { transitionDelay: shown ? `${delay}ms` : '0ms' } : undefined;

  return (
    <Tag
      ref={ref}
      style={style}
      className={cn(
        armed && 'transition-[opacity,transform] duration-700 ease-out',
        armed && !shown && 'translate-y-6 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
