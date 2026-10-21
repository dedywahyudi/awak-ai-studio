import type { ReactNode } from 'react';

/**
 * Auto-scrolling strip (logos, tech stack). Pure CSS: pauses on hover, becomes a static wrapped
 * list when the visitor prefers reduced motion. The second copy is hidden from assistive tech.
 */
export function Marquee({
  label,
  children,
  durationSeconds = 40,
  repeat = 1,
  reverse = false,
}: {
  label: string;
  children: ReactNode[];
  durationSeconds?: number;
  /** Repeat the items inside each group so one group is wider than the screen (few items need 3). */
  repeat?: number;
  /** Scroll left-to-right instead of right-to-left; stack two rows with opposite values. */
  reverse?: boolean;
}) {
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
    <div className="marquee overflow-hidden" style={{ ['--marquee-duration' as string]: `${durationSeconds}s` }}>
      <div className="marquee-track flex w-max" style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
