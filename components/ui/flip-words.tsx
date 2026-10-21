'use client';

import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const HOLD_MS = 2200;
const FLIP_MS = 260;

/**
 * Words (with optional icons) that flip one by one on a loop, each in its own rectangle: the whole box (border, fill and
 * word) flips, and the box is only as wide as its word. Pair it with a visually hidden full sentence
 * for screen readers. Reduced motion: the box swaps without a flip.
 */
export function FlipWords({
  words,
  icons,
  onIndexChange,
  className = '',
}: {
  words: string[];
  /** Optional icon per word, shown before it inside the box. */
  icons?: LucideIcon[];
  /** Called with the new index at the moment the next box appears. */
  onIndexChange?: (index: number) => void;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => onIndexChange?.(index), [index, onIndexChange]);
  const Icon = icons?.[index];
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timers: number[] = [];
    const cycle = window.setInterval(() => {
      if (reduce) {
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setPhase('out');
      timers.push(
        window.setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase('in');
        }, FLIP_MS),
        window.setTimeout(() => setPhase('idle'), FLIP_MS * 2),
      );
    }, HOLD_MS + FLIP_MS * 2);
    return () => {
      window.clearInterval(cycle);
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };
  }, [words.length]);

  return (
    <span aria-hidden="true" className={cn('flip-box inline-flex', className)}>
      <span
        className={cn(
          'inline-flex items-center gap-3 whitespace-nowrap rounded-[10px] border-2 border-accent-ring bg-accent-soft px-4 py-1 text-strong',
          phase === 'out' && 'flip-out',
          phase === 'in' && 'flip-in',
        )}
      >
        {Icon && <Icon className="size-[0.72em] shrink-0 text-highlight" strokeWidth={2.25} aria-hidden="true" />}
        {words[index]}
      </span>
    </span>
  );
}
