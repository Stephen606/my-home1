/* =========================================================
   hh & ff · 我们的相册
   数据都集中在下面的 ALBUM 里，以后加照片只改这里。
   ========================================================= */

(function () {
  "use strict";

  /* 在一起的第一天 */
  var START = new Date(2021, 3, 2); // 注意：月份从 0 开始，3 表示 4 月

  /* 每一年一个章节。
     加照片时，把图片放进 assets/，再在对应年份的 photos 里加一条：
       { src: "assets/xxx.jpg", date: "2023.05.20", caption: "第一次一起看海" }
     note 是这个年份想说的一句话，留空就用默认文案。 */
  var ALBUM = [
    { year: 2021, note: "", photos: [] },
    { year: 2022, note: "", photos: [] }, // oyhf.jpg 现在是首屏主视觉，之后也可以加到这里
    { year: 2023, note: "", photos: [] },
    {
      year: 2024, note: "", photos: [
        { src: "assets/2024/img_1162.jpg", date: "2024.01.06" },
        { src: "assets/2024/img_1655.jpg", date: "2024.02.15" },
        { src: "assets/2024/img_4988.jpg", date: "2024.03.09" },
        { src: "assets/2024/img_2656.jpg", date: "2024.04.03" },
        { src: "assets/2024/dsc01041.jpg", date: "2024.04.28" },
        { src: "assets/2024/img_8710.jpg", date: "2024.06.09" },
        { src: "assets/2024/img_4138.jpg", date: "2024.07.19" },
        { src: "assets/2024/img_5447.jpg", date: "2024.10.06" },
        { src: "assets/2024/img_6859.jpg", date: "2024.12.13" }
      ]
    },
    {
      year: 2025, note: "", photos: [
        { src: "assets/2025/img_7481.jpg", date: "2025.01.07" },
        { src: "assets/2025/img_7473.jpg", date: "2025.01.07" },
        { src: "assets/2025/img_1259.jpg", date: "2025.09.19" }
      ]
    },
    {
      year: 2026, note: "", photos: [
        { src: "assets/2026/img_2823.jpg", date: "2026.02.20" },
        { src: "assets/2026/img_2892.jpg", date: "2026.02.22" },
        { src: "assets/2026/img_5832.jpg", date: "2026.04.01" },
        { src: "assets/2026/img_5913.jpg", date: "2026.04.02" },
        { src: "assets/2026/img_6010.jpg", date: "2026.04.03" },
        { src: "assets/2026/img_6599.jpg", date: "2026.04.05" },
        { src: "assets/2026/img_5309.jpg", date: "2026.06.06" },
        { src: "assets/2026/img_0436.jpg", date: "2026.07.05" },
        { src: "assets/2026/img_6861.jpg", date: "2026.07.10" },
        { src: "assets/2026/selfie.jpg", caption: "" }
      ]
    }
  ];

  var EMPTY_HINT = "这一年的照片，等你放进来";

  /* ---------- 在一起多少天 ---------- */

  function daysSince(start) {
    var now = new Date();
    var a = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    var b = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.max(0, Math.round((b - a) / 86400000));
  }

  function renderDays() {
    var el = document.getElementById("days");
    if (!el) return;
    el.textContent = daysSince(START).toLocaleString("zh-CN");
  }

  /* ---------- 渲染相册 ---------- */

  function buildPhoto(p) {
    var fig = document.createElement("figure");
    fig.className = "photo";

    var img = document.createElement("img");
    img.src = p.src;
    img.alt = p.caption || "相册照片";
    img.loading = "lazy";
    img.decoding = "async";
    fig.appendChild(img);

    var cap = document.createElement("figcaption");
    if (p.date) {
      var d = document.createElement("span");
      d.className = "photo__date";
      d.textContent = p.date;
      cap.appendChild(d);
    }
    if (p.caption) {
      var c = document.createElement("span");
      c.className = "photo__cap";
      c.textContent = p.caption;
      cap.appendChild(c);
    }
    if (cap.childNodes.length) fig.appendChild(cap);

    return fig;
  }

  function buildChapter(entry) {
    var section = document.createElement("section");
    section.className = "chapter";
    section.id = "y" + entry.year;
    section.setAttribute("aria-label", entry.year + " 年");

    var year = document.createElement("h2");
    year.className = "chapter__year";
    year.textContent = entry.year;
    section.appendChild(year);

    var body = document.createElement("div");
    body.className = "chapter__body";

    if (entry.note) {
      var note = document.createElement("p");
      note.className = "chapter__note";
      note.textContent = entry.note;
      body.appendChild(note);
    }

    if (entry.photos && entry.photos.length) {
      var grid = document.createElement("div");
      grid.className = "photos";
      entry.photos.forEach(function (p) {
        grid.appendChild(buildPhoto(p));
      });
      body.appendChild(grid);
    } else {
      var slot = document.createElement("div");
      slot.className = "slot";
      var hint = document.createElement("p");
      hint.className = "slot__hint";
      hint.textContent = EMPTY_HINT;
      slot.appendChild(hint);
      body.appendChild(slot);
    }

    section.appendChild(body);
    return section;
  }

  function renderAlbum() {
    var root = document.getElementById("timeline");
    if (!root) return;
    var frag = document.createDocumentFragment();
    ALBUM.forEach(function (entry) {
      frag.appendChild(buildChapter(entry));
    });
    root.appendChild(frag);
  }

  /* ---------- 滚动显隐 ---------- */

  function reveal() {
    var chapters = document.querySelectorAll(".chapter");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(chapters, function (c) {
        c.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    Array.prototype.forEach.call(chapters, function (c) {
      io.observe(c);
    });
  }

  /* ---------- 启动 ---------- */

  renderDays();
  renderAlbum();
  reveal();
})();
