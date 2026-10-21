import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Tones follow the Awak design system Badge: soft, popular, neutral, onDark, outline. */
const tones = {
  popular: 'border border-accent bg-accent text-white',
  soft: 'border border-[rgba(19,144,251,.4)] bg-accent-soft text-link',
  neutral: 'border border-line bg-raised text-body',
  onDark: 'border border-[rgba(255,255,255,.16)] bg-[rgba(255,255,255,.08)] text-white',
  outline: 'border border-line-strong bg-transparent text-strong',
} as const;

const sizes = {
  sm: 'px-2 py-[5px] text-[11px]',
  md: 'px-[11px] py-[7px] text-xs',
} as const;

export function Badge({
  tone = 'soft',
  size = 'md',
  icon: Icon,
  children,
  className,
}: {
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-display font-bold leading-none tracking-[.02em]',
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 14} strokeWidth={2.25} aria-hidden="true" />}
      {children}
    </span>
  );
}
