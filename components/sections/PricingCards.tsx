import { Check, Star } from 'lucide-react';
import { headlinePrice, priceNote, products, type Product } from '@/lib/pricing';
import { waConsultMessage, waLink } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
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
            <Badge tone="popular" size="sm" icon={Star}>
              {product.badge}
            </Badge>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted">{product.tagline}</p>
      </div>

      <ul className="flex flex-col gap-3 border-t border-line pt-5">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm leading-snug text-body">
            <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-link" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-5 border-t border-line pt-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.08em] text-subtle">Mulai dari</span>
          <div className="flex flex-col gap-1">
            <span className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] text-strong tabular-nums">
              {headlinePrice(product)}
            </span>
            <span className="text-sm text-muted">{priceNote(product)}</span>
          </div>
        </div>

        <Button
          variant={featured ? 'primary' : 'secondary'}
          href={product.id === 'custom' ? '/solusi-custom' : waLink(waConsultMessage(product.name))}
          arrow
          fullWidth
        >
          {product.ctaLabel}
        </Button>
      </div>
    </article>
  );
}

/** All three products in one row on desktop; custom routes to /solusi-custom. */
export function PricingCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {products.map((p) => (
        <PricingCard key={p.id} product={p} />
      ))}
    </div>
  );
}
