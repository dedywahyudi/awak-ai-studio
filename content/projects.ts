/**
 * Selected projects for /studi-kasus and the detail pages. Facts only: what the screens show and what the
 * founder's profile states. No invented results or numbers. The AI block appears only where AI use is evident.
 * Screenshots: public/images/projects/<slug>/NN.jpg (optimised copies; originals stay local in public/projects/).
 */
export type ProcessIcon =
  | 'file' | 'upload' | 'code' | 'award' | 'scan' | 'layers' | 'chart' | 'map' | 'link' | 'rss' | 'message'
  | 'log-in' | 'map-pin' | 'route' | 'car' | 'users' | 'check' | 'sliders' | 'list' | 'play' | 'camera' | 'bell'
  | 'search' | 'building' | 'shield' | 'history' | 'refresh' | 'leaf' | 'trending' | 'briefcase' | 'coins'
  | 'truck' | 'headset' | 'gauge';

export interface ProcessStep {
  icon: ProcessIcon;
  title: string;
  body: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** Year or years, shown on the card and the page. For some projects inferred from dates visible in the screens. */
  period: string;
  /** Still in beta: listed first and marked. */
  beta?: boolean;
  /** Card text. */
  summary: string;
  tags: string[];
  industry: string;
  /** Which AI the project uses: short label for the card, one line for the detail page. `none` = no AI. */
  aiUsed: { label: string; detail: string; none?: boolean };
  platform: string;
  intro: string;
  /** Key features. */
  points: string[];
  /** The infographic: how the product works, step by step. */
  process: ProcessStep[];
  /** How AI is used. Only where it is evident; otherwise omitted. */
  ai?: { title: string; body: string }[];
  stack: string[];
  gallery: ProjectImage[];
  /** Index of the gallery image used on the list card (defaults to the first). */
  coverIndex?: number;
}

