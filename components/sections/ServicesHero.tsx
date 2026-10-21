import { Button } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/Section';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import { HeroServiceFlip, ServiceProvider } from '@/components/sections/ActiveService';
import { HeroVisual } from '@/components/sections/HeroVisual';

/**
 * Hero that shows the three services: a headline that flips through AI Chat, Otomatisasi and Solusi Custom,
 * with the matching card lighting up in the visual beside it. Same size and spacing as the page heroes.
 */
export function ServicesHero({ eyebrow, secondaryHref, secondaryLabel }: { eyebrow: string; secondaryHref: string; secondaryLabel: string }) {
  return (
    <header className="relative -mt-16 overflow-hidden bg-page pb-20 pt-[7.5rem] md:pb-28 md:pt-40 lg:flex lg:min-h-[680px] lg:flex-col lg:justify-center">
      <StarfieldBackground />
      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <ServiceProvider>
          <div className="flex flex-col gap-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] text-strong sm:text-5xl md:text-[56px]">
              <span className="sr-only">AI Chat, Otomatisasi, dan Solusi Custom untuk Bisnis Anda.</span>
              <span aria-hidden="true" className="flex flex-col items-start gap-3">
                <HeroServiceFlip />
                <span>untuk Bisnis Anda.</span>
              </span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-body md:text-xl">
              Biarkan AI mengurus pekerjaan yang berulang, tim Anda fokus pada yang penting. Dibangun di atas data
              dan alur kerja Anda, dengan manusia tetap memegang keputusan.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/audit-gratis" arrow>
                Minta Audit Gratis
              </Button>
              <Button variant="secondary" href={secondaryHref}>
                {secondaryLabel}
              </Button>
            </div>
          </div>
          <HeroVisual />
        </ServiceProvider>
      </Container>
    </header>
  );
}
