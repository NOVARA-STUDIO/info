/* Сторінка «Підтримати»: криптогаманці з кнопкою «Копіювати».
   Дані: data/support.js. Тексти: i18n/<мова>/support.js */
(function () {
  "use strict";
  var N = window.Novara, t = N.t, esc = N.esc;
  N.pages.support = {
    title: function () { return t("support.title") + " — NOVARA STUDIO™"; },
    html: function () {
      var S = t("support"), d = N.data.support || {};
      return "<h2>" + esc(S.title) + '</h2><p class="lead-s">' + esc(S.lead) + '</p><div class="wallets">' +
        (d.wallets || []).map(function (w) {
          return '<div class="wallet"><div><b>' + esc(w.coin) + "</b><small>" + esc(w.network) + "</small></div><code>" + esc(w.address) + '</code><button class="cp" data-v="' + esc(w.address) + '">' + esc(t("common.copy")) + "</button></div>";
        }).join("") + '</div><p class="note">' + esc(S.note) + '</p><p class="thanks">' + esc(S.thanks) + "</p>";
    },
    mount: function () {
      Array.prototype.forEach.call(document.querySelectorAll(".cp"), function (b) { b.onclick = function () { N.copy(b.dataset.v); }; });
    }
  };
})();
