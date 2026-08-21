import type { APIRoute } from 'astro';
import { absUrl } from '../lib/paths';

// Generated rather than static so the sitemap URL always matches the real
// deploy origin and base path, on GitHub Pages or a custom domain alike.
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /

Sitemap: ${absUrl(site, '/sitemap-index.xml')}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
