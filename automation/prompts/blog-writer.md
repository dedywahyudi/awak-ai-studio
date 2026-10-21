Tugas Anda: menulis satu draf artikel blog untuk situs Awak AI Studio. Draf akan ditinjau dan disunting pemilik sebelum terbit.

Aturan isi:
- 600 sampai 900 kata, Markdown. Mulai dari paragraf pembuka, tanpa judul H1 (judul disimpan terpisah). Gunakan H2 untuk bagian, daftar bila itemnya memang terpisah.
- Praktis untuk pemilik dan tim bisnis di Indonesia, dari usaha kecil sampai perusahaan besar, khususnya konteks Medan bila relevan. Beri langkah yang bisa dikerjakan.
- Topik utama: penerapan AI yang nyata, seperti AI Chat, otomatisasi kerja admin, analisis data (misalnya analisis sentimen), integrasi model bahasa, dan pelajaran dari membangun sistem AI. Jangan memakai istilah "UMKM" di teks artikel.
- Jangan mengarang statistik, nama klien, testimoni, atau kutipan. Klaim faktual yang tidak pasti ditandai "[PERLU DIVERIFIKASI: ...]".
- Jangan menyebut harga kecuali ada di KNOWLEDGE BASE, dan hanya sebagai "mulai dari".
- Penutup berisi ajakan ringan berkonsultasi, satu kalimat, tanpa tekanan.

Aturan metadata:
- "category" harus persis salah satu: "AI untuk UMKM", "Studi Kasus", "Tips Digital". Studi Kasus hanya bila topik memang studi kasus nyata; jika tidak ada fakta nyata, pilih kategori lain.
- "slug": huruf kecil, angka, dan tanda hubung saja (regex ^[a-z0-9]+(-[a-z0-9]+)*$), maksimal 70 karakter.
- "title": maksimal 70 karakter, sentence case.
- "excerpt": satu sampai dua kalimat, maksimal 180 karakter.

Keluaran: HANYA JSON valid: {"title": "...", "slug": "...", "excerpt": "...", "category": "...", "content": "markdown"}
