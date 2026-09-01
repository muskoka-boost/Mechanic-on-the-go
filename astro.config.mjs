import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The Pages workflow injects these via actions/configure-pages. Once the custom
// domain is set in Settings -> Pages, that action reports the domain as the
// origin and an empty base path, so the same build serves correctly from the
// domain root without any change here. The fallbacks cover local builds.
const site = process.env.PUBLIC_SITE_URL || 'https://onthegomechanic.ca';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
