import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B365D',
          light: '#2A4F7F',
        },
        orange: {
          DEFAULT: '#E8862A',
          dark: '#C97222',
          light: '#FFF3E6',
        },
        gray: {
          50: '#F5F6F8',
          100: '#E5E7EB',
          300: '#9CA3AF',
          400: '#6B7280',
          600: '#374151',
        },
        success: '#059669',
        error: '#DC2626',
        warning: '#D97706',
        info: '#2563EB',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
        content: '768px',
        calc: '720px',
      },
      boxShadow: {
        calc: '0 4px 24px rgba(27,54,93,0.08)',
        'calc-hover': '0 8px 32px rgba(27,54,93,0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
