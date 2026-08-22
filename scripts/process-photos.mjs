/**
 * Crops, resizes and compresses the originals in photos-inbox/ into the exact
 * slots the site expects in public/images/.
 *
 * Source photos are currently 278px Google Business Profile thumbnails, so the
 * output targets are deliberately modest — upscaling past what the source
 * carries just makes a bigger, blurrier file. When full-resolution originals
 * land, raise the `w`/`h` values here and re-run; nothing else needs to change.
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
  { src: 'unnamed (2).jpg', out: 'cta.jpg',        w: 2000, h: 900,  blur: 1.0, crop: { top: 96, height: 125 } },
  { src: 'hero-source.jpg', dir: 'stock', out: 'og-default.jpg', w: 1200, h: 630, flop: true, grade: true },

  // A tight detail shot survives upscaling far better than a wide scene, which
  // is why this slot used to hold the rotor-and-caliper close-up in
  // 'unnamed (7).jpg'. Brake work is no longer offered, so the About and
  // homepage image cannot be a brake photo — it now shares the driveway shot
  // with work-1.jpg, framed differently. Of the nine supplied photos only four
  // are not brake or suspension close-ups, so some reuse is unavoidable until
  // there are more originals to work from.
  { src: 'unnamed (1).jpg', out: 'about.jpg',      w: 1200, h: 900,  sharpen: true, pos: 'attention' },

  // Gallery: 3:4, displayed small, so these stay near native resolution.
  { src: 'unnamed (1).jpg', out: 'work-1.jpg', w: 480, h: 640, sharpen: true },
  { src: 'unnamed (5).jpg', out: 'work-2.jpg', w: 480, h: 640, sharpen: true },
  { src: 'unnamed (4).jpg', out: 'work-3.jpg', w: 480, h: 640, sharpen: true },
  { src: 'unnamed (7).jpg', out: 'work-4.jpg', w: 480, h: 640, sharpen: true },
  { src: 'unnamed (3).jpg', out: 'work-5.jpg', w: 480, h: 640, sharpen: true },
  { src: 'unnamed (6).jpg', out: 'work-6.jpg', w: 480, h: 640, sharpen: true },
  { src: 'unnamed.jpg',     out: 'work-7.jpg', w: 480, h: 640, sharpen: true },
  { src: 'unnamed (2).jpg', out: 'work-8.jpg', w: 480, h: 640, sharpen: true },
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
