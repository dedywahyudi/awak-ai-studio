import type { Config } from 'tailwindcss';

/**
 * Colors map to CSS variables defined in app/globals.css (Awak AI Studio design tokens).
 * Note: variable-based colors do not support the `/opacity` modifier. Use arbitrary
 * values (e.g. bg-[rgba(...)]) when a translucent color is needed.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--surface-page)',
        section: 'var(--surface-section)',
        card: 'var(--surface-card)',
        raised: 'var(--surface-raised)',
        featured: 'var(--surface-featured)',
        field: 'var(--surface-input)',
        strong: 'var(--text-strong)',
        body: 'var(--text-body)',
        muted: 'var(--text-muted)',
        subtle: 'var(--text-subtle)',
        eyebrow: 'var(--text-eyebrow)',
        highlight: 'var(--text-highlight)',
        link: 'var(--text-link)',
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          press: 'var(--accent-press)',
          soft: 'var(--accent-soft)',
          ring: 'var(--blue-400)',
        },
        line: {
          DEFAULT: 'var(--border-default)',
          strong: 'var(--border-strong)',
          featured: 'var(--border-featured)',
        },
        wa: { DEFAULT: '#25D366', hover: '#1DA851' },
        danger: '#F87171',
        success: '#4ADE80',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '14px',
        pricing: '20px',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,.4)',
        lg: '0 24px 48px -12px rgba(0,0,0,.6)',
        accent: '0 8px 24px rgba(5,96,243,.35)',
        featured: '0 24px 48px -12px rgba(0,0,0,.6), 0 0 0 4px rgba(5,96,243,.16)',
      },
    },
  },
  plugins: [],
};

export default config;
