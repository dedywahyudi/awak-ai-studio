import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';
import { Hl, PageHeader, Section } from '@/components/ui/Section';
import { ClosingCta } from '@/components/sections/ClosingCta';

export const metadata = pageMeta({
  title: 'Tentang Kami',
  description: `Kenali ${site.name}: agensi digital berbantuan AI di ${site.city}, ditangani langsung oleh engineer senior.`,
  path: '/tentang',
});

const credentials = [
  { value: '10+ tahun', label: 'pengalaman sebagai engineer' },
  { value: 'Senior', label: 'Product Engineer' },
  { value: 'IBM, GE, T-Mobile', label: 'klien enterprise (via Topcoder)' },
];

export default function TentangPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang kami"
        title={
          <>
            Tim lokal di {site.city}, <Hl>standar enterprise</Hl>.
          </>
        }
        description={`"Awak" dalam bahasa Medan berarti kita atau orang kita. Itulah arah kami: kru lokal yang bisa Anda temui langsung.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-body">
            <p>
              {site.name} berdiri karena satu pengamatan sederhana: banyak UMKM di {site.city} punya
              pelanggan, tetapi kehabisan waktu untuk membalas pesan, membuat konten, dan mengurus
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
            <div>
              <p className="font-display text-xl font-extrabold text-strong">{site.founder.name}</p>
              <p className="text-sm text-muted">{site.founder.role}</p>
            </div>
            <dl className="flex flex-col gap-4 border-t border-line pt-4">
              {credentials.map((c) => (
                <div key={c.value}>
                  <dt className="font-display text-lg font-bold text-highlight">{c.value}</dt>
                  <dd className="text-sm text-muted">{c.label}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <Section
        tone="section"
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

      <ClosingCta />
    </>
  );
}
