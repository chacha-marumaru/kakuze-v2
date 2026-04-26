import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Site URLは独自ドメイン取得後に差し替え予定。
// 暫定でVercel preview用URLを置く（sitemap生成・OGP絶対URLに使われる）。
const SITE_URL = 'https://kakuze-v2.vercel.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
