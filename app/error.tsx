'use client';

import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-page py-24 md:py-36">
      <Container className="flex flex-col items-start gap-6">
        <Eyebrow>Terjadi kesalahan</Eyebrow>
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-strong md:text-5xl">
          Ada yang tidak beres di sisi kami.
        </h1>
        <p className="max-w-xl text-lg text-body">Coba muat ulang. Bila masih terjadi, hubungi kami lewat WhatsApp.</p>
        <Button onClick={reset}>Coba Lagi</Button>
      </Container>
    </section>
  );
}
