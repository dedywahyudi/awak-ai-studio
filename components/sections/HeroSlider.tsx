'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Play, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import { Watermark } from '@/components/sections/ProjectShowcase';
import { cn } from '@/lib/utils';

export interface HeroSlide {
  id: string;
  /** Where the button goes. */
  href: string;
  /** Small mono line above the title, for example a period or "Kategori · tanggal". */
  eyebrow: string;
  beta?: boolean;
  title: string;
  summary: string;
  /** Optional line under the summary, already formatted, for example "AI: Computer vision". */
  meta?: string;
  metaIcon?: 'ai' | 'time';
  tags?: string[];
  /** The image whose top part is shown. */
  image?: { src: string; alt: string; width: number; height: number };
  /** website: browser frame. phone: device frame. cover: square cover image. */
  kind: 'website' | 'phone' | 'cover';
  /** Shows a play button over the image that opens `href` (the detail page with the video). */
  hasVideo?: boolean;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  /** The page's h1. */
  heading: string;
  /** Accessible name of the carousel and its tab list. */
  label: string;
  prevLabel: string;
  nextLabel: string;
  ctaLabel?: string;
  /** Small line above the pagination bar, for example to say the list is a selection. */
  note?: string;
}

/** Time each slide stays up before the slider moves on by itself. */
const AUTOPLAY_MS = 8000;

/**
 * Full-viewport slider. Text on the left, an image on the right (stacked on tablet and mobile),
 * pagination and dots along the bottom, a starry sky behind. Used by /studi-kasus and /blog.
 * Advances by itself every few seconds until the visitor interacts (see AUTOPLAY_MS).
 * All slide text stays in the DOM (hidden slides use visibility), so crawlers and screen readers can read it.
 */
