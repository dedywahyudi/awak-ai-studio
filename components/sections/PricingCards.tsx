import { Check, Star } from 'lucide-react';
import { cardProducts, headlinePrice, priceNote, type Product } from '@/lib/pricing';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

function PricingCard({ product }: { product: Product }) {
  const featured = Boolean(product.featured);
  return (
    <article
      className={cn(
        'relative flex flex-col gap-6 rounded-pricing border p-7',
        featured
          ? 'border-line-featured bg-featured shadow-featured'
          : 'border-line bg-card shadow-sm',
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <h3 className="font-display text-lg font-extrabold tracking-[-0.01em] text-strong">
            {product.name}
          </h3>
          {featured && product.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-link">
              <Star size={12} aria-hidden="true" />
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted">{product.tagline}</p>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Mulai dari</span>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] text-strong tabular-nums">
            {headlinePrice(product)}
          </span>
          <span className="text-sm text-muted">{priceNote(product)}</span>
        </div>
      </div>

      <Button
        variant={featured ? 'primary' : 'secondary'}
        href={waLink(waConsultMessage(product.name))}
        arrow
        fullWidth
      >
        {product.ctaLabel}
      </Button>

      <ul className="flex flex-col gap-3 border-t border-line pt-5">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-body">
            <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/** The three priced products. Custom is handled by <CustomBand />. */
export function PricingCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {cardProducts.map((p) => (
        <PricingCard key={p.id} product={p} />
      ))}
    </div>
  );
}
