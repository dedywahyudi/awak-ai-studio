import { customProduct } from '@/lib/pricing';
import { shortIdr } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

/** Featured band (one per page) that routes custom requests to the contact form. */
export function CustomBand() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-pricing border border-line-featured bg-featured p-7 md:p-8">
      <div className="flex min-w-0 flex-1 basis-96 flex-col gap-2">
        <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-strong">
          Butuh solusi custom?
        </h3>
        <p className="leading-relaxed text-body">
          Web app, aplikasi mobile, atau integrasi dengan sistem yang sudah Anda pakai. Kami kerjakan
          dari ide sampai rilis, diawali sesi discovery berbayar. Mulai dari {shortIdr(customProduct.setup ?? 0)}.
        </p>
      </div>
      <Button href="/solusi-custom" arrow>
        Hubungi Kami
      </Button>
    </div>
  );
}