export function HeroSlider({ slides, heading, label, prevLabel, nextLabel, ctaLabel = 'Baca Selengkapnya', note }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  // Autoplay: pauses while hovered or focused, stops for good after the first manual move, and never runs
  // for visitors who prefer reduced motion.
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const count = slides.length;

  useEffect(() => {
    if (!autoplay || paused || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, paused, count, index]);

  if (count === 0) return null;

  const go = (to: number) => {
    setAutoplay(false);
    setIndex(((to % count) + count) % count);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  };
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    const end = e.changedTouches[0]?.clientX;
    if (start === null || end === undefined) return;
    if (end - start > 50) go(index - 1);
    else if (start - end > 50) go(index + 1);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative -mt-16 flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-page"
    >
      <StarfieldBackground />

      {/* Heading and slides. */}
      <Container className="relative flex min-h-0 flex-1 flex-col pt-24 md:pt-28">
        {/* The one h1 for the page. It is shown as an eyebrow inside each slide (above the period), so it stays next to the text. */}
        <h1 className="sr-only">{heading}</h1>

        <div className="relative min-h-0 flex-1 pb-5">
          {slides.map((slide, i) => {
            const active = i === index;
            // Only the current and neighbouring slides load their image.
            const near = active || i === (index + 1) % count || i === (index - 1 + count) % count;
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} dari ${count}`}
                aria-hidden={active ? undefined : true}
                className={cn(
                  'absolute inset-0 bottom-5 grid grid-rows-[295px_minmax(0,1fr)] gap-5 md:grid-rows-[368px_minmax(0,1fr)] transition-[opacity,visibility,transform] duration-500 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:grid-rows-1 lg:gap-12',
                  active ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0',
                )}
              >
                {/* Text. */}
                <div className="flex min-h-0 flex-col justify-start gap-3 overflow-hidden md:gap-4 lg:max-w-xl lg:justify-center">
                  <p
                    aria-hidden="true"
                    className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-eyebrow"
                  >
                    {heading}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-muted">{slide.eyebrow}</span>
                    {slide.beta && <Badge size="sm">Beta</Badge>}
                  </div>
                  <h2 className="line-clamp-3 pb-1 font-display text-[26px] font-extrabold !leading-[1.2] tracking-[-0.03em] text-strong sm:text-[32px] md:text-4xl lg:line-clamp-4 lg:text-[40px] xl:text-[44px]">
                    {slide.title}
                  </h2>
                  <p className="line-clamp-2 text-base leading-relaxed text-body md:line-clamp-3 md:text-lg">{slide.summary}</p>
                  {slide.meta && (
                    <p className="flex items-center gap-1.5 text-sm font-medium text-body">
                      {slide.metaIcon === 'time' ? (
                        <Clock size={15} className="shrink-0 text-link" aria-hidden="true" />
                      ) : (
                        <Sparkles size={15} className="shrink-0 text-link" aria-hidden="true" />
                      )}
                      {slide.meta}
                    </p>
                  )}
                  {slide.tags && slide.tags.length > 0 && (
                    <ul className="hidden flex-wrap gap-2 md:flex">
                      {slide.tags.map((tag) => (
                        <li key={tag}>
                          <Badge tone="neutral" size="sm">
                            {tag}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-1">
                    <Button href={slide.href} arrow>
                      {ctaLabel}
                    </Button>
                  </div>
                </div>

                {/* Screenshot: same height for website and phone projects, vertically centred, top part shown.
                    Below the text on tablet and mobile, on the right on desktop. */}
                <div className="relative min-h-0">
                  {near && (
                    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                      {slide.image && slide.kind === 'phone' && (
                        // One phone in a device frame, same height as the website frame.
                        <span className="block aspect-[9/19] h-[min(100%,480px)] rounded-[26px] border border-line-strong bg-black p-1.5">
                          <span className="relative block size-full overflow-hidden rounded-[20px] bg-section">
                            <Image
                              src={slide.image.src}
                              alt=""
                              fill
                              sizes="240px"
                              loading="eager"
                              priority={i === 0}
                              className="object-cover object-top"
                            />
                            <Watermark logoClass="h-[6%]" />
                          </span>
                        </span>
                      )}
                      {slide.image && slide.kind === 'cover' && (
                        <span className="relative block aspect-square h-[min(100%,480px)] overflow-hidden rounded-card border border-line-strong bg-card">
                          <Image
                            src={slide.image.src}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 480px, 60vw"
                            loading="eager"
                            priority={i === 0}
                            className="object-cover"
                          />
                        </span>
                      )}
                      {slide.image && slide.kind === 'website' && (
                        <span className="flex h-[min(100%,480px)] w-full flex-col overflow-hidden rounded-card border border-line-strong bg-card">
                          <span className="flex shrink-0 items-center gap-3 border-b border-line bg-section px-4 py-2.5">
                            <span className="flex gap-1.5">
                              <span className="size-2.5 rounded-full bg-line-strong" />
                              <span className="size-2.5 rounded-full bg-line-strong" />
                              <span className="size-2.5 rounded-full bg-line-strong" />
                            </span>
                            <span className="min-w-0 flex-1 truncate rounded-md bg-card px-3 py-1 text-center text-xs text-muted">
                              {slide.image.alt}
                            </span>
                          </span>
                          <span className="relative block min-h-0 flex-1">
                            <Image
                              src={slide.image.src}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 640px, 92vw"
                              loading="eager"
                              priority={i === 0}
                              className="object-cover object-top"
                            />
                            <Watermark />
                          </span>
                        </span>
                      )}
                    </div>
                  )}
                  {slide.hasVideo && near && (
                    <Link
                      href={slide.href}
                      tabIndex={active ? undefined : -1}
                      aria-label={`Tonton video: ${slide.title}`}
                      className="absolute left-1/2 top-[calc(50%-72px)] z-10 inline-flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-[0_6px_20px_rgba(19,144,251,.5)] ring-4 ring-[rgba(19,144,251,.3)] transition hover:scale-105 md:size-12"
                    >
                      <Play size={18} fill="currentColor" aria-hidden="true" className="ml-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {note && (
        <Container className="relative pb-3">
          <p className="text-xs leading-relaxed text-muted">{note}</p>
        </Container>
      )}

      {/* Pagination and dots along the bottom. */}
      <div className="relative border-t border-line">
        <Container className="flex items-center justify-between gap-4 py-2.5">
          <div role="tablist" aria-label={label} className="flex items-center">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={slide.title}
                onClick={() => go(i)}
                className="group inline-flex size-6 items-center justify-center sm:size-11"
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-300',
                    i === index ? 'w-7 bg-accent' : 'w-1.5 bg-line-strong group-hover:bg-muted',
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-1 hidden whitespace-nowrap font-mono sm:inline text-xs text-muted tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={prevLabel}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-strong transition hover:border-accent-ring"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={nextLabel}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-strong transition hover:border-accent-ring"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
