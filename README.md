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

The site is complete and builds clean. The phone number is confirmed; the
remaining business facts are still **placeholders**. They all live in one file:
`src/data/business.ts`.

| Field | Status | Notes |
|---|---|---|
| `phone` / `phoneHref` / `smsHref` | ✅ Set | `416-897-8653`. Drives every tap-to-call and text link on all 30 pages, plus the `telephone` field in the schema. |
| `hours` | ✅ Set | Confirmed by the owner: open seven days, Mon–Fri 7:00 am – 7:00 pm and Sat–Sun 7:00 am – 9:00 pm. Drives the visible hours in the footer, on the contact page and in both page sidebars, plus the opening-hours schema. |
| `licence` | **Deliberately empty** | No licence or trade ticket is claimed anywhere on the site, on the owner's instruction. Empty hides the About credentials block and keeps the footer wording to plain "Mobile automotive service". Set it to the exact ticket held (e.g. `310S Licensed Automotive Technician`) **only** if that licence is genuinely held and the owner wants it published. |
| `serviceRadiusKm` | Needs confirming | Currently 100 km. Shown on the hero and referenced in copy. |
| `siteUrl` | ✅ Set | `https://onthegomechanic.ca` on the domain branch — see [Going live](#going-live-on-onthegomechanicca). `robots.txt` and the sitemap are generated from the real origin, so they follow automatically. |
| `email` | Empty | Leave empty to hide every email CTA. |
| `yearsInBusiness` | Empty | Set a number to display it. |
| `rating` / `reviewCount` | **Deliberately null** | Never publish a star rating that cannot be verified against the real Google profile. Google penalises self-serving review markup. |
| `social.facebook` / `.instagram` | Empty | Add if the business has them. |

Search the codebase for `PLACEHOLDER` to find every one:

```bash
grep -rn "PLACEHOLDER" src/ astro.config.mjs
```

---

## Services offered

`src/data/services.ts` is the only list that matters. Whatever is in that array
appears on the homepage grid, the services index, the footer column, the sitemap
and the schema; whatever is not in it is not offered and must not be implied
anywhere else.

**Not offered, on the owner's instruction:** brake service, and steering and
suspension work. These were removed from the site along with every piece of copy
that advertised them — service cards, hero and meta descriptions, and the
`commonJobs` list on all 16 town pages. The limits are now stated plainly on the
services index, in the FAQ, on every town page and in the About values.

Three consequences worth knowing before editing anything back in:

1. **Four of the eight job photos are brake and suspension close-ups**
   (`work-3`, `work-4`, `work-6`, `work-7`). They are not in the gallery — a
   visitor should not have to read the services list to find out the rotors in
   the photo are not on the menu. They are also, unhelpfully, the four sharpest
   photos in the set. The gallery is now managed at
   [`/admin`](#photo-manager-admin); adding one back is an upload, not a code
   change.
2. **`about.jpg` used to be one of those close-ups.** It now shares the Ram 1500
   driveway shot with `work-1.jpg`, framed differently. Only four of the nine
   supplied photos are not brake or suspension detail shots, so that reuse is
   unavoidable until there are more originals.
3. **Pre-purchase inspections still cover brakes and suspension**, because an
   inspection that skipped them would be worthless. Inspecting and reporting is
   not the same as repairing, and the copy says so — most explicitly on the
   Midland page, where corroded brake lines are the local failure mode.

---

## Photos

Images reach the site two ways. The homepage gallery is managed at
[`/admin`](#photo-manager-admin) and optimised by Astro at build time. The four
fixed slots — hero, OG image, About and CTA — are generated into
`public/images/` from `photos-inbox/` by `scripts/process-photos.mjs`.

### Photo sources

`photos-inbox/` holds two generations of original, and which one a slot uses
decides how sharp it looks:

| Files | Resolution | Used by |
|---|---|---|
| `Messenger_creation_*.jpeg` (37) | 1536x2048 / 2048x1536 | The gallery, `about.jpg`, `cta.jpg` |
| `unnamed*.{jpg,png}` (9) | **278px** | `hero-real.jpg` only |

The `unnamed*` files are Google Business Profile thumbnails — 278px on the long
edge, against roughly 2000px for a full-bleed hero. Nothing recovers detail they
never had. The old pipeline upscaled them to 480x640 and sharpened the result,
which is what made the site look soft: sharpening an upscale manufactures
artefacts, not detail. Every slot that matters has since moved to the real
originals.

**The hero is the one still on stock.** Not for want of resolution now, but
because none of the 37 originals is a wide scene — they are all close-up detail
shots of the work itself, which is exactly right for the gallery and wrong for a
full-bleed background behind a headline. One good landscape photo of a vehicle
being worked on in a driveway would replace it:

```js
// scripts/process-photos.mjs — restore a real photo as the hero
{ src: 'YOUR-PHOTO.jpeg', out: 'hero.jpg', w: 2000, h: 1250, pos: 'centre' },
```

Stock imagery works against the whole argument this site makes — that a real
person turns up in your driveway — so it is a stopgap, not a decision.

### Adding more photos

Gallery photos go through [`/admin`](#photo-manager-admin), not through this
script. `scripts/process-photos.mjs` now owns only the four fixed slots below;
run it after changing a `src` there:

```bash
node scripts/process-photos.mjs
```

Do not edit files in `public/images/` by hand — they get overwritten.

### Slot reference

| File | Ratio | Currently |
|---|---|---|
| `hero.jpg` | 16:10 | **Stock** — roadside breakdown (see `stock/LICENSE.md`) |
| `hero-real.jpg` | 16:10 | The 278px driveway shot, kept processed and ready to swap in |
| `og-default.jpg` | 1200x630 | Crop of the hero |
| `about.jpg` | 4:3 | Scan tool mid multi-module scan — full resolution |
| `cta.jpg` | ~20:9 | Engine bay detail behind the CTA scrim — full resolution |

The homepage gallery is **not** in this table. It lives in
`src/images/gallery/`, is optimised by Astro rather than by this script, and is
managed at [`/admin`](#photo-manager-admin).

### Logo

The supplied artwork lives at `brand/logo-source.png`. Every logo asset on the
site is derived from it:

```bash
node scripts/make-logo.mjs
```

| Output | Used by |
|---|---|
| `public/images/logo-mark.png` | Header brand mark and footer — the emblem only |
| `public/images/logo.png` | Full lockup, transparent — sharing previews, print, `logo` in the schema |
| `public/favicon.png` | Browser tab icon |
| `public/apple-touch-icon.png` | iOS home screen — flattened onto white, since iOS composites transparency onto black |

The supplied file is a flattened render on a light silver gradient, not a
transparent PNG, so the script keys the background out: a flood fill runs inward
from the image border and eats every pixel that is both bright and desaturated.
Enclosed areas — the white highlights in the tyre tread, the counters inside the
letters — are never reached by that fill, so the mark keeps its interior detail.
That is why the emblem sits directly on the dark header rather than inside a
light tile.

The wordmark underneath the emblem is set in near-black navy and only reads on
light backgrounds. The header and footer therefore use the emblem on its own and
keep "Mobile Mechanic / On The Go" as live text, which stays legible at any size
and is selectable and searchable.

**The source is only 278px on its long edge**, and the emblem within it is about
125px. Nothing is output far above that, because upscaling further only invents
noise. If a vector or full-resolution logo turns up, replace
`brand/logo-source.png`, raise the `resize` heights in `scripts/make-logo.mjs`
and re-run — no other changes needed.

---

## Photo manager (`/admin`)

The owner adds, removes and reorders homepage gallery photos at
<https://muskoka-boost.github.io/Mechanic-on-the-go/admin/>. No GitHub account
knowledge, no code, no local setup — sign in with GitHub, drag photos in, hit
Publish. The site rebuilds and the change is live a minute or two later.

### How it fits together

| Piece | What it does |
|---|---|
| `public/admin/` | [Decap CMS](https://decapcms.org). Runs entirely in the browser. |
| `src/data/gallery.json` | The photo list the CMS writes: path + alt text, in display order. |
| `src/images/gallery/` | The uploaded originals. Committed to the repo. |
| `src/lib/gallery.ts` | Resolves those paths to real images so Astro can optimise them. |
| `oauth-worker/` | The one server-side step: swapping the OAuth code for a token. |

Photos are deliberately **not** in `public/`. Anything in `public/` is copied to
the site byte-for-byte, so a 4 MB phone photo would be served at 4 MB. From
`src/`, Astro resizes and converts each one to WebP at build time.

**Upload full-resolution originals.** The bigger the file, the sharper the
site — the build never scales a photo up past its own resolution, precisely so
low-resolution sources stay soft-but-clean rather than mushy. Every photo
supplied so far is a 278px thumbnail (see [Photos](#photos)), which is the whole
reason the gallery looks soft today. Replacing one with the original off the
phone fixes it for that photo, with no code change.

### One-time setup

The CMS needs somewhere to exchange a GitHub OAuth code for an access token.
That step needs a client secret, and a secret shipped to a browser is not a
secret — hence `oauth-worker/`. It is free, takes about ten minutes, and is only
done once.

**1. Create a GitHub OAuth app** at
<https://github.com/settings/developers> → *New OAuth App*:

| Field | Value |
|---|---|
| Application name | `Mechanic photo manager` |
| Homepage URL | `https://muskoka-boost.github.io/Mechanic-on-the-go/` |
| Authorization callback URL | `https://YOUR-WORKER.workers.dev/callback` (fill in after step 2, then come back and edit it) |

Generate a client secret and keep both values to hand. **Do not commit them.**

**2. Deploy the worker** (free Cloudflare account, no card required):

```bash
cd oauth-worker
npx wrangler login
npx wrangler deploy                          # prints your workers.dev URL
npx wrangler secret put GITHUB_CLIENT_ID     # paste the client ID
npx wrangler secret put GITHUB_CLIENT_SECRET # paste the client secret
```

**3. Point the CMS at it.** In `public/admin/config.yml`, replace
`https://REPLACE-WITH-YOUR-WORKER.workers.dev` with the URL `wrangler deploy`
printed. Commit and push.

**4. Go back to the OAuth app** and set the callback URL to
`https://YOUR-WORKER.workers.dev/callback`.

Then open `/admin/` and sign in. Anyone who can push to this repository can sign
in; nobody else can.

### If sign-in fails

- **"This login could not be verified"** — cookies are blocked, or the callback
  URL on the OAuth app does not exactly match the worker URL. Check for a typo
  or a trailing slash.
- **The popup opens and nothing happens** — `base_url` in `config.yml` does not
  match the deployed worker, or the worker has no secrets set. `npx wrangler
  tail` shows live requests.
- **"GitHub refused to issue a token"** — the client secret is wrong or was
  regenerated. Set it again with `wrangler secret put`.

### Changing photos without the CMS

`src/data/gallery.json` is a plain list. Editing it by hand, with matching files
in `src/images/gallery/`, works exactly the same — the CMS is a nicer front end
onto that one file, not a separate system. A photo listed there but missing from
disk is skipped with a build warning rather than failing the build.

---

## Footer build credit

The footer carries a "Created by Muskoka Digital Boost" line linking to
<https://muskokadigitalboost.ca>. It is required on every site built with the
`local-business-site` skill and must not be removed.

It lives in `src/components/Footer.astro` as `.ftr__credit`, below the client's
copyright line. Quieter than the copyright above it, but not invisible: it was
first set on `--text-dim`, which measures 3.13:1 against the footer and vanished
at that size. It now uses `--text-muted` (5.73:1) with the brand blue on the
link (6.49:1), both clear of the 4.5:1 AA floor.

---

## Structure

```
src/
  data/
    business.ts     ← every business fact. Single source of truth.
    services.ts     ← 7 services. Also documents what is NOT offered.
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

30 pages build from these files. Adding a service or a town means adding one
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

---

## Going live on onthegomechanic.ca

This branch (`claude/onthegomechanic-domain`) is the custom-domain cutover. It
is deliberately **not** merged, because `public/CNAME` takes effect the moment
it deploys: GitHub Pages then redirects
`muskoka-boost.github.io/Mechanic-on-the-go/` to `onthegomechanic.ca`, and if
DNS is not answering yet the site is simply unreachable. **Do the DNS first.**

Almost nothing in the codebase needed changing. `actions/configure-pages`
reports the custom domain as the origin and an empty base path once Pages is
configured, and `withBase()` already collapses to a no-op at a domain root — the
same build serves correctly from either place. This branch only changes the
things that name the domain explicitly:

| File | Change |
|---|---|
| `public/CNAME` | New. The domain, which is what tells Pages to serve it. |
| `astro.config.mjs` | Fallback origin for builds without the Pages env. |
| `src/data/business.ts` | `siteUrl`, the fallback behind every canonical and JSON-LD URL. |
| `public/admin/config.yml` | `site_url` / `display_url` for the CMS preview links. |
| `public/admin/index.html` | Favicon path made relative so it works at either root. |
| `oauth-worker/worker.js` | Accepts both origins, so CMS sign-in survives the cutover. |

### 1. DNS, at the registrar

For the apex domain, four `A` records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optionally the same four as `AAAA` records for IPv6:

```
2606:50c0:8000::153   2606:50c0:8001::153
2606:50c0:8002::153   2606:50c0:8003::153
```

And `www` as a `CNAME` to `muskoka-boost.github.io` so both spellings work.

These are GitHub's published Pages addresses — worth confirming against
<https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>
rather than trusting this table, since they do change occasionally. Allow up to
an hour for propagation; `dig onthegomechanic.ca +short` should return those
four addresses before continuing.

### 2. Merge and deploy

Merge this branch into `claude/mobile-mechanic-website-12ihks`. The push
triggers the usual build.

### 3. Point Pages at the domain

**Settings → Pages → Custom domain**, enter `onthegomechanic.ca`, save. GitHub
re-checks DNS; once it passes, tick **Enforce HTTPS**. The certificate is issued
automatically and usually takes a few minutes, occasionally up to 24 hours — the
box stays greyed out until it is ready, which is normal and not a fault.

### 4. Follow-ups once it resolves

- **GitHub OAuth app** (<https://github.com/settings/developers>): set Homepage
  URL to `https://onthegomechanic.ca/`. The callback URL stays pointed at the
  worker and must not change.
- **`oauth-worker/worker.js`**: once the github.io URL is genuinely unused, drop
  it from `ALLOWED_ORIGINS` and redeploy, so exactly one origin can receive a
  token.
- **Google Business Profile**: set the website field to the new domain. It is
  the single strongest local-SEO signal on the profile.
- Anywhere the old URL was shared will redirect rather than break, but is worth
  updating.

---

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
