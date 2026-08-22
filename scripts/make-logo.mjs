/**
 * Derives every logo asset the site needs from the single supplied brand file,
 * `brand/logo-source.png`.
 *
 * The supplied artwork is a flattened JPEG-style render on a light radial
 * gradient, not a transparent PNG. Rather than paste a grey rectangle onto a
 * dark header, the background is keyed out here: a flood fill runs inward from
 * the image border and eats every pixel that is both bright and desaturated,
 * following the gradient a step at a time. Enclosed regions — the white
 * highlights in the tyre tread, the counters inside the letterforms — are never
 * reached by that fill, so the mark keeps its interior detail.
 *
 * Run after replacing brand/logo-source.png:  node scripts/make-logo.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SOURCE = 'brand/logo-source.png';
const OUT = 'public/images';

// The source render is small, so nothing is output far above its native size —
// upscaling a 125px mark to 512px only manufactures noise and file weight.
// Palette PNGs keep the gradients clean at a fraction of the bytes.
const PNG = { compressionLevel: 9, palette: true, quality: 92, effort: 10 };

/** Bright + desaturated = backdrop, not artwork. */
const isBackdrop = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  const sat = max === 0 ? 0 : (max - min) / max;
  return luma > 150 && sat < 0.13;
};

/** RGBA buffer of the source with the backdrop keyed out and edges feathered. */
async function keyOut() {
  const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const rgb = (x, y) => { const i = (y * w + x) * 4; return [data[i], data[i + 1], data[i + 2]]; };

  const backdrop = new Uint8Array(w * h);
  const queue = [];
  const seed = (x, y) => {
    const k = y * w + x;
    if (!backdrop[k] && isBackdrop(...rgb(x, y))) { backdrop[k] = 1; queue.push(k); }
  };
  for (let x = 0; x < w; x++) { seed(x, 0); seed(x, h - 1); }
  for (let y = 0; y < h; y++) { seed(0, y); seed(w - 1, y); }

  while (queue.length) {
    const k = queue.pop();
    const x = k % w;
    const y = (k / w) | 0;
    const [r0, g0, b0] = rgb(x, y);
    for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const nk = ny * w + nx;
      if (backdrop[nk]) continue;
      const [r, g, b] = rgb(nx, ny);
      if (!isBackdrop(r, g, b)) continue;
      // Step through the gradient gently so a hard edge is never jumped.
      if (Math.abs(r - r0) > 14 || Math.abs(g - g0) > 14 || Math.abs(b - b0) > 14) continue;
      backdrop[nk] = 1;
      queue.push(nk);
    }
  }

  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const k = y * w + x;
      const [r, g, b] = rgb(x, y);
      let a = backdrop[k] ? 0 : 255;
      if (a === 255) {
        // Feather anything sitting on the boundary so the cut-out has no jaggies.
        let neighbours = 0;
        let cut = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
            neighbours++;
            if (backdrop[ny * w + nx]) cut++;
          }
        }
        if (cut > 0) a = Math.round(255 * (1 - (cut / neighbours) * 0.85));
      }
      const i = k * 4;
      out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = a;
    }
  }
  return { buf: out, w, h, backdrop };
}

/** Tight bounding box of everything still opaque within the given row range. */
function bounds({ buf, w, h }, rowEnd = h) {
  let x0 = w, x1 = -1, y0 = h, y1 = -1;
  for (let y = 0; y < Math.min(rowEnd, h); y++) {
    for (let x = 0; x < w; x++) {
      if (buf[(y * w + x) * 4 + 3] < 24) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  return { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}

const keyed = await keyOut();
const raw = { width: keyed.w, height: keyed.h, channels: 4 };
const img = () => sharp(keyed.buf, { raw });

await mkdir(OUT, { recursive: true });

// The wordmark is set in near-black navy — it reads on light backgrounds only.
// The site header and footer are dark, so they get the emblem on its own and
// keep the wordmark as live text. Rows below the emblem are excluded here.
const EMBLEM_ROWS = 212;
const mark = bounds(keyed, EMBLEM_ROWS);
const pad = Math.round(Math.max(mark.width, mark.height) * 0.04);
await img()
  .extract({
    left: Math.max(0, mark.left - pad),
    top: Math.max(0, mark.top - pad),
    width: Math.min(keyed.w - Math.max(0, mark.left - pad), mark.width + pad * 2),
    height: Math.min(keyed.h - Math.max(0, mark.top - pad), mark.height + pad * 2),
  })
  .resize({ height: 256, kernel: 'lanczos3' })
  .png(PNG)
  .toFile(`${OUT}/logo-mark.png`);

// Full lockup, transparent — for light surfaces, sharing previews and print.
const full = bounds(keyed);
await img()
  .extract(full)
  .resize({ height: 340, kernel: 'lanczos3' })
  .png(PNG)
  .toFile(`${OUT}/logo.png`);

// Favicons. The browser tab icon keeps its transparency; the iOS home-screen
// icon does not, because iOS composites transparency onto black.
const markPng = await img()
  .extract({ left: mark.left, top: mark.top, width: mark.width, height: mark.height })
  .png()
  .toBuffer();

await sharp(markPng)
  .resize({ width: 64, height: 64, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png(PNG)
  .toFile('public/favicon.png');

await sharp(markPng)
  .resize({ width: 156, height: 156, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .extend({ top: 12, bottom: 12, left: 12, right: 12, background: '#ffffff' })
  .flatten({ background: '#ffffff' })
  .png(PNG)
  .toFile('public/apple-touch-icon.png');

console.log(`logo-mark.png  from ${mark.width}×${mark.height} source crop`);
console.log(`logo.png       from ${full.width}×${full.height} source crop`);
console.log('favicon.png, apple-touch-icon.png written');
