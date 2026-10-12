'use client';

import { useId, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/app/actions/submit-lead';
import type { LeadFormState, LeadInput } from '@/lib/schema';
import { budgetOptions, jenisKebutuhanGeneral, jenisProyekCustom } from '@/lib/lead-options';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { waConsultMessage, waLink } from '@/lib/whatsapp';

type Variant = 'general' | 'custom';

const fieldBase =
  'w-full rounded-[10px] border border-line-strong bg-field px-4 py-3 text-base text-strong placeholder:text-subtle focus:border-accent-ring focus:outline-none focus:ring-[3px] focus:ring-[rgba(19,144,251,.45)]';

export function LeadForm({ variant = 'general' }: { variant?: Variant }) {
  const pathname = usePathname();
  const uid = useId();
  const [state, setState] = useState<LeadFormState | null>(null);
  const [pending, startTransition] = useTransition();

  const custom = variant === 'custom';
  const needOptions = custom ? jenisProyekCustom : jenisKebutuhanGeneral;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    startTransition(async () => {
      const result = await submitLead(data);
      setState(result);
      if (result.ok) form.reset();
    });
  }

  if (state?.ok) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-4 rounded-pricing border border-line-featured bg-featured p-8"
      >
        <CheckCircle2 size={32} className="text-success" aria-hidden="true" />
        <p className="font-display text-xl font-bold text-strong">{state.message}</p>
        <Button variant="whatsapp" href={waLink(waConsultMessage())}>
          Lanjut via WhatsApp
        </Button>
      </div>
    );
  }

  const err = (name: keyof LeadInput) => (state && !state.ok ? state.errors?.[name] : undefined);

  const field = (name: keyof LeadInput, label: string, node: (id: string, invalid: boolean) => React.ReactNode, required = true) => {
    const id = `${uid}-${name}`;
    const message = err(name);
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-strong">
          {label}
          {!required && <span className="ml-1 font-normal text-subtle">(opsional)</span>}
        </label>
        {node(id, Boolean(message))}
        {message && (
          <p id={`${id}-error`} className="text-sm text-danger">
            {message}
          </p>
        )}
      </div>
    );
  };

  const a11y = (id: string, invalid: boolean) => ({
    id,
    name: id.split('-').pop(),
    'aria-invalid': invalid || undefined,
    'aria-describedby': invalid ? `${id}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="sourcePage" value={pathname} />
      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {field('nama', 'Nama', (id, bad) => (
          <input {...a11y(id, bad)} type="text" autoComplete="name" required className={cn(fieldBase, bad && 'border-danger')} />
        ))}
        {field('namaBisnis', 'Nama bisnis', (id, bad) => (
          <input {...a11y(id, bad)} type="text" autoComplete="organization" required className={cn(fieldBase, bad && 'border-danger')} />
        ))}
      </div>

      {field('kontak', 'WhatsApp atau email', (id, bad) => (
        <input
          {...a11y(id, bad)}
          type="text"
          inputMode="text"
          autoComplete="email"
          placeholder="0812xxxxxxx atau nama@email.com"
          required
          className={cn(fieldBase, bad && 'border-danger')}
        />
      ))}

      <div className={cn('grid gap-5', custom && 'sm:grid-cols-2')}>
        {field('jenisKebutuhan', custom ? 'Jenis proyek' : 'Yang Anda butuhkan', (id, bad) => (
          <select {...a11y(id, bad)} required defaultValue="" className={cn(fieldBase, bad && 'border-danger')}>
            <option value="" disabled>
              Pilih salah satu
            </option>
            {needOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ))}
        {custom &&
          field(
            'budgetRange',
            'Perkiraan budget',
            (id, bad) => (
              <select {...a11y(id, bad)} defaultValue="" className={cn(fieldBase, bad && 'border-danger')}>
                <option value="">Pilih salah satu</option>
                {budgetOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ),
            false,
          )}
      </div>

      {field('deskripsi', 'Ceritakan kebutuhan Anda', (id, bad) => (
        <textarea
          {...a11y(id, bad)}
          rows={5}
          required
          placeholder="Contoh: toko kue, banyak pertanyaan harga lewat WhatsApp, ingin dibalas otomatis."
          className={cn(fieldBase, 'resize-y', bad && 'border-danger')}
        />
      ))}

      {state && !state.ok && !state.errors && (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} arrow>
          {pending ? 'Mengirim…' : 'Kirim Pesan'}
        </Button>
        <p className="text-xs text-subtle">
          Dengan mengirim, Anda setuju dengan{' '}
          <a href="/kebijakan-privasi" className="underline underline-offset-2 hover:text-white">
            Kebijakan Privasi
          </a>
          .
        </p>
      </div>
    </form>
  );
}
