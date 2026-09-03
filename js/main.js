/* TUZLA SUMMER 2026 — interactions
   Animated figures, hero stickers + country marquee, SDG explorer + map,
   filterable gallery, lightbox, timeline, voices, TR/EN toggle. */

(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ACCENTS = ["#FF3A21", "#FFC945", "#3F7E44", "#037EF3", "#19486A", "#FF6B57"];

  var state = {
    lang: localStorage.getItem("tuzla26-lang") || "en",
    sdg: "5",
    filter: "all",
    figCounter: 0,
    photoFigs: 0,
    lightboxIndex: -1
  };

  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || (I18N.en[key] || key); }
  function L(obj) { return obj ? (obj[state.lang] || obj.en) : ""; }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* ---------------- i18n ---------------- */

  function applyStaticText() {
    $$("[data-i18n]").forEach(function (n) {
      n.textContent = t(n.getAttribute("data-i18n"));
    });
    document.documentElement.lang = state.lang;
    document.title = t("meta.title");
    var md = $('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.description"));
    $$(".lang-toggle button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang));
    });
  }

  function applyLang(animateFigures) {
    applyStaticText();
    renderFigures(animateFigures === true);
    renderHeroStickers();
    renderMarquee();
    renderProjects();
    renderSDG();
    renderGallery();
    renderTimeline();
    renderVoices();
    $$(".reveal:not(.in)").forEach(function (n) { revealObserver.observe(n); });
    var mail = $("#partner-mail");
    mail.setAttribute("href", "mailto:" + DATA.contact.email +
      "?subject=" + encodeURIComponent("Summer 2027 partnership — Tuzla"));
    $("#ig-handle").textContent = "ig: " + DATA.contact.instagram;
    var wp = $("#world-partner");
    if (wp) wp.innerHTML = worldSVG({ base: "rgba(255,255,255,0.10)", accentOpacity: 0.75 });
  }

  /* ---------------- hero stickers & marquee ---------------- */

  function renderHeroStickers() {
    var wrap = $("#hero-stickers");
    if (!wrap) return;
    wrap.innerHTML = DATA.projects.map(function (p) {
      var meta = DATA.sdgMeta[p.sdg];
      return '<a class="sticker" style="--sdg:' + meta.color + '" href="#proj-' + p.id + '">' +
        '<span class="s-sdg">SDG</span>' +
        '<span class="s-num">' + p.sdg + "</span>" +
        '<span class="s-name">' + L(meta.title) + "</span>" +
        '<span class="s-code">$ ' + p.code + "</span>" +
        "</a>";
    }).join("");
  }

  function renderMarquee() {
    var track = $("#marquee-track");
    if (!track) return;
    var one = "";
    DATA.countries.forEach(function (c, i) {
      one += '<span class="m-item">' + c + "</span>" +
        '<span class="m-dot" style="background:' + ACCENTS[i % ACCENTS.length] + '"></span>';
    });
    track.innerHTML = one + one;
  }

  /* ---------------- figures ---------------- */

  function sparkline(points, color) {
    var w = 160, h = 44, max = Math.max.apply(null, points);
    var step = w / (points.length - 1);
    var pts = points.map(function (p, i) {
      return (i * step).toFixed(1) + "," + (h - 4 - (p / max) * (h - 8)).toFixed(1);
    }).join(" ");
    return '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2.2" ' +
      'stroke-dasharray="1 6" stroke-linecap="round"/></svg>';
  }

  function nextFigNo() { return ++state.figCounter; }
  function resetFigs() { state.figCounter = 0; }

  var STAT_COLORS = ["#037EF3", "#E0A800", "#3F7E44", "#FF6B57"];

  function renderFigures(animate) {
    resetFigs();
    var grid = $("#figures-grid");
    grid.innerHTML = "";
    DATA.figures.forEach(function (f, i) {
      var color = STAT_COLORS[i % STAT_COLORS.length];
      var tile = el("div", "stat-card");
      tile.style.setProperty("--accent", color);
      tile.innerHTML = sparkline(f.points, color);
      var num = el("div", "num");
      tile.appendChild(num);
      var cap = el("div", "caption");
      cap.innerHTML = '<span class="fig-no">Fig ' + (i + 1) + '.</span> ' + L(f.caption);
      tile.appendChild(cap);
      grid.appendChild(tile);
      if (f.value == null) {
        num.textContent = "XX";
        num.classList.add("placeholder");
      } else if (animate && !prefersReduced) {
        num.dataset.target = String(f.value);
        num.dataset.suffix = f.suffix || "";
        num.textContent = "0" + (f.suffix || "");
        numObserver.observe(num);
      } else {
        num.textContent = f.value + (f.suffix || "");
      }
    });
    state.figCounter = DATA.figures.length;
  }

  var numObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      numObserver.unobserve(e.target);
      var eln = e.target;
      var target = parseInt(eln.dataset.target, 10);
      var suffix = eln.dataset.suffix || "";
      var start = performance.now(), dur = 950;
      (function step(now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        eln.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(start);
    });
  }, { threshold: 0.4 });

  /* ---------------- gallery helpers ---------------- */

  function pendingMarkup(item) {
    var path = item.src || (item.type === "video" ? "assets/videos/aftermovie.mp4" : "assets/photos/…");
    return '<div class="pending"><span>' +
      (item.type === "video" ? t("gallery.pendingVideo") : t("gallery.pending")) +
      '</span><span class="path">' + path + "</span></div>";
  }

  function visibleGallery() {
    return DATA.gallery.filter(function (it) {
      return state.filter === "all" || it.project === state.filter;
    });
  }

  /* ---------------- projects ---------------- */

  function projectOutcomesHTML(p) {
    return p.outcomes.map(function (o) {
      return '<div class="out-row"><span class="out-val">' + (o.v || "XX") + "</span>" +
        '<span class="out-txt">' + L(o.post) + "</span></div>";
    }).join("");
  }

  function projectActivitiesHTML(p) {
    return p.activities.map(function (a) {
      return '<li><span class="check" aria-hidden="true">✓</span><span>' + L(a) + "</span></li>";
    }).join("");
  }

  function photoFigHTML(item, figNo, sdgColor) {
    var inner;
    if (!item.src) {
      inner = pendingMarkup(item);
    } else {
      inner = '<img src="' + item.src + '" alt="' + L(item.caption) + '" loading="lazy">';
    }
    return '<figure class="photo-fig" style="--sdg:' + sdgColor + '" data-gi="' + DATA.gallery.indexOf(item) + '">' +
      '<div class="ph">' + inner + "</div>" +
      '<figcaption><span class="fig-no">Fig ' + figNo + '.</span>' + L(item.caption) + "</figcaption></figure>";
  }

  function projectSectionHTML(p, idx) {
    var meta = DATA.sdgMeta[p.sdg];
    var photos = DATA.gallery.filter(function (g) { return g.project === p.id; }).slice(0, 3);
    state.photoFigs += photos.length;
    var strip = photos.map(function (g) { return photoFigHTML(g, nextFigNo(), meta.color); }).join("");
    var deco = p.id === "mmw"
      ? '<div class="world-deco world-mmw" aria-hidden="true">' +
        worldSVG({ base: "rgba(10,37,64,0.10)", accentOpacity: 0.9 }) + "</div>"
      : "";
    return '<article class="project" id="proj-' + p.id + '" style="--sdg:' + meta.color + '">' +
      deco +
      '<div class="container">' +
        '<div class="p-head reveal">' +
          '<div class="p-overline">' +
            '<span class="p-idx">' + String(idx + 1).padStart(2, "0") + '</span>' +
            '<span class="p-code">$ ' + p.code + "</span>" +
          "</div>" +
          '<div class="p-titlerow">' +
            '<h3 class="project-name">' + L(p.name) + "</h3>" +
            '<span class="sdg-pill">SDG ' + p.sdg + " · " + L(meta.title) + "</span>" +
          "</div>" +
          '<p class="project-tagline">' + L(p.tagline) + "</p>" +
        "</div>" +
        '<p class="project-mission reveal">' + L(p.mission) + "</p>" +
        '<div class="project-cols reveal">' +
          '<div class="panel-card"><h3>' + t("projects.activities") + '</h3><ul class="act-list">' + projectActivitiesHTML(p) + "</ul></div>" +
          '<div class="panel-card"><h3>' + t("projects.outcomes") + '</h3><div class="out-rows">' + projectOutcomesHTML(p) + "</div></div>" +
        "</div>" +
        '<div class="photo-strip reveal">' + strip + "</div>" +
        '<div class="quote-card reveal">' +
          '<span class="q-glyph" aria-hidden="true">“</span>' +
          '<div class="q-name">' + p.quote.name + ' <span class="q-role">· ' + L(p.quote.role) + "</span></div>" +
          '<div class="q-text">' + L(p.quote.text) + "</div>" +
        "</div>" +
      "</div></article>";
  }

  function renderProjects() {
    var wrap = $("#projects-list");
    state.figCounter = DATA.figures.length;
    state.photoFigs = 0;
    wrap.innerHTML = DATA.projects.map(function (p, i) { return projectSectionHTML(p, i); }).join("");
    bindPhotoClicks(wrap);
  }

  /* ---------------- SDG explorer ---------------- */

  var CELL = 12;
  var MAP_W = WORLD_COLS * CELL;
  var MAP_H = WORLD_ROWS * CELL;

  function projXY(lon, lat) {
    return [
      ((lon - WORLD_LON0) / WORLD_LON_STEP) * CELL,
      ((WORLD_LAT0 - lat) / WORLD_LAT_STEP) * CELL
    ];
  }

  function countryXY(name, idx) {
    var pos = WORLD_POS[name];
    if (pos) return projXY(pos[0], pos[1]);
    var tuzla = projXY(29.1, 40.8);
    var ang = idx * 2.39996;
    return [tuzla[0] + 150 * Math.cos(ang), tuzla[1] + 120 * Math.sin(ang)];
  }

  function landDotsSVG(opts) {
    opts = opts || {};
    var base = opts.base || "rgba(10,37,64,0.16)";
    var accentOpacity = opts.accentOpacity == null ? 0.9 : opts.accentOpacity;
    var r = opts.r || 3.4;
    var out = "";
    WORLD_GRID.forEach(function (row, ri) {
      for (var ci = 0; ci < row.length; ci++) {
        if (row.charAt(ci) !== "#") continue;
        var x = (ci * CELL + CELL / 2).toFixed(1);
        var y = (ri * CELL + CELL / 2).toFixed(1);
        var accent = ((ri * 7 + ci * 13) % 23) === 0;
        var fill = accent ? ACCENTS[(ri + ci) % ACCENTS.length] : base;
        out += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '"' +
          (accent ? ' opacity="' + accentOpacity + '"' : "") + "/>";
      }
    });
    return out;
  }

  function worldSVG(opts) {
    return '<svg viewBox="0 0 ' + MAP_W + " " + MAP_H + '" aria-hidden="true">' +
      landDotsSVG(opts) + "</svg>";
  }

  function buildMap() {
    var tuzla = projXY(29.1, 40.8);
    var svg = '<svg viewBox="0 0 ' + MAP_W + " " + MAP_H +
      '" role="img" aria-label="Dotted world map with partner countries connected to Tuzla">';
    svg += "<g>" + landDotsSVG({ base: "rgba(10,37,64,0.18)", accentOpacity: 0.9, r: 3.4 }) + "</g>";
    var arcs = "", dots = "";
    DATA.countries.forEach(function (c, i) {
      var pos = countryXY(c, i);
      var color = ACCENTS[i % ACCENTS.length];
      var mx = (pos[0] + tuzla[0]) / 2;
      var my = Math.min(pos[1], tuzla[1]) - Math.max(26, Math.abs(pos[0] - tuzla[0]) * 0.22);
      arcs += '<path class="map-arc" data-arc="' + i + '" style="stroke:' + color +
        '" d="M' + pos[0].toFixed(1) + "," + pos[1].toFixed(1) +
        " Q" + mx.toFixed(1) + "," + my.toFixed(1) + " " + tuzla[0].toFixed(1) + "," + tuzla[1].toFixed(1) + '"/>';
      dots += '<circle class="map-dot" style="fill:' + color + '" cx="' + pos[0].toFixed(1) +
        '" cy="' + pos[1].toFixed(1) + '" r="5.5"><title>' + c + "</title></circle>";
    });
    svg += arcs + dots;
    svg += '<circle class="map-hub-ring" cx="' + tuzla[0].toFixed(1) + '" cy="' + tuzla[1].toFixed(1) + '" r="12"/>';
    svg += '<circle class="map-hub" cx="' + tuzla[0].toFixed(1) + '" cy="' + tuzla[1].toFixed(1) + '" r="6"/>';
    svg += '<text class="map-country" x="' + tuzla[0].toFixed(1) + '" y="' + (tuzla[1] - 18).toFixed(1) +
      '" text-anchor="middle" style="font-weight:800;fill:#0A2540">TUZLA</text>';
    svg += "</svg>";
    return svg;
  }

  function sdgTileHTML(sdg) {
    var meta = DATA.sdgMeta[sdg];
    var proj = DATA.projects.filter(function (p) { return p.sdg === sdg; })[0];
    return '<button class="sdg-tile" type="button" data-sdg="' + sdg + '" ' +
      'aria-pressed="' + String(state.sdg === sdg) + '" ' +
      'style="--sdg:' + meta.color + '">' +
      '<span class="t-num">SDG ' + sdg + "</span>" +
      '<span class="t-name">' + L(meta.title) + "</span>" +
      '<span class="t-project">$ ' + (proj ? proj.code : "") + "</span>" +
      "</button>";
  }

  function sdgDetailHTML(sdg) {
    var meta = DATA.sdgMeta[sdg];
    var proj = DATA.projects.filter(function (p) { return p.sdg === sdg; })[0];
    var targets = proj ? proj.targets.map(function (tg) {
      return '<div class="target-row"><span class="target-ref">' + tg.ref + "</span>" +
        '<span class="target-text">' + L(tg.text) + "</span></div>";
    }).join("") : "";
    var mapHTML = "";
    if (sdg === "17") {
      var figNo = (state.photoFigs || 0) + DATA.figures.length + 1;
      mapHTML = '<div class="sdg-map"><div id="sdg-map-svg">' + buildMap() + "</div>" +
        '<div class="caption"><span class="fig-no">Fig ' + figNo + ".</span>SDG 17 — " +
        DATA.countries.length + "+ countries → Tuzla</div></div>";
    }
    return '<div class="sdg-detail-left">' +
        '<div class="kicker">' + t("sdg.official") + " " + sdg + " — " + L(meta.title) + "</div>" +
        '<h3 class="goal-title">' + L(meta.title) + "</h3>" +
        '<p class="goal-official">' + L(meta.official) + "</p>" +
        (proj ? '<a class="link" href="#gallery" id="sdg-see-gallery">' + t("sdg.detail.link") + "</a>" : "") +
      "</div>" +
      '<div class="sdg-detail-right">' +
        '<div class="kicker">' + t("sdg.targets") + "</div>" +
        '<div class="target-list">' + targets + "</div>" +
        mapHTML +
      "</div>";
  }

  function renderSDG() {
    var tiles = $("#sdg-tiles");
    tiles.innerHTML = ["5", "13", "17"].map(sdgTileHTML).join("");
    var detail = $("#sdg-detail");
    detail.innerHTML = sdgDetailHTML(state.sdg);
    detail.style.setProperty("--sdg", DATA.sdgMeta[state.sdg].color);

    $$(".sdg-tile", tiles).forEach(function (b) {
      b.addEventListener("click", function () {
        state.sdg = b.dataset.sdg;
        renderSDG();
      });
    });
    var see = $("#sdg-see-gallery");
    if (see) {
      see.addEventListener("click", function (e) {
        e.preventDefault();
        var proj = DATA.projects.filter(function (p) { return p.sdg === state.sdg; })[0];
        if (proj) setFilter(proj.id);
        document.getElementById("gallery").scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
      });
    }
    animateMapArcs();
  }

  function animateMapArcs() {
    var arcs = $$(".map-arc");
    if (!arcs.length) return;
    if (prefersReduced) {
      arcs.forEach(function (a) { a.style.opacity = 1; });
      return;
    }
    arcs.forEach(function (a) { a.style.opacity = 0; });
    arcObserver.disconnect();
    arcObserver.observe($("#sdg-map-svg"));
  }

  var arcObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      arcObserver.unobserve(e.target);
      $$(".map-arc").forEach(function (a, i) {
        setTimeout(function () { a.style.opacity = 1; }, 120 + i * 130);
      });
    });
  }, { threshold: 0.3 });

  /* ---------------- gallery ---------------- */

  var FILTERS = ["all", "ryv", "gl", "mmw", "community"];

  function filterLabel(f) {
    if (f === "all") return t("gallery.filter.all");
    if (f === "community") return t("gallery.tag.community");
    var proj = DATA.projects.filter(function (p) { return p.id === f; })[0];
    return proj ? L(proj.name) : f;
  }

  function setFilter(f) {
    state.filter = f;
    renderGallery();
  }

  function renderGallery() {
    var chips = $("#gallery-chips");
    chips.innerHTML = FILTERS.map(function (f) {
      return '<button class="chip-btn" type="button" data-filter="' + f + '" aria-pressed="' +
        String(state.filter === f) + '">' + filterLabel(f) + "</button>";
    }).join("") +
      (state.filter !== "all"
        ? '<span class="gallery-hint">' + t("gallery.filter.hint") + " " + filterLabel(state.filter) +
          ' <button type="button" id="filter-clear">' + t("gallery.clear") + "</button></span>"
        : "");
    $$(".chip-btn", chips).forEach(function (b) {
      b.addEventListener("click", function () { setFilter(b.dataset.filter); });
    });
    var clear = $("#filter-clear");
    if (clear) clear.addEventListener("click", function () { setFilter("all"); });

    var grid = $("#gallery-grid");
    var items = visibleGallery();
    if (!items.length) {
      grid.innerHTML = '<div class="caption-md">' + t("gallery.empty") + "</div>";
      return;
    }
    grid.innerHTML = items.map(function (item) {
      var gi = DATA.gallery.indexOf(item);
      var media;
      if (item.type === "video") {
        if (item.poster) {
          media = '<img src="' + item.poster + '" alt="' + L(item.caption) + '" loading="lazy">';
        } else if (item.src) {
          media = '<div class="vthumb">[▶]<br>' + (item.src.split("/").pop()) + "</div>";
        } else {
          media = pendingMarkup(item);
        }
      } else if (!item.src) {
        media = pendingMarkup(item);
      } else {
        media = '<img src="' + item.src + '" alt="' + L(item.caption) + '" loading="lazy">';
      }
      var play = item.type === "video" ? '<span class="playmark">[▶]</span>' : "";
      var tag = item.project === "community" ? t("gallery.tag.community")
        : "SDG " + (DATA.projects.filter(function (p) { return p.id === item.project; })[0] || {}).sdg;
      return '<figure class="gallery-item" data-gi="' + gi + '">' +
        '<div class="ph">' + play + media + "</div>" +
        '<figcaption><span class="g-tag">' + tag + "</span><br>" + L(item.caption) + "</figcaption></figure>";
    }).join("");

    $$(".gallery-item", grid).forEach(function (figEl) {
      var gi = parseInt(figEl.dataset.gi, 10);
      var item = DATA.gallery[gi];
      var img = figEl.querySelector("img");
      if (img) {
        img.addEventListener("load", function () { figEl.dataset.loaded = "1"; });
        img.addEventListener("error", function () {
          figEl.querySelector(".ph").innerHTML = pendingMarkup(item);
        });
      } else if (!item.src) {
        return;
      } else {
        figEl.dataset.loaded = "1";
      }
      figEl.addEventListener("click", function () {
        if (figEl.dataset.loaded === "1" || item.type === "video") openLightbox(gi);
      });
    });
  }

  /* ---------------- lightbox ---------------- */

  function ytEmbed(url) {
    var m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    return m ? "https://www.youtube-nocookie.com/embed/" + m[1] : null;
  }

  function openLightbox(gi) {
    var vis = visibleGallery();
    var item = DATA.gallery[gi];
    state.lightboxIndex = vis.indexOf(item);
    showLightbox();
    var lb = $("#lightbox");
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  }

  function closeLightbox() {
    $("#lightbox").classList.remove("open");
    $("#lb-media").innerHTML = "";
    document.body.style.overflow = "";
    state.lightboxIndex = -1;
  }

  function showLightbox() {
    var vis = visibleGallery();
    if (!vis.length) return;
    if (state.lightboxIndex < 0) state.lightboxIndex = 0;
    if (state.lightboxIndex >= vis.length) state.lightboxIndex = vis.length - 1;
    var item = vis[state.lightboxIndex];
    var media = $("#lb-media");
    if (item.type === "video" && item.src) {
      var embed = ytEmbed(item.src);
      media.innerHTML = embed
        ? '<iframe src="' + embed + '" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen title="' + L(item.caption) + '"></iframe>'
        : '<video src="' + item.src + '" controls playsinline></video>';
    } else if (item.src) {
      media.innerHTML = '<img src="' + item.src + '" alt="' + L(item.caption) + '">';
    } else {
      media.innerHTML = pendingMarkup(item);
    }
    $("#lb-cap").textContent = L(item.caption);
    $("#lb-count").textContent = (state.lightboxIndex + 1) + " " + t("lightbox.counter") + " " + vis.length;
  }

  function bindLightbox() {
    $("#lb-close").addEventListener("click", closeLightbox);
    $("#lb-prev").addEventListener("click", function () { state.lightboxIndex--; showLightbox(); });
    $("#lb-next").addEventListener("click", function () { state.lightboxIndex++; showLightbox(); });
    $("#lightbox").addEventListener("click", function (e) {
      if (e.target === this) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      var open = $("#lightbox").classList.contains("open");
      if (!open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") { state.lightboxIndex--; showLightbox(); }
      if (e.key === "ArrowRight") { state.lightboxIndex++; showLightbox(); }
    });
  }

  function bindPhotoClicks(root) {
    $$(".photo-fig", root).forEach(function (figEl) {
      var gi = parseInt(figEl.dataset.gi, 10);
      var item = DATA.gallery[gi];
      var img = figEl.querySelector("img");
      if (img) {
        img.addEventListener("error", function () {
          figEl.removeAttribute("data-loaded");
          figEl.style.cursor = "default";
          figEl.querySelector(".ph").innerHTML = pendingMarkup(item);
        });
        figEl.dataset.loaded = "1";
      } else {
        figEl.querySelector(".ph").style.cursor = "default";
      }
      figEl.addEventListener("click", function () {
        if (figEl.dataset.loaded === "1") openLightbox(gi);
      });
    });
  }

  /* ---------------- timeline & voices ---------------- */

  function renderTimeline() {
    $("#timeline-list").innerHTML = DATA.timeline.map(function (ev, i) {
      return '<div class="tl-row"><span class="tl-dot" style="--dot:' + ACCENTS[(i + 3) % ACCENTS.length] + '"></span>' +
        '<span class="tl-date">' + ev.date.replace(/[\[\]]/g, "") + "</span>" +
        '<h4 class="tl-title">' + L(ev.title) + "</h4>" +
        '<p class="tl-desc">' + L(ev.desc) + "</p></div>";
    }).join("");
  }

  function renderVoices() {
    $("#voices-list").innerHTML = DATA.voices.map(function (v) {
      return '<div class="voice-card">' +
        '<span class="v-glyph" aria-hidden="true">“</span>' +
        '<div class="v-quote">' + L(v.quote) + "</div>" +
        '<div class="v-name">' + v.name + '</div>' +
        '<div class="v-role">' + L(v.role) + "</div></div>";
    }).join("");
  }

  /* ---------------- reveal ---------------- */

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  /* ---------------- nav ---------------- */

  function bindNav() {
    var toggle = $(".nav-toggle");
    var drawer = $("#nav-drawer");
    toggle.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", drawer).forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- language ---------------- */

  function bindLang() {
    $$(".lang-toggle button").forEach(function (b) {
      b.addEventListener("click", function () {
        if (state.lang === b.dataset.lang) return;
        state.lang = b.dataset.lang;
        localStorage.setItem("tuzla26-lang", state.lang);
        applyLang();
      });
    });
  }

  function bindHeroPhoto() {
    var hp = $("#hero-photo");
    if (!hp) return;
    var idx = -1;
    DATA.gallery.forEach(function (it, i) {
      if (it.src && it.src.indexOf("mainprojectphoto") !== -1) idx = i;
    });
    function open() { if (idx >= 0) openLightbox(idx); }
    hp.addEventListener("click", open);
    hp.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  }

  /* ---------------- init ---------------- */

  function init() {
    applyLang(true);
    bindLang();
    bindLightbox();
    bindNav();
    bindHeroPhoto();
    $$(".reveal").forEach(function (n) { revealObserver.observe(n); });
  }

  init();
})();