const projectList: Project[] = [
  {
    slug: 'aplikasi-web-ai-bidang-medis',
    title: 'Aplikasi web AI untuk bidang medis',
    period: '2025 – 2026',
    beta: true,
    summary:
      'Aplikasi web yang menganalisis pola aliran darah dan memprediksi hasil pascaprosedur. Kami mengerjakan frontend dan backend-nya.',
    tags: ['React', 'PostgreSQL', 'AI'],
    industry: 'Kesehatan',
    aiUsed: { label: 'Computer vision', detail: 'Computer vision untuk citra medis (DICOM): analisis angiografi dan probabilitas skor mTICI.' },
    platform: 'Aplikasi web',
    intro:
      'Aplikasi web berbasis AI untuk menilai reperfusi pada kasus stroke iskemik (skor mTICI), dengan menganalisis citra angiografi dan pola aliran darah.',
    points: [
      'Mengembangkan dan memelihara frontend dan backend aplikasi.',
      'Alur analisis empat langkah: pilih berkas DICOM, lokalisasi titik masuk, pilih fase kapiler, analisis.',
      'Menampilkan probabilitas skor mTICI serta peta peak height dan AUC.',
      'Hasil menjadi masukan bagi tenaga ahli, bukan keputusan akhir.',
    ],
    process: [
      { icon: 'upload', title: 'Pilih berkas DICOM', body: 'Pengguna memilih citra angiografi satu kasus, tampak lateral dan frontal.' },
      { icon: 'scan', title: 'Lokalisasi titik masuk', body: 'Titik masuk pembuluh darah (inlet) ditandai pada citra.' },
      { icon: 'layers', title: 'Pilih fase kapiler', body: 'Fase kapiler yang akan dianalisis dipilih.' },
      { icon: 'chart', title: 'Analisis hasil', body: 'Sistem menampilkan probabilitas skor mTICI untuk kondisi awal.' },
      { icon: 'map', title: 'Baca peta detail', body: 'Peta peak height dan AUC membantu membaca pola aliran darah.' },
    ],
    ai: [
      { title: 'Analisis citra angiografi', body: 'Citra DICOM dari dua sudut pandang diproses menjadi probabilitas skor mTICI serta peta peak height dan area di bawah kurva (AUC).' },
      { title: 'AI sebagai pendukung keputusan', body: 'Keluaran berupa perkiraan untuk ditinjau tenaga ahli, bukan diagnosis otomatis.' },
    ],
    stack: ['React', 'PostgreSQL'],
    gallery: [
      { src: '/images/projects/aplikasi-web-ai-bidang-medis/01.jpg', alt: 'Memilih berkas DICOM tampak lateral dan frontal', width: 1400, height: 995 },
      { src: '/images/projects/aplikasi-web-ai-bidang-medis/02.jpg', alt: 'Lokalisasi titik masuk pembuluh darah', width: 1400, height: 995 },
      { src: '/images/projects/aplikasi-web-ai-bidang-medis/03.jpg', alt: 'Hasil analisis berupa probabilitas skor mTICI', width: 1400, height: 1426 },
      { src: '/images/projects/aplikasi-web-ai-bidang-medis/04.jpg', alt: 'Peta peak height', width: 1400, height: 1050 },
      { src: '/images/projects/aplikasi-web-ai-bidang-medis/05.jpg', alt: 'Peta area di bawah kurva (AUC)', width: 1400, height: 1050 },
    ],
  },
  {
    slug: 'platform-personalisasi-kondisi-diri',
    title: 'Platform personalisasi kondisi diri dan performa',
    period: '2025 – 2026',
    beta: true,
    summary:
      'Platform yang memilih dan menyusun sesi latihan sesuai momen pengguna, lalu mengukur perubahannya untuk personalisasi berikutnya.',
    tags: ['Personalisasi', 'Rekomendasi sesi', 'Beta'],
    industry: 'Kesehatan dan performa',
    aiUsed: { label: 'AI percakapan', detail: 'AI percakapan (large language model) untuk memahami kebutuhan pengguna dan menyusun sesi.' },
    platform: 'Aplikasi web',
    intro:
      'Platform beta yang membantu pengguna bersiap menghadapi momen penting atau pulih setelahnya, lewat sesi yang disusun sesuai kebutuhan mereka.',
    points: [
      'Pengguna menceritakan momen yang sedang dihadapi lewat chat.',
      'Pengguna memilih kondisi yang diinginkan, misalnya tenang atau fokus.',
      'Sistem memilih dan menyusun sesi latihan yang sesuai.',
      'Pengguna mencatat perubahan, supaya pengalaman berikutnya makin personal.',
    ],
    process: [
      { icon: 'message', title: 'Ceritakan momen lewat chat', body: 'Pengguna menjelaskan situasi dan kondisi yang ingin dicapai.' },
      { icon: 'sliders', title: 'Sistem menyusun pengalaman', body: 'Kebutuhan itu diterjemahkan menjadi rangkaian sesi.' },
      { icon: 'list', title: 'Pilih segmen sesi', body: 'Pengguna meninjau dan menambah segmen yang cocok.' },
      { icon: 'play', title: 'Jalankan sesi', body: 'Sesi diputar, lalu pengguna mencatat perubahan yang dirasakan.' },
    ],
    ai: [
      { title: 'Obrolan berbasis AI', body: 'Pengguna menceritakan momen dan kondisi yang diinginkan lewat percakapan, bukan formulir panjang.' },
      { title: 'Penyusunan sesi', body: 'Sistem memilih dan menyusun segmen sesi yang sesuai, lalu belajar dari perubahan yang dicatat pengguna.' },
    ],
    stack: ['Personalisasi', 'Rekomendasi sesi'],
    gallery: [
      { src: '/images/projects/platform-personalisasi-kondisi-diri/01.jpg', alt: 'Obrolan untuk menceritakan momen', width: 1400, height: 787 },
      { src: '/images/projects/platform-personalisasi-kondisi-diri/02.jpg', alt: 'Sistem menyusun pengalaman', width: 1400, height: 787 },
      { src: '/images/projects/platform-personalisasi-kondisi-diri/03.jpg', alt: 'Memilih segmen sesi', width: 1400, height: 787 },
      { src: '/images/projects/platform-personalisasi-kondisi-diri/04.jpg', alt: 'Memutar sesi', width: 1400, height: 787 },
    ],
  },
  {
    slug: 'analisis-sentimen-media-sosial',
    title: 'Analisis sentimen media sosial',
    period: '2023',
    summary:
      'Aplikasi web yang menyatukan media sosial online dan offline dalam satu sistem sentimen, dengan dasbor, laporan, dan peringatan.',
    tags: ['UI/UX', 'Dasbor', 'Laporan'],
    industry: 'Media dan pemasaran',
    aiUsed: { label: 'NLP sentimen', detail: 'Pemrosesan bahasa alami (NLP) untuk analisis sentimen teks dari berbagai media sosial.' },
    platform: 'Aplikasi web',
    intro:
      'Aplikasi web untuk menganalisis sentimen media sosial secara real-time, supaya bisnis bisa mengelola reputasi online dan menyusun strategi pemasaran.',
    points: [
      'Memimpin pengembangan aplikasi web analisis sentimen secara real-time.',
      'Integrasi berbagai media sosial, online maupun offline, dalam satu sistem sentimen.',
      'Membangun dasbor, laporan, dan peringatan.',
      'Membantu bisnis mengelola reputasi online dan mengoptimalkan strategi pemasaran.',
    ],
    process: [
      { icon: 'link', title: 'Hubungkan kanal', body: 'Berbagai media sosial, online dan offline, serta kata kunci yang dipantau dihubungkan ke satu aplikasi.' },
      { icon: 'rss', title: 'Satukan percakapan', body: 'Percakapan dari semua kanal dikumpulkan dan disatukan dalam satu sistem.' },
      { icon: 'message', title: 'Analisis sentimen', body: 'Percakapan dinilai sentimennya dan dikelompokkan per topik.' },
      { icon: 'chart', title: 'Dasbor, laporan, peringatan', body: 'Hasil tampil di dasbor, dikirim sebagai laporan, dan memicu peringatan.' },
    ],
    ai: [
      { title: 'Satu sistem sentimen', body: 'Percakapan dari berbagai kanal online dan offline dinilai dengan satu sistem yang sama, sehingga hasilnya bisa dibandingkan.' },
      { title: 'Analisis sentimen', body: 'Menilai sentimen percakapan media sosial secara real-time, lalu merangkumnya dalam dasbor, laporan, dan peringatan.' },
    ],
    stack: ['UI/UX', 'Desain aplikasi web'],
    gallery: [
      { src: '/images/projects/analisis-sentimen-media-sosial/01.jpg', alt: 'Dasbor analisis sentimen media sosial', width: 1400, height: 905 },
    ],
  },
  {
    slug: 'dashboard-command-center',
    title: 'Dashboard command center',
    period: '2023 – 2025',
    summary:
      'Sistem geospasial dengan peta 2D dan 3D untuk manajemen acara: pemantauan lalu lintas, animasi rute, serta prediksi kepadatan dan saran jalur alternatif saat jalan ditutup.',
    tags: ['React', 'Mapbox', 'Prediksi lalu lintas'],
    industry: 'Manajemen acara dan lalu lintas',
    aiUsed: { label: 'Prediksi lalu lintas', detail: 'Prediksi lalu lintas: kepadatan jalan saat penutupan, saran jalur alternatif, dan estimasi waktu tiba.' },
    platform: 'Aplikasi web',
    intro:
      'Sistem geospasial untuk merencanakan dan memantau acara besar di peta 2D dan 3D, lengkap dengan simulasi lalu lintas.',
    points: [
      'Memimpin desain dan pengembangan sistem geospasial dengan Mapbox.',
      'Pemetaan 3D dan 2D untuk visualisasi real-time.',
      'Pemantauan lalu lintas, animasi rute, dan pelacakan dinamis.',
      'Simulasi lalu lintas dan ekspor rencana ke PDF.',
      'Prediksi jalan yang akan padat saat ada jalan ditutup.',
      'Saran jalur alternatif ketika jalan ditutup.',
      'Estimasi waktu tiba dengan memperhitungkan kemacetan.',
    ],
    process: [
      { icon: 'log-in', title: 'Masuk dan pilih proyek', body: 'Pengguna masuk, lalu membuka atau membuat proyek rencana.' },
      { icon: 'map-pin', title: 'Pilih lokasi di peta', body: 'Proyek ditempatkan di peta, dari tingkat nasional sampai jalan.' },
      { icon: 'route', title: 'Susun rencana', body: 'Objek, rute, dan titik penting ditempatkan di peta 2D atau 3D.' },
      { icon: 'car', title: 'Simulasikan lalu lintas', body: 'Pergerakan dan arus lalu lintas disimulasikan sepanjang rute.' },
      { icon: 'trending', title: 'Prediksi dampak penutupan', body: 'Saat jalan ditutup, sistem memprediksi jalan mana yang akan padat dan menyarankan jalur alternatif.' },
      { icon: 'gauge', title: 'Estimasi waktu tiba', body: 'Waktu tiba diperkirakan dengan memperhitungkan kemacetan.' },
      { icon: 'file', title: 'Pantau dan bagikan', body: 'Rencana dipantau dan bisa diekspor ke PDF.' },
    ],
    ai: [
      { title: 'Prediksi jalan padat saat penutupan', body: 'Memperkirakan jalan mana yang akan padat ketika suatu jalan ditutup.' },
      { title: 'Saran jalur alternatif', body: 'Menyarankan rute pengganti ketika jalan ditutup.' },
      { title: 'Estimasi waktu tiba', body: 'Memperkirakan waktu tiba dengan memperhitungkan kemacetan.' },
    ],
    stack: ['React', 'Mapbox', 'PostgreSQL', 'Prediksi lalu lintas'],
    gallery: [
      { src: '/images/projects/dashboard-command-center/01.jpg', alt: 'Halaman masuk', width: 1400, height: 787 },
      { src: '/images/projects/dashboard-command-center/02.jpg', alt: 'Daftar proyek rencana', width: 1400, height: 787 },
      { src: '/images/projects/dashboard-command-center/03.jpg', alt: 'Peta simulasi di seluruh Indonesia', width: 1400, height: 787 },
      { src: '/images/projects/dashboard-command-center/04.jpg', alt: 'Perencanaan rute dan titik di peta', width: 1400, height: 787 },
      { src: '/images/projects/dashboard-command-center/05.jpg', alt: 'Rute dan elemen taktis di peta', width: 1400, height: 787 },
      { src: '/images/projects/dashboard-command-center/06.jpg', alt: 'Rincian penugasan di peta', width: 1400, height: 787 },
      { src: '/images/projects/dashboard-command-center/07.jpg', alt: 'Simulasi lalu lintas', width: 1400, height: 787 },
    ],
  },
  {
    slug: 'dashboard-smart-city',
    title: 'Dashboard Smart City',
    period: '2024 – 2025',
    summary:
      'Dasbor kota cerdas yang menggabungkan peta, kamera, dan statistik untuk memantau kondisi lalu lintas secara real-time.',
    tags: ['React', 'IoT', 'Analitik data'],
    industry: 'Kota cerdas dan transportasi',
    aiUsed: { label: 'Computer vision', detail: 'Computer vision: pengenalan plat nomor, pengenalan wajah, dan deteksi kepadatan orang, plus prediksi pergerakan kendaraan.' },
    platform: 'Dasbor web',
    intro:
      'Platform Smart City yang menggabungkan data dari kamera dan sensor dengan analitik, supaya layanan kota lebih responsif dan efisien.',
    points: [
      'Memimpin pengembangan platform Smart City dengan IoT dan analitik data.',
      'Peta menampilkan status tiap titik dengan warna.',
      'Tampilan kamera, statistik, dan indikator ringkas dalam satu layar.',
      'Prediksi pergerakan kendaraan berdasarkan plat nomor.',
      'Pencarian wajah orang dalam daftar pencarian orang (DPO) dari rekaman CCTV.',
      'Titik keramaian saat ada acara, ditampilkan di peta.',
    ],
    process: [
      { icon: 'camera', title: 'Kamera dan sensor mengirim data', body: 'Titik pemantauan di kota mengirim data secara terus-menerus.' },
      { icon: 'map-pin', title: 'Peta menampilkan status', body: 'Setiap titik diberi warna sesuai kondisinya.' },
      { icon: 'chart', title: 'Statistik dan tren', body: 'Grafik menunjukkan perubahan dari waktu ke waktu.' },
      { icon: 'car', title: 'Prediksi pergerakan kendaraan', body: 'Plat nomor yang terbaca di beberapa titik dipakai untuk memperkirakan arah pergerakan kendaraan.' },
      { icon: 'search', title: 'Pencarian wajah DPO', body: 'Wajah dari rekaman CCTV dicocokkan dengan daftar DPO, lalu petugas meninjau hasilnya.' },
      { icon: 'users', title: 'Titik keramaian saat acara', body: 'Kepadatan orang di sekitar lokasi acara ditandai di peta supaya petugas bisa bersiap.' },
      { icon: 'bell', title: 'Detail titik', body: 'Operator membuka satu titik untuk melihat kamera dan rincian datanya.' },
    ],
    ai: [
      { title: 'Prediksi pergerakan kendaraan', body: 'Pola perjalanan dari plat nomor yang terbaca kamera dipakai untuk memperkirakan ke mana kendaraan bergerak.' },
      { title: 'Pencarian wajah DPO', body: 'Pengenalan wajah mencari kecocokan dengan daftar DPO. Hasilnya berupa kandidat untuk ditinjau petugas, bukan keputusan otomatis.' },
      { title: 'Deteksi keramaian', body: 'Kepadatan orang dari kamera dipetakan untuk menemukan titik keramaian ketika ada acara.' },
    ],
    stack: ['React', 'IoT', 'Analitik data', 'Computer vision'],
    gallery: [
      { src: '/images/projects/dashboard-smart-city/01.jpg', alt: 'Detail satu titik dengan tampilan kamera', width: 1400, height: 905 },
      { src: '/images/projects/dashboard-smart-city/02.jpg', alt: 'Statistik pada dasbor', width: 1400, height: 905 },
      { src: '/images/projects/dashboard-smart-city/03.jpg', alt: 'Peta status seluruh titik', width: 1400, height: 905 },
    ],
  },
  {
    slug: 'platform-erp-enterprise',
    title: 'Platform ERP untuk grup perusahaan',
    period: '2026',
    beta: true,
    summary:
      'ERP satu pintu dari penjualan sampai dasbor direksi, dengan AI untuk prakiraan anggaran dan penjualan, tanya-jawab data, dan ringkasan otomatis.',
    tags: ['ERP', 'Enterprise', 'Prakiraan AI'],
    industry: 'Grup perusahaan (enterprise)',
    aiUsed: { label: 'Prakiraan dan asisten data', detail: 'Prakiraan anggaran dan penjualan, tanya-jawab bahasa biasa atas data ERP, dan ringkasan otomatis untuk direksi.' },
    platform: 'Aplikasi web',
    intro:
      'Platform manajemen bisnis enterprise yang menyatukan penjualan, proyek, anggaran, pengadaan, layanan purnajual, dan SDM dalam satu sistem.',
    points: [
      'Dasbor direksi, anggaran eksekutif, dan pipeline penjualan.',
      'Model proyek dari kontrak sampai penagihan.',
      'Rantai pasok dan pengadaan, layanan purnajual dengan SLA, dan dasbor SDM.',
      'Prakiraan realisasi anggaran dengan peringatan bila akan melampaui batas.',
      'Prediksi penjualan atau skor peluang untuk pipeline.',
      'Tanya-jawab bahasa biasa atas data ERP dan ringkasan otomatis untuk direksi.',
    ],
    process: [
      { icon: 'trending', title: 'Pipeline penjualan', body: 'Peluang penjualan dipantau dari prospek sampai kontrak.' },
      { icon: 'briefcase', title: 'Kontrak dan model proyek', body: 'Kontrak menjadi proyek dengan pelacakan tahap dan penagihan.' },
      { icon: 'coins', title: 'Anggaran proyek', body: 'Anggaran kerja eksekutif dipantau terhadap realisasi.' },
      { icon: 'truck', title: 'Pengadaan dan rantai pasok', body: 'Permintaan, persetujuan, dan pengiriman barang dilacak.' },
      { icon: 'headset', title: 'Layanan purnajual dan SLA', body: 'Tiket layanan dan target SLA dipantau.' },
      { icon: 'gauge', title: 'Dasbor direksi dan SDM', body: 'Angka utama perusahaan dan SDM dirangkum dalam satu layar.' },
      { icon: 'search', title: 'Prakiraan dan tanya-jawab AI', body: 'AI memprakirakan anggaran dan penjualan, menjawab pertanyaan atas data, dan meringkas untuk direksi.' },
    ],
    ai: [
      { title: 'Prakiraan anggaran', body: 'Memperkirakan realisasi anggaran sampai akhir periode dan memberi peringatan sebelum suatu pos melampaui batas.' },
      { title: 'Prediksi penjualan', body: 'Memperkirakan penjualan dan peluang menang untuk membantu tim memprioritaskan pipeline.' },
      { title: 'Tanya-jawab atas data ERP', body: 'Pengguna bertanya dalam bahasa biasa, misalnya penjualan bulan ini, dan dijawab dari data ERP.' },
      { title: 'Ringkasan untuk direksi', body: 'Ringkasan otomatis tentang apa yang berubah dan perlu perhatian. AI membantu, keputusan tetap pada manusia.' },
    ],
    stack: ['ERP', 'Aplikasi web', 'Dasbor', 'Prakiraan AI'],
    gallery: [
      { src: '/images/projects/platform-erp-enterprise/01.jpg', alt: 'Dasbor direksi', width: 1400, height: 938 },
      { src: '/images/projects/platform-erp-enterprise/02.jpg', alt: 'Anggaran kerja eksekutif', width: 1400, height: 933 },
      { src: '/images/projects/platform-erp-enterprise/03.jpg', alt: 'Pipeline penjualan', width: 1400, height: 922 },
      { src: '/images/projects/platform-erp-enterprise/04.jpg', alt: 'Model proyek', width: 1400, height: 941 },
      { src: '/images/projects/platform-erp-enterprise/05.jpg', alt: 'Rantai pasok dan pengadaan', width: 1400, height: 936 },
      { src: '/images/projects/platform-erp-enterprise/06.jpg', alt: 'Layanan purnajual dan SLA', width: 1400, height: 934 },
      { src: '/images/projects/platform-erp-enterprise/07.jpg', alt: 'Dasbor SDM', width: 1400, height: 938 },
    ],
  },
  {
    slug: 'marketplace-bisnis-skala-kecil',
    title: 'Marketplace jual beli bisnis skala kecil',
    period: '2023',
    summary:
      'Marketplace untuk mencari, menilai, dan memulai transaksi jual beli bisnis manufaktur skala kecil, dengan model valuasi.',
    tags: ['Marketplace', 'Valuasi', 'Web app'],
    industry: 'Jual beli bisnis manufaktur',
    aiUsed: { label: 'Tanpa AI', detail: 'Tanpa AI: penilaian bisnis berbasis rumus dan faktor yang jelas.', none: true },
    platform: 'Aplikasi web',
    intro:
      'Marketplace yang mempertemukan pemilik dan calon pembeli bisnis manufaktur skala kecil, dilengkapi alat untuk menilai nilai bisnis.',
    points: [
      'Pencarian perusahaan dan halaman profil yang lengkap.',
      'Verifikasi identitas pemilik dengan kode yang dikirim ke email.',
      'Penilaian bisnis berdasarkan beberapa faktor, dengan riwayat valuasi.',
    ],
    process: [
      { icon: 'search', title: 'Cari perusahaan', body: 'Pembeli mencari bisnis berdasarkan nama atau lokasi.' },
      { icon: 'building', title: 'Buka profil perusahaan', body: 'Profil menampilkan ringkasan, kontak, dan perkiraan nilai.' },
      { icon: 'shield', title: 'Verifikasi kepemilikan', body: 'Pemilik membuktikan identitasnya lewat kode keamanan.' },
      { icon: 'chart', title: 'Nilai bisnis', body: 'Pemilik menjawab beberapa faktor untuk menghasilkan perkiraan nilai.' },
      { icon: 'history', title: 'Lihat riwayat valuasi', body: 'Hasil tiap penilaian tersimpan dan bisa diunduh.' },
    ],
    stack: ['Marketplace', 'Valuasi', 'Aplikasi web'],
    gallery: [
      { src: '/images/projects/marketplace-bisnis-skala-kecil/01.jpg', alt: 'Beranda marketplace', width: 1400, height: 1827 },
      { src: '/images/projects/marketplace-bisnis-skala-kecil/02.jpg', alt: 'Hasil pencarian perusahaan', width: 1400, height: 1681 },
      { src: '/images/projects/marketplace-bisnis-skala-kecil/03.jpg', alt: 'Pendaftaran dan verifikasi profil perusahaan', width: 1400, height: 995 },
      { src: '/images/projects/marketplace-bisnis-skala-kecil/04.jpg', alt: 'Profil perusahaan setelah masuk', width: 1400, height: 1993 },
      { src: '/images/projects/marketplace-bisnis-skala-kecil/05.jpg', alt: 'Formulir penilaian bisnis', width: 1400, height: 2457 },
      { src: '/images/projects/marketplace-bisnis-skala-kecil/06.jpg', alt: 'Riwayat valuasi dengan grafik radar', width: 1400, height: 1579 },
    ],
  },
  {
    slug: 'aplikasi-mobile-panen-kelapa-sawit',
    title: 'Aplikasi mobile panen kelapa sawit',
    period: '2022',
    summary:
      'Aplikasi mobile untuk merekam hasil panen di kebun, bisa dipakai offline, dengan AI yang menghitung janjang, membaca plat truk, dan memprediksi panen per bulan.',
    tags: ['Mobile', 'Peta GPS', 'Prediksi panen'],
    industry: 'Perkebunan',
    aiUsed: { label: 'Computer vision dan prediksi', detail: 'Computer vision untuk menghitung janjang dan membaca plat truk, serta prediksi jumlah panen per bulan.' },
    platform: 'Aplikasi mobile',
    intro:
      'Aplikasi mobile untuk mandor panen yang merekam hasil panen langsung di kebun, dengan lokasi dari peta GPS, deteksi janjang dan plat truk berbasis AI, serta prediksi panen.',
    points: [
      'Akses multi-peran: setiap pengguna masuk dengan perannya, dan menu serta fitur menyesuaikan hak akses.',
      'Pilih lokasi panen dari peta satelit dengan GPS.',
      'Catat kehadiran pekerja panen.',
      'Rekam jumlah janjang dan mutu buah, lalu konfirmasi dokumen.',
      'Deteksi jumlah janjang sawit.',
      'Deteksi otomatis plat nomor truk pengangkut.',
      'Prediksi jumlah panen dan peta prediksi panen per bulan.',
      'Dukungan offline: data tetap bisa dicatat di kebun tanpa sinyal.',
      'Sinkronisasi data ke sistem pusat saat perangkat kembali online.',
    ],
    process: [
      { icon: 'log-in', title: 'Masuk sesuai peran', body: 'Pengguna masuk dengan akunnya, lalu menu dan fitur menyesuaikan perannya.' },
      { icon: 'refresh', title: 'Sinkronisasi data', body: 'Data kebun dan pekerja disimpan di perangkat supaya aplikasi tetap jalan tanpa sinyal, lalu disinkronkan saat online.' },
      { icon: 'users', title: 'Catat kehadiran', body: 'Kehadiran pekerja panen dicatat setiap hari.' },
      { icon: 'map-pin', title: 'Pilih lokasi di peta', body: 'Blok dan titik panen dipilih dari peta satelit dengan GPS.' },
      { icon: 'leaf', title: 'Rekam hasil panen', body: 'Jumlah janjang dan mutu buah dicatat per pekerja.' },
      { icon: 'scan', title: 'Deteksi janjang dan plat truk', body: 'AI mendeteksi jumlah janjang sawit dan membaca plat nomor truk pengangkut.' },
      { icon: 'check', title: 'Konfirmasi dokumen', body: 'Dokumen potong buah dikonfirmasi dan disimpan di perangkat, termasuk saat offline.' },
      { icon: 'trending', title: 'Prediksi dan peta panen', body: 'Data panen dipakai untuk memprediksi hasil per bulan, lalu ditampilkan di peta.' },
    ],
    ai: [
      { title: 'Deteksi jumlah janjang', body: 'Computer vision mendeteksi dan menghitung jumlah janjang sawit.' },
      { title: 'Deteksi plat nomor truk', body: 'Plat nomor truk pengangkut terdeteksi otomatis tanpa input manual.' },
      { title: 'Prediksi jumlah panen', body: 'Data panen dipakai untuk memperkirakan jumlah panen berikutnya.' },
      { title: 'Peta prediksi per bulan', body: 'Prediksi panen ditampilkan di peta untuk setiap bulan, untuk membantu perencanaan.' },
    ],
    stack: ['Aplikasi mobile', 'Peta GPS', 'Computer vision', 'Prediksi', 'Multi-peran', 'Mode offline'],
    coverIndex: 3,
    gallery: [
      { src: '/images/projects/aplikasi-mobile-panen-kelapa-sawit/01.jpg', alt: 'Masuk ke aplikasi', width: 360, height: 760 },
      { src: '/images/projects/aplikasi-mobile-panen-kelapa-sawit/02.jpg', alt: 'Menu dan sinkronisasi berhasil', width: 360, height: 760 },
      { src: '/images/projects/aplikasi-mobile-panen-kelapa-sawit/03.jpg', alt: 'Absensi pekerja panen', width: 360, height: 1112 },
      { src: '/images/projects/aplikasi-mobile-panen-kelapa-sawit/04.jpg', alt: 'Memilih lokasi dengan pindai GPS', width: 360, height: 760 },
      { src: '/images/projects/aplikasi-mobile-panen-kelapa-sawit/05.jpg', alt: 'Merekam hasil panen', width: 360, height: 1414 },
      { src: '/images/projects/aplikasi-mobile-panen-kelapa-sawit/06.jpg', alt: 'Detail mutu ancak', width: 360, height: 760 },
      { src: '/images/projects/aplikasi-mobile-panen-kelapa-sawit/07.jpg', alt: 'Konfirmasi dokumen potong buah', width: 360, height: 1099 },
    ],
  },
];

/** Latest year in a period such as "2025 – 2026" (or a single year). */
const endYear = (period: string) => Math.max(...(period.match(/\d{4}/g) ?? ['0']).map(Number));
const startYear = (period: string) => Math.min(...(period.match(/\d{4}/g) ?? ['0']).map(Number));

/** Beta projects first, then newest year first (end year, then start year). Ties keep the order written above. */
export const projects: Project[] = [...projectList].sort(
  (a, b) =>
    Number(Boolean(b.beta)) - Number(Boolean(a.beta)) ||
    endYear(b.period) - endYear(a.period) ||
    startYear(b.period) - startYear(a.period),
);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug) ?? null;
