'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Every slider moves at this speed (pixels per second); the loop time follows from the row's width. */
const SPEED = 45;

/**
 * Auto-scrolling strip (logos, tech stack). CSS animation: pauses on hover, becomes a static wrapped
 * list when the visitor prefers reduced motion. The second copy is hidden from assistive tech. The
 * duration is measured from the real width, so rows of different lengths scroll at the same speed.
 */
export function Marquee({
  label,
  children,
  repeat = 1,
  reverse = false,
}: {
  label: string;
  children: ReactNode[];
  /** Repeat the items inside each group so one group is wider than the screen (few items need 3). */
  repeat?: number;
  /** Scroll left-to-right instead of right-to-left; stack two rows with opposite values. */
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const apply = () => {
      const groupWidth = track.scrollWidth / 2;
      if (groupWidth > 0) track.style.setProperty('--marquee-duration', `${groupWidth / SPEED}s`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const group = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
      className="flex shrink-0 items-center gap-x-4 pr-4"
    >
      {Array.from({ length: repeat }).flatMap(() => children).map((child, i) => (
        <li key={i} className="shrink-0">
          {child}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden">
      <div
        ref={trackRef}
        className="marquee-track flex w-max"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
