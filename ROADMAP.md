# Roadmap & Principles — Tuzla Summer 2026

> Status snapshot: **September 3, 2026**. Keep this file updated whenever the
> pipeline, principles, or deployment story change — it exists so future
> maintainers (and future us) don't rediscover the same lessons.

## What this repo is

The official showcase of the 2026 summer volunteer program run by
**AIESEC in Istanbul Asia** together with **Tuzla Municipality**:
50+ volunteers, three projects mapped to three UN SDGs —
**Raise Your Voice** (SDG 5), **Green Leaders** (SDG 13),
**Myself My World** (SDG 17).

The repo ships the showcase in two forms, fed by **one content file**:

| Form | Entry point | Purpose |
|---|---|---|
| Static website (primary) | `index.html` + `css/` + `js/` | The real showcase — custom design, full archive, TR/EN |
| Streamlit mirror (optional) | `streamlit/app.py` | Native Streamlit rendering for Streamlit Community Cloud |

---

## Current status — what is done

- ✅ **Design system "Summer Field Journal"**: warm cream canvas, AIESEC blue
  primary, yellow marker highlights, three official SDG colors as accents,
  Bricolage Grotesque + Plus Jakarta Sans, rounded cards, polaroid frames,
  dotted world map, marquee, starburst, confetti details.
- ✅ **Full page**: two-column hero (headline + big crew photo), figures band
  with animated counters, story cards, 3 project sections with horizontal
  scroll reels, SDG explorer with dotted world map + arcs, filterable archive
  (67 items), timeline, voices, 2027 proposal band, footer with logos.
- ✅ **TR/EN bilingual** — every string, persisted in `localStorage`.
- ✅ **Media pipeline complete**: 67-entry gallery manifest, no placeholders
  among media. HEIC → JPEG conversion, `-web.jpg` optimization, video
  compression (`avconvert`), auto-extracted video posters.
- ✅ **Vercel-ready**: `vercel.json` deploys the static site (framework null,
  files copied to `dist/`). Streamlit moved to `streamlit/` so Vercel's Python
  auto-detection is not triggered.
- ✅ **Streamlit app** (`streamlit/app.py`): native mirror reading the same
  content, TR/EN, video expanders, themed via `.streamlit/config.toml`.
- ✅ **Accessibility & verification habits**: skip link, keyboard support,
  reduced-motion, alt texts, headless-Chrome DOM checks, overflow probe at
  1440/1024/850/768/640/390, Streamlit AppTest runs.

### Open items (as of this snapshot)

- ⬜ **Real impact numbers** — workshop counts, residents reached, kg of
  waste, saplings, volunteer hours. Search `js/content.js` for `XX` / `null`
  (1 figure + 9 outcome values).
- ⬜ **Headline says "11 countries"** but `DATA.countries` currently lists the
  9 confirmed ones — decide which is correct and align the headline.
- ⬜ **Real testimonials** — quote cards still use `[ Volunteer name ]`
  style placeholders.
- ⬜ **Real contact** — `DATA.contact` still holds `ADD-REAL-EMAIL@example.org`
  and `ADD-REAL-INSTAGRAM-HANDLE`.
- ⬜ **Municipality approval** for anything naming people or the mayor.
- ⬜ Nice-to-haves: aftermovie when it exists, OG/share image, custom domain
  on Vercel, printable one-page PDF summary.

---

## Principles (why things are the way they are)

### 1. One content file, two renderers
`js/content.js` is the **only** place text, numbers, countries, captions and
the gallery manifest live. The static site and the Streamlit app both parse
it. Never hardcode content in either renderer.

### 2. Zero dependencies, zero build step for the site
The static site is plain HTML/CSS/JS with Google Fonts as the only external
reference. It must open by double-click and deploy on any host. No bundlers,
no frameworks, no npm.

### 3. The design language is "Summer Field Journal" — not "developer"
Early versions used a terminal/monospace theme; the owner rejected it
explicitly. Rules that came out of that:
- Friendly rounded UI, warm colors, photography-led.
- **No `$ code_name` shell-style labels anywhere** — projects are shown by
  their real names and numbered as a series (`01 / 03`).
- The only monospace-style accents allowed are inside decorative "report"
  elements (figure numbers, counters).

