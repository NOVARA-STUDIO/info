/* Роутер: #home, #projects, #projects/<id>, #support, #support/info
   Сторінка = модуль Novara.pages[id] з методами: html(), mount(), route(sub), unmount(), title(sub) */
(function () {
  "use strict";
  var N = window.Novara, cur = null;
  function route(keep) {
    var h = location.hash.slice(1).split("/"), id = N.pages[h[0]] ? h[0] : "home", pg = N.pages[id], main = N.$("page");
    if (cur !== id) {
      if (cur && N.pages[cur].unmount) N.pages[cur].unmount();
      main.innerHTML = '<section class="page page-' + id + '">' + pg.html() + "</section>";
      if (pg.mount) pg.mount(main);
      cur = id; if (!keep) window.scrollTo(0, 0);
      N.layout.highlight(id);
    }
    if (pg.route) pg.route(h[1]);
    document.title = pg.title ? pg.title(h[1]) : "NOVARA STUDIO™";
  }
  N.router = {
    start: function () { window.addEventListener("hashchange", function () { route(); }); route(); },
    refresh: function () { var y = window.scrollY; if (cur && N.pages[cur].unmount) N.pages[cur].unmount(); cur = null; route(true); window.scrollTo(0, y); }
  };
})();
