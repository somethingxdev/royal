import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Noto Sans',
        cssVariable: '--font-sans',
        formats: ['woff2'],
        weights: ['400', '500', '600', '700'],
      },
    ],
  },
  vite: {
    plugins: [tailwindcss(), yaml()],
  },
});
