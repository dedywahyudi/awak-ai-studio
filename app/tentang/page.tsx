import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { stats } from '@/content/profile';
import { Container, Eyebrow, Hl, Section } from '@/components/ui/Section';
import { LaunchLogo } from '@/components/ui/LaunchLogo';
import { StarfieldBackground } from '@/components/ui/StarfieldBackground';
import { LogoRows } from '@/components/sections/ClientLogos';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Tentang Kami',
  description: `Kenali ${site.name}: agensi digital berbantuan AI di ${site.city}, ditangani langsung oleh engineer senior.`,
  path: '/tentang',
});

export default function TentangPage() {
  return (
    <>
      <header className="relative -mt-16 overflow-hidden bg-page pb-20 pt-[7.5rem] md:pb-28 md:pt-40 lg:flex lg:min-h-[680px] lg:flex-col lg:justify-center">
        <StarfieldBackground />
        <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-4">
            <Eyebrow>Tentang kami</Eyebrow>
            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-strong md:text-[56px]">
              Klien lokal dan <Hl>seluruh dunia</Hl>.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-body">
              {`"Awak" dalam bahasa Medan berarti kita atau orang kita. Awak juga berarti awak kapal, kru yang mengendalikan roket atau AI. Itulah arah kami: kru yang membantu mengantar mimpi Anda ke orbit.`}
            </p>
          </div>
          <LaunchLogo className="justify-self-center" />
        </Container>
      </header>

      <Section flushTop>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-body">
            <p>
              {site.name} berdiri karena satu pengamatan sederhana: banyak bisnis, dari usaha kecil sampai perusahaan besar, punya
              pelanggan, tetapi kehabisan waktu untuk membalas pesan dan mengurus
              pekerjaan administratif. Alat AI sudah ada. Yang kurang adalah orang yang mau
              memasangnya dengan benar, sesuai data dan cara kerja bisnis Anda.
            </p>
            <p>
              Kami tidak menjual template. Setiap solusi dirancang dari data dan alur kerja Anda, lalu
              dirawat setiap bulan agar tetap berguna.
            </p>
            <blockquote className="rounded-card border border-line-featured bg-featured p-6 font-display text-xl font-bold leading-snug text-strong">
              Setiap klien ditangani langsung oleh engineer senior, dibantu sistem AI untuk delivery
              lebih cepat. Bukan dioper ke tim junior.
            </blockquote>
          </div>

          <aside className="flex flex-col gap-4 self-start rounded-pricing border border-line bg-card p-7">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-eyebrow">Rekam jejak</h2>
            <dl className="flex flex-col gap-4 border-t border-line pt-4">
              {stats.map((c) => (
                <div key={c.value}>
                  <dt className="font-display text-3xl font-extrabold tracking-[-0.02em] text-highlight tabular-nums">
                    {c.value}
                  </dt>
                  <dd className="text-sm text-muted">{c.label}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

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
