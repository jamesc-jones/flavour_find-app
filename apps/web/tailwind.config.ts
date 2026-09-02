import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#F97316',
        'brand-secondary': '#FED7AA',
        'surface': '#FFFBF5',
        'surface-card': '#FFFFFF',
        'text-primary': '#1C1917',
        'text-secondary': '#78716C',
        'border': '#E7E5E4',
        'error': '#DC2626',
        'error-surface': '#FEF2F2',
      },
    },
  },
  plugins: [],
};

export default config;
