import { business } from '../data/business';

/**
 * GitHub Pages project sites are served from a sub-path
 * (https://owner.github.io/repo/), so root-absolute links like "/services/"
 * would resolve above the site root and 404.
 *
 * withBase() prefixes internal paths with Astro's configured base. On a custom
 * domain or an <owner>.github.io repo the base is "/" and this is a no-op,
 * so the same build works in either place.
 */
export function withBase(path: string): string {
  // Leave external URLs, tel:, sms:, mailto: and anchors alone.
  if (!path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}

/**
 * Absolute URL for an internal path — base path included, resolved against the
 * real deploy origin. Pass Astro.site from the calling page; it falls back to
 * the configured domain when the site is built without one.
 *
 * Used for canonicals, Open Graph tags and every URL inside the JSON-LD, all of
 * which must be absolute and must match where the site actually lives.
 */
export function absUrl(site: URL | undefined, path: string): string {
  return new URL(withBase(path), site?.origin ?? business.siteUrl).href;
}
