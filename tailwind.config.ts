// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/app/**/*.{ts,tsx,mdx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      width: { vp: '357px' },
      height: { vp: '668px' },
    },
  },
  plugins: [],
} satisfies Config;
