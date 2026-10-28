/* Сторінка «Підтримати» + підсторінка «Інформація» (#support/info).
   Дані: data/support.js. Тексти: i18n/<мова>/support.js */
(function () {
  "use strict";
  var N = window.Novara, t = N.t, L = N.L, esc = N.esc, $ = N.$, amount = null, last = null;
  function D() { return N.data.support || {}; }

  function methodsHtml() {
    var d = D(), cur = d.currency || "₴", cta = amount ? t("support.ctaAmount", { amount: N.num(amount) + " " + cur }) : t("support.cta");
    return (d.methods || []).map(function (m) {
      var url = m.url ? String(m.url).replace("{amount}", amount || "") : "", tag = url ? "a" : "button", k = "support.methods." + m.id;
      return "<" + tag + ' class="method"' + (url ? ' href="' + esc(url) + '" target="_blank" rel="noopener"' : "") + "><b>" + esc(t(k + ".label", null, m.id)) + "</b><small>" + esc(t(k + ".note", null, "")) + "</small><em>" + esc(cta) + " →</em></" + tag + ">";
    }).join("");
  }
  function mainHtml() {
    var S = t("support"), d = D(), g = d.goal || {}, cur = d.currency || "₴", pct = g.target ? Math.min(100, Math.round(g.current / g.target * 100)) : 0;
    return "<h2>" + esc(S.title) + '</h2><p class="lead-s">' + esc(S.lead) + "</p>" +
      (g.target ? '<div class="goal"><div class="nums"><b>' + N.num(g.current) + " " + esc(cur) + "</b><span>" + esc(S.goalLabel) + ": " + N.num(g.target) + " " + esc(cur) + " · " + pct + '%</span></div><div class="meter"><i data-w="' + pct + '"></i></div></div>' : "") +
      '<h4 class="sup-h">' + esc(S.chooseAmount) + '</h4><div class="amts" id="amts">' +
      (d.amounts || []).map(function (a) { return '<button data-a="' + a + '" aria-pressed="' + (a === amount) + '">' + N.num(a) + " " + esc(cur) + "</button>"; }).join("") +
      '<input id="custom" type="number" min="1" inputmode="numeric" placeholder="' + esc(S.customLabel) + '" aria-label="' + esc(S.customLabel) + '"></div>' +
      '<h4 class="sup-h">' + esc(S.chooseMethod) + '</h4><div class="methods" id="methods">' + methodsHtml() + "</div>" +
      (S.usage && S.usage.length ? '<h4 class="sup-h">' + esc(S.usageTitle) + '</h4><div class="list">' + S.usage.map(function (r) { return '<div class="row"><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div>"; }).join("") + "</div>" : "") +
      '<p class="thanks">' + esc(S.thanks) + '</p><p class="sup-more"><a class="btn alt" href="#support/info">' + esc(S.more) + " →</a></p>";
  }
  function infoHtml() {
    var I = t("support.info"), d = D(), h = "<h2>" + esc(I.title) + '</h2><p class="lead-s">' + esc(I.lead) + "</p>";
    h += '<h4 class="sup-h">' + esc(I.stepsTitle) + '</h4><div class="steps">' + I.steps.map(function (s, i) { return '<div class="step"><b>' + (i + 1) + "</b><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div>"; }).join("") + "</div>";
    h += '<h4 class="sup-h">' + esc(I.waysTitle) + '</h4><div class="list">' + I.ways.map(function (r) { return '<div class="row"><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div>"; }).join("") + "</div>";
    h += '<h4 class="sup-h">' + esc(I.requisitesTitle) + '</h4><div class="reqs">' + (d.requisites || []).map(function (r) { var v = L(r.value); return '<div class="req"><small>' + esc(t("support.info.requisites." + r.id, null, r.id)) + "</small><code>" + esc(v) + '</code><button class="cp" data-v="' + esc(v) + '">' + esc(t("common.copy")) + "</button></div>"; }).join("") + '</div><p class="note">' + esc(I.requisitesNote) + "</p>";
    h += '<h4 class="sup-h">' + esc(I.faqTitle) + "</h4>" + I.faq.map(function (f) { return "<details><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>"; }).join("");
    if (d.contactEmail) h += '<p class="thanks">' + esc(I.contactText) + ' <a href="mailto:' + esc(d.contactEmail) + '">' + esc(d.contactEmail) + "</a></p>";
    return h;
  }
  function bindMethods() { Array.prototype.forEach.call(document.querySelectorAll("#methods button"), function (b) { b.onclick = function () { N.toast(t("common.linkSoon")); }; }); }
  function setAmount(a) {
    amount = a; Array.prototype.forEach.call(document.querySelectorAll("#amts button"), function (b) { b.setAttribute("aria-pressed", +b.dataset.a === amount); });
    $("methods").innerHTML = methodsHtml(); bindMethods();
  }
  function animateMeter() { var m = document.querySelector(".meter i"); if (m) { m.style.width = "0"; requestAnimationFrame(function () { requestAnimationFrame(function () { m.style.width = m.dataset.w + "%"; }); }); } }

  N.pages.support = {
    title: function () { return t("support.title") + " — NOVARA STUDIO™"; },
    html: function () {
      if (amount === null) amount = (D().amounts || [])[1] || null;
      return '<div class="sw"><a href="#support" id="sw-main">' + esc(t("support.switchMain")) + '</a><a href="#support/info" id="sw-info">' + esc(t("support.switchInfo")) + "</a></div>" +
        '<div id="sup-main">' + mainHtml() + '</div><div id="sup-info" hidden>' + infoHtml() + "</div>";
    },
    mount: function () {
      last = null; bindMethods();
      Array.prototype.forEach.call(document.querySelectorAll("#amts button"), function (b) { b.onclick = function () { $("custom").value = ""; setAmount(+b.dataset.a); }; });
      $("custom").oninput = function () { setAmount(+this.value > 0 ? +this.value : null); };
      Array.prototype.forEach.call(document.querySelectorAll(".cp"), function (b) { b.onclick = function () { N.copy(b.dataset.v); }; });
    },
    route: function (sub) {
      var inf = sub === "info";
      $("sup-main").hidden = inf; $("sup-info").hidden = !inf;
      $("sw-main").setAttribute("aria-current", !inf); $("sw-info").setAttribute("aria-current", inf);
      if (last !== null && last !== inf) window.scrollTo(0, 0);
      last = inf; if (!inf) animateMeter();
    }
  };
})();
