import type { Post } from '@/lib/types';

/**
 * Seed posts shown when Supabase is not configured (and useful as a fallback).
 * Real posts live in the Supabase `posts` table. Content is Markdown.
 * No invented statistics: add real numbers only when you have a source.
 */
export const localPosts: Post[] = [
  {
    title: 'Menambahkan OpenAI ke platform yang sudah berjalan: apa yang perlu disiapkan',
    slug: 'menambahkan-openai-ke-platform-berjalan',
    category: 'AI untuk UMKM',
    publishedAt: '2026-10-12T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Dari pengalaman memimpin platform tantangan coding berbasis AI: satu kasus pakai dulu, panggilan AI di server, dan manusia yang meninjau.',
    content: `Salah satu proyek yang kami pimpin adalah platform tantangan coding berbasis AI, dibangun dengan React dan Django, dengan integrasi OpenAI. Berikut hal yang kami pegang saat menambahkan AI ke platform yang sudah berjalan.

## Mulai dari satu kasus pakai

Jangan menaruh AI di semua fitur sekaligus. Pilih satu masalah yang jelas, misalnya membantu membuat atau menjelaskan soal, lalu ukur apakah pengguna benar-benar terbantu. Fitur kedua baru dikerjakan setelah yang pertama terbukti berguna.

## Jalankan panggilan AI di server

Kunci API tidak boleh berada di browser. Letakkan panggilan ke model di backend, batasi siapa yang boleh memanggil, dan catat pemakaiannya. Dengan begitu biaya bisa dipantau dan penyalahgunaan bisa dibatasi.

## Siapkan jalur cadangan

API model bisa lambat atau gagal. Putuskan lebih dulu apa yang dilihat pengguna saat itu terjadi: pesan yang jelas, hasil sebelumnya, atau jalur manual. Fitur AI yang gagal tanpa penjelasan lebih merusak kepercayaan daripada tidak punya fitur AI.

## Tetap ada manusia yang meninjau

Keluaran model perlu diperiksa sebelum dipakai atas nama platform Anda. Tentukan siapa yang meninjau, dan pada tahap mana. AI mempercepat pekerjaan, tetapi tanggung jawab tetap pada manusia.

## Jangan lupakan performa dan SEO

Fitur AI yang membuat halaman lambat akan mengurangi manfaatnya. Muat bagian AI secara terpisah, dan pastikan konten utama tetap cepat terbaca oleh pengguna dan mesin pencari.

Sedang mempertimbangkan AI untuk produk digital Anda? Kami bisa membantu memetakan kasus pakai yang paling masuk akal lewat audit kebutuhan gratis.`,
  },
  {
    title: 'Dasbor analisis sentimen: apa yang membuatnya benar-benar dipakai tim',
    slug: 'dasbor-analisis-sentimen-media-sosial',
    category: 'AI untuk UMKM',
    publishedAt: '2026-10-15T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Dari proyek aplikasi analisis sentimen media sosial: dasbor, laporan, dan peringatan, serta cara membuat tim mau membukanya setiap minggu.',
    content: `Kami pernah memimpin pengembangan aplikasi web untuk menganalisis sentimen media sosial secara real-time, lengkap dengan dasbor, laporan, dan peringatan. Fitur pentingnya bukan grafik yang banyak, tetapi apakah tim benar-benar memakainya.

## Mulai dari keputusan, bukan dari data

Tanyakan dulu: keputusan apa yang ingin dibantu? Misalnya, kapan harus membalas keluhan publik, atau kapan kampanye perlu diubah. Dasbor yang dirancang dari keputusan akan lebih singkat dan lebih berguna.

## Peringatan lebih sering dipakai daripada dasbor

Tidak semua orang membuka dasbor setiap hari. Peringatan saat sentimen berubah tajam membuat tim bereaksi tepat waktu. Pastikan ambang peringatan bisa diatur supaya tidak terlalu sering berbunyi.

## Laporan rutin menjaga kebiasaan

Ringkasan mingguan yang dikirim otomatis membantu pimpinan melihat tren tanpa membuka aplikasi. Jaga agar laporannya pendek dan menjawab pertanyaan yang sama setiap kali.

## Sentimen adalah sinyal, bukan kebenaran

Model bisa salah membaca sindiran, bahasa gaul, atau campuran bahasa. Sediakan cara melihat komentar aslinya di balik angka, dan biarkan manusia memutuskan langkah berikutnya.

## Ukur dampaknya

Catat apakah waktu respons terhadap keluhan membaik setelah dasbor dipakai. Tanpa ukuran, sulit tahu apakah investasinya berhasil.

Punya data yang menumpuk tanpa dipakai? Ceritakan lewat audit kebutuhan gratis kami.`,
  },
  {
    title: 'Membangun aplikasi AI untuk data sensitif: pelajaran dari proyek bidang medis',
    slug: 'aplikasi-ai-data-sensitif-bidang-medis',
    category: 'AI untuk UMKM',
    publishedAt: '2026-10-18T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Dari aplikasi web AI yang menganalisis pola aliran darah dan memprediksi hasil pascaprosedur: AI sebagai pendukung keputusan, bukan pengganti ahli.',
    content: `Kami pernah mengembangkan frontend dan backend sebuah aplikasi web AI yang menganalisis pola aliran darah dan memprediksi hasil pascaprosedur. Bekerja dengan data sensitif mengubah cara kami membangun.

## AI mendukung, ahli memutuskan

Prediksi adalah masukan untuk ahli, bukan keputusan akhir. Rancang antarmuka agar jelas bahwa hasilnya perkiraan, dan beri ruang bagi ahli untuk menolak atau mengoreksinya.

## Tampilkan dasar dari hasilnya

Angka tanpa penjelasan sulit dipercaya. Tampilkan data apa yang dipakai dan seberapa yakin sistem, supaya pengguna bisa menilai sendiri.

## Batasi data yang dikumpulkan

Simpan hanya data yang benar-benar dibutuhkan, dan batasi siapa yang bisa mengaksesnya. Di Indonesia, data pribadi tunduk pada UU Pelindungan Data Pribadi (UU 27/2022), jadi aturan ini perlu dipahami sejak awal.

## Catat setiap hasil

Simpan riwayat masukan, hasil, dan siapa yang meninjau. Catatan ini penting untuk menelusuri kesalahan dan memperbaiki sistem.

## Validasi bersama pakar bidangnya

Engineer tidak cukup untuk menilai apakah hasil masuk akal secara medis. Libatkan pakar sejak awal, bukan hanya di akhir.

Prinsip yang sama berlaku di bidang lain yang datanya sensitif, seperti keuangan dan layanan publik. Ingin membahas kebutuhan Anda? Mulai dari audit kebutuhan gratis.`,
  },
];
