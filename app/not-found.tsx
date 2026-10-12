import { Container, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="bg-page py-24 md:py-36">
      <Container className="flex flex-col items-start gap-6">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.03em] text-strong md:text-6xl">
          Halaman tidak ditemukan.
        </h1>
        <p className="max-w-xl text-lg text-body">
          Alamatnya mungkin salah ketik, atau halamannya sudah dipindahkan.
        </p>
        <div className="flex gap-3">
          <Button href="/">Ke Beranda</Button>
          <Button variant="secondary" href="/kontak">
            Hubungi Kami
          </Button>
        </div>
      </Container>
    </section>
  );
}
