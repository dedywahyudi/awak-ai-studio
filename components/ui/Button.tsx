import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] px-5 font-display text-[15px] font-bold transition duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover hover:shadow-accent active:bg-accent-press',
  secondary:
    'border border-line-strong bg-transparent text-strong hover:border-accent-ring hover:text-white',
  whatsapp: 'bg-wa text-[#07140c] hover:bg-wa-hover',
  ghost: 'px-2 text-link hover:text-white',
};

interface ButtonProps {
  variant?: Variant;
  href?: string;
  arrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

/** Renders a link when `href` is set (external links open in a new tab), else a button. */
export function Button({
  variant = 'primary',
  href,
  arrow = false,
  fullWidth = false,
  className,
  children,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant], fullWidth && 'w-full', className);
  const content = (
    <>
      {variant === 'whatsapp' && <WhatsAppIcon size={18} />}
      {children}
      {arrow && <ArrowRight size={18} aria-hidden="true" />}
    </>
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
