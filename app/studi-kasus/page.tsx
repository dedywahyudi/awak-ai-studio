import { pageMeta } from '@/lib/seo';
import { projects } from '@/content/profile';
import { Container, Hl, PageHeader } from '@/components/ui/Section';
import { ProjectCard } from '@/components/sections/Cards';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Studi Kasus',
  description: 'Proyek AI dan sistem yang pernah kami bangun untuk bisnis dan organisasi, tanpa nama klien.',
  path: '/studi-kasus',
});

export default function StudiKasusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pekerjaan kami"
        title={
          <>
            Pekerjaan kami, <Hl>apa adanya</Hl>.
          </>
        }
        description="Proyek-proyek yang pernah kami bangun, ditampilkan tanpa nama klien atau produk. Studi kasus klien lengkap dengan hasilnya akan ditambahkan seiring proyek selesai."
      />
      <section className="bg-page pb-16 pt-0 md:pb-24">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta
        title="Punya bisnis yang ingin dibantu?"
        description="Ceritakan masalah yang ingin Anda selesaikan. Kami bantu memetakan solusinya."
      />
    </>
  );
}
