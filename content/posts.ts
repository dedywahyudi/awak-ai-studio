import type { Post } from '@/lib/types';

/**
 * Seed posts shown when Supabase is not configured (and useful as a fallback).
 * Real posts live in the Supabase `posts` table. Content is Markdown.
 * No invented statistics: add real numbers only when you have a source.
 */
export const localPosts: Post[] = [
  {
    title: 'Chatbot WhatsApp untuk UMKM: apa yang bisa dan tidak bisa dijawab',
    slug: 'chatbot-whatsapp-untuk-umkm',
    category: 'AI untuk UMKM',
    publishedAt: '2026-10-01T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Chatbot bagus untuk pertanyaan berulang. Ini daftar yang cocok diserahkan ke bot, dan yang sebaiknya tetap dijawab manusia.',
    content: `Pemilik usaha sering membayangkan chatbot sebagai pengganti seluruh tim admin. Kenyataannya, chatbot paling berguna untuk **pertanyaan yang itu-itu saja**.

## Cocok diserahkan ke chatbot

- Harga produk dan daftar menu
- Jam buka dan lokasi
- Cek ketersediaan stok yang datanya sudah rapi
- Cara pesan, cara bayar, dan estimasi pengiriman
- Pertanyaan di luar jam kerja

## Sebaiknya tetap manusia

- Komplain dan situasi yang butuh empati
- Negosiasi harga atau pesanan khusus
- Pertanyaan yang jawabannya belum tertulis di mana pun

## Kuncinya ada di data

Chatbot hanya sebaik data yang Anda berikan. Daftar harga yang berantakan akan menghasilkan jawaban yang berantakan. Karena itu, sebagian besar pekerjaan kami di awal adalah merapikan data bisnis Anda, bukan memasang bot.

Chatbot yang baik juga tahu kapan harus berhenti. Saat ia tidak yakin, pertanyaan diteruskan ke tim Anda lengkap dengan riwayat percakapan.`,
  },
  {
    title: '5 pertanyaan sebelum memakai AI di bisnis Anda',
    slug: 'lima-pertanyaan-sebelum-memakai-ai',
    category: 'Tips Digital',
    publishedAt: '2026-10-05T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Sebelum membayar alat atau agensi apa pun, jawab lima pertanyaan ini. Hasilnya menentukan AI mana yang layak dicoba.',
    content: `AI bukan tujuan. Ia alat untuk menyelesaikan masalah tertentu. Sebelum mengeluarkan uang, jawab lima pertanyaan ini.

## 1. Pekerjaan apa yang paling sering berulang?

Balas pesan yang sama, input pesanan, bikin laporan. Pekerjaan berulang adalah kandidat terbaik.

## 2. Berapa jam per minggu yang habis untuk itu?

Hitung kasar. Jika hanya satu jam per minggu, mungkin belum perlu otomatisasi.

## 3. Di mana datanya sekarang?

Buku tulis, WhatsApp pribadi, atau spreadsheet? Data yang tersebar harus dirapikan dulu.

## 4. Siapa yang memeriksa hasilnya?

AI bisa salah. Tentukan orang yang meninjau hasil, terutama untuk konten yang tayang atas nama bisnis Anda.

## 5. Bagaimana mengukur berhasil atau tidak?

Contoh: jumlah pertanyaan pelanggan yang terjawab tanpa admin, atau waktu yang dihemat per minggu. Tanpa ukuran, sulit tahu apakah uang Anda kembali.`,
  },
  {
    title: 'Kenapa bisnis lokal di Medan perlu tampil di Google Maps dan pencarian',
    slug: 'bisnis-lokal-medan-google-maps',
    category: 'Tips Digital',
    publishedAt: '2026-10-09T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Banyak calon pelanggan mencari "dekat saya" sebelum memutuskan. Ini langkah dasar agar bisnis Anda mudah ditemukan.',
    content: `Calon pelanggan sering mulai dari pencarian: nama jenis usaha plus lokasi. Jika bisnis Anda tidak muncul, Anda kalah sebelum percakapan dimulai.

## Langkah dasar

1. **Klaim profil Google Business.** Isi nama, alamat, jam buka, dan nomor WhatsApp yang sama persis dengan di website.
2. **Pasang foto asli.** Foto tempat dan produk yang sebenarnya lebih dipercaya daripada foto stok.
3. **Minta ulasan dari pelanggan nyata.** Balas setiap ulasan, termasuk yang kritis.
4. **Buat website yang cepat di ponsel.** Sebagian besar pengunjung datang dari ponsel.
5. **Tulis halaman layanan dengan kata yang dipakai pelanggan,** bukan istilah internal.

## Konsisten itu penting

Nama, alamat, dan nomor telepon yang berbeda-beda di tiap tempat membingungkan mesin pencari dan calon pelanggan. Samakan di mana pun bisnis Anda terdaftar.

Blog juga membantu: setiap artikel yang menjawab pertanyaan pelanggan adalah pintu masuk baru dari pencarian.`,
  },
];