### 4. SDG colors are the accent system
SDG 5 `#FF3A21`, SDG 13 `#3F7E44`, SDG 17 `#19486A` plus brand blue `#037EF3`
and warm yellow `#FFC945`. They color tags, chips, timelines, stickers and
accents — one coherent story across every section.

### 5. Media pipeline (repeat for every new batch)
1. Drop files into `assets/photos/<project>/`.
2. **HEIC** → `sips -s format jpeg -s formatOptions 82 -Z 1600` (browsers
   can't read HEIC). Never commit `.heic` (gitignored).
3. **Oversized JPGs** (≥ ~500 KB or ≥ 1600 px) → `-web.jpg` copy, max 1280–
   1600 px, quality 78–85. **Always bake EXIF orientation** with
   `ImageOps.exif_transpose` before saving.
4. **Videos**: WhatsApp/vertical clips — do **not** re-encode with
   `avconvert` (it inflates vertical videos, e.g. 17 MB → 98 MB). Only
   landscape 4K originals benefit (65 MB → 25 MB at `Preset960x540`).
   Every video needs a `-web.mp4` copy — `.gitignore` tracks `*-web.mp4`
   only, so originals stay local.
5. **Posters**: headless Chrome screenshot of a muted autoplay page
   (`_vposter.html` pattern). If frames come back blank (codec quirk), fall
   back to a photo from the same event as the poster.
6. Add entries to `DATA.gallery` in `js/content.js` with EN+TR captions, then
   verify all referenced files exist.

### 6. Galleries read forward — always
CSS multi-`columns` scatters visual order when item heights differ. The
archive distributes items into explicit column divs **row by row** (item 1 →
col 1, item 2 → col 2 …). Project strips are horizontal flex reels with
scroll-snap + `‹`/`›` buttons and include every photo **and** video of that
project.

### 7. Lazy loading is IntersectionObserver-driven
Native `loading="lazy"` inside the fade-in (opacity/transform) wrappers
never triggered in some browsers — images stayed blank until a click
re-rendered the grid. Gallery images carry `data-src` and an IO with a 700 px
rootMargin assigns `src`. Do not reintroduce native lazy loading here.

### 8. Bilingual means natural, not literal
Turkish copy is written to read naturally (municipality audience), English
for the international network. Every new string lands in both language
blocks of `I18N` in the same edit.

### 9. Placeholder convention
Unknown numbers → `null` (figures) or `"XX"`/`"XXX"` strings (outcomes),
unknown names → `[ Volunteer name ]` bracket style, unknown contact →
`ADD-REAL-…`. Anything not replaced must be visible on the page so it cannot
be forgotten.

### 10. Verify like we build
Headless Chrome (`--dump-dom` / `--screenshot`) for DOM + visual checks,
an overflow probe across 1440/1024/850/768/640/390, Streamlit `AppTest` for
both languages, and a grep pass for console errors. Known test-environment
quirks: old headless clamps window width (<500 px — use an iframe probe),
iframes don't scroll/anchor under virtual time, and AppTest re-runs with
sidebar radios need fresh instances.

---

## Known quirks & gotchas

- **Tornado static serving rejects symlinks** that escape `static/` — the
  Streamlit app therefore **hard-links** site files into `static/site/` at
  boot (`ensure_static_site()`). Static URL prefix is `/app/static/…`.
- **Streamlit widget state**: widgets with `key=` own their session state —
  never also assign `st.session_state.<key>` manually after creation.
- **GitHub**: files > 50 MB produce warnings (hard limit 100 MB) — that is
  why source `.mp4`s and `.heic`s are local-only.
- **avconvert**: only use for landscape originals; vertical WhatsApp clips
  must be copied as-is.
- **`os.chdir` in `streamlit/app.py`** anchors all relative paths to the repo
  root regardless of where `streamlit run` is invoked.

---

## Deployment

| Target | How |
|---|---|
| **Vercel** (primary) | Import repo → `vercel.json` handles it. Push to `main` = auto redeploy. |
| Any static host | Same files work as-is (GitHub Pages, Netlify, municipality server). |
| Streamlit Community Cloud | Optional. Main file path: `streamlit/app.py`. |

Before going fully public: replace the contact placeholders, confirm quote
attribution, and align the countries headline.
