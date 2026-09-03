"""Tuzla Summer 2026 — Streamlit showcase.

Native Streamlit mirror of the static site, driven by the same single
source of truth: js/content.js. Deploy this repo on Streamlit Community
Cloud (main branch, app.py) or run locally:

    pip install -r requirements.txt
    streamlit run app.py
"""

import json
import os
import re
import shutil

import os

import streamlit as st
from PIL import Image

# Repo root: this file lives in <root>/streamlit/, the site content in <root>.
BASE = os.path.dirname(os.path.abspath(__file__))
ROOT = BASE if os.path.isdir(os.path.join(BASE, "js")) else os.path.dirname(BASE)
os.chdir(ROOT)

st.set_page_config(
    page_title="Tuzla Summer 2026 — AIESEC in Istanbul Asia × Tuzla Municipality",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ---------------------------------------------------------------------------
# Content (single source of truth: js/content.js)
# ---------------------------------------------------------------------------


@st.cache_data(show_spinner=False)
def load_content():
    raw = open("js/content.js", encoding="utf-8").read()
    raw = re.sub(r"/\*.*?\*/", "", raw, flags=re.S)
    raw = re.sub(r"([{,])\s*([A-Za-z_$][\w$]*)\s*:", r'\1 "\2":', raw)
    raw = re.sub(r",\s*([\]}])", r"\1", raw)
    i18n = json.loads(re.search(r"const I18N = (.*?);\s*\n\s*const DATA", raw, re.S).group(1))
    data = json.loads(re.search(r"const DATA = (.*?);\s*$", raw, re.S).group(1))
    return i18n, data


I18N, DATA = load_content()

if "lang" not in st.session_state:
    st.session_state.lang = "en"

if "view" not in st.session_state:
    st.session_state.view = "site"


def T(key):
    return I18N[st.session_state.lang].get(key, I18N["en"].get(key, key))


def L(obj):
    if not obj:
        return ""
    return obj.get(st.session_state.lang) or obj.get("en", "")


@st.cache_data(show_spinner=False)
def thumb(path):
    img = Image.open(path).convert("RGB")
    img.thumbnail((760, 760), Image.LANCZOS)
    return img


def sdg_pill(sdg):
    color = DATA["sdgMeta"][sdg]["color"]
    return (f'<span style="background:{color};color:#fff;padding:3px 12px;'
            f'border-radius:999px;font-weight:700;font-size:0.8em">SDG {sdg}</span>')


def fig_value(fig):
    return "XX" if fig["value"] is None else f'{fig["value"]}{fig["suffix"]}'


@st.cache_resource(show_spinner="Preparing the website files…")
def ensure_static_site():
    """Hard-link the real site (index.html, css, js, assets) into static/site
    so Streamlit's built-in static server can serve it to the embedded frame."""
    dst_root = os.path.join("static", "site")
    if os.path.islink(dst_root):
        os.remove(dst_root)
    if os.path.isdir(dst_root):
        shutil.rmtree(dst_root, ignore_errors=True)

    def link_tree(src_root, rel_keep=""):
        for root, _dirs, files in os.walk(src_root):
            rel = os.path.relpath(root, src_root)
            target_dir = os.path.join(dst_root, rel_keep, rel) if rel_keep else os.path.join(dst_root, rel)
            os.makedirs(target_dir, exist_ok=True)
            for f in files:
                if f.endswith(".heic"):
                    continue
                src = os.path.join(root, f)
                tgt = os.path.join(target_dir, f)
                try:
                    os.link(src, tgt)
                except OSError:
                    shutil.copy2(src, tgt)

    os.makedirs(dst_root, exist_ok=True)
    shutil.copy2("index.html", os.path.join(dst_root, "index.html"))
    link_tree("css", "css")
    link_tree("js", "js")
    link_tree("assets", "assets")
    return True


ensure_static_site()


# ---------------------------------------------------------------------------
# Sidebar
# ---------------------------------------------------------------------------

with st.sidebar:
    st.image("assets/logos/AIESEClogo.png", width=150)
    st.radio(
        "View", ["site", "native"], key="view",
        format_func=lambda v: "🌐 Website view" if v == "site" else "📋 Simple view",
        label_visibility="collapsed",
    )
    st.divider()
    st.image("assets/logos/tuzla_belediyesi_logo.png", width=84)
    st.radio(
        "Language / Dil", ["en", "tr"], key="lang",
        format_func=lambda l: "English" if l == "en" else "Türkçe",
        horizontal=True, label_visibility="collapsed",
    )
    st.divider()
    st.caption(T("footer.credit"))
    st.page_link("https://github.com/yusufbilgic14/tuzla-summer-2026", label="GitHub")
    st.page_link("https://sdgs.un.org/goals", label="UN SDGs")

# ---------------------------------------------------------------------------
# Hero
# ---------------------------------------------------------------------------

if st.session_state.view == "site":
    st.markdown(
        "<style>"
        'header[data-testid="stHeader"] {display: none;}'
        "#MainMenu {visibility: hidden;}"
        'div[data-testid="stBlockContainer"], .block-container {'
        "padding: 0 !important; margin: 0 !important; max-width: 100% !important;}"
        "footer {visibility: hidden;}"
        "</style>",
        unsafe_allow_html=True,
    )
    st.iframe(
        "/app/static/site/index.html",
        height=920,
        width="stretch",
    )
    st.stop()

# --- native (simple) view ---------------------------------------------------

st.markdown(f"##### {T('hero.badge')}")
st.markdown(f"# {T('hero.title.a')} :orange[{T('hero.title.b')}]")
st.markdown(T("hero.sub"))
st.link_button(T("nav.cta"), "mailto:" + DATA["contact"]["email"], type="primary")

h1, h2 = st.columns([1, 1], gap="medium")
with h1:
    st.image("assets/photos/community/mainprojectphoto.jpeg",
             caption=T("hero.photoCap"), width="stretch")
with h2:
    st.markdown(f"### {T('figures.label')}")
    for fig in DATA["figures"][:2]:
        st.metric(L(fig["caption"]), fig_value(fig))

# ---------------------------------------------------------------------------
# Figures
# ---------------------------------------------------------------------------

st.markdown(f"### {T('figures.label')}")
fcols = st.columns(4)
for col, fig in zip(fcols, DATA["figures"]):
    with col:
        col.metric(L(fig["caption"]), fig_value(fig))

# ---------------------------------------------------------------------------
# Story
# ---------------------------------------------------------------------------

st.markdown(f"### {T('story.label')}")
st.markdown(T("story.p1"))
st.markdown(T("story.p2"))
cards = st.columns(4)
for col, key in zip(cards, ["1", "2", "3", "4"]):
    with col.container(border=True):
        st.markdown(f'**{T("story." + key + ".t")}**')
        st.markdown(T("story." + key + ".d"))

# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

st.markdown(f"### {T('projects.label')}")
for idx, p in enumerate(DATA["projects"]):
    meta = DATA["sdgMeta"][p["sdg"]]
    st.markdown(f'{sdg_pill(p["sdg"])} &nbsp; **{idx + 1:02d} · ${p["code"]}**', unsafe_allow_html=True)
    st.subheader(L(p["name"]))
    st.markdown(f'*{L(p["tagline"])}*')
    st.markdown(L(p["mission"]))

    a, b = st.columns(2)
    with a.container(border=True):
        st.markdown(f'**{T("projects.activities")}**')
        st.markdown("\n".join(f"✅ {L(x)}" for x in p["activities"]))
    with b.container(border=True):
        st.markdown(f'**{T("projects.outcomes")}**')
        for o in p["outcomes"]:
            st.markdown(f'**{o.get("v") or "XX"}** — {L(o["post"])}')

    strip = [g for g in DATA["gallery"]
             if g["project"] == p["id"] and g.get("type") != "video"][:3]
    scols = st.columns(3)
    for col, g in zip(scols, strip):
        with col:
            st.image(thumb(g["src"]), caption=L(g["caption"]), width="stretch")

    with st.container(border=True):
        st.markdown(f'> {L(p["quote"]["text"])}')
        st.caption(f'{p["quote"]["name"]} · {L(p["quote"]["role"])}')
    st.divider()

# ---------------------------------------------------------------------------
# SDG explorer
# ---------------------------------------------------------------------------

st.markdown(f"### {T('sdg.label')}")
st.markdown(T("sdg.intro"))
sdg = st.selectbox(
    T("sdg.label"), ["5", "13", "17"],
    format_func=lambda k: f"SDG {k} — {L(DATA['sdgMeta'][k]['title'])}",
    label_visibility="collapsed",
)
meta = DATA["sdgMeta"][sdg]
proj = next(p for p in DATA["projects"] if p["sdg"] == sdg)
d1, d2 = st.columns(2)
with d1.container(border=True):
    st.markdown(sdg_pill(sdg), unsafe_allow_html=True)
    st.markdown(f'**{L(meta["official"])}**')
with d2.container(border=True):
    st.markdown(f'**{T("sdg.targets")}**')
    for tg in proj["targets"]:
        st.markdown(f'**{tg["ref"]}** — {L(tg["text"])}')

# ---------------------------------------------------------------------------
# Gallery
# ---------------------------------------------------------------------------

st.markdown(f"### {T('gallery.label')}")
st.markdown(T("gallery.intro"))

filter_labels = {
    "all": T("gallery.filter.all").strip("[]"),
    "ryv": L(DATA["projects"][0]["name"]),
    "gl": L(DATA["projects"][1]["name"]),
    "mmw": L(DATA["projects"][2]["name"]),
    "community": T("gallery.tag.community"),
}
chosen = st.radio("gallery", list(filter_labels.keys()),
                  format_func=lambda k: filter_labels[k],
                  horizontal=True, label_visibility="collapsed")
visible = [g for g in DATA["gallery"] if chosen == "all" or g["project"] == chosen]

for row_start in range(0, len(visible), 3):
    row = visible[row_start:row_start + 3]
    rcols = st.columns(3)
    for col, item in zip(rcols, row):
        cap = L(item["caption"])
        tag = (T("gallery.tag.community") if item["project"] == "community"
               else "SDG " + item["project"].upper())
        with col.container(border=True):
            if item.get("type") == "video" and item.get("src"):
                with st.expander("▶ " + cap):
                    st.video(item["src"], format="video/mp4")
            elif item.get("src"):
                st.image(thumb(item["src"]), caption=cap, width="stretch")
            else:
                st.info(cap)
            st.caption(tag)

# ---------------------------------------------------------------------------
# Timeline
# ---------------------------------------------------------------------------

st.markdown(f"### {T('timeline.label')}")
for ev in DATA["timeline"]:
    with st.container():
        st.markdown(f'**{ev["date"].strip("[]")} — {L(ev["title"])}**')
        st.markdown(L(ev["desc"]))

# ---------------------------------------------------------------------------
# Voices
# ---------------------------------------------------------------------------

st.markdown(f"### {T('voices.label')}")
for i, v in enumerate(DATA["voices"]):
    col = st.columns(2)[i % 2]
    with col.container(border=True):
        st.markdown(f'> {L(v["quote"])}')
        st.markdown(f'**{v["name"]}**')
        st.caption(L(v["role"]))

# ---------------------------------------------------------------------------
# Partner proposal
# ---------------------------------------------------------------------------

st.markdown("---")
st.markdown(f"## {T('partner.title')} :orange[{T('partner.title.hl')}]")
st.markdown(T("partner.p1"))
st.markdown(T("partner.p2"))
bcols = st.columns(2)
for i, key in enumerate(["1", "2", "3", "4"]):
    with bcols[i % 2].container(border=True):
        st.markdown(f'**{T("partner." + key + ".t")}**')
        st.markdown(T("partner." + key + ".d"))
st.link_button(T("partner.cta"), "mailto:" + DATA["contact"]["email"], type="primary")
st.caption("ig: " + DATA["contact"]["instagram"])
