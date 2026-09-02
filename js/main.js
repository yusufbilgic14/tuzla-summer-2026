/* TUZLA SUMMER 2026 — interactions
   Terminal typing, animated figures, SDG explorer + country map,
   filterable gallery, lightbox, timeline, voices, TR/EN toggle. */

(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var state = {
    lang: localStorage.getItem("tuzla26-lang") || "en",
    script: "main",
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
    renderProjects();
    renderSDG();
    renderGallery();
    renderTimeline();
    renderVoices();
    renderTerminal(state.script, true);
    $$(".reveal:not(.in)").forEach(function (n) { revealObserver.observe(n); });
    var mail = $("#partner-mail");
    mail.setAttribute("href", "mailto:" + DATA.contact.email +
      "?subject=" + encodeURIComponent("Summer 2027 partnership — Tuzla"));
    $("#ig-handle").textContent = "ig: " + DATA.contact.instagram;
  }

  /* ---------------- terminal ---------------- */

  var SCRIPT_LABELS = {
    en: {
      loaded: "aiesec_istanbul_asia × tuzla_belediyesi — field data loaded",
      status: "status",
      mainfigs: ["volunteers", "countries", "projects", "residents reached"],
      ryv: ["equality workshops", "students engaged", "stories exhibited"],
      gl: ["waste collected", "saplings planted", "residents reached"],
      mmw: ["global village festivals", "intercultural sessions", "countries connected"]
    },
    tr: {
      loaded: "aiesec_istanbul_asya × tuzla_belediyesi — saha verisi yüklendi",
      status: "durum",
      mainfigs: ["gönüllü", "ülke", "proje", "ulaşılan kişi"],
      ryv: ["eşitlik atölyesi", "ulaşılan öğrenci", "sergilenen hikâye"],
      gl: ["toplanan atık", "dikilen fidan", "ulaşılan Tuzlalı"],
      mmw: ["global village şenliği", "kültürlerarası seans", "bağlanan ülke"]
    }
  };

  function pad(label) { return ("> " + label + " ").padEnd(30, ".") + " "; }

  function buildScript(id) {
    var SL = SCRIPT_LABELS[state.lang];
    var lines = [];
    function line(segs) { lines.push(segs); }
    function metric(label, value, cls) {
      line([
        { t: pad(label), mode: "type" },
        { t: value, cls: cls || "k-accent", mode: "pop" }
      ]);
    }
    if (id === "main") {
      line([{ t: "$ ", mode: "type" }, { t: "summer2026 --report --location=tuzla", cls: "k-accent", mode: "pop" }]);
      line([{ t: "[ok] ", cls: "k-success", mode: "pop" }, { t: SL.loaded, cls: "k-dim", mode: "type" }]);
      var figs = {};
      DATA.figures.forEach(function (f) { figs[f.id] = f; });
      ["volunteers", "countries", "projects", "reached"].forEach(function (fid, i) {
        var f = figs[fid];
        if (!f) return;
        var v = f.value == null ? "XX" : f.value + (f.suffix || "");
        metric(SL.mainfigs[i] || fid, v, f.value == null ? "k-warning" : "k-accent");
      });
      line([{ t: pad(SL.status), mode: "type" }, { t: "COMPLETED ✓", cls: "k-success", mode: "pop" }]);
    } else {
      var proj = DATA.projects.filter(function (p) { return p.id === id; })[0];
      if (!proj) return buildScript("main");
      line([{ t: "$ ", mode: "type" }, { t: "run " + proj.code + " --sdg=" + proj.sdg, cls: "k-accent", mode: "pop" }]);
      line([
        { t: "[sdg " + proj.sdg + "] ", cls: "k-sdg" + proj.sdg, mode: "pop" },
        { t: proj.code, cls: "k-dim", mode: "type" }
      ]);
      proj.outcomes.forEach(function (o, i) {
        metric(SL[id][i] || "metric_" + i, o.v || "XX");
      });
      line([{ t: pad(SL.status), mode: "type" }, { t: "COMPLETED ✓", cls: "k-success", mode: "pop" }]);
    }
    return lines;
  }

  var typeToken = 0;

  function renderTerminal(id, instant) {
    var term = $("#terminal");
    var token = ++typeToken;
    var script = buildScript(id);
    term.innerHTML = "";
    var caret = el("span", "tui-caret", "\u00a0");

    function renderLine(segs) {
      var div = el("div", "tui-line");
      segs.forEach(function (seg) {
        var span = el("span", seg.cls || null);
        span.textContent = seg.t;
        div.appendChild(span);
      });
      return div;
    }

    if (instant || prefersReduced) {
      script.forEach(function (segs) { term.appendChild(renderLine(segs)); });
      var last = term.lastChild;
      if (last) last.appendChild(caret);
      return;
    }

    (function type() {
      script.reduce(function (promise, segs) {
        return promise.then(function () {
          if (token !== typeToken) return;
          var div = el("div", "tui-line");
          term.appendChild(div);
          if (div.previousSibling) {
            var pc = div.previousSibling.querySelector(".tui-caret");
            if (pc) pc.remove();
          }
          div.appendChild(caret);
          return segs.reduce(function (p, seg) {
            return p.then(function () {
              if (token !== typeToken) return;
              var span = el("span", seg.cls || null);
              div.insertBefore(span, caret);
              if (seg.mode === "pop") {
                span.textContent = seg.t;
                return sleep(60);
              }
              return seg.t.split("").reduce(function (cp, ch) {
                return cp.then(function () {
                  if (token !== typeToken) return;
                  span.textContent += ch;
                  return sleep(ch === "." ? 4 : 13);
                });
              }, Promise.resolve());
            });
          }, Promise.resolve()).then(function () { return sleep(120); });
        });
      }, Promise.resolve());
    })();
  }

  function bindTerminalButtons() {
    $$("#tui-cmds .tui-cmd").forEach(function (b) {
      b.addEventListener("click", function () {
        state.script = b.dataset.script;
        $$("#tui-cmds .tui-cmd").forEach(function (x) {
          x.setAttribute("aria-pressed", String(x === b));
        });
        renderTerminal(state.script, false);
      });
    });
  }

  /* ---------------- figures ---------------- */

  function sparkline(points) {
    var w = 160, h = 44, max = Math.max.apply(null, points);
    var step = w / (points.length - 1);
    var pts = points.map(function (p, i) {
      return (i * step).toFixed(1) + "," + (h - 4 - (p / max) * (h - 8)).toFixed(1);
    }).join(" ");
    return '<svg viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<polyline points="' + pts + '" fill="none" stroke="#646262" stroke-width="1.4" ' +
      'stroke-dasharray="1 5" stroke-linecap="round"/></svg>';
  }

  function nextFigNo() { return ++state.figCounter; }
  function resetFigs() { state.figCounter = 0; }

  function renderFigures(animate) {
    resetFigs();
    var grid = $("#figures-grid");
    grid.innerHTML = "";
    DATA.figures.forEach(function (f, i) {
      var tile = el("div", "chart-tile");
      tile.innerHTML = sparkline(f.points);
      var num = el("div", "num");
      tile.appendChild(num);
      var cap = el("div", "caption-md");
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
      return '<div class="list-row"><span class="marker">[x]</span>' +
        '<span class="lr-desc"><strong>' + (o.v || "XX") + "</strong>" + L(o.post) + "</span></div>";
    }).join("");
  }

  function projectActivitiesHTML(p) {
    return p.activities.map(function (a) {
      return '<div class="list-row"><span class="marker">[+]</span><span class="lr-desc">' + L(a) + "</span></div>";
    }).join("");
  }

  function photoFigHTML(item, figNo) {
    var inner;
    if (!item.src) {
      inner = pendingMarkup(item);
    } else {
      inner = '<img src="' + item.src + '" alt="' + L(item.caption) + '" loading="lazy">';
    }
    return '<figure class="photo-fig" data-gi="' + DATA.gallery.indexOf(item) + '">' +
      '<div class="ph">' + inner + "</div>" +
      '<figcaption><span class="fig-no">Fig ' + figNo + '.</span>' + L(item.caption) + "</figcaption></figure>";
  }

  function projectSectionHTML(p) {
    var meta = DATA.sdgMeta[p.sdg];
    var photos = DATA.gallery.filter(function (g) { return g.project === p.id; }).slice(0, 3);
    state.photoFigs += photos.length;
    var strip = photos.map(function (g) { return photoFigHTML(g, nextFigNo()); }).join("");
    return '<article class="project project-rule" id="proj-' + p.id + '">' +
      '<div class="container">' +
        '<div class="project-head reveal">' +
          '<div class="sdg-tag">' +
            '<span class="sdg-num" style="background:' + meta.color + '">SDG ' + p.sdg + "</span>" +
            '<span class="sdg-label">' + L(meta.title) + "</span>" +
          "</div>" +
          '<div class="project-code">$ ' + p.code + "</div>" +
          '<h3 class="project-name">' + L(p.name) + "</h3>" +
          '<p class="body-md project-tagline">' + L(p.tagline) + "</p>" +
        "</div>" +
        '<p class="body-md project-mission reveal">' + L(p.mission) + "</p>" +
        '<div class="project-cols reveal">' +
          '<div><h3 class="heading-md">' + t("projects.activities") + '</h3><div class="list-rows">' + projectActivitiesHTML(p) + "</div></div>" +
          '<div><h3 class="heading-md">' + t("projects.outcomes") + '</h3><div class="list-rows">' + projectOutcomesHTML(p) + "</div></div>" +
        "</div>" +
        '<div class="photo-strip reveal">' + strip + "</div>" +
        '<div class="project-quote reveal"><div class="testimonial-row">' +
          '<div class="t-name"><span class="t-avatar" aria-hidden="true"></span>' + p.quote.name + " · " + L(p.quote.role) + "</div>" +
          '<div class="t-quote">' + L(p.quote.text) + "</div>" +
        "</div></div>" +
      "</div></article>";
  }

  function renderProjects() {
    var wrap = $("#projects-list");
    state.figCounter = DATA.figures.length;
    state.photoFigs = 0;
    wrap.innerHTML = DATA.projects.map(projectSectionHTML).join("");
    bindPhotoClicks(wrap);
  }

  /* ---------------- SDG explorer ---------------- */

  var MAP_POS = {
    "Italy": [300, 150], "Italia": [300, 150],
    "Spain": [225, 195], "España": [225, 195],
    "Poland": [385, 105],
    "Portugal": [195, 215],
    "Ukraine": [435, 130],
    "Egypt": [400, 305],
    "Morocco": [225, 295],
    "Indonesia": [655, 395],
    "India": [540, 270],
    "Mexico": [85, 225],
    "Brazil": [155, 375]
  };

  function mapCountryPos(name, idx, total) {
    if (MAP_POS[name]) return MAP_POS[name];
    var arc = 100 + (idx % 6) * 70;
    return [arc, 120 + ((idx * 53) % 300)];
  }

  function buildMap() {
    var hub = [640, 240];
    var svg = '<svg viewBox="0 0 800 460" role="img" aria-label="Network of countries connected to Tuzla">';
    var arcs = "", dots = "", labels = "";
    DATA.countries.forEach(function (c, i) {
      var pos = mapCountryPos(c, i, DATA.countries.length);
      var mx = (pos[0] + hub[0]) / 2;
      var my = Math.min(pos[1], hub[1]) - 70;
      arcs += '<path class="map-arc" data-arc="' + i + '" d="M' + pos[0] + "," + pos[1] +
        " Q" + mx.toFixed(0) + "," + my.toFixed(0) + " " + hub[0] + "," + hub[1] + '"/>';
      dots += '<circle class="map-dot" cx="' + pos[0] + '" cy="' + pos[1] + '" r="4"/>';
      labels += '<text class="map-country" x="' + (pos[0] + 8) + '" y="' + (pos[1] + 4) + '">' + c + "</text>";
    });
    svg += arcs + dots + labels;
    svg += '<circle class="map-hub-ring" cx="' + hub[0] + '" cy="' + hub[1] + '" r="10"/>';
    svg += '<circle class="map-hub" cx="' + hub[0] + '" cy="' + hub[1] + '" r="5"/>';
    svg += '<text class="map-country" x="' + (hub[0] - 12) + '" y="' + (hub[1] - 16) +
      '" style="font-weight:700;fill:#201d1d">TUZLA</text>';
    svg += "</svg>";
    return svg;
  }

  function sdgTileHTML(sdg) {
    var meta = DATA.sdgMeta[sdg];
    var proj = DATA.projects.filter(function (p) { return p.sdg === sdg; })[0];
    return '<button class="sdg-tile" type="button" data-sdg="' + sdg + '" ' +
      'aria-pressed="' + String(state.sdg === sdg) + '" ' +
      'style="--tile-accent:' + meta.color + '">' +
      '<span class="sdg-num">SDG ' + sdg + "</span>" +
      '<span class="sdg-name">' + L(meta.title) + "</span>" +
      '<span class="sdg-project">$ ' + (proj ? proj.code : "") + "</span>" +
      "</button>";
  }

  function sdgDetailHTML(sdg) {
    var meta = DATA.sdgMeta[sdg];
    var proj = DATA.projects.filter(function (p) { return p.sdg === sdg; })[0];
    var targets = proj ? proj.targets.map(function (tg) {
      return '<div class="list-row"><span class="marker">[+]</span>' +
        '<span class="lr-desc"><strong>' + tg.ref + "</strong> — " + L(tg.text) + "</span></div>";
    }).join("") : "";
    var mapHTML = "";
    if (sdg === "17") {
      var figNo = (state.photoFigs || 0) + DATA.figures.length + 1;
      mapHTML = '<div class="sdg-map"><div id="sdg-map-svg">' + buildMap() + "</div>" +
        '<div class="caption caption-md"><span class="fig-no">Fig ' + figNo + ".</span>SDG 17 — " +
        DATA.countries.length + "+ countries → Tuzla</div></div>";
    }
    return '<div class="sdg-detail-left">' +
        '<div class="kicker">' + t("sdg.official") + " " + sdg + " — " + L(meta.title) + "</div>" +
        '<div class="goal-title">' + L(meta.title) + "</div>" +
        '<span class="goal-accent"></span>' +
        '<p class="body-md goal-official">' + L(meta.official) + "</p>" +
        (proj ? '<a class="link" href="#gallery" id="sdg-see-gallery">' + t("sdg.detail.link") + "</a>" : "") +
      "</div>" +
      '<div class="sdg-detail-right">' +
        '<div class="kicker">' + t("sdg.targets") + "</div>" +
        '<div class="list-rows">' + targets + "</div>" +
        mapHTML +
      "</div>";
  }

  function renderSDG() {
    var tiles = $("#sdg-tiles");
    tiles.innerHTML = ["5", "13", "17"].map(sdgTileHTML).join("");
    var detail = $("#sdg-detail");
    detail.innerHTML = sdgDetailHTML(state.sdg);
    detail.style.setProperty("--tile-accent", DATA.sdgMeta[state.sdg].color);

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
    if (f === "community") return "[community]";
    var proj = DATA.projects.filter(function (p) { return p.id === f; })[0];
    return "[" + (proj ? proj.code : f) + "]";
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
      return '<figure class="gallery-item" data-gi="' + gi + '">' +
        '<div class="ph">' + play + media + "</div>" +
        "<figcaption>" + L(item.caption) + "</figcaption></figure>";
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
    $("#timeline-list").innerHTML = DATA.timeline.map(function (ev) {
      return '<div class="list-row"><span class="t-date">' + ev.date + "</span>" +
        '<span class="t-body"><span class="t-title">' + L(ev.title) + "</span><br>" + L(ev.desc) + "</span></div>";
    }).join("");
  }

  function renderVoices() {
    $("#voices-list").innerHTML = DATA.voices.map(function (v) {
      return '<div class="testimonial-row">' +
        '<div class="t-name"><span class="t-avatar" aria-hidden="true"></span>' + v.name + " · " + L(v.role) + "</div>" +
        '<div class="t-quote">' + L(v.quote) + "</div></div>";
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

  /* ---------------- init ---------------- */

  function init() {
    applyLang(true);
    bindLang();
    bindTerminalButtons();
    renderTerminal("main", false);
    bindLightbox();
    bindNav();
    $$(".reveal").forEach(function (n) { revealObserver.observe(n); });
  }

  init();
})();
