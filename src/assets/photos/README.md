# Your photographs go here

Drop image files into this folder and they replace the placeholder imagery
automatically — **no code changes required**. A Vite plugin picks up each file,
reads its real pixel dimensions from the file header, and hands them to the
gallery so the layout reserves exactly the right space.

## How it works

Every image in `src/data/` declares a `localKey`. A file whose **name matches
that key** wins over the placeholder URL:

```
src/assets/photos/glacier-veil.jpg   →  replaces the "Glacier Veil" gallery item
src/assets/photos/hero.jpg           →  replaces the home page hero photograph
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`.

## The filenames to use

| File to add                   | Replaces                                                                                                  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| `hero.jpg`                    | Home page hero background                                                                                 |
| `about-portrait.jpg`          | Portrait in the About section                                                                             |
| `<portfolio-id>.jpg`          | A gallery item — the `id` in `src/data/portfolioData.ts` (e.g. `glacier-veil.jpg`, `arctic-fox-dusk.jpg`) |
| `<testimonial-id>-avatar.jpg` | A client photo (e.g. `elena-marsh-avatar.jpg`)                                                            |
| `<post-id>-cover.jpg`         | A journal cover (e.g. `chasing-blue-hour-cover.jpg`)                                                      |

Run `npm run photos:list` to print every key the site is currently looking for
and whether a file has been supplied yet.

Photographs straight from a phone are handled correctly: EXIF orientation is
applied, so a shot the camera stored sideways still gets the right layout box.
The build also warns about files that match no key (they are ignored) and files
large enough to be worth re-exporting.

## Preparing files for the web

These images are served as-is, so export them at sensible sizes:

- **Long edge ~2000px** for gallery and hero photographs (~2400px if you expect
  large desktop displays), **~600px** for portraits, **~400px** for avatars.
- **JPEG quality 80** (or WebP, which is typically 25–35% smaller).
- Aim for **under 400 KB** per photograph; the hero is the one worth optimising
  hardest since it gates the largest contentful paint.
- Strip GPS EXIF before publishing if the location is private.

## Two things to update by hand

1. **Alt text** in `src/data/` still describes the placeholder. Rewrite it to
   describe your photograph — it is what screen reader users get, and it is the
   one part of this that cannot be automated.
2. **Titles, locations, years and captions** in `portfolioData.ts` are sample
   copy. They are what the lightbox shows.
