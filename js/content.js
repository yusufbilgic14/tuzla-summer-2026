/* ============================================================
   TUZLA SUMMER 2026 — SINGLE CONTENT FILE
   This is the ONLY file you need to edit to update the site.

   HOW TO EDIT
   1. Text          → every string has { en: "...", tr: "..." }.
   2. Numbers       → replace null with a real number to turn
                      "XX" placeholders into animated counters.
   3. Photos/Videos → drop files into assets/photos/<project>/
                      (or assets/videos/), then either keep the
                      filenames listed below or add entries to
                      DATA.gallery. A missing file automatically
                      shows a clean [ photo pending ] tile.
   4. Countries     → edit DATA.countries (used by the SDG 17 map).
   ============================================================ */

const I18N = {
  en: {
    "meta.title": "Tuzla Summer 2026 — AIESEC in Istanbul Asia × Tuzla Municipality",
    "meta.description": "The field report of AIESEC in Istanbul Asia's 2026 summer volunteer program with Tuzla Municipality: 50+ volunteers from 11+ countries, three projects, three SDGs, one summer.",

    "nav.projects": "Projects",
    "nav.sdg": "SDGs",
    "nav.gallery": "Gallery",
    "nav.timeline": "Timeline",
    "nav.voices": "Voices",
    "nav.cta": "Partner 2027",
    "nav.skip": "Skip to content",
    "nav.menu": "Menu",

    "hero.badge": "AIESEC in Istanbul Asia × Tuzla Municipality",
    "hero.title.a": "50+ volunteers. 11 countries. 3 projects.",
    "hero.title.b": "1 summer.",
    "hero.sub": "The field report of the 2026 summer volunteer program in Tuzla — delivered on the ground by young people, for the community, across gender equality, climate action and global partnership.",
    "hero.cta1": "See the report ↓",
    "hero.marquee": "11+ countries came to Tuzla",
    "hero.photoCap": "The whole crew at Şelale Park — one summer in Tuzla",
    "hero.photoBadge": "50+ volunteers",

    "ov.figures": "By the numbers",
    "ov.story": "About the program",
    "ov.projects": "The projects",
    "ov.sdg": "UN Sustainable Development Goals",
    "ov.gallery": "Field archive",
    "ov.timeline": "The journey",
    "ov.voices": "Testimonials",

    "figures.label": "The summer in numbers",

    "story.label": "What is this?",
    "story.p1": "AIESEC is a global, not-for-profit, youth-run organization present in 100+ countries. Each summer its local chapters host international volunteers for community projects delivered together with local partners.",
    "story.p2": "In the summer of 2026, AIESEC in Istanbul Asia and Tuzla Municipality hosted 50+ volunteers from 11+ countries. For six weeks they lived in Tuzla and ran three projects — in schools, community centers, parks and along the shoreline — each aligned with a UN Sustainable Development Goal.",
    "story.1.t": "Who",
    "story.1.d": "50+ international volunteers, aged 18–30, from 11+ countries — hosted by local AIESEC members.",
    "story.2.t": "Where",
    "story.2.d": "District schools, municipality community centers, public parks and the Tuzla shoreline.",
    "story.3.t": "What",
    "story.3.d": "Workshops, shoreline cleanups, planting days, cultural festivals and leadership circles.",
    "story.4.t": "With whom",
    "story.4.d": "Tuzla Municipality directorates, local schools, neighborhood associations and residents.",

    "projects.label": "The three projects",
    "projects.activities": "What they did",
    "projects.outcomes": "What it changed",
    "projects.figphoto": "from the field",

    "sdg.label": "The goals behind the work",
    "sdg.intro": "Each project maps to one UN Sustainable Development Goal. Select a goal to read its official targets and see the summer through its lens.",
    "sdg.detail.link": "see the photos ↓",
    "sdg.targets": "Official UN targets addressed",
    "sdg.official": "UN goal",

    "gallery.label": "Photos & videos",
    "gallery.intro": "Photos and videos from the six weeks. Filter by project, click any figure to enlarge.",
    "gallery.filter.all": "All",
    "strip.count": "photos & clips — scroll for more",
    "gallery.filter.hint": "showing",
    "gallery.clear": "clear ×",
    "gallery.tag.community": "Community",
    "gallery.pending": "[ photo pending ]",
    "gallery.pendingVideo": "[ video pending ]",
    "gallery.empty": "[ no figures in this set yet ]",

    "timeline.label": "How the summer unfolded",

    "voices.label": "Voices from the summer",

    "partner.badge": "Proposal 2027",
    "partner.title": "Let's run it back in 2027",
    "partner.title.hl": "— bigger.",
    "partner.p1": "Tuzla ran a global program this summer. In six weeks, 50+ volunteers from 11+ countries delivered workshops across the district — on gender equality, on climate, on seeing the world from Tuzla's shore.",
    "partner.p2": "The Municipality brought the venues, the trust and the local knowledge. AIESEC brought the people, the training and the international network. It worked. For summer 2027 we propose the same framework, at twice the scale.",
    "partner.1.t": "More reach",
    "partner.1.d": "More volunteers, more neighborhoods, a longer program window.",
    "partner.2.t": "Local alignment",
    "partner.2.d": "Projects shaped around the municipality's own priorities — women's programs, environment and youth.",
    "partner.3.t": "A full archive",
    "partner.3.d": "Photos, videos and a published impact report the municipality can keep and reuse.",
    "partner.4.t": "Proven delivery",
    "partner.4.d": "Planning, volunteer selection, training and facilitation handled by AIESEC in Istanbul Asia.",
    "partner.cmd": "$ summer2027 --partners=tuzla_belediyesi --scale=2x",
    "partner.cta": "Propose 2027 →",
    "partner.cta2": "Re-see 2026 ↓",

    "footer.tagline": "A field report, not a brochure.",
    "footer.credit": "© 2026 AIESEC in Istanbul Asia × Tuzla Municipality — a not-for-profit community program.",
    "footer.built": "[x] designed, written and shipped as one summer's record",

    "lightbox.counter": "of",
    "lightbox.close": "close",
    "lightbox.prev": "previous figure",
    "lightbox.next": "next figure"
  },

  tr: {
    "meta.title": "Tuzla'da Yaz 2026 — AIESEC in Istanbul Asya × Tuzla Belediyesi",
    "meta.description": "AIESEC in Istanbul Asya'nın Tuzla Belediyesi ile gerçekleştirdiği 2026 yaz gönüllü programının saha raporu: 11+ ülkeden 50+ gönüllü, üç proje, üç AMH, tek bir yaz.",

    "nav.projects": "Projeler",
    "nav.sdg": "AMH'ler",
    "nav.gallery": "Arşiv",
    "nav.timeline": "Takvim",
    "nav.voices": "Sesler",
    "nav.cta": "2027 Ortağı Ol",
    "nav.skip": "İçeriğe geç",
    "nav.menu": "Menü",

    "hero.badge": "AIESEC in Istanbul Asya × Tuzla Belediyesi",
    "hero.title.a": "50+ gönüllü. 11 ülke. 3 proje.",
    "hero.title.b": "1 yaz.",
    "hero.sub": "Tuzla'daki 2026 yaz gönüllü programının saha raporu — toplumsal cinsiyet eşitliği, iklim eylemi ve küresel ortaklık alanlarında, gençler tarafından halk için hayata geçirildi.",
    "hero.cta1": "Raporu gör ↓",
    "hero.marquee": "11+ ülke Tuzla'ya geldi",
    "hero.photoCap": "Şelale Park'ta tüm ekip — Tuzla'da bir yaz",
    "hero.photoBadge": "50+ gönüllü",

    "ov.figures": "Rakamlarla",
    "ov.story": "Program hakkında",
    "ov.projects": "Projeler",
    "ov.sdg": "BM Sürdürülebilir Kalkınma Amaçları",
    "ov.gallery": "Saha arşivi",
    "ov.timeline": "Yolculuk",
    "ov.voices": "Sesler",

    "figures.label": "Rakamlarla yaz",

    "story.label": "Bu nedir?",
    "story.p1": "AIESEC, 100'den fazla ülkede faaliyet gösteren, kâr amacı gütmeyen ve gençler tarafından yürütülen küresel bir kuruluştur. Her yaz yerel birimleri, yerel ortaklarla birlikte topluluk projeleri yürütmek üzere uluslararası gönüllülere ev sahipliği yapar.",
    "story.p2": "2026 yazında AIESEC in Istanbul Asya ve Tuzla Belediyesi, 11+ ülkeden 50+ gönüllüye ev sahipliği yaptı. Altı hafta boyunca Tuzla'da yaşayan gönüllüler; okullarda, toplum merkezlerinde, parklarda ve kıyı boyunca, her biri bir BM Sürdürülebilir Kalkınma Amacı ile hizalanmış üç proje yürüttü.",
    "story.1.t": "Kim",
    "story.1.d": "11+ ülkeden, 18–30 yaş arası 50+ uluslararası gönüllü — yerel AIESEC üyeleri tarafından ağırlandı.",
    "story.2.t": "Nerede",
    "story.2.d": "İlçedeki okullar, belediye toplum merkezleri, kamu parkları ve Tuzla kıyı şeridi.",
    "story.3.t": "Ne",
    "story.3.d": "Atölyeler, kıyı temizlikleri, fidan dikim günleri, kültür şenlikleri ve liderlik çevreleri.",
    "story.4.t": "Kiminle",
    "story.4.d": "Tuzla Belediyesi müdürlükleri, yerel okullar, mahalle dernekleri ve Tuzlalılar.",

    "projects.label": "Üç proje",
    "projects.activities": "Ne yaptılar",
    "projects.outcomes": "Ne değişti",
    "projects.figphoto": "sahadan",

    "sdg.label": "İşin arkasındaki hedefler",
    "sdg.intro": "Her proje bir BM Sürdürülebilir Kalkınma Amacı'na karşılık gelir. Resmî hedef metinlerini okumak ve yazı o amacın penceresinden görmek için bir hedef seçin.",
    "sdg.detail.link": "fotoğrafları gör ↓",
    "sdg.targets": "Ele alınan resmî BM hedefleri",
    "sdg.official": "BM amacı",

    "gallery.label": "Fotoğraflar ve videolar",
    "gallery.intro": "Altı haftadan fotoğraf ve videolar. Projeye göre filtreleyin, büyütmek için herhangi bir kareye tıklayın.",
    "gallery.filter.all": "Tümü",
    "strip.count": "fotoğraf ve klip — kaydırın",
    "gallery.filter.hint": "gösteriliyor",
    "gallery.clear": "temizle ×",
    "gallery.tag.community": "Topluluk",
    "gallery.pending": "[ fotoğraf bekleniyor ]",
    "gallery.pendingVideo": "[ video bekleniyor ]",
    "gallery.empty": "[ bu grupta henüz kare yok ]",

    "timeline.label": "Yaz nasıl geçti",

    "voices.label": "Yazın sesleri",

    "partner.badge": "Öneri 2027",
    "partner.title": "2027'de yeniden",
    "partner.title.hl": "— daha büyüğüne.",
    "partner.p1": "Tuzla bu yaz küresel bir program ağırladı. Altı haftada, 11+ ülkeden 50+ gönüllü ilçe genelinde atölyeler yürüttü — toplumsal cinsiyet eşitliği, iklim ve dünyayı Tuzla kıyısından görmenin üzerine.",
    "partner.p2": "Belediye mekânları, güveni ve yerel bilgiyi getirdi. AIESEC insanları, eğitimi ve uluslararası ağı getirdi. İşe yaradı. 2027 yazı için önerimiz aynı çerçeve, iki kat ölçek.",
    "partner.1.t": "Daha geniş erişim",
    "partner.1.d": "Daha fazla gönüllü, daha fazla mahalle, daha uzun program takvimi.",
    "partner.2.t": "Yerel uyum",
    "partner.2.d": "Projeler belediyenin kendi öncelikleriyle şekillenir — kadın programları, çevre ve gençlik.",
    "partner.3.t": "Eksiksiz arşiv",
    "partner.3.d": "Belediyenin saklayıp yeniden kullanabileceği fotoğraf, video ve yayımlanmış etki raporu.",
    "partner.4.t": "Kanıtlanmış yürütme",
    "partner.4.d": "Planlama, gönüllü seçimi, eğitim ve fasilitasyon AIESEC in Istanbul Asya tarafından yürütülür.",
    "partner.cmd": "$ summer2027 --partners=tuzla_belediyesi --scale=2x",
    "partner.cta": "2027'yi Öner →",
    "partner.cta2": "2026'ya geri bak ↓",

    "footer.tagline": "Broşür değil, saha raporu.",
    "footer.credit": "© 2026 AIESEC in Istanbul Asya × Tuzla Belediyesi — kâr amacı gütmeyen bir topluluk programı.",
    "footer.built": "[x] tasarlandı, yazıldı ve bir yazın kaydı olarak yayına girdi",

    "lightbox.counter": "/",
    "lightbox.close": "kapat",
    "lightbox.prev": "önceki kare",
    "lightbox.next": "sonraki kare"
  }
};

