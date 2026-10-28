/* Переклади: t("секція.ключ"), L({uk:…,en:…}), setLang(код) */
(function () {
  "use strict";
  var N = window.Novara = window.Novara || {};
  N.dict = N.dict || {}; N.pages = N.pages || {}; N.data = N.data || {};
  var cfg = N.config || {}, lang = cfg.defaultLang || "uk", listeners = [];

  function walk(o, path) { var p = path.split("."); for (var i = 0; i < p.length && o != null; i++) o = o[p[i]]; return o; }
  function codes() { return (cfg.languages || []).map(function (l) { return l.code; }); }

  N.addStrings = function (l, section, obj) { (N.dict[l] = N.dict[l] || {})[section] = obj; };
  N.has = function (key) { return walk(N.dict[lang], key) != null || walk(N.dict[cfg.defaultLang], key) != null; };
  N.t = function (key, vars, fallback) {
    var v = walk(N.dict[lang], key); if (v == null) v = walk(N.dict[cfg.defaultLang], key);
    if (v == null) return fallback != null ? fallback : key;
    if (typeof v === "string" && vars) v = v.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    return v;
  };
  // значення в даних: рядок або {uk:"…", en:"…"}
  N.L = function (v) {
    if (v && typeof v === "object" && !Array.isArray(v)) { var r = v[lang]; return r != null ? r : (v[cfg.defaultLang] != null ? v[cfg.defaultLang] : ""); }
    return v == null ? "" : v;
  };
  N.lang = function () { return lang; };
  N.num = function (n) { var l = (cfg.languages || []).filter(function (x) { return x.code === lang; })[0]; return Number(n).toLocaleString(l ? l.locale : undefined); };
  N.onLang = function (fn) { listeners.push(fn); };
  N.setLang = function (code) {
    if (codes().indexOf(code) < 0 || code === lang) return;
    lang = code; document.documentElement.lang = code;
    try { localStorage.setItem("novara.lang", code); } catch (e) {}
    listeners.forEach(function (fn) { fn(code); });
  };
  // збережений вибір, потім мова браузера, потім мова за замовчуванням
  N.initLang = function () {
    var s = null; try { s = localStorage.getItem("novara.lang"); } catch (e) {}
    var b = (navigator.language || "").slice(0, 2).toLowerCase();
    lang = codes().indexOf(s) > -1 ? s : (codes().indexOf(b) > -1 ? b : (cfg.defaultLang || "uk"));
    document.documentElement.lang = lang;
  };
})();
