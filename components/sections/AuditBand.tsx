import { Check } from 'lucide-react';
import { auditProduct } from '@/lib/pricing';
import { Button } from '@/components/ui/Button';

/** Entry offer band. Sits above the pricing cards on the home page and /layanan. */
export function AuditBand() {
  return (
    <div className="flex flex-col gap-6 rounded-pricing border border-line bg-card p-7 md:p-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">
            Sebelum mulai
          </span>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-strong">
            {auditProduct.name}
          </h3>
          <p className="max-w-2xl leading-relaxed text-body">{auditProduct.tagline}</p>
        </div>
        <ul className="flex max-w-2xl flex-col gap-2.5">
          {auditProduct.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-body">
              <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex shrink-0 flex-col gap-3 lg:items-end">
        <div className="flex flex-col gap-1 lg:items-end">
          <span className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] text-highlight">
            Gratis
          </span>
          <span className="text-sm text-muted">tanpa kewajiban untuk lanjut</span>
        </div>
        <Button href={auditProduct.href} arrow>
          {auditProduct.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
