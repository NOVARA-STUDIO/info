(function () {
  "use strict";
  var P = window.PROJECTS || [], S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); };
  var tabs = ["home", "projects", "support"], cur = "Усе", modal = $("modal"), toastTimer;

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

  // посилання можна писати і рядком "https://...", і обʼєктом {label, url}
  function normLink(l) {
    if (typeof l === "string") l = { url: l };
    if (!l.label) {
      var host = "";
      try { host = new URL(l.url).hostname.replace(/^www\./, "").split(".").slice(-2).join("."); } catch (e) {}
      l.label = host ? "Відкрити на " + host : "Відкрити";
    }
    return l;
  }

  function actions(p) {
    var links = (p.links && p.links.length) ? p.links : (S.defaultButtons && S.defaultButtons[p.category] || S.fallbackButtons || []).map(function (l) { return { label: l, url: "" }; });
    var html = links.map(normLink).map(function (l, k) {
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


  // ---------- вкладка «Підтримати» (все береться з SITE.support) ----------
  var amount = null, lastSub = null;
  function fmt(n) { return Number(n).toLocaleString("uk-UA"); }
  function renderSupport() {
    var U = S.support; if (!U) return;
    var cur$ = U.currency || "₴", g = U.goal || {}, pct = g.target ? Math.min(100, Math.round(g.current / g.target * 100)) : 0;
    amount = amount || (U.amounts && U.amounts[1]) || null;
    var I = U.info;
    $("support").innerHTML =
      (I ? '<div class="sw"><a href="#support" id="sw-main">' + esc(I.switchMain || "Підтримати") + '</a><a href="#support/info" id="sw-info">' + esc(I.switchInfo || "Інформація") + "</a></div>" : "") +
      '<div id="sup-main"><h2>' + esc(U.title) + '</h2><p class="lead-s">' + esc(U.lead) + "</p>" +
      (g.target ? '<div class="goal"><div class="nums"><b>' + fmt(g.current) + " " + esc(cur$) + "</b><span>" + esc(g.label || "") + ": " + fmt(g.target) + " " + esc(cur$) + " · " + pct + '%</span></div><div class="meter"><i data-w="' + pct + '"></i></div></div>' : "") +
      '<h4 class="sup-h">Оберіть суму</h4><div class="amts" id="amts">' +
      (U.amounts || []).map(function (a) { return '<button data-a="' + a + '" aria-pressed="' + (a === amount) + '">' + fmt(a) + " " + esc(cur$) + "</button>"; }).join("") +
      '<input id="custom" type="number" min="1" inputmode="numeric" placeholder="' + esc(U.customLabel || "Інша сума") + '" aria-label="' + esc(U.customLabel || "Інша сума") + '"></div>' +
      '<h4 class="sup-h">Спосіб підтримки</h4><div class="methods" id="methods"></div>' +
      (U.usage && U.usage.length ? '<h4 class="sup-h">' + esc(U.usageTitle || "") + '</h4><div class="list">' + U.usage.map(function (r) { return '<div class="row"><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div>"; }).join("") + "</div>" : "") +
      (U.thanks ? '<p class="thanks">' + esc(U.thanks) + "</p>" : "") +
      (I ? '<p class="sup-more"><a class="btn alt" href="#support/info">' + esc(I.moreLabel || "Детальніше") + " →</a></p>" : "") +
      '</div><div id="sup-info" hidden>' + (I ? infoHtml(I) : "") + "</div>";
    renderMethods();
    Array.prototype.forEach.call(document.querySelectorAll(".cp"), function (b) { b.onclick = function () { copyText(b.dataset.v); }; });
    Array.prototype.forEach.call(document.querySelectorAll("#amts button"), function (b) { b.onclick = function () { amount = +b.dataset.a; $("custom").value = ""; syncAmts(); renderMethods(); }; });
    $("custom").oninput = function () { amount = +this.value > 0 ? +this.value : null; syncAmts(); renderMethods(); };
  }
  function syncAmts() { Array.prototype.forEach.call(document.querySelectorAll("#amts button"), function (b) { b.setAttribute("aria-pressed", +b.dataset.a === amount); }); }
  function renderMethods() {
    var U = S.support, cur$ = U.currency || "₴";
    $("methods").innerHTML = (U.methods || []).map(function (m, i) {
      var url = m.url ? String(m.url).replace("{amount}", amount || "") : "", tag = url ? "a" : "button";
      var cta = amount ? "Підтримати на " + fmt(amount) + " " + cur$ : "Підтримати";
      return "<" + tag + ' class="method"' + (url ? ' href="' + esc(url) + '" target="_blank" rel="noopener"' : ' data-i="' + i + '"') + "><b>" + esc(m.label) + "</b><small>" + esc(m.note || "") + "</small><em>" + esc(cta) + " →</em></" + tag + ">";
    }).join("");
    Array.prototype.forEach.call(document.querySelectorAll("#methods button"), function (b) { b.onclick = function () { toast(S.emptyLinkMessage || "Скоро"); }; });
  }

  function infoHtml(I) {
    var h = "<h2>" + esc(I.title) + '</h2><p class="lead-s">' + esc(I.lead) + "</p>";
    if ((I.steps || []).length) h += '<h4 class="sup-h">' + esc(I.stepsTitle || "") + '</h4><div class="steps">' + I.steps.map(function (s, i) { return '<div class="step"><b>' + (i + 1) + "</b><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>"; }).join("") + "</div>";
    if ((I.ways || []).length) h += '<h4 class="sup-h">' + esc(I.waysTitle || "") + '</h4><div class="list">' + I.ways.map(function (r) { return '<div class="row"><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div>"; }).join("") + "</div>";
    if ((I.requisites || []).length) h += '<h4 class="sup-h">' + esc(I.requisitesTitle || "") + '</h4><div class="reqs">' + I.requisites.map(function (r) { return '<div class="req"><small>' + esc(r.label) + "</small><code>" + esc(r.value) + '</code><button class="cp" data-v="' + esc(r.value) + '">Копіювати</button></div>'; }).join("") + "</div>" + (I.requisitesNote ? '<p class="note">' + esc(I.requisitesNote) + "</p>" : "");
    if ((I.faq || []).length) h += '<h4 class="sup-h">' + esc(I.faqTitle || "") + "</h4>" + I.faq.map(function (f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("");
    if (I.contactEmail) h += '<p class="thanks">' + esc(I.contactText || "") + ' <a href="mailto:' + esc(I.contactEmail) + '">' + esc(I.contactEmail) + "</a></p>";
    return h;
  }
  function copyText(t) {
    function done() { toast("Скопійовано"); }
    function fallback() { var a = document.createElement("textarea"); a.value = t; a.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); done(); } catch (e) { toast("Виділіть і скопіюйте вручну"); } a.remove(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, fallback); else fallback();
  }
  function animateMeter() { var m = document.querySelector(".meter i"); if (m) { m.style.width = "0"; requestAnimationFrame(function () { requestAnimationFrame(function () { m.style.width = m.dataset.w + "%"; }); }); } }

  // маршрутизація: #home, #projects, #projects/<id>
  function route() {
    var h = location.hash.slice(1).split("/"), t = tabs.indexOf(h[0]) < 0 ? "home" : h[0];
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (e) { e.classList.toggle("on", e.id === t); });
    Array.prototype.forEach.call(document.querySelectorAll("nav button"), function (b) { b.setAttribute("aria-selected", b.dataset.t === t); });
    if (t === "support" && $("sup-main")) {
      var inf = h[1] === "info" && !!$("sw-info");
      $("sup-main").hidden = inf; $("sup-info").hidden = !inf;
      if ($("sw-main")) { $("sw-main").setAttribute("aria-current", !inf); $("sw-info").setAttribute("aria-current", inf); }
      if (lastSub !== null && lastSub !== inf) window.scrollTo(0, 0);
      lastSub = inf;
      if (!inf) animateMeter();
    }
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

  renderFilters(); renderGrid(); renderSupport(); route();
})();
