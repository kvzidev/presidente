// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://presidente.pages.dev',
  integrations: [sitemap(), react()],
  i18n: {
    defaultLocale: 'es-AR',
    locales: ['es-AR', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});