/* Запуск сайту */
(function () {
  "use strict";
  var N = window.Novara;
  N.initLang(); N.layout.render(); N.router.start();
  N.onLang(function () { N.layout.render(); N.router.refresh(); });
})();
