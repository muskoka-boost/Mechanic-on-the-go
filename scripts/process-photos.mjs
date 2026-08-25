/**
 * Crops, resizes and compresses the originals in photos-inbox/ into the exact
 * slots the site expects in public/images/.
 *
 * Two generations of source photo live in photos-inbox/ side by side:
 *
 *   unnamed*.{jpg,png}        278px Google Business Profile thumbnails. Nothing
 *                             recovers detail these never had, so the slots
 *                             still fed by them stay modest on purpose.
 *   Messenger_creation_*.jpeg Real originals, 1536x2048 and 2048x1536. Roughly
 *                             seven times the linear resolution, so slots fed
 *                             by these carry a full-size render with no blur or
 *                             sharpening crutch.
 *
 * The homepage gallery is no longer processed here at all — it moved to
 * src/images/gallery/, where Astro optimises it at build time and the owner
 * manages it from /admin. See "Photo manager" in the README.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const IN = 'photos-inbox';

const jobs = [
  // Hero and CTA sit under a heavy dark gradient, so a soft source reads as
  // atmosphere rather than a low-quality photo. Slight blur hides upscale
  // artefacts that the scrim would otherwise pick out as mush.
  // HERO: currently stock, because the owner's own shots are 278px thumbnails
  // and will not carry a full-bleed hero. Swap back to hero-real.jpg the moment
  // full-resolution originals exist — see stock/LICENSE.md.
  { src: 'hero-source.jpg', dir: 'stock', out: 'hero.jpg', w: 2000, h: 1250,
    flop: true, grade: true, pos: 'centre' },

  // The owner's real driveway shot, kept processed and ready to swap in.
  { src: 'unnamed (1).jpg', out: 'hero-real.jpg',  w: 2000, h: 1250, blur: 1.0, crop: { top: 58, height: 174 } },
  // CTA band: now a real 2048x1536 original, so it needs no blur to hide
  // upscaling — it is a genuine downscale.
  { src: 'Messenger_creation_875675EB-A4E4-46D6-B4CC-14CCBEE1FDE2.jpeg', out: 'cta.jpg', w: 2000, h: 900, pos: 'centre' },
  { src: 'hero-source.jpg', dir: 'stock', out: 'og-default.jpg', w: 1200, h: 630, flop: true, grade: true },

  // About + homepage "why mobile" image. Held-in-hand scan tool part way
  // through a 22-module scan: it shows the diagnostic claim the copy makes
  // rather than asserting it, and at 1536x2048 a 4:3 crop is still a downscale.
  // No sharpening — that was only ever propping up the 278px sources.
  { src: 'Messenger_creation_5494609A-E30D-44E3-8442-665B00BD12CF.jpeg', out: 'about.jpg', w: 1200, h: 900, pos: 'centre' },

];

await mkdir('public/images', { recursive: true });

let total = 0;
for (const j of jobs) {
  let p = sharp(`${j.dir ?? IN}/${j.src}`);
  if (j.crop) {
    const meta = await p.metadata();
    p = p.extract({ left: 0, top: j.crop.top, width: meta.width, height: j.crop.height });
  }
  p = p
    .resize(j.w, j.h, {
      fit: 'cover',
      position: j.pos ?? 'centre',
      kernel: 'lanczos3',
      withoutEnlargement: false,
    });
  // Mirror so the vehicle sits opposite the headline rather than under it.
  if (j.flop) p = p.flop();
  // Pull a bright daylight stock frame toward the site's dark, cool palette so
  // it sits under the hero scrim instead of fighting it.
  if (j.grade) p = p.modulate({ brightness: 0.8, saturation: 0.76 }).tint('#dce9f2');
  if (j.blur) p = p.blur(j.blur);
  if (j.sharpen) p = p.sharpen({ sigma: 0.7 });

  const info = await p.jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(`public/images/${j.out}`);
  total += info.size;
  console.log(`  ${j.out.padEnd(16)} ${String(j.w).padStart(4)}x${String(j.h).padEnd(4)}  ${(info.size / 1024).toFixed(0)}KB`);
}
console.log(`\n  total ${(total / 1024).toFixed(0)}KB across ${jobs.length} files`);
