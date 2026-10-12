import { z } from 'zod';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmailOrPhone(value: string): boolean {
  if (emailRe.test(value)) return true;
  const digits = value.replace(/[\s+\-()]/g, '');
  return /^\d{8,15}$/.test(digits);
}

export const leadSchema = z.object({
  nama: z.string().trim().min(2, 'Nama minimal 2 huruf').max(80, 'Nama terlalu panjang'),
  namaBisnis: z
    .string()
    .trim()
    .min(2, 'Isi nama bisnis Anda')
    .max(120, 'Nama bisnis terlalu panjang'),
  kontak: z
    .string()
    .trim()
    .min(5, 'Isi nomor WhatsApp atau email')
    .max(120, 'Terlalu panjang')
    .refine(isEmailOrPhone, 'Isi nomor WhatsApp atau email yang valid'),
  jenisKebutuhan: z.string().trim().min(1, 'Pilih salah satu').max(80),
  budgetRange: z.string().trim().max(80).optional().default(''),
  deskripsi: z
    .string()
    .trim()
    .min(10, 'Ceritakan kebutuhan Anda minimal 10 karakter')
    .max(2000, 'Maksimal 2000 karakter'),
  sourcePage: z.string().trim().max(200).default('/'),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadFormState =
  | { ok: true; message: string }
  | { ok: false; message: string; errors?: Partial<Record<keyof LeadInput, string>> };
