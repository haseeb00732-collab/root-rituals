# Root Rituals — Traditional Herbal Hair Tonic

Marketing site for **Root Rituals**, a small-batch Halal herbal hair-care brand
made in Pakistan. Static HTML/CSS/JS — no build step, no framework, no
dependencies.

**Live locally:** `python -m http.server 3000` → <http://localhost:3000>

---

## What's in it

- Full-bleed photographic hero with scroll parallax
- Product panel with a **3D tilt** interaction and sticky scroll
- **The Blend** — 12 real herb photographs on 3D tilting cards that reveal
  what each herb does
- Editorial results section, four-step ritual, brand story, reviews
- WhatsApp ordering throughout (pre-filled per product), plus Instagram,
  Facebook and TikTok links
- Fully responsive, keyboard accessible, honours `prefers-reduced-motion`

## Add your product photos

Drop two files into [`assets/`](assets/) — see [assets/README.md](assets/README.md):

- `assets/hair-tonic-spray.jpg`
- `assets/ars-hair-mask.jpg`

Until then the site falls back to built-in CSS renders of the bottle and jar,
so nothing ever looks broken.

## Things to update before going live

| What | Where |
|---|---|
| Prices (`Rs 1,299` / `Rs 1,599` / `Rs 2,549`) | `index.html` — search for `Rs ` |
| Free-shipping threshold (`Rs 3,000`) | `index.html` |
| Reviews (currently representative) | `index.html` — "Reviews" section |
| Herb photos (currently licensed stock) | swap the Unsplash IDs in the `herbs` array |

---

## Run locally

```bash
python -m http.server 3000     # or:  npx serve . -l 3000
```
Open <http://localhost:3000>. Always use the `localhost` URL rather than
double-clicking the file — some browsers restrict fonts and images on `file://`.

## Deploy to Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```
Or import the repo at <https://vercel.com/new> — framework preset **Other**,
build command empty, output directory `.`. `vercel.json` is already included.

## Deploy to Railway

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```
Then **Settings → Networking → Generate Domain** for a public URL. Railway uses
the `npm start` script, which serves the folder on its `$PORT`.

## Credits

Herb and lifestyle photography from [Unsplash](https://unsplash.com) (free for
commercial use). Typefaces: **Alice** and **Manrope** via Google Fonts.
