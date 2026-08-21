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

## ⚠️ Before this goes live

The site is complete and builds clean, but a handful of business facts are
**placeholders**. They all live in one file: `src/data/business.ts`.

| Field | Status | Notes |
|---|---|---|
| `phone` / `phoneHref` / `smsHref` | **BLOCKER** | Currently `705-000-0000`. Every CTA on the site is a tap-to-call. Nothing works until this is real. |
| `hours` | Needs confirming | Guessed as Mon–Fri 8–6, Sat 9–4, Sun by appointment. Drives both the visible hours and the opening-hours schema. |
| `licence` | Empty on purpose | Set to e.g. `310S Licensed Automotive Technician` **only if true**. Left blank, the credentials block does not render. Do not publish a credential that is not held. |
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

`public/images/` currently holds generated placeholders — dark blue panels
labelled with what belongs there. **Replace each file with the real photo, keeping
the same filename and roughly the same aspect ratio.** Nothing in the code needs
to change.

| File | Ratio | What goes here |
|---|---|---|
| `hero.jpg` | 16:10, ~2000px wide | The Ram 1500 in the driveway, hood up, wheel off, stands out. Strongest shot available. |
| `og-default.jpg` | 1200×630 | Social share card. Can be a crop of the hero. |
| `about.jpg` | 4:3 | Owner at work on a vehicle. |
| `cta.jpg` | ~20:9 wide | Wide roadside or service-van shot. |
| `work-1.jpg` | 3:4 | Hub assembly on the knuckle. |
| `work-2.jpg` | 3:4 | Ram 2500, winter service. |
| `work-3.jpg` | 3:4 | Ram 1500 driveway, wheel off. |
| `work-4.jpg` | 3:4 | Front suspension underside. |
| `work-5.jpg` | 3:4 | Civic roadside wheel service. |
| `work-6.jpg` | 3:4 | New rotor with blue hub. |
| `work-7.jpg` | 3:4 | Rear drum brake assembly. |
| `work-8.jpg` | 3:4 | Civic on the floor jack. |

Regenerate placeholders at any time with `node scripts/make-placeholders.mjs`
(this **overwrites** `public/images/`, so run it only before the real photos land).

**Resolution matters.** The hero needs roughly 2000px on the long edge. Photos
pasted into a chat window arrive at a few hundred pixels and will look soft
stretched across a full-width hero — use the originals off the phone or the
Google Business Profile.

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

1. Set the real phone number — it is the only true blocker.
2. Confirm the Google Business Profile is a **service-area** profile, not a
   storefront, and that its service areas match `locations.ts`.
3. Add the site URL to the Google Business Profile.
4. Verify the domain in Google Search Console and submit the sitemap.
5. Test the structured data at <https://search.google.com/test/rich-results>.

## Deploying

Static output — `npm run build` produces `dist/`, which can be served by anything.

- **Netlify / Cloudflare Pages:** build `npm run build`, publish directory `dist`.
- **GitHub Pages:** publish `dist/` (set `site` in `astro.config.mjs` first).

Update `site` in `astro.config.mjs`, `siteUrl` in `src/data/business.ts`, and the
sitemap line in `public/robots.txt` to the final domain before the first deploy.
