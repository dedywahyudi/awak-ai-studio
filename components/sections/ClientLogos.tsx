import { clients, type Client } from '@/content/profile';
import { techStack } from '@/content/tech-stack';
import { Container } from '@/components/ui/Section';
import { Marquee } from '@/components/sections/Marquee';
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
        <img src={client.src} alt={client.name} height={28} className="h-7 w-auto" />
      ) : (
        <span className="font-display text-xl font-extrabold tracking-[-0.01em]">{client.name}</span>
      )}
    </span>
  );
}

/** Proof band under the hero: one row of clients, one row of tech (opposite directions). Data: content/. */
export function ClientLogos() {
  return (
    <section aria-label="Klien dan proyek" className="bg-page pb-12 md:pb-16">
      <Container className="flex flex-col gap-5">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">
          Klien dan proyek dari seluruh dunia
        </p>
        <Marquee label="Klien dan proyek" durationSeconds={50} repeat={3}>
          {clients.map((c) => (
            <ClientLogo key={c.name} client={c} />
          ))}
        </Marquee>
        <p className="text-xs text-subtle">Nama merek adalah milik masing-masing pemiliknya.</p>
        <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">
          Teknologi yang kami pakai
        </p>
        <Marquee label="Tech stack" durationSeconds={55} reverse>
          {techStack.map((t) => (
            <TechChip key={t.name} tech={t} />
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
