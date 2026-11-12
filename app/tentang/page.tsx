import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { stats } from '@/content/profile';
import { Container, Eyebrow, Hl, Section } from '@/components/ui/Section';
import { LaunchLogo } from '@/components/ui/LaunchLogo';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import { LogoRows } from '@/components/sections/ClientLogos';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Tentang',
  description: `Kenali ${site.name}: agensi digital berbantuan AI di ${site.city}, ditangani langsung oleh engineer senior, untuk bisnis dari skala kecil sampai besar.`,
  path: '/tentang',
});

export default function TentangPage() {
  return (
    <>
      <header className="relative -mt-16 flex min-h-[100svh] flex-col overflow-hidden bg-page">
        <StarfieldBackground />
        <div className="relative z-10 flex flex-1 items-center pb-8 pt-28">
          <Container className="grid items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
            <div className="flex flex-col gap-3">
              <Eyebrow>Tentang</Eyebrow>
              <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-strong md:text-[56px]">
                Klien lokal dan <Hl>seluruh dunia</Hl>.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-body">
                {`"Awak" dalam bahasa Medan berarti kita atau orang kita. Awak juga berarti awak kapal, kru yang mengendalikan roket atau AI. Itulah arah kami: kru yang membantu mengantar mimpi Anda ke orbit.`}
              </p>
              <div className="mt-1 flex flex-col gap-2.5 border-t border-line pt-4 text-sm leading-relaxed text-body">
                <p>
                  {site.name} berdiri karena satu pengamatan sederhana: banyak bisnis, dari usaha kecil sampai perusahaan besar, punya
                  pelanggan, tetapi kehabisan waktu untuk membalas pesan dan mengurus pekerjaan administratif. Alat AI sudah ada. Yang
                  kurang adalah orang yang mau memasangnya dengan benar, sesuai data dan cara kerja bisnis Anda.
                </p>
                <p>
                  Kami tidak menjual template. Setiap solusi dirancang dari data dan alur kerja Anda, lalu dirawat setiap bulan agar
                  tetap berguna.
                </p>
                <blockquote className="rounded-card border border-line-featured bg-featured px-4 py-3 font-display text-base font-bold leading-snug text-strong">
                  Setiap klien ditangani langsung oleh engineer senior, dibantu sistem AI untuk delivery lebih cepat. Bukan dioper ke
                  tim junior.
                </blockquote>
              </div>
            </div>
            <LaunchLogo className="justify-self-center" />
          </Container>
        </div>

        {/* Track record along the bottom of the hero. */}
        <div className="relative z-10 border-t border-line">
          <Container>
            <h2 className="sr-only">Rekam jejak</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 md:grid-cols-4">
              {stats.map((c) => (
                <div key={c.value} className="flex flex-col gap-1">
                  <dt className="font-display text-3xl font-extrabold tracking-[-0.02em] text-highlight tabular-nums md:text-4xl">
                    {c.value}
                  </dt>
                  <dd className="text-sm leading-snug text-muted">{c.label}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </header>

      <Section
        tone="section"
        eyebrow="Klien dan proyek"
        title={
          <>
            Dari klien lokal sampai <Hl>enterprise</Hl> global.
          </>
        }
        description="Dari klien lokal di Sumatera Utara sampai perusahaan enterprise di berbagai negara. Klien dan tim remote dari luar negeri kami tangani lewat Topcoder dan Distributed."
      >
        <LogoRows />
      </Section>

      <Section
        eyebrow="Cara kami bekerja"
        title="Tiga prinsip yang kami pegang."
      >
        <ul className="grid gap-5 md:grid-cols-3">
          {[
            ['Harga jelas di depan', 'Estimasi tertulis sebelum Anda membayar. Tidak ada biaya kejutan.'],
            ['AI dibantu manusia', 'Konten dan jawaban penting ditinjau manusia. AI mempercepat, bukan menggantikan tanggung jawab.'],
            ['Data tetap milik Anda', 'Akun, data, dan akses tetap atas nama Anda, termasuk bila Anda berhenti.'],
          ].map(([title, body]) => (
            <li key={title} className="flex flex-col gap-2 rounded-card border border-line bg-card p-6">
              <h3 className="font-display text-lg font-bold text-strong">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta
        title="Ingin ngobrol langsung?"
        description="Ceritakan tantangan bisnis Anda. Kami dengarkan dulu sebelum menawarkan apa pun."
      />
    </>
  );
}
