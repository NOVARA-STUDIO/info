/* Дрібні спільні помічники: $, esc, toast, copy */
(function () {
  "use strict";
  var N = window.Novara, timer;
  N.$ = function (id) { return document.getElementById(id); };
  N.esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  N.toast = function (m) { var e = N.$("toast"); e.textContent = m; e.classList.add("on"); clearTimeout(timer); timer = setTimeout(function () { e.classList.remove("on"); }, 2200); };
  N.copy = function (text) {
    function done() { N.toast(N.t("common.copied")); }
    function fallback() { var a = document.createElement("textarea"); a.value = text; a.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(a); a.select(); try { document.execCommand("copy"); done(); } catch (e) { N.toast(N.t("common.copyFail")); } a.remove(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  };
})();
