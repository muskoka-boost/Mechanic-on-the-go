# Mobile Mechanic On The Go — Website

Static marketing site for **Mobile Mechanic On The Go**, an Orillia-based mobile
automotive service. Built with [Astro](https://astro.build). No build-time API
calls, no database, no server — it compiles to plain HTML and deploys anywhere.

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static output into dist/
npm run preview  # serve the built site
```

---

## Before this goes live

The site is complete and builds clean. The phone number and licence are
confirmed; the remaining business facts are still **placeholders**. They all
live in one file: `src/data/business.ts`.

| Field | Status | Notes |
|---|---|---|
| `phone` / `phoneHref` / `smsHref` | ✅ Set | `416-897-8653`. Drives every tap-to-call and text link on all 32 pages, plus the `telephone` field in the schema. |
| `hours` | Needs confirming | Guessed as Mon–Fri 8–6, Sat 9–4, Sun by appointment. Drives both the visible hours and the opening-hours schema. |
| `licence` | ✅ Set | `Licensed Automotive Technician`, confirmed by the owner. Kept general on purpose — change it to the specific ticket (e.g. `310S Licensed Automotive Technician`) only if that is the licence actually held. Clearing this string hides the credentials block and reverts the footer wording automatically. |
| `serviceRadiusKm` | Needs confirming | Currently 100 km. Shown on the hero and referenced in copy. |
| `siteUrl` | Needs confirming | Also update `astro.config.mjs` and `public/robots.txt` to match. |
| `email` | Empty | Leave empty to hide every email CTA. |
| `yearsInBusiness` | Empty | Set a number to display it. |
| `rating` / `reviewCount` | **Deliberately null** | Never publish a star rating that cannot be verified against the real Google profile. Google penalises self-serving review markup. |
| `social.facebook` / `.instagram` | Empty | Add if the business has them. |

Search the codebase for `PLACEHOLDER` to find every one:

```bash
grep -rn "PLACEHOLDER" src/ astro.config.mjs
```

---

## Photos

`public/images/` is generated from the originals in `photos-inbox/` by:

```bash
node scripts/process-photos.mjs
```

That script owns the crop, resize and compression for every slot. To change
which photo goes where, edit the `jobs` array in it and re-run — do not edit
files in `public/images/` by hand, they get overwritten.

### ⚠️ Current photos are low resolution

The uploaded photos are Google Business Profile **thumbnails**, not originals.
Every one is **278px** on its long edge. The site needs roughly 2000px for the
hero.

Consequences, all currently worked around rather than solved:

- **The hero is stock**, because 278px will not carry a full-bleed image at any
  quality. See `stock/LICENSE.md`. The owner's own driveway shot is processed
  and waiting at `public/images/hero-real.jpg`.
- Gallery output is capped at 480x640. It looks fine, because those tiles are
  displayed small — this is the one slot the thumbnails genuinely suit.
- `about.jpg` and `cta.jpg` are still the owner's photos, upscaled. They sit
  behind text or at smaller sizes, so they hold up.

**The stock hero is a stopgap, not a decision.** A generic stock car is the
weakest possible hero for a local trade business — the entire argument this site
makes is that a real person turns up in your driveway, and stock photography
works against that. Swap it the moment a real full-resolution photo exists:

```js
// scripts/process-photos.mjs — restore the owner's photo as the hero
{ src: 'unnamed (1).jpg', out: 'hero.jpg', w: 2000, h: 1250, crop: { top: 58, height: 174 } },
```

### Getting the full-resolution originals

Best to worst:

1. **Straight off the phone that took them.** The originals will be 3000-4000px.
   This is the real fix.
2. **Google Photos**, if the phone backs up there — download the original size,
   not a share link.
3. **Resize the Google URL.** Google serves these from `lh3.googleusercontent.com`
   with the size baked into the URL as a suffix like `=w278-h278-k-no`. Open the
   photo on the Business Profile, copy the image address, and replace that
   suffix with `=s0` for the original, or `=w2048` for something large:

   ```
   ...=w278-h278-k-no   ->   ...=s0
   ```

Once better originals are in `photos-inbox/`, raise the output sizes in
`scripts/process-photos.mjs`, drop the mobile blur block from `Hero.astro`, and
re-run. No other changes needed.

### Slot reference

| File | Ratio | Currently |
|---|---|---|
| `hero.jpg` | 16:10 | **Stock** — roadside breakdown (see `stock/LICENSE.md`) |
| `hero-real.jpg` | 16:10 | Owner's Ram 1500 driveway shot, ready to swap back |
| `og-default.jpg` | 1200x630 | Crop of the hero |
| `about.jpg` | 4:3 | Rotor and hub detail |
| `cta.jpg` | ~20:9 | Ram 2500 in the snow |
| `work-1` … `work-8.jpg` | 3:4 | The eight job photos |

### Logo

The header currently uses an inline SVG tyre-and-wrench mark that echoes the real
logo. The supplied logo has a light silver background, which will not sit on the
dark header. To use the real artwork, export it with a **transparent background**
(SVG or PNG), drop it at `public/images/logo.svg`, and swap the `.brand__mark`
block in `src/components/Header.astro` for an `<img>`.

---

## Structure

```
src/
  data/
    business.ts     ← every business fact. Single source of truth.
    services.ts     ← 9 services. Also documents what is NOT offered.
    locations.ts    ← 16 service areas with hand-written local copy.
  components/       ← Header, Footer, Hero, CallBar, CtaBand, Icon, PageHead
  layouts/
    Layout.astro    ← SEO head, Open Graph, JSON-LD graph
  pages/
    index.astro
    about.astro  faq.astro  contact.astro  404.astro
    services/index.astro       services/[slug].astro
    service-areas/index.astro  service-areas/[slug].astro
```

32 pages build from these files. Adding a service or a town means adding one
object to the relevant data file — the page, the nav, the footer, the sitemap
and the schema all follow automatically.

## SEO

- **Per-town pages** with genuinely distinct copy — real highways, neighbourhoods
  and local wear patterns. This is deliberate: near-duplicate location pages are
  treated as doorway pages and get the whole site demoted rather than ranked.
- **JSON-LD** on every page: `AutoRepair` business node, plus `Service`,
  `BreadcrumbList` and `FAQPage` nodes where they apply.
- **Service-area business schema** — `areaServed` and a `GeoCircle`, with no
  street address. This is the correct shape for a mobile business and matches
  how the Google Business Profile should be configured.
- `sitemap-index.xml` generated at build; `robots.txt` points at it.
- Canonical URLs, Open Graph and Twitter card metadata throughout.

### After launch

1. Confirm the Google Business Profile is a **service-area** profile, not a
   storefront, and that its service areas match `locations.ts`.
2. Add the site URL to the Google Business Profile.
3. Verify the domain in Google Search Console and submit the sitemap.
4. Test the structured data at <https://search.google.com/test/rich-results>.
5. Make sure the phone number on the site matches the Google Business Profile
   exactly. Mismatched NAP (name, address, phone) across listings is one of the
   most common causes of weak local ranking.

## Deploying

Static output — `npm run build` produces `dist/`, which any host can serve.

### GitHub Pages

`.github/workflows/deploy.yml` builds the site with Astro and publishes `dist/`.

**One manual step is required, and the site cannot go live without it:**

> Repository **Settings → Pages → Build and deployment → Source**, change
> **"Deploy from a branch"** to **"GitHub Actions"**.

While the source is set to "Deploy from a branch", GitHub runs **Jekyll** against
the repository source. Jekyll reads the `---` fences in `.astro` files as YAML
front matter, chokes on the TypeScript inside them, and the deploy fails with:

```
YAML Exception reading src/pages/contact.astro
ERROR: YOUR SITE COULD NOT BE BUILT
```

That error is Jekyll, not Astro. Switching the source to GitHub Actions takes
Jekyll out of the loop entirely. `public/.nojekyll` is committed as belt and
braces so Jekyll never processes the output either — without it, Jekyll strips
Astro's `_astro/` directory and the site loads with no CSS or JS.

### Base paths

A GitHub Pages **project site** is served from a sub-path
(`https://owner.github.io/Mechanic-on-the-go/`), so root-absolute links like
`/services/` would resolve above the site root and 404.

The workflow passes the real origin and base path into the build via
`actions/configure-pages`, and every internal link and asset goes through
`withBase()` in `src/lib/paths.ts`. Canonicals, Open Graph tags and all JSON-LD
URLs go through `absUrl()`. `robots.txt` is generated per-build for the same
reason.

The result is one codebase that works in all three cases with no edits:

| Deploy target | Base path |
|---|---|
| `owner.github.io/Mechanic-on-the-go/` (project site) | `/Mechanic-on-the-go` |
| Custom domain, e.g. `mobilemechaniconthego.ca` | `/` |
| Repo renamed to `owner.github.io` (user site) | `/` |

Test the sub-path build locally exactly as CI does:

```bash
PUBLIC_SITE_URL=https://muskoka-boost.github.io \
PUBLIC_BASE_PATH=/Mechanic-on-the-go \
  npm run build && npm run preview
```

Both env vars must be set for `preview` too — it reads the base from
`astro.config.mjs` at serve time, so previewing a sub-path build without them
serves at the root and every link 404s.

### Custom domain

Once a domain is pointed at the repo, add it under **Settings → Pages → Custom
domain**. `configure-pages` then reports a base path of `/`, the build switches
automatically, and `site` in `astro.config.mjs` plus `siteUrl` in
`src/data/business.ts` should be updated to match.

### Other hosts

- **Netlify / Cloudflare Pages:** build `npm run build`, publish directory `dist`.
  No base path needed; leave the env vars unset.
