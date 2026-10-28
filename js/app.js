(function () {
  "use strict";
  var P = window.PROJECTS || [], S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  var tabs = ["home", "projects"], cur = "Усе", modal = $("modal"), toastTimer;

  // категорії беруться з даних, у порядку першої появи
  var cats = ["Усе"];
  P.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });

  function byId(id) { return P.filter(function (p) { return p.id === id; })[0]; }
  function toast(m) { var t = $("toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("on"); }, 2200); }

  function thumb(p) {
    var c = p.colors || [];
    var inner = p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : "<i></i>";
    return '<div class="thumb ' + esc(p.shape || "s1") + '" style="--a:' + esc(c[0] || "#ddd") + ";--b:" + esc(c[1] || "#111") + '">' + inner + "</div>";
  }

  function renderFilters() {
    $("filters").innerHTML = cats.map(function (c) { return '<button aria-pressed="' + (c === cur) + '" data-c="' + esc(c) + '">' + esc(c) + "</button>"; }).join("");
    Array.prototype.forEach.call(document.querySelectorAll("#filters button"), function (b) { b.onclick = function () { cur = b.dataset.c; renderFilters(); renderGrid(); }; });
  }
  function renderGrid() {
    $("grid").innerHTML = P.filter(function (p) { return cur === "Усе" || p.category === cur; }).map(function (p) {
      return '<a class="card" href="#projects/' + esc(p.id) + '">' + thumb(p) + '<div class="t"><h3>' + esc(p.name) + "</h3><p>" + esc(p.category) + ", " + esc(p.year) + "</p></div></a>";
    }).join("");
  }

  function actions(p) {
    var links = (p.links && p.links.length) ? p.links : (S.defaultButtons && S.defaultButtons[p.category] || S.fallbackButtons || []).map(function (l) { return { label: l, url: "" }; });
    var html = links.map(function (l, k) {
      var cls = "btn" + (k ? "" : " dl");
      return l.url ? '<a class="' + cls + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">⬇ ' + esc(l.label) + "</a>"
                   : '<button class="' + cls + ' act">⬇ ' + esc(l.label) + "</button>";
    }).join("");
    html += p.caseStudy ? '<a class="btn alt" href="' + esc(p.caseStudy) + '" target="_blank" rel="noopener">' + esc(S.caseStudyLabel || "Кейс") + "</a>"
                        : '<button class="btn alt act">' + esc(S.caseStudyLabel || "Кейс") + "</button>";
    return '<div class="actions">' + html + "</div>";
  }

  function openP(id) {
    var p = byId(id); if (!p) { location.hash = "projects"; return; }
    var facts = [["Платформа", p.platform], ["Версія", p.version], ["Розмір", p.size], ["Оцінка", p.rating], ["Рік", p.year]].filter(function (x) { return x[1] && x[1] !== "—"; });
    var same = P.filter(function (q) { return q.id !== p.id && q.category === p.category; });
    var rel = same.concat(P.filter(function (q) { return q.id !== p.id && q.category !== p.category; })).slice(0, 3);
    $("sheet").innerHTML =
      '<div class="bar"><span class="tag">' + esc(p.category) + '</span><button class="x" id="close">Закрити ✕</button></div>' + thumb(p) +
      "<h3>" + esc(p.name) + "</h3><p>" + esc(p.description) + "</p>" + actions(p) +
      '<div class="facts">' + facts.map(function (x) { return "<div><small>" + x[0] + "</small><b>" + esc(x[1]) + "</b></div>"; }).join("") + "</div>" +
      ((p.features || []).length ? "<h4>Що вміє</h4><ul>" + p.features.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
      (p.result ? '<div class="res">' + esc(p.result) + "</div>" : "") +
      ((p.tech || []).length ? '<h4>Технології</h4><div class="chips">' + p.tech.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + "</div>" : "") +
      '<h4>Дивіться також</h4><div class="more">' + rel.map(function (q) { return '<a href="#projects/' + esc(q.id) + '">' + esc(q.name) + "</a>"; }).join("") + "</div>";
    modal.classList.add("on"); $("sheet").scrollTop = 0; $("close").focus();
    $("close").onclick = closeP;
    Array.prototype.forEach.call(document.querySelectorAll(".act"), function (b) { b.onclick = function () { toast(S.emptyLinkMessage || "Скоро"); }; });
    document.title = p.name + " — NOVARA STUDIO™";
  }
  function closeP() { if (location.hash.indexOf("/") > -1) location.hash = "projects"; else modal.classList.remove("on"); }

  // маршрутизація: #home, #projects, #projects/<id>
  function route() {
    var h = location.hash.slice(1).split("/"), t = tabs.indexOf(h[0]) < 0 ? "home" : h[0];
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (e) { e.classList.toggle("on", e.id === t); });
    Array.prototype.forEach.call(document.querySelectorAll("nav button"), function (b) { b.setAttribute("aria-selected", b.dataset.t === t); });
    if (t === "projects" && h[1]) openP(h[1]);
    else { modal.classList.remove("on"); document.title = "NOVARA STUDIO™ — виробляємо все"; }
  }
  Array.prototype.forEach.call(document.querySelectorAll("nav button"), function (b) { b.onclick = function () { location.hash = b.dataset.t; window.scrollTo(0, 0); }; });
  Array.prototype.forEach.call(document.querySelectorAll("[data-go]"), function (a) { a.onclick = function (e) { e.preventDefault(); location.hash = a.dataset.go; window.scrollTo(0, 0); }; });
  window.addEventListener("hashchange", route);
  modal.onclick = function (e) { if (e.target === modal) closeP(); };
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeP(); });

  // слоган
  var words = S.words || [], wi = 0;
  if (words.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () { wi = (wi + 1) % words.length; $("word").textContent = words[wi]; }, 1600);
  }

  renderFilters(); renderGrid(); route();
})();
