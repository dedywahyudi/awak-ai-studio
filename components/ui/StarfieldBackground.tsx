'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  speed: number;
  phase: number;
  flash: number;
  depth: number;
  tint: string;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

/** Star colours: white plus design-system blues (--blue-200, --blue-300). */
const TINTS = ['255,255,255', '255,255,255', '255,255,255', '71,207,251', '42,178,252'];
const COMET_TRAIL = 70;

/**
 * Night sky for a hero: stars that twinkle and flash at random, and small fast comets (the same
 * size as the dots of the particle background). Sized to its parent (needs `relative overflow-hidden`).
 * Listens for a `liftoff` event from a child (the logo): stars then rush down and streak, comets hide.
 * Pauses off screen and draws one still frame for visitors who prefer reduced motion.
 */
export function StarfieldBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars: Star[] = [];
    let comets: Comet[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let nextComet = 0;
    let visible = true;
    let boost = 0; // 0 = calm sky, 1 = lift-off (stars rush down and streak)
    let boostTarget = 0;

    const draw = (t: number, dt: number, move: boolean) => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        if (move && boost > 0.01) {
          s.y += s.depth * 900 * boost * dt;
          if (s.y > height + 20) {
            s.y = -20;
            s.x = Math.random() * width;
          }
        }
        if (move && s.flash <= 0 && Math.random() < 0.0015) s.flash = 1; // random sudden blink
        if (move) s.flash = Math.max(0, s.flash - dt * 2.2);
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
        const alpha = Math.min(1, s.base * (0.25 + 0.75 * twinkle) + s.flash * 0.7);
        if (boost > 0.05) {
          ctx.strokeStyle = `rgba(${s.tint}, ${alpha * 0.8})`;
          ctx.lineWidth = s.r;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y - boost * s.depth * 46);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (1 + s.flash * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tint}, ${alpha})`;
        ctx.fill();
      }

      if (!move) return;
      if (boostTarget > 0 || boost > 0.05) {
        comets = []; // no comets while the logo is lifting off
        return;
      }
      if (t >= nextComet && comets.length < 1) {
        const fromLeft = Math.random() < 0.5;
        const speed = 700 + Math.random() * 600;
        const angle = (20 + Math.random() * 25) * (Math.PI / 180);
        comets.push({
          x: fromLeft ? Math.random() * width * 0.6 : width * 0.4 + Math.random() * width * 0.6,
          y: -10,
          vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
          vy: Math.sin(angle) * speed,
          life: 1,
        });
        nextComet = t + 7 + Math.random() * 9; // one comet every 7 to 16 seconds
      }
      comets = comets.filter((c) => c.x > -COMET_TRAIL && c.x < width + COMET_TRAIL && c.y < height + COMET_TRAIL);
      for (const c of comets) {
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        const len = Math.hypot(c.vx, c.vy);
        const tx = c.x - (c.vx / len) * COMET_TRAIL;
        const ty = c.y - (c.vy / len) * COMET_TRAIL;
        const grad = ctx.createLinearGradient(c.x, c.y, tx, ty);
        grad.addColorStop(0, 'rgba(255,255,255,0.9)');
        grad.addColorStop(1, 'rgba(42,178,252,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }
    };

    const tick = (ms: number) => {
      if (!visible) {
        frame = 0;
        return;
      }
      const t = ms / 1000;
      if (!nextComet) nextComet = t + 4 + Math.random() * 6; // first comet a few seconds after load
      const dt = Math.min(0.05, last ? t - last : 0.016);
      last = t;
      boost += (boostTarget - boost) * Math.min(1, dt * 3.5);
      if (Math.abs(boostTarget - boost) < 0.005) boost = boostTarget;
      draw(t, dt, true);
      frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(200, Math.round((width * height) / 5500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.5,
        base: 0.45 + Math.random() * 0.55,
        speed: 0.6 + Math.random() * 2.4,
        phase: Math.random() * Math.PI * 2,
        flash: 0,
        depth: 0.3 + Math.random() * 0.7,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)]!,
      }));
      if (reduceMotion) draw(0, 0, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible && !frame && !reduceMotion) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    visibilityObserver.observe(host);

    const onLiftoff = (e: Event) => {
      boostTarget = (e as CustomEvent<boolean>).detail ? 1 : 0;
    };
    if (!reduceMotion) host.addEventListener('liftoff', onLiftoff);

    resize();
    if (!reduceMotion) frame = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener('liftoff', onLiftoff);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,#000_65%,transparent)] ${className}`}
    />
  );
}