const DATA = {
  figures: [
    { id: "volunteers", value: 50, suffix: "+", caption: { en: "Volunteers hosted in Tuzla", tr: "Tuzla'da ağırlanan gönüllü" }, points: [4, 6, 5, 8, 9, 11, 12, 14, 15, 16] },
    { id: "countries", value: 11, suffix: "+", caption: { en: "Countries represented", tr: "Temsil edilen ülke" }, points: [10, 7, 9, 5, 8, 6, 9, 7, 10, 12] },
    { id: "projects", value: 3, suffix: "", caption: { en: "Projects delivered", tr: "Gerçekleştirilen proje" }, points: [2, 3, 3, 4, 5, 6, 7, 8, 9, 10] },
    { id: "reached", value: null, suffix: "", caption: { en: "Residents reached — add real number", tr: "Ulaşılan kişi — gerçek sayıyı ekleyin" }, points: [3, 4, 6, 5, 8, 9, 11, 10, 13, 15] }
  ],

  countries: [
    "Tunisia", "Morocco", "Ukraine", "Algeria", "Azerbaijan", "China",
    "Kazakhstan", "Jordan", "Turkey"
  ],

  projects: [
    {
      id: "ryv",
      code: "raise_your_voice",
      sdg: "5",
      name: { en: "Raise Your Voice", tr: "Raise Your Voice" },
      tagline: {
        en: "Gender equality, spoken out loud in the schools and squares of Tuzla.",
        tr: "Toplumsal cinsiyet eşitliği, Tuzla'nın okullarında ve meydanlarında yüksek sesle söylendi."
      },
      mission: {
        en: "A gender equality program built with — not just for — the women and girls of Tuzla. Volunteers ran workshops in schools and community centers, opened spaces for women's leadership, and turned personal stories into public voice.",
        tr: "Tuzla'nın kadınları ve kız çocukları için değil, onlarla birlikte kurgulanan bir toplumsal cinsiyet eşitliği programı. Gönüllüler okullarda ve toplum merkezlerinde atölyeler yürüttü, kadın liderliğine alan açtı ve kişisel hikâyeleri kamusal sese dönüştürdü."
      },
      activities: [
        { en: "Equality workshops in middle and high schools", tr: "Orta ve lise okullarında eşitlik atölyeleri" },
        { en: "Storytelling and public-speaking labs for young women", tr: "Genç kadınlar için hikâye anlatımı ve hitabet laboratuvarları" },
        { en: "Joint sessions with the municipality's women's programs", tr: "Belediyenin kadın programlarıyla ortak seanslar" },
        { en: "A closing exhibition of participant stories, open to all residents", tr: "Katılımcı hikâyelerinden, tüm Tuzlalıların katılımına açık kapanış sergisi" }
      ],
      outcomes: [
        { en: null, tr: null, v: "XX", post: { en: " workshops delivered across district venues", tr: " atölye, ilçedeki mekânlarda gerçekleşti" } },
        { en: null, tr: null, v: "XXX", post: { en: " students and residents engaged", tr: " öğrenci ve Tuzlalı katıldı" } },
        { en: null, tr: null, v: "XX", post: { en: " participant stories published in the closing exhibition", tr: " katılımcı hikâyesi kapanış sergisinde yayımlandı" } }
      ],
      targets: [
        { ref: "5.1", text: { en: "End all forms of discrimination against all women and girls everywhere.", tr: "Kadınlar ve kız çocuklarına yönelik her türlü ayrımcılığa her yerde son vermek." } },
        { ref: "5.5", text: { en: "Ensure women's full and effective participation and equal opportunities for leadership.", tr: "Kadınların tam ve etkin katılımını ve eşit liderlik fırsatlarını güvence altına almak." } }
      ],
      quote: {
        text: {
          en: "The girls did not want the session to end. They kept asking: when are they coming back?",
          tr: "Kızlar seansın bitmesini istemedi. Sürekli şunu sordular: onlar ne zaman geri geliyor?"
        },
        name: "[ Teacher — Tuzla middle school ]",
        role: { en: "Host venue", tr: "Ev sahibi mekân" }
      }
    },
    {
      id: "gl",
      code: "green_leaders",
      sdg: "13",
      name: { en: "Green Leaders", tr: "Green Leaders" },
      tagline: {
        en: "Climate education that starts on Tuzla's own shoreline.",
        tr: "Tuzla'nın kendi kıyısında başlayan iklim eğitimi."
      },
      mission: {
        en: "Climate education paired with hands-on action — classroom sessions on climate science in the same week as shoreline cleanups, planting days and zero-waste ateliers — so that learning and doing never drift apart.",
        tr: "El işi eylemle eşleştirilmiş iklim eğitimi — kıyı temizlikleri, dikim günleri ve sıfır atık atölyeleriyle aynı hafta gerçekleşen iklim bilimi dersleri — böylece öğrenmek ve yapmak hiç ayrışmadı."
      },
      activities: [
        { en: "Climate literacy workshops in district schools", tr: "İlçedeki okullarda iklim okuryazarlığı atölyeleri" },
        { en: "Weekly shoreline and park cleanup crews along the Tuzla coast", tr: "Tuzla kıyısı boyunca haftalık kıyı ve park temizlik ekipleri" },
        { en: "Tree planting days with municipal park teams", tr: "Belediye park ekipleriyle fidan dikim günleri" },
        { en: "Zero-waste and upcycling ateliers for families", tr: "Aileler için sıfır atık ve geri dönüşüm atölyeleri" }
      ],
      outcomes: [
        { en: null, tr: null, v: "XX kg", post: { en: " of waste removed from the Tuzla shoreline", tr: " atık, Tuzla kıyı şeridinden toplandı" } },
        { en: null, tr: null, v: "XX", post: { en: " saplings planted across the district", tr: " fidan, ilçe genelinde toprakla buluştu" } },
        { en: null, tr: null, v: "XXX", post: { en: " residents reached through ateliers and cleanups", tr: " Tuzlalı, atölyeler ve temizliklerle buluştu" } }
      ],
      targets: [
        { ref: "13.3", text: { en: "Improve education, awareness-raising and human capacity on climate change mitigation and adaptation.", tr: "İklim değişikliğiyle mücadele ve uyum konusunda eğitimi, farkındalığı ve insan kapasitesini artırmak." } },
        { ref: "13.b", text: { en: "Promote mechanisms to raise capacity for effective climate change-related planning in communities.", tr: "Topluluklarda etkin iklim planlaması kapasitesini yükseltmeye yönelik mekanizmaları desteklemek." } }
      ],
      quote: {
        text: {
          en: "The kids who cleaned the shore on Saturday were the same kids explaining plastic cycles to their parents on Sunday.",
          tr: "Cumartesi kıyı temizleyen çocuklar, pazar günü ebeveynlerine plastik döngüsünü anlatan aynı çocuklardı."
        },
        name: "[ Green Leaders volunteer ]",
        role: { en: "Project facilitator", tr: "Proje fasilitatörü" }
      }
    },
    {
      id: "mmw",
      code: "myself_my_world",
      sdg: "17",
      name: { en: "Myself My World", tr: "Myself My World" },
      tagline: {
        en: "The project that made 11+ countries neighbors.",
        tr: "11+ ülkeyi komşu yapan proje."
      },
      mission: {
        en: "Through intercultural sessions in schools and open-air Global Village festivals, volunteers brought the world to Tuzla — and Tuzla hosted the world. A live demonstration that partnership is not a document; it is people meeting people.",
        tr: "Okullardaki kültürlerarası seanslar ve açık havada düzenlenen Global Village şenlikleriyle gönüllüler dünyayı Tuzla'ya getirdi — Tuzla da dünyaya ev sahipliği yaptı. Ortaklığın bir belge değil, insanın insanla buluşması olduğunu gösteren canlı bir kanıt."
      },
      activities: [
        { en: "Intercultural sessions in schools — language, food, music, daily life", tr: "Okullarda kültürlerarası seanslar — dil, yemek, müzik, günlük yaşam" },
        { en: "Global Village festivals in public squares of Tuzla", tr: "Tuzla'nın kamu meydanlarında Global Village şenlikleri" },
        { en: "Country corner evenings hosted with local families", tr: "Yerel ailelerle birlikte düzenlenen ülke köşesi akşamları" },
        { en: "Partnership sessions with municipal youth and culture programs", tr: "Belediyenin gençlik ve kültür programlarıyla ortaklık seansları" }
      ],
      outcomes: [
        { en: null, tr: null, v: "X", post: { en: " Global Village festivals held in Tuzla", tr: " Global Village şenliği Tuzla'da yapıldı" } },
        { en: null, tr: null, v: "XX", post: { en: " intercultural sessions delivered in schools", tr: " kültürlerarası seans okullarda gerçekleşti" } },
        { en: null, tr: null, v: "11+", post: { en: " countries now personally connected to Tuzla", tr: " ülke artık Tuzla ile kişisel olarak bağlı" } }
      ],
      targets: [
        { ref: "17.16", text: { en: "Enhance the Global Partnership for Sustainable Development, complemented by multi-stakeholder partnerships.", tr: "Küresel Sürdürülebilir Kalkınma Ortaklığını, çok paydaşlı ortaklıklarla güçlendirmek." } },
        { ref: "17.17", text: { en: "Encourage and promote effective public, public-private and civil society partnerships.", tr: "Etkin kamu, özel sektör ve sivil toplum ortaklıklarını teşvik etmek ve yaygınlaştırmak." } }
      ],
      quote: {
        text: {
          en: "A child asked which country the tall volunteer was from. Eleven answers later, the whole class had a world map drawn on the board.",
          tr: "Bir çocuk, uzun boylu gönüllünün hangi ülkeden olduğunu sordu. On bir cevadan sonra tüm sınıfın tahtaya çizilmiş bir dünya haritası vardı."
        },
        name: "[ Myself My World volunteer ]",
        role: { en: "Project facilitator", tr: "Proje fasilitatörü" }
      }
    }
  ],

  sdgMeta: {
    "5": {
      color: "#FF3A21",
      title: { en: "Gender Equality", tr: "Toplumsal Cinsiyet Eşitliği" },
      official: { en: "Achieve gender equality and empower all women and girls.", tr: "Toplumsal cinsiyet eşitliğini sağlamak ve tüm kadın ve kız çocuklarını güçlendirmek." }
    },
    "13": {
      color: "#3F7E44",
      title: { en: "Climate Action", tr: "İklim Eylemi" },
      official: { en: "Take urgent action to combat climate change and its impacts.", tr: "İklim değişikliği ve etkileriyle mücadeleye acilen harekete geçmek." }
    },
    "17": {
      color: "#19486A",
      title: { en: "Partnership for the Goals", tr: "Amaçlar İçin Ortaklıklar" },
      official: { en: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.", tr: "Uygulama araçlarını güçlendirmek ve Küresel Sürdürülebilir Kalkınma Ortaklığını canlandırmak." }
    }
  },

  gallery: [
    { src: "assets/photos/community/mainprojectphoto.jpeg", project: "community", caption: { en: "The whole crew at Şelale Park", tr: "Şelale Park’ta tüm ekip" } },
    { src: "assets/photos/community/groupphoto-web.jpg", project: "community", caption: { en: "The crew on a museum day", tr: "Müze gününde ekip" } },
    { src: "assets/photos/community/littlegroupphoto.jpeg", project: "community", caption: { en: "Selfie o’clock — between sessions", tr: "Seans arası selfie molası" } },
    { src: "assets/photos/community/IMG-20260708-WA0040-web.jpg", project: "community", caption: { en: "Dinner with the whole family", tr: "Koca bir aile ile akşam yemeği" } },
    { src: "assets/photos/community/IMG-20260708-WA0064.jpg", project: "community", caption: { en: "The long table — dinner all together", tr: "Uzun masa — hep birlikte akşam yemeği" } },
    { src: "assets/photos/community/IMG-20260708-WA0063.jpg", project: "community", caption: { en: "Cultural night — the stage is set", tr: "Kültür gecesi — sahne hazır" } },
    { src: "assets/photos/community/IMG-20260710-WA0015.jpg", project: "community", caption: { en: "One last dinner, all together", tr: "Veda yemeği, hep birlikte" } },
    { src: "assets/photos/raise-your-voice/IMG-20260723-WA0225.jpg", project: "ryv", caption: { en: "Community walk — raising our voices together", tr: "Topluluk yürüyüşü — sesimizi birlikte yükselttik" } },
    { src: "assets/photos/raise-your-voice/IMG-20260723-WA0260.jpg", project: "ryv", caption: { en: "Proud and loud with the flag", tr: "Bayrakla gururla, yüksek sesle" } },
    { src: "assets/photos/raise-your-voice/VID-20260723-WA0137-web.mp4", poster: "assets/photos/raise-your-voice/VID-20260723-WA0137-poster.jpg", type: "video", project: "ryv", caption: { en: "Raising voices — the walk in motion", tr: "Sesimizi yükseltiyoruz — yürüyüşten" } },
    { src: "assets/photos/raise-your-voice/WA-20260903-042304-1.jpg", project: "ryv", caption: { en: "Kadın Girişim workshop — full room", tr: "Kadın Girişim atölyesi — dolu salon" } },
    { src: "assets/photos/raise-your-voice/WA-20260903-042304-2.jpg", project: "ryv", caption: { en: "Ideas on the table — women’s workshop", tr: "Masadaki fikirler — kadın atölyesi" } },
    { src: "assets/photos/raise-your-voice/WA-20260903-042307-1-web.mp4", poster: "assets/photos/raise-your-voice/WA-20260903-042304-2.jpg", type: "video", project: "ryv", caption: { en: "Workshop in motion — women leading", tr: "Atölye harekette — kadınlar önde" } },
    { src: "assets/photos/raise-your-voice/WA-20260903-042307-2-web.mp4", poster: "assets/photos/raise-your-voice/WA-20260903-042304-1.jpg", type: "video", project: "ryv", caption: { en: "From the session — side by side", tr: "Seansdan — yan yana" } },
    { src: "assets/photos/raise-your-voice/WA-20260903-042322-1-web.mp4", poster: "assets/photos/raise-your-voice/WA-20260903-042304-2.jpg", type: "video", project: "ryv", caption: { en: "Group work — loud and clear", tr: "Grup çalışması — net ve yüksek" } },
    { src: "assets/photos/raise-your-voice/WA-20260903-042329-web.mp4", poster: "assets/photos/raise-your-voice/WA-20260903-042304-1.jpg", type: "video", project: "ryv", caption: { en: "Closing the session", tr: "Seansın kapanışı" } },
    { src: "assets/photos/green-leaders/20260713_112031.jpg", project: "gl", caption: { en: "Upcycling atelier — bottles get a second life", tr: "Geri dönüşüm atölyesi — şişelere ikinci hayat" } },
    { src: "assets/photos/green-leaders/20260728_151836.jpg", project: "gl", caption: { en: "Planting day — the team in the field", tr: "Dikim günü — ekip sahada" } },
    { src: "assets/photos/green-leaders/IMG-20260720-WA0109-web.jpg", project: "gl", caption: { en: "Cleanup crew — bags full by the trees", tr: "Temizlik ekibi — ağaçlar yanında dolu torbalar" } },
    { src: "assets/photos/green-leaders/20260727_143319.jpg", project: "gl", caption: { en: "Digging in — sapling by sapling", tr: "Toprağa dokunmak — fidan fidan" } },
    { src: "assets/photos/green-leaders/20260727_144743.jpg", project: "gl", caption: { en: "Planting the future", tr: "Geleceği dikiyoruz" } },
    { src: "assets/photos/green-leaders/20260727_143846.jpg", project: "gl", caption: { en: "Selfie with the sapling", tr: "Fidanla selfie" } },
    { src: "assets/photos/green-leaders/20260713_161355.jpg", project: "gl", caption: { en: "Poster-making for the campaign", tr: "Kampanya için afiş çalışması" } },
    { src: "assets/photos/green-leaders/20260713_113000.jpg", project: "gl", caption: { en: "Climate literacy — classroom session", tr: "İklim okuryazarlığı — sınıf seansı" } },
    { src: "assets/photos/green-leaders/20260729_133109.jpg", project: "gl", caption: { en: "Zero-waste atelier — paint and brushes", tr: "Sıfır atık atölyesi — boya ve fırça" } },
    { src: "assets/photos/green-leaders/IMG-20260720-WA0103-web.jpg", project: "gl", caption: { en: "Plogging along the park", tr: "Park boyunca çöp toplama" } },
    { src: "assets/photos/green-leaders/20260706_113845.jpg", project: "gl", caption: { en: "Planning session — the climate team", tr: "Planlama seansı — iklim ekibi" } },
    { src: "assets/photos/green-leaders/IMG-20260727-WA0112.jpg", project: "gl", caption: { en: "Sapling squad — gloves on", tr: "Fidan ekibi — eldivenler takılı" } },
    { src: "assets/photos/green-leaders/IMG-20260728-WA0000-web.jpg", project: "gl", caption: { en: "Hands in the soil", tr: "Eller toprakta" } },
    { src: "assets/photos/green-leaders/IMG-20260728-WA0007-web.jpg", project: "gl", caption: { en: "The planting crew, row by row", tr: "Dikim ekibi, sıra sıra" } },
    { src: "assets/photos/green-leaders/IMG-20260728-WA0009-web.jpg", project: "gl", caption: { en: "Green Leaders on planting duty", tr: "Green Leaders dikim görevinde" } },
    { src: "assets/photos/green-leaders/IMG-20260728-WA0014-web.jpg", project: "gl", caption: { en: "Team Green Leaders in the field", tr: "Green Leaders ekibi sahada" } },
    { src: "assets/photos/green-leaders/IMG-20260728-WA0020.jpg", project: "gl", caption: { en: "One volunteer, one sapling", tr: "Bir gönüllü, bir fidan" } },
    { src: "assets/photos/green-leaders/IMG-20260728-WA0028-web.jpg", project: "gl", caption: { en: "New forests start small", tr: "Yeni ormanlar küçük başlar" } },
    { src: "assets/photos/green-leaders/IMG-20260728-WA0046-web.jpg", project: "gl", caption: { en: "All smiles, all saplings", tr: "Hep gülümseme, hep fidan" } },
    { src: "assets/photos/green-leaders/20260713_112126-web.mp4", poster: "assets/photos/green-leaders/20260713_112126-web-poster.jpg", type: "video", project: "gl", caption: { en: "Upcycling atelier in motion", tr: "Geri dönüşüm atölyesinden" } },
    { src: "assets/photos/green-leaders/20260727_142638-web.mp4", poster: "assets/photos/green-leaders/20260727_142638-web-poster.jpg", type: "video", project: "gl", caption: { en: "Planting day — first shovel", tr: "Dikim günü — ilk kürek" } },
    { src: "assets/photos/green-leaders/20260727_143734-web.mp4", poster: "assets/photos/green-leaders/20260727_143734-web-poster.jpg", type: "video", project: "gl", caption: { en: "Planting day — out in the field", tr: "Dikim günü — sahada" } },
    { src: "assets/photos/myself-my-world/IMG-20260720-WA0130.jpg", project: "mmw", caption: { en: "Country corner — hoş geldin!", tr: "Ülke köşesi — hoş geldin!" } },
    { src: "assets/photos/myself-my-world/IMG-20260718-WA0091.jpg", project: "mmw", caption: { en: "Cooking session — sharing our tables", tr: "Yemek seansı — sofralarımızı paylaşıyoruz" } },
    { src: "assets/photos/myself-my-world/WhatsApp Image 2026-07-16 at 16.26.00.jpeg", project: "mmw", caption: { en: "Picnic with new friends", tr: "Yeni arkadaşlarla piknik" } },
    { src: "assets/photos/myself-my-world/IMG-20260720-WA0147.jpg", project: "mmw", caption: { en: "Intercultural session — the country boards", tr: "Kültürlerarası seans — ülke panoları" } },
    { src: "assets/photos/myself-my-world/IMG-20260720-WA0170.jpg", project: "mmw", caption: { en: "Sessions in full swing", tr: "Seanslar tam gaz" } },
    { src: "assets/photos/myself-my-world/IMG-20260720-WA0176.jpg", project: "mmw", caption: { en: "Country corners — questions flying", tr: "Ülke köşeleri — sorular havada" } },
    { src: "assets/photos/myself-my-world/IMG-20260720-WA0185.jpg", project: "mmw", caption: { en: "Crafting the country boards", tr: "Ülke panoları hazırlanıyor" } },
    { src: "assets/photos/myself-my-world/WhatsApp Image 2026-07-13 at 22.23.43.jpeg", project: "mmw", caption: { en: "Park day with the whole crew", tr: "Tüm ekiple park günü" } },
    { src: "assets/photos/myself-my-world/IMG-20260727-WA0068.jpg", project: "mmw", caption: { en: "Kitchen prep — a taste of home", tr: "Mutfak hazırlığı — memleket tadı" } },
    { src: "assets/photos/myself-my-world/IMG-20260729-WA0030-web.jpg", project: "mmw", caption: { en: "Global Village — the full crew at the gates", tr: "Global Village — kapıda tüm ekip" } },
    { src: "assets/photos/myself-my-world/IMG-20260729-WA0034-web.jpg", project: "mmw", caption: { en: "Flags up — the festival begins", tr: "Bayraklar havada — şenlik başlıyor" } },
    { src: "assets/photos/myself-my-world/IMG-20260730-WA0139-web.jpg", project: "mmw", caption: { en: "Country stand — serving traditions", tr: "Ülke standı — gelenekler ikram ediliyor" } },
    { src: "assets/photos/myself-my-world/IMG-20260730-WA0140-web.jpg", project: "mmw", caption: { en: "Azerbaijan table — flavors and stories", tr: "Azerbaycan masası — lezzetler ve hikâyeler" } },
    { src: "assets/photos/myself-my-world/IMG-20260730-WA0146-web.jpg", project: "mmw", caption: { en: "The long festival table", tr: "Uzun şenlik masası" } },
    { src: "assets/photos/myself-my-world/IMG-20260730-WA0149-web.jpg", project: "mmw", caption: { en: "Foods of the world, one table", tr: "Dünyanın lezzetleri, tek sofra" } },
    { src: "assets/photos/myself-my-world/VID-20260717-WA0017-web.mp4", poster: "assets/photos/myself-my-world/VID-20260717-WA0017-poster.jpg", type: "video", project: "mmw", caption: { en: "Cooking together — a taste of home", tr: "Birlikte yemek — memleket tadında" } },
    { src: "assets/photos/myself-my-world/VID-20260729-WA0061-web.mp4", poster: "assets/photos/myself-my-world/VID-20260729-WA0061-poster.jpg", type: "video", project: "mmw", caption: { en: "Serving the festival table", tr: "Şenlik masası ikramda" } },
    { src: "assets/photos/myself-my-world/VID-20260729-WA0063-web.mp4", poster: "assets/photos/myself-my-world/VID-20260729-WA0063-poster.jpg", type: "video", project: "mmw", caption: { en: "Food stand stories", tr: "Yemek standı hikâyeleri" } },
    { src: "assets/photos/myself-my-world/VID-20260730-WA0103-web.mp4", poster: "assets/photos/myself-my-world/VID-20260730-WA0103-poster.jpg", type: "video", project: "mmw", caption: { en: "Festival food — first taste", tr: "Şenlik yemeği — ilk tadım" } },
    { src: "assets/photos/myself-my-world/VID-20260731-WA0008-web.mp4", poster: "assets/photos/myself-my-world/VID-20260731-WA0008-poster.jpg", type: "video", project: "mmw", caption: { en: "Dancing at the Global Village", tr: "Global Village’da dans" } },
    { src: "assets/photos/myself-my-world/VID-20260731-WA0009-web.mp4", poster: "assets/photos/myself-my-world/VID-20260731-WA0009-poster.jpg", type: "video", project: "mmw", caption: { en: "Traditional dance, live", tr: "Halk dansı, canlı" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0021-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0021-poster.jpg", type: "video", project: "mmw", caption: { en: "On stage — Global Village night", tr: "Sahneye çıkıyoruz — Global Village gecesi" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0024-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0024-poster.jpg", type: "video", project: "mmw", caption: { en: "Presenting to the crowd", tr: "Kalabalığa sunum" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0026-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0026-poster.jpg", type: "video", project: "mmw", caption: { en: "Backstage laughs", tr: "Sahne arkası kahkahaları" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0028-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0028-poster.jpg", type: "video", project: "mmw", caption: { en: "Cheers at the festival", tr: "Şenlikte bir selam" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0030-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0030-poster.jpg", type: "video", project: "mmw", caption: { en: "Festival host — mic check", tr: "Şenlik sunucusu — mikrofon testi" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0036-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0036-poster.jpg", type: "video", project: "mmw", caption: { en: "Sing it out loud", tr: "Yüksek sesle söyle" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0037-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0037-poster.jpg", type: "video", project: "mmw", caption: { en: "The crew on stage", tr: "Sahnede ekip" } },
    { src: "assets/photos/myself-my-world/VID-20260801-WA0039-web.mp4", poster: "assets/photos/myself-my-world/VID-20260801-WA0039-poster.jpg", type: "video", project: "mmw", caption: { en: "Smiles of the Global Village", tr: "Global Village’in gülümsemeleri" } },
  ],

  timeline: [
    { date: "[30 June]", title: { en: "Arrival & onboarding", tr: "Varış ve oryantasyon" }, desc: { en: "50+ volunteers land in Istanbul for Global Volunteer training week.", tr: "50+ gönüllü, Global Volunteer eğitim haftası için İstanbul'a indi." } },
    { date: "[1 July]", title: { en: "Kickoff with Tuzla Municipality", tr: "Tuzla Belediyesi ile başlangıç" }, desc: { en: "Venues, teams and schedules set together with municipal directorates.", tr: "Mekânlar, ekipler ve takvimler belediye müdürlükleriyle birlikte belirlendi." } },
        { date: "[18 July]", title: { en: "Gender Equality Congress", tr: "Cinsiyet Eşitliği Kongresi" }, desc: { en: "Congress with the municipality's women's programs.", tr: "Belediyenin kadın programlarıyla eşitlik kongresi." } },

    { date: "[22 Jul]", title: { en: "First shoreline cleanup", tr: "İlk kıyı temizliği" }, desc: { en: "Green Leaders crews start the weekly cleanup rotation on the Tuzla coast.", tr: "Green Leaders ekipleri Tuzla kıyısında haftalık temizlik dönüşüne başladı." } },
    { date: "[27 Jul]", title: { en: "Planting day", tr: "Dikim günü" }, desc: { en: "Saplings in the ground with municipal park teams and local kids.", tr: "Belediye park ekipleri ve yerel çocuklarla fidanlar toprakla buluştu." } },
        { date: "[29 Jul]", title: { en: "Global Village", tr: "Global Village" }, desc: { en: "11 countries set up their corners in a Tuzla public square.", tr: "11 ülke, Tuzla'nın bir kamu meydanında köşelerini kurdu." } },

    { date: "[12 Aug]", title: { en: "Departure", tr: "Veda" }, desc: { en: "The volunteers leave; the report you are reading begins.", tr: "Gönüllüler ayrıldı; okuduğunuz rapor başladı." } }
  ],

  voices: [
    {
      quote: {
        en: " This was the best volunteering experience of my life. I got to learn so much about myself, the world, and the people of the world.",
        tr: "Bu, hayatımın en iyi gönüllülük deneyimiydi. Kendim, dünya ve dünya insanları hakkında çok şey öğrendim."
      },
      name: "Bozhena Kushkevych",
      role: { en: "Ukraine-Lyviv", tr: "Ukraine-Lyviv" }
    },
    {
      quote: {
        en: "This was the first time i went abroad.I have not seen many projects with so many opportunities. Thanks to this project, I had the opportunity to improve both myself and others.",
        tr: "Bu, yurtdışına ilk çıkışım. Bu kadar çok fırsat sunan birçok proje görmedim. Bu proje sayesinde hem kendimi hem de başkalarını geliştirme fırsatı buldum."
      },
      name: "Rafifah Dien Triana",
      role: { en: "Indonesia-Jakarta", tr: "Endonezya-Jakarta" }
    },
    {
      quote: {
        en: "AIESEC and Tuzla Municipality was a great experience for us. Thanks to this project, we had the opportunity to improve both ourselves and others.",
        tr: "AIESEC ve Tuzla belediye ile calismak bizim icin cok guzel bir deneyimdi. Bu proje sayesinde hem kendimizi hem de başkalarını geliştirme fırsatı bulduk."
      },
      name: "Samar Tlili",
      role: { en: "Tunisia", tr: "Tunus" }
    },
    {
      quote: {
        en: "Bir ise yaradigimi hissettim.",
        tr: "I felt that I was useful for a job."
      },
      name: "Ferid Imanov",
      role: { en: "Azerbaijan-Baku", tr: "Azerbaycan-Baki" }
    }
  ],

  contact: {
    email: "ADD-REAL-EMAIL@example.org",
    instagram: "ADD-REAL-INSTAGRAM-HANDLE"
  }
};
