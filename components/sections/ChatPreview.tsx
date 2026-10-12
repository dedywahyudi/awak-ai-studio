const messages: { from: 'customer' | 'bot'; text: string }[] = [
  { from: 'customer', text: 'Halo, kue ulang tahun ukuran 20 cm berapa harganya?' },
  {
    from: 'bot',
    text: 'Halo! Kue ulang tahun 20 cm mulai Rp 185.000. Mau coklat atau vanila? Saya cek ketersediaan untuk tanggal yang Anda inginkan.',
  },
  { from: 'customer', text: 'Vanila, untuk hari Sabtu ini bisa?' },
  {
    from: 'bot',
    text: 'Sabtu masih tersedia. Untuk konfirmasi pesanan, saya hubungkan ke tim kami sekarang ya.',
  },
];

/** Static, illustrative conversation. All data here is made up for demonstration. */
export function ChatPreview() {
  return (
    <figure className="mx-auto w-full max-w-sm">
      <div className="flex flex-col gap-3 rounded-pricing border border-line bg-card p-5 shadow-lg">
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <span className="size-2.5 rounded-full bg-wa" aria-hidden="true" />
          <span className="font-display text-sm font-bold text-strong">Toko Kue Contoh</span>
        </div>
        {messages.map((m, i) => (
          <p
            key={i}
            className={
              m.from === 'customer'
                ? 'max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent px-4 py-2.5 text-sm text-white'
                : 'max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-raised px-4 py-2.5 text-sm text-body'
            }
          >
            {m.text}
          </p>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-subtle">
        Contoh percakapan. Nama toko dan harga hanya ilustrasi.
      </figcaption>
    </figure>
  );
}
