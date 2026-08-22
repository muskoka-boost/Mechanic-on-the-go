import type { ImageMetadata } from 'astro';
import galleryData from '../data/gallery.json';

export interface GalleryItem {
  image: ImageMetadata;
  alt: string;
}

/**
 * Gallery photos, resolved from src/data/gallery.json — the file the CMS writes.
 *
 * The JSON only stores a path and an alt string. The actual image has to be
 * imported for Astro to optimise it, and imports cannot be built from a runtime
 * string, so every candidate file is globbed up front and looked up by path.
 *
 * `eager` matters: this runs at build time and the results are needed
 * synchronously while rendering.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/images/gallery/*.{jpeg,jpg,png,webp,avif}',
  { eager: true },
);

/**
 * The widest any gallery tile is ever displayed: a quarter of the 1200px
 * content column, doubled for high-density screens.
 *
 * Nothing is generated above this, and — more importantly — nothing is
 * generated above the source image's own width. Every photo supplied so far is
 * a 278px Google Business Profile thumbnail, and upscaling those to fill the
 * tile is exactly what made the old gallery look soft: it invents no detail and
 * adds sharpening artefacts. A small, honest image the browser scales up beats
 * a large, mushy one. Replace a photo with a full-resolution original and it
 * starts rendering at the full 560px automatically.
 */
const MAX_WIDTH = 560;

export const galleryItems: GalleryItem[] = galleryData.items.flatMap((item) => {
  const file = files[item.image];
  // A photo deleted from disk but left in the JSON must not break the build.
  if (!file) {
    console.warn(`[gallery] ${item.image} is listed in gallery.json but not on disk — skipped`);
    return [];
  }
  return [{ image: file.default, alt: item.alt }];
});

/** Render width for one photo: never upscaled past its own resolution. */
export const renderWidth = (image: ImageMetadata) => Math.min(image.width, MAX_WIDTH);
