import { cn } from '@/lib/utils';
import { LaunchLogo } from '@/components/ui/LaunchLogo';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('mx-auto w-full max-w-container px-5 md:px-8', className)}>{children}</div>;
}

/** Highlighted phrase inside a headline (one per headline, per the design system). */
export function Hl({ children }: { children: React.ReactNode }) {
  return <span className="text-highlight">{children}</span>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-eyebrow">
      {children}
    </span>
  );
}

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Alternate background between sections: page <-> section. */
  tone?: 'page' | 'section';
  children?: React.ReactNode;
  className?: string;
  /** First section under a hero: no top padding, the hero's bottom padding provides the space. */
  flushTop?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  tone = 'page',
  children,
  className,
  flushTop = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(flushTop ? 'pb-16 md:pb-28' : 'py-16 md:py-28', tone === 'section' ? 'bg-section' : 'bg-page', className)}
    >
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-strong md:text-[44px]">
                {title}
              </h2>
            )}
            {description && <p className="text-lg leading-relaxed text-body">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/** Top-of-page heading used by inner pages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons under the description. */
  actions?: React.ReactNode;
}) {
  return (
    <header className="relative -mt-16 overflow-hidden bg-page pb-20 pt-[7.5rem] md:pb-28 md:pt-40 lg:flex lg:min-h-[680px] lg:flex-col lg:justify-center">
      <StarfieldBackground />
      <Container className="relative z-10 grid max-w-container items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-strong md:text-[56px]">
            {title}
          </h1>
          {description && <p className="max-w-2xl text-lg leading-relaxed text-body">{description}</p>}
          {actions && <div className="mt-4 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {/* Nothing else lives on the right of a page hero, so the logo fills it (desktop only). */}
        <LaunchLogo className="hidden justify-self-center lg:flex" />
      </Container>
    </header>
  );
}
