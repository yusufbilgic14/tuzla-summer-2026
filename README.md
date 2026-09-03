# Tuzla Summer 2026 — Impact Report

Showcase for the 2026 summer volunteer program run by **AIESEC in Istanbul Asia** together with **Tuzla Municipality**: 50+ volunteers from 11 countries, three projects, three UN Sustainable Development Goals — Raise Your Voice (SDG 5), Green Leaders (SDG 13) and Myself My World (SDG 17).

The repo ships the showcase in two forms driven by the **same single content file** (`js/content.js`):

| Form | What it is | Best for |
|---|---|---|
| `index.html` | Zero-dependency static site (custom design, full gallery + lightbox, TR/EN toggle, interactive SDG map) | The main showcase — host anywhere |
| `app.py` | Native Streamlit app rendering the same content | Streamlit Community Cloud deployment |

## Edit content

Everything — text (EN/TR), impact numbers, countries, photo captions, the gallery manifest — lives in **`js/content.js`**. Both the static site and the Streamlit app read from it.

- **Photos/videos**: drop files into `assets/photos/<project>/` and add one line to `DATA.gallery` in `js/content.js` (browsers can't read `.heic` — convert to `.jpg` first).
- **Impact numbers**: replace the `null` / `"XX"` placeholders with real values.
- **Contact**: update `DATA.contact` (email + Instagram) before sharing publicly.

## Run the static site

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Run the Streamlit app

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Deploy

- **Streamlit Community Cloud**: share the repo, set main branch + `app.py` → done.
- **Static site**: upload the folder to any static host (GitHub Pages, Vercel, Netlify, the municipality's server).

## Credits

© 2026 AIESEC in Istanbul Asia × Tuzla Municipality — a not-for-profit community program.
