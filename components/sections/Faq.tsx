import { Plus } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

function FaqColumn({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-card border border-line bg-card">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-base font-bold text-strong [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              size={20}
              aria-hidden="true"
              className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-body">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/**
 * Accessible accordion with native <details>: no client JS. Two columns from md up; each column
 * is its own stack so opening an item never stretches its neighbour.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const half = Math.ceil(items.length / 2);
  return (
    <div className="grid items-start gap-3 md:grid-cols-2 md:gap-5">
      <FaqColumn items={items.slice(0, half)} />
      <FaqColumn items={items.slice(half)} />
    </div>
  );
}
