/* Спільна шапка (логотип, меню, мова) і футер */
(function () {
  "use strict";
  var N = window.Novara, t = N.t, esc = N.esc, current = "home";

  function header() {
    var cfg = N.config;
    return '<a class="logo" href="#home" aria-label="NOVARA STUDIO"><svg class="mk" aria-hidden="true"><use href="#lg-mark"/></svg><span class="logo-t">NOVARA STUDIO<sup>™</sup></span></a>' +
      '<nav aria-label="' + esc(t("common.nav.label")) + '">' + cfg.nav.map(function (id) { return '<a href="#' + id + '" data-p="' + id + '">' + esc(t("common.nav." + id)) + "</a>"; }).join("") + "</nav>" +
      '<div class="lang" role="group" aria-label="' + esc(t("common.langLabel")) + '">' + cfg.languages.map(function (l) { return '<button data-lang="' + l.code + '" aria-pressed="' + (l.code === N.lang()) + '">' + esc(l.label) + "</button>"; }).join("") + "</div>";
  }
  function footer() {
    return '<svg class="ft" role="img" aria-label="NOVARA STUDIO"><use href="#lg-full"/></svg><span>© 2026 NOVARA STUDIO™</span><span>' + esc(t("common.footer.tagline")) + "</span>";
  }
  N.layout = {
    render: function () {
      var sp = N.$("sprite"); if (!sp.firstChild) sp.innerHTML = N.logoSprite || "";
      N.$("site-header").innerHTML = header(); N.$("site-footer").innerHTML = footer();
      Array.prototype.forEach.call(document.querySelectorAll(".lang button"), function (b) { b.onclick = function () { N.setLang(b.dataset.lang); }; });
      this.highlight(current);
    },
    highlight: function (id) {
      current = id;
      Array.prototype.forEach.call(document.querySelectorAll("nav a"), function (a) { if (a.dataset.p === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    }
  };
})();
