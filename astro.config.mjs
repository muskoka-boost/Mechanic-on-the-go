import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The Pages workflow injects these via actions/configure-pages. Locally, and on
// a custom domain, they are unset and the site builds at the domain root.
const site = process.env.PUBLIC_SITE_URL || 'https://mobilemechaniconthego.ca';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
