/* Сторінка «Проєкти»: фільтри, сітка, вікно проєкту, послуги, команда.
   Дані: data/projects.js, data/team.js. Тексти інтерфейсу: i18n/<мова>/projects.js */
(function () {
  "use strict";
  var N = window.Novara, t = N.t, L = N.L, esc = N.esc, $ = N.$, cur = "all";

  function list() { return N.data.projects || []; }
  function byId(id) { return list().filter(function (p) { return p.id === id; })[0]; }
  function catLabel(c) { return t("projects.categories." + c, null, c); }
  function cats() { var a = ["all"]; list().forEach(function (p) { if (a.indexOf(p.category) < 0) a.push(p.category); }); return a; }
  function thumb(p) {
    var c = p.colors || [];
    return '<div class="thumb ' + esc(p.shape || "s1") + '" style="--a:' + esc(c[0] || "#ddd") + ";--b:" + esc(c[1] || "#111") + '">' + (p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : "<i></i>") + "</div>";
  }
  function link(l) {
    if (typeof l === "string") l = { url: l };
    var label = L(l.label), host = "";
    if (!label) { try { host = new URL(l.url).hostname.replace(/^www\./, "").split(".").slice(-2).join("."); } catch (e) {} label = host ? t("projects.openOn", { host: host }) : t("projects.open"); }
    return { label: label, url: l.url || "" };
  }
  function renderFilters() {
    $("filters").innerHTML = cats().map(function (c) { return '<button aria-pressed="' + (c === cur) + '" data-c="' + esc(c) + '">' + esc(c === "all" ? t("projects.filterAll") : catLabel(c)) + "</button>"; }).join("");
    Array.prototype.forEach.call(document.querySelectorAll("#filters button"), function (b) { b.onclick = function () { cur = b.dataset.c; renderFilters(); renderGrid(); }; });
  }
  function renderGrid() {
    $("grid").innerHTML = list().filter(function (p) { return cur === "all" || p.category === cur; }).map(function (p) {
      return '<a class="card" href="#projects/' + esc(p.id) + '">' + thumb(p) + '<div class="t"><h3>' + esc(L(p.name)) + "</h3><p>" + esc(catLabel(p.category)) + ", " + esc(p.year) + "</p></div></a>";
    }).join("");
  }
  function actions(p) {
    var links = (p.links && p.links.length) ? p.links.map(link) : [].concat(N.has("projects.buttons." + p.category) ? t("projects.buttons." + p.category) : t("projects.buttons.default")).map(function (l) { return { label: l, url: "" }; });
    var html = links.map(function (l, k) {
      var cls = "btn" + (k ? "" : " dl");
      return l.url ? '<a class="' + cls + '" href="' + esc(l.url) + '" target="_blank" rel="noopener">⬇ ' + esc(l.label) + "</a>" : '<button class="' + cls + ' act">⬇ ' + esc(l.label) + "</button>";
    }).join("");
    html += p.caseStudy ? '<a class="btn alt" href="' + esc(p.caseStudy) + '" target="_blank" rel="noopener">' + esc(t("projects.caseStudy")) + "</a>" : '<button class="btn alt act">' + esc(t("projects.caseStudy")) + "</button>";
    return '<div class="actions">' + html + "</div>";
  }
  function openP(id) {
    var p = byId(id); if (!p) { location.hash = "projects"; return; }
    var facts = [["platform", L(p.platform)], ["version", p.version], ["size", L(p.size)], ["rating", L(p.rating)], ["year", p.year]].filter(function (x) { return x[1] && x[1] !== "—"; });
    var others = list().filter(function (q) { return q.id !== p.id; });
    var rel = others.filter(function (q) { return q.category === p.category; }).concat(others.filter(function (q) { return q.category !== p.category; })).slice(0, 3);
    var feats = L(p.features) || [], res = L(p.result);
    $("sheet").innerHTML =
      '<div class="bar"><span class="tag">' + esc(catLabel(p.category)) + '</span><button class="x" id="close">' + esc(t("common.close")) + "</button></div>" + thumb(p) +
      "<h3>" + esc(L(p.name)) + "</h3><p>" + esc(L(p.description)) + "</p>" + actions(p) +
      '<div class="facts">' + facts.map(function (x) { return "<div><small>" + esc(t("projects.facts." + x[0])) + "</small><b>" + esc(x[1]) + "</b></div>"; }).join("") + "</div>" +
      (feats.length ? "<h4>" + esc(t("projects.featuresTitle")) + "</h4><ul>" + feats.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
      (res ? '<div class="res">' + esc(res) + "</div>" : "") +
      ((p.tech || []).length ? "<h4>" + esc(t("projects.techTitle")) + '</h4><div class="chips">' + p.tech.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + "</div>" : "") +
      "<h4>" + esc(t("projects.relatedTitle")) + '</h4><div class="more">' + rel.map(function (q) { return '<a href="#projects/' + esc(q.id) + '">' + esc(L(q.name)) + "</a>"; }).join("") + "</div>";
    $("modal").classList.add("on"); $("sheet").scrollTop = 0; $("close").focus(); $("close").onclick = closeP;
    Array.prototype.forEach.call(document.querySelectorAll(".act"), function (b) { b.onclick = function () { N.toast(t("common.linkSoon")); }; });
  }
  function closeP() { if (location.hash.indexOf("/") > -1) location.hash = "projects"; else $("modal").classList.remove("on"); }
  function onKey(e) { if (e.key === "Escape") closeP(); }

  N.pages.projects = {
    title: function (sub) { var p = sub && byId(sub); return p ? L(p.name) + " — NOVARA STUDIO™" : t("projects.title"); },
    html: function () {
      var X = t("projects");
      return "<h2>" + esc(X.h) + '</h2><div class="filters" id="filters"></div><div class="grid" id="grid"></div>' +
        "<h2>" + esc(X.servicesTitle) + '</h2><div class="list">' + X.services.map(function (s) { return '<div class="row"><h3>' + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>"; }).join("") + "</div>" +
        "<h2>" + esc(X.teamTitle) + '</h2><div class="team">' + (N.data.team || []).map(function (m) { return "<div><b>" + esc(L(m.name)) + "</b>" + esc(L(m.role)) + "</div>"; }).join("") + "</div>" +
        '<div class="modal" id="modal" role="dialog" aria-modal="true"><div class="sheet" id="sheet"></div></div>';
    },
    mount: function () {
      renderFilters(); renderGrid();
      $("modal").onclick = function (e) { if (e.target === $("modal")) closeP(); };
      document.addEventListener("keydown", onKey);
    },
    unmount: function () { document.removeEventListener("keydown", onKey); },
    route: function (sub) { if (sub) openP(sub); else $("modal").classList.remove("on"); }
  };
})();
