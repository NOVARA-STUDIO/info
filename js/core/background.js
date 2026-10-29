/* Анімований фон: рухомі точки-сузір'я, що тягнуться до курсора. */
(function () {
  "use strict";
  var cv = document.getElementById("bgc"); if (!cv) return;
  var ctx = cv.getContext && cv.getContext("2d"); if (!ctx) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, dots = [], mouse = { x: -999, y: -999 }, raf = 0, LINK = 140;

  function color() { return getComputedStyle(document.documentElement).getPropertyValue("--acc").trim() || "#3D5AFE"; }
  function size() {
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(90, W * H / 15000)); dots = [];
    for (var i = 0; i < n; i++) dots.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45, r: 1 + Math.random() * 1.8 });
  }
  function frame() {
    ctx.clearRect(0, 0, W, H);
    var c = color(); ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = 1;
    for (var i = 0; i < dots.length; i++) {
      var a = dots[i];
      if (!reduce) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
      ctx.globalAlpha = .55; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      for (var j = i + 1; j < dots.length; j++) {
        var b = dots[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) { ctx.globalAlpha = (1 - d / LINK) * .35; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      var mx = a.x - mouse.x, my = a.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
      if (md < 170) { ctx.globalAlpha = (1 - md / 170) * .6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
    if (!reduce) raf = requestAnimationFrame(frame);
  }
  var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { size(); if (reduce) frame(); }, 150); });
  window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
  document.addEventListener("visibilitychange", function () { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce) frame(); });
  size(); frame();
})();
