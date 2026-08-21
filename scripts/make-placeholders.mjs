/**
 * Generates dark industrial placeholder images so the layout renders at the
 * correct aspect ratios before the owner's real photos land.
 *
 * REPLACE every file in public/images/ with the real photo of the same name
 * and the same aspect ratio. Nothing else needs to change.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const targets = [
  { file: 'hero.jpg', w: 2000, h: 1250, label: 'HERO', note: 'Ram 1500, hood up, driveway, winter' },
  { file: 'og-default.jpg', w: 1200, h: 630, label: 'SOCIAL SHARE', note: '1200x630' },
  { file: 'about.jpg', w: 1400, h: 1050, label: 'ABOUT', note: 'Owner at work' },
  { file: 'cta.jpg', w: 2000, h: 900, label: 'CTA BAND', note: 'Wide roadside or van shot' },
  { file: 'work-1.jpg', w: 1200, h: 1600, label: 'WORK 01', note: 'Hub assembly on knuckle' },
  { file: 'work-2.jpg', w: 1200, h: 1600, label: 'WORK 02', note: 'Ram 2500 winter service' },
  { file: 'work-3.jpg', w: 1200, h: 1600, label: 'WORK 03', note: 'Ram 1500 driveway, wheel off' },
  { file: 'work-4.jpg', w: 1200, h: 1600, label: 'WORK 04', note: 'Front suspension underside' },
  { file: 'work-5.jpg', w: 1200, h: 1600, label: 'WORK 05', note: 'Civic roadside wheel service' },
  { file: 'work-6.jpg', w: 1200, h: 1600, label: 'WORK 06', note: 'New rotor, blue hub, caliper' },
  { file: 'work-7.jpg', w: 1200, h: 1600, label: 'WORK 07', note: 'Rear drum brake assembly' },
  { file: 'work-8.jpg', w: 1200, h: 1600, label: 'WORK 08', note: 'Civic on floor jack, driveway' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const svg = ({ w, h, label, note }) => {
  const base = Math.min(w, h);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#17222e"/>
      <stop offset="55%" stop-color="#0d151d"/>
      <stop offset="100%" stop-color="#070d13"/>
    </linearGradient>
    <radialGradient id="v" cx="0.3" cy="0.25" r="0.9">
      <stop offset="0%" stop-color="#29a3e0" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#29a3e0" stop-opacity="0"/>
    </radialGradient>
    <pattern id="d" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <line x1="0" y1="0" x2="0" y2="34" stroke="#ffffff" stroke-opacity="0.028" stroke-width="9"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
  <rect width="${w}" height="${h}" fill="url(#d)"/>
  <text x="50%" y="47%" text-anchor="middle"
        font-family="Arial Narrow, Helvetica, sans-serif" font-weight="700"
        font-size="${Math.round(base * 0.075)}" letter-spacing="${Math.round(base * 0.012)}"
        fill="#29a3e0" fill-opacity="0.85">${esc(label)}</text>
  <text x="50%" y="47%" dy="${Math.round(base * 0.072)}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-weight="500"
        font-size="${Math.round(base * 0.03)}" letter-spacing="${Math.round(base * 0.003)}"
        fill="#7f92a4">${esc(note)}</text>
  <rect x="${Math.round(base * 0.03)}" y="${Math.round(base * 0.03)}"
        width="${w - Math.round(base * 0.06)}" height="${h - Math.round(base * 0.06)}"
        fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="2" stroke-dasharray="14 12"/>
</svg>`;
};

await mkdir('public/images', { recursive: true });

for (const t of targets) {
  await sharp(Buffer.from(svg(t)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`public/images/${t.file}`);
  console.log(`  ${t.file}  ${t.w}x${t.h}`);
}
console.log('\nPlaceholders generated. Replace each file with the real photo at the same aspect ratio.');
