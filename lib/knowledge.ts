import { site } from '@/lib/site';
import { products } from '@/lib/pricing';
import { shortIdr } from '@/lib/utils';
import { services } from '@/content/services';
import { pricingFaq } from '@/content/faq';
import { waLink } from '@/lib/whatsapp';

/**
 * Plain-text knowledge base for the AI assistants (lead qualifier, WhatsApp assistant,
 * blog writer). Built from the same files that render the website, so prices and
 * services quoted by automation can never drift from what the site says.
 */
export function buildKnowledgeBase(): string {
  const out: string[] = [];

  out.push(`# ${site.name}`);
  out.push(`${site.description}`);
  out.push(`Tagline: ${site.tagline}`);
  out.push(`Lokasi: ${site.city}, ${site.region}. Kontak WhatsApp: ${waLink()}`);
  out.push('');

  out.push('## Layanan dan harga (mulai dari)');
  for (const p of products) {
    const service = services.find((s) => s.id === p.id);
    const price =
      p.setup === null
        ? `${shortIdr(p.monthly)} per bulan, tanpa biaya setup`
        : `${shortIdr(p.setup)} ${p.id === 'custom' ? 'build' : 'setup'} + ${shortIdr(p.monthly)} per bulan`;
    out.push(`### ${p.name}: ${price}`);
    out.push(service?.summary ?? p.tagline);
    if (service) out.push(`Cocok untuk: ${service.forWho}`);
    out.push(...p.features.map((f) => `- ${f}`));
    out.push('');
  }

  out.push('## Aturan harga');
  out.push('- Semua harga adalah titik awal. Angka final ditulis setelah konsultasi, sebelum klien membayar.');
  out.push('- Semua layanan punya biaya bulanan. Marketing AI memakai kontrak minimal 3 bulan.');
  out.push('- Biaya WhatsApp Business API dibayar langsung oleh klien ke penyedia.');
  out.push('');

  out.push('## FAQ');
  for (const f of pricingFaq) {
    out.push(`Q: ${f.q}`);
    out.push(`A: ${f.a}`);
    out.push('');
  }

  out.push('## Cara kerja');
  out.push('1. Konsultasi gratis. 2. Proposal dan estimasi tertulis. 3. Pengembangan bertahap. 4. Launch dan pelatihan, lalu pemantauan bulanan.');
  out.push('');

  out.push('## Batasan (jangan dijanjikan)');
  out.push('- Tidak menjanjikan peringkat Google, jumlah penjualan, atau angka hasil tertentu.');
  out.push('- Tidak menjual jasa backlink otomatis, follower, atau spam.');
  out.push('- Tidak ada diskon atau harga khusus tanpa persetujuan pemilik.');

  return out.join('\n');
}
