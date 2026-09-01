import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The Pages workflow injects these via actions/configure-pages. Once the custom
// domain is set in Settings -> Pages, that action reports the domain as the
// origin and an empty base path, so the same build serves correctly from the
// domain root without any change here. The fallbacks cover local builds.
//
// One wrinkle: configure-pages reports an http:// origin until "Enforce HTTPS"
// is switched on in Settings -> Pages, and that origin is what every canonical,
// og:url, JSON-LD URL and sitemap entry is built from. Emitting http canonicals
// for a site served over https tells search engines the insecure URL is the
// real one. Pages serves every custom domain over https regardless, so the
// scheme is upgraded here rather than left to a checkbox.
const rawSite = process.env.PUBLIC_SITE_URL || 'https://onthegomechanic.ca';
const site = rawSite.replace(/^http:\/\//, 'https://');
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
