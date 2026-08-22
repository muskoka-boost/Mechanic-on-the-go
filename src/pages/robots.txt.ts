import type { APIRoute } from 'astro';
import { absUrl } from '../lib/paths';

// Generated rather than static so the sitemap URL always matches the real
// deploy origin and base path, on GitHub Pages or a custom domain alike.
export const GET: APIRoute = ({ site }) => {
  // /admin is the CMS editor, not a page of the site. It carries a noindex tag
  // of its own; this keeps crawlers from spending requests on it either way.
  const body = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${absUrl(site, '/sitemap-index.xml')}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
