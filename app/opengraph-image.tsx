import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name}: AI untuk UMKM di ${site.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default share image for every page that does not define its own. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#07080C',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#47CFFB', letterSpacing: 4 }}>
          {site.city.toUpperCase()} — AI UNTUK UMKM
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3 }}>
            {site.name}
          </div>
          <div style={{ display: 'flex', fontSize: 36, color: '#2AB2FC' }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
