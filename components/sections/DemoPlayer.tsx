import { Play } from 'lucide-react';

/**
 * Demo video. Set NEXT_PUBLIC_DEMO_VIDEO_URL to an MP4/WebM and it renders a native player,
 * 9:16 on phones and 16:9 on desktop. Until then it shows a labelled placeholder.
 */
export function DemoPlayer() {
  const src = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;
  const frame =
    'mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-pricing border border-line bg-card shadow-lg md:aspect-video md:max-w-none';

  if (src) {
    return (
      <div className={frame}>
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          className="size-full object-cover"
          aria-label="Video demo cara kerja"
        />
      </div>
    );
  }

  return (
    <div
      className={`${frame} flex flex-col items-center justify-center gap-4 bg-[repeating-linear-gradient(135deg,var(--surface-card)_0_14px,var(--surface-section)_14px_28px)]`}
      role="img"
      aria-label="Tempat video demo"
    >
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-accent text-white">
        <Play size={26} aria-hidden="true" />
      </span>
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">Video demo segera hadir</p>
    </div>
  );
}
