import type { Post } from '@/lib/types';

/**
 * Seed posts shown when Supabase is not configured (and useful as a fallback).
 * Real posts live in the Supabase `posts` table. Content is Markdown.
 * No invented statistics: add real numbers only when you have a source.
 */
export const localPosts: Post[] = [
  {
    title: 'Menambahkan AI ke sistem yang sudah berjalan: apa yang perlu disiapkan',
    slug: 'menambahkan-ai-ke-sistem-berjalan',
    category: 'AI untuk UMKM',
    publishedAt: '2026-10-12T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Bisnis kecil sampai besar bisa menambahkan AI tanpa membangun ulang sistemnya: satu kasus pakai dulu, panggilan AI di server, jalur cadangan, dan manusia yang meninjau.',
    content: `Anda tidak perlu membangun ulang sistem untuk memakai AI. Yang sering lebih berhasil adalah menambahkannya sedikit demi sedikit ke sistem yang sudah berjalan, entah itu toko online, aplikasi internal, atau platform pelanggan. Berikut hal yang kami pegang.

## Mulai dari satu kasus pakai

Jangan menaruh AI di semua fitur sekaligus. Pilih satu masalah yang jelas, misalnya menjawab pertanyaan berulang atau merangkum laporan, lalu ukur apakah pengguna benar-benar terbantu. Fitur kedua baru dikerjakan setelah yang pertama terbukti berguna.

## Jalankan panggilan AI di server

Kunci API tidak boleh berada di browser atau aplikasi mobile. Letakkan panggilan ke model di backend, batasi siapa yang boleh memanggil, dan catat pemakaiannya. Dengan begitu biaya bisa dipantau dan penyalahgunaan bisa dibatasi.

## Siapkan jalur cadangan

API model bisa lambat atau gagal. Putuskan lebih dulu apa yang dilihat pengguna saat itu terjadi: pesan yang jelas, hasil sebelumnya, atau jalur manual. Fitur AI yang gagal tanpa penjelasan lebih merusak kepercayaan daripada tidak punya fitur AI.

## Tetap ada manusia yang meninjau

Keluaran model perlu diperiksa sebelum dipakai atas nama bisnis Anda. Tentukan siapa yang meninjau, dan pada tahap mana. AI mempercepat pekerjaan, tetapi tanggung jawab tetap pada manusia.

## Jaga performa

Fitur AI yang membuat halaman atau aplikasi lambat akan mengurangi manfaatnya. Muat bagian AI secara terpisah, dan pastikan konten utama tetap cepat terbaca.

Sedang mempertimbangkan AI untuk sistem Anda? Kami bisa membantu memetakan kasus pakai yang paling masuk akal lewat [audit gratis](/audit-gratis).`,
  },
  {
    title: 'Dasbor analisis sentimen: apa yang membuatnya benar-benar dipakai tim',
    slug: 'dasbor-analisis-sentimen-media-sosial',
    category: 'Studi Kasus',
    publishedAt: '2026-10-15T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Dari proyek analisis sentimen yang menyatukan media sosial online dan offline: dasbor, laporan, dan peringatan, serta cara membuat tim mau membukanya setiap minggu.',
    content: `Kami pernah memimpin pengembangan aplikasi web yang menyatukan berbagai media sosial, online maupun offline, dalam satu sistem sentimen, lengkap dengan dasbor, laporan, dan peringatan ([lihat studi kasusnya](/studi-kasus/analisis-sentimen-media-sosial)). Fitur pentingnya bukan grafik yang banyak, tetapi apakah tim benar-benar memakainya.

## Satu sistem untuk semua kanal

Percakapan yang tersebar di banyak kanal sulit dibandingkan. Dengan satu sistem sentimen, tim melihat gambaran yang sama dari semua sumber, bukan beberapa laporan yang berbeda ukurannya.

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

Punya data yang menumpuk tanpa dipakai? Ceritakan lewat [audit gratis](/audit-gratis) kami.`,
  },
  {
    title: 'Membangun aplikasi AI untuk data sensitif: pelajaran dari proyek bidang medis',
    slug: 'aplikasi-ai-data-sensitif-bidang-medis',
    category: 'Studi Kasus',
    publishedAt: '2026-10-18T09:00:00+07:00',
    coverImage: null,
    excerpt:
      'Dari aplikasi web AI yang menganalisis pola aliran darah dan memprediksi hasil pascaprosedur: AI sebagai pendukung keputusan, bukan pengganti ahli.',
    content: `Kami pernah mengembangkan frontend dan backend sebuah aplikasi web AI yang menganalisis pola aliran darah dan memprediksi hasil pascaprosedur ([lihat studi kasusnya](/studi-kasus/aplikasi-web-ai-bidang-medis)). Bekerja dengan data sensitif mengubah cara kami membangun.

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

Prinsip yang sama berlaku di bidang lain yang datanya sensitif, seperti keuangan dan layanan publik. Ingin membahas kebutuhan Anda? Mulai dari [audit gratis](/audit-gratis).`,
  },
  {
    title: 'Mulai dari mana otomatisasi bisnis? Pilih pekerjaan yang paling berulang',
    slug: 'mulai-otomatisasi-dari-pekerjaan-berulang',
    category: 'Tips Digital',
    publishedAt: '2026-10-20T09:00:00+07:00',
    coverImage: null,
    excerpt: 'Cara memilih pekerjaan pertama yang layak diotomatisasi, untuk bisnis dari skala kecil sampai besar.',
    content: `Otomatisasi paling terasa manfaatnya bila dimulai dari pekerjaan yang tepat. Tiga pertanyaan ini membantu memilihnya.

## Apakah pekerjaannya berulang?

Pekerjaan yang dilakukan dengan langkah yang sama berkali-kali, seperti menjawab pertanyaan yang sama atau memindahkan data antar sistem, adalah kandidat terbaik.

## Apakah aturannya jelas?

Bila Anda bisa menuliskan langkahnya, mesin bisa mengerjakannya. Bila keputusannya bergantung pada penilaian yang sulit dijelaskan, biarkan manusia yang memutuskan dan minta mesin menyiapkan bahannya.

## Apa risikonya bila salah?

Mulai dari pekerjaan yang kesalahannya mudah diperbaiki, dan tetap sediakan langkah peninjauan manusia sebelum hasilnya sampai ke pelanggan.

Setelah satu pekerjaan berjalan baik, baru tambah yang berikutnya. Ingin dibantu memilih? Mulai dari [audit gratis](/audit-gratis).`,
  },
];
