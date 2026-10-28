/* Сторінка «Головна». Тексти: i18n/<мова>/home.js */
(function () {
  "use strict";
  var N = window.Novara, t = N.t, esc = N.esc, timer;
  N.pages.home = {
    title: function () { return t("home.title"); },
    html: function () {
      var H = t("home");
      return '<div class="hero"><h1>' + esc(H.h1) + '</h1><div class="make"><span>' + esc(H.make) + '</span><span class="w" id="word">' + esc(H.words[0]) + "</span></div>" +
        '<p class="lead">' + esc(H.lead) + '</p><p style="margin-top:28px"><a class="btn" href="#projects">' + esc(H.ctaProjects) + '</a> <a class="btn alt" href="#support">' + esc(H.ctaSupport) + "</a></p></div>" +
        '<div class="stats">' + H.stats.map(function (s) { return "<div><b>" + esc(s.value) + "</b><small>" + esc(s.label) + "</small></div>"; }).join("") + "</div>";
    },
    mount: function () {
      var words = t("home.words"), i = 0;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(function () { i = (i + 1) % words.length; var w = N.$("word"); if (w) w.textContent = words[i]; }, 1600);
    },
    unmount: function () { clearInterval(timer); }
  };
})();
