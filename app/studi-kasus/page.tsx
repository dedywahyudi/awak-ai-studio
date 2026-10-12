import { pageMeta } from '@/lib/seo';
import { caseStudies } from '@/content/case-studies';
import { Container, Hl, PageHeader } from '@/components/ui/Section';
import { CaseStudyCard } from '@/components/sections/Cards';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Studi Kasus',
  description: 'Bagaimana kami membangun dan merawat sistem AI untuk bisnis nyata.',
  path: '/studi-kasus',
});

export default function StudiKasusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studi kasus"
        title={
          <>
            Bukti kerja, <Hl>bukan janji</Hl>.
          </>
        }
        description="Kami mulai dengan membangun agensi kami sendiri. Studi kasus klien akan ditambahkan seiring proyek selesai."
      />
      <section className="bg-page py-12 md:py-20">
        <Container className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((s) => (
            <CaseStudyCard key={s.slug} study={s} />
          ))}
        </Container>
      </section>
      <ClosingCta />
    </>
  );
}
