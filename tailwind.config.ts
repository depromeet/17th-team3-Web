import type { Config } from 'tailwindcss';

export default {
  content: ['./src/app/**/*.{ts,tsx,mdx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      width: { vp: '375px' },
      height: { vp: '668px' },
    },
  },
  plugins: [],
} satisfies Config;
