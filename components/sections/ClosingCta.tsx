import { Container } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { waConsultMessage, waLink } from '@/lib/whatsapp';

export function ClosingCta({
  title = 'Mulai dengan satu percakapan.',
  description = 'Ceritakan bisnis Anda. Kami bantu pilih layanan yang paling masuk akal.',
  topic,
}: {
  title?: string;
  description?: string;
  topic?: string;
}) {
  return (
    <section className="bg-page py-16 md:py-28">
      <Container>
        <Reveal className="flex flex-col items-start gap-8 rounded-pricing border border-line bg-section p-8 md:p-12">
          <Reveal delay={150} className="flex max-w-2xl flex-col gap-3">
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-strong md:text-4xl">
              {title}
            </h2>
            <p className="text-lg leading-relaxed text-body">{description}</p>
          </Reveal>
          <Reveal delay={300} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="whatsapp" href={waLink(waConsultMessage(topic))}>
              Chat WhatsApp
            </Button>
            <Button variant="secondary" href="/audit-gratis">
              Isi Formulir
            </Button>
          </Reveal>
        </Reveal>
      </Container>
    </section>
  );
}
