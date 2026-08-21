# Photo drop-off

Put the original photos here. **Any filenames, any sizes** — straight off the
phone or downloaded from the Google Business Profile is fine. Do not rename,
crop, or resize them first.

## How to upload from a browser

1. Open this folder on GitHub, on the branch the site deploys from.
2. **Add file → Upload files**
3. Drag the photos in (up to 100 files, 25 MB each).
4. **Commit directly to the branch.**

## What happens next

These get processed into `public/images/`:

- cropped to the aspect ratio each slot needs (the hero is 16:10, the gallery
  is 3:4 — an uncropped phone photo will letterbox or crop badly on its own)
- resized and compressed, so a 4 MB phone photo does not become a 4 MB download
  on a customer's mobile data
- given real, specific `alt` text describing the actual work shown
- matched to the right slot: the strongest driveway shot becomes the hero, detail
  shots go to the gallery

The originals stay here as the source of truth, so any slot can be recropped
later without asking for the files again.

## Worth knowing

**Resolution matters most for the hero.** It spans the full width of the screen
and wants roughly 2000px on the long edge. Anything smaller looks soft. Gallery
images are more forgiving — 1200px is plenty.

**Send more than are needed.** Having a choice produces a better result than
making one photo work in a slot it does not suit.

**Nothing in this folder is published.** It sits outside `public/`, so it is not
part of the built site — it is a staging area only.
