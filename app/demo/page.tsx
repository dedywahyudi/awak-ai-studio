import { pageMeta } from '@/lib/seo';
import { Hl, PageHeader, Section } from '@/components/ui/Section';
import { DemoPlayer } from '@/components/sections/DemoPlayer';
import { Steps } from '@/components/sections/Steps';
import { ChatPreview } from '@/components/sections/ChatPreview';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Cara Kerja dan Demo',
  description:
    'Empat langkah dari konsultasi gratis sampai launch dan pelatihan. Lihat demo AI Chat untuk bisnis Anda.',
  path: '/demo',
});

const steps = [
  {
    title: 'Konsultasi gratis',
    body: 'Anda ceritakan bisnis dan masalahnya. Kami dengarkan dan jujur soal apa yang masuk akal dikerjakan dengan AI.',
  },
  {
    title: 'Proposal dan estimasi',
    body: 'Lingkup, jadwal, dan biaya kami tulis jelas sebelum Anda membayar apa pun.',
  },
  {
    title: 'Pengembangan bertahap',
    body: 'Anda melihat hasilnya per tahap, jadi bisa memberi masukan sebelum semuanya selesai.',
  },
  {
    title: 'Launch dan pelatihan',
    body: 'Sistem dirilis, tim Anda dilatih memakainya, lalu kami pantau dan rawat tiap bulan.',
  },
];

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Demo"
        title={
          <>
            Dari obrolan pertama sampai <Hl>sistem berjalan</Hl>.
          </>
        }
        description="Empat langkah yang sama untuk setiap layanan, dengan satu penanggung jawab dari awal sampai akhir."
      />
      <Section>
        <DemoPlayer />
      </Section>
      <Section tone="section" eyebrow="Cara kerja" title="Empat langkah, tanpa kejutan.">
        <Steps steps={steps} />
      </Section>
      <Section
        eyebrow="Contoh AI Chat"
        title={
          <>
            Jawaban cepat, lalu <Hl>diteruskan ke manusia</Hl> saat perlu.
          </>
        }
      >
        <ChatPreview />
      </Section>
      <ClosingCta title="Mulai Konsultasi Gratis" />
    </>
  );
}
