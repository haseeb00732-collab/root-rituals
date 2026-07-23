# Drop your real product photos here

The site looks for these two files. Save your photos with **exactly** these
names in this folder and they appear automatically — no code changes needed.

| Filename                | Where it appears                  | Best size / shape        |
|-------------------------|-----------------------------------|--------------------------|
| `hair-tonic-spray.jpg`  | Main product panel (large, sticky)| Portrait, ~1600×2000 px  |
| `ars-hair-mask.jpg`     | "ARS Herbal Hair Mask" card       | Portrait, ~800×1000 px   |

If a file is missing, the site quietly falls back to the built-in CSS
illustration of the bottle/jar — so the page never shows a broken image.

## Tips
- Use the photos you already have (the spray bottle on the dark background
  with rosemary, and the amber ARS jar). They match the site's palette.
- `.jpg` is expected. If you only have `.png`, either convert it or edit the
  two `src="assets/..."` lines in `index.html`.
- Keep files under ~500 KB each so the page stays fast. Any image
  compressor (e.g. squoosh.app) will do this without visible quality loss.
