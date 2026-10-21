import { clients, type Client } from '@/content/profile';
import { aiTools } from '@/content/ai-tools';
import { techStack } from '@/content/tech-stack';
import { Container } from '@/components/ui/Section';
import { Marquee } from '@/components/sections/Marquee';
import { IconChip } from '@/components/sections/IconChip';
import { TechChip } from '@/components/sections/TechChip';

export function ClientLogo({ client }: { client: Client }) {
  return (
    <span className="inline-flex h-16 items-center gap-3 rounded-card border border-line bg-card px-8 text-body">
      {client.path ? (
        <>
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
            <path d={client.path} />
          </svg>
          <span className="sr-only">{client.name}</span>
        </>
      ) : client.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={client.src} alt={client.name} decoding="async" className="h-auto max-h-9 w-auto max-w-[132px]" />
      ) : (
        <span className="font-display text-xl font-extrabold tracking-[-0.01em]">{client.name}</span>
      )}
    </span>
  );
}

/** The three sliders (clients, AI and automation tools, tech stack), one slow row each, with the brand note. */
export function LogoRows() {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">
        Klien lokal dan seluruh dunia
      </p>
      <Marquee label="Klien dan proyek">
        {clients.map((c) => (
          <ClientLogo key={c.name} client={c} />
        ))}
      </Marquee>
      <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">
        AI dan otomatisasi yang kami pakai
      </p>
      <Marquee label="AI dan otomatisasi" repeat={2} reverse>
        {aiTools.map((t) => (
          <IconChip key={t.name} tool={t} />
        ))}
      </Marquee>
      <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">
        Teknologi yang kami pakai
      </p>
      <Marquee label="Tech stack">
        {techStack.map((t) => (
          <TechChip key={t.name} tech={t} />
        ))}
      </Marquee>
      <p className="text-xs text-subtle">Nama merek adalah milik masing-masing pemiliknya.</p>
    </div>
  );
}

/** Proof band under the home hero. Data: content/. */
export function ClientLogos() {
  return (
    <section aria-label="Klien dan proyek" className="bg-page pb-12 md:pb-16">
      <Container>
        <LogoRows />
      </Container>
    </section>
  );
}
