// EasyTouch page: easter eggs. Uses the shared engine in eggs.js.
(function () {
  var E = window.Eggs; if (!E) return;
  var $ = E.$, $$ = E.$$, full = E.full;

  E.css('' +
    '.egg-ink{position:fixed;inset:0;z-index:57;pointer-events:none;transition:opacity .6s}' +
    '.art{touch-action:none}.art.egg-drawable{cursor:crosshair}' +
    '.egg-shape{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;overflow:visible}' +
    '.egg-shape circle{fill:none;stroke:var(--accent,#C96442);stroke-width:3}' +
    'html.motion .egg-shape circle{animation:egg-snapcircle .35s cubic-bezier(.2,1.4,.4,1) both;transform-box:fill-box;transform-origin:center}@keyframes egg-snapcircle{from{transform:scale(.85);opacity:.3}}' +
    '.egg-picker{position:fixed;z-index:58;width:0;height:0}' +
    '.egg-picker a{position:absolute;width:52px;height:52px;margin:-26px 0 0 -26px;display:grid;place-items:center;border-radius:14px;background:var(--surface,#FAF9F5);border:1px solid var(--line,#E0DDD2);box-shadow:0 8px 20px rgba(0,0,0,.16)}' +
    'html.motion .egg-picker a{animation:egg-pop .3s cubic-bezier(.2,1.4,.4,1) both}@keyframes egg-pop{from{transform:scale(.2);opacity:0}}' +
    '.egg-picker img{width:34px;height:34px}' +
    '.egg-calc,.egg-numpad{position:fixed;z-index:58;padding:14px;border-radius:16px;background:rgba(31,30,29,.9);color:#F5F4EE;font:600 1rem "Segoe UI",sans-serif;box-shadow:0 14px 40px rgba(0,0,0,.3)}' +
    '.egg-calc{left:50%;top:40%;transform:translate(-50%,-50%);min-width:220px;text-align:right}.egg-calc small{display:block;color:#B6B2A8;font-weight:400}.egg-calc b{display:block;font:2.6rem Georgia,serif}' +
    '.egg-numpad{width:250px}.egg-numpad .disp{padding:6px 10px 10px;text-align:right;font:2rem Georgia,serif;overflow:hidden;white-space:nowrap}' +
    '.egg-numpad .keys{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}' +
    '.egg-numpad .keys button{height:44px;border:1px solid rgba(255,255,255,.18);border-radius:10px;background:rgba(255,255,255,.08);color:#F5F4EE;font:600 1.1rem "Segoe UI",sans-serif;cursor:pointer}' +
    '.egg-numpad .keys button:hover{background:rgba(255,255,255,.18)}.egg-numpad .x{position:absolute;right:8px;top:4px;border:0;background:none;color:#B6B2A8;font-size:1.3rem;cursor:pointer}' +
    '.egg-numpad small{display:block;margin-top:8px;color:#B6B2A8;font-weight:400;font-size:.75rem;text-align:center}' +
    '.egg-spot{position:fixed;inset:0;z-index:50;pointer-events:none;opacity:0;transition:opacity .5s;background:radial-gradient(circle 150px at var(--lx,50%) var(--ly,50%),transparent 60%,rgba(14,13,12,.82) 100%)}.egg-spot.on{opacity:1}' +
    '.egg-palm{position:fixed;z-index:58;width:90px;height:90px;margin:-45px 0 0 -45px;color:var(--accent,#C96442);pointer-events:none;animation:egg-palmfade 1.6s ease forwards}@keyframes egg-palmfade{0%{opacity:0;transform:scale(.7)}20%{opacity:.9;transform:none}100%{opacity:0}}' +
    '.egg-pill{position:fixed;left:50%;top:80px;z-index:56;transform:translateX(-50%);padding:9px 18px;border-radius:999px;background:#1F1E1D;color:#F5F4EE;font:600 .9rem "Segoe UI",sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.2);pointer-events:none;max-width:calc(100vw - 32px);text-align:center}' +
    'html.motion .egg-pill{animation:egg-rise .35s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-finger{position:fixed;z-index:58;width:90px;height:110px;margin:-55px 0 0 -45px;pointer-events:none}.egg-finger path{fill:none;stroke:var(--accent,#C96442);stroke-width:2;stroke-linecap:round}' +
    'html.motion .egg-finger path{stroke-dasharray:400;stroke-dashoffset:400;animation:egg-whorl 1.2s ease forwards}@keyframes egg-whorl{to{stroke-dashoffset:0}}' +
    '.egg-lock{position:fixed;left:50%;top:50%;z-index:58;width:110px;height:110px;margin:-55px 0 0 -55px;display:grid;place-items:center;border-radius:28px;background:rgba(31,30,29,.88);color:#F5F4EE;pointer-events:none;animation:egg-palmfade 1.8s ease forwards}.egg-lock svg{width:56px;height:56px}' +
    '.art.egg-quiet .float{opacity:0 !important;transition:opacity .4s}' +
    '.card .icon.egg-blink svg{animation:egg-digits .6s steps(2) 2}@keyframes egg-digits{50%{opacity:.15}}');

  var art = $('.art');

  // ---------- drawing on the hero art (mouse, finger or pen; no keys needed, so every browser behaves) ----------
  // Letters: S, C, D and L. A circle straightens itself. Holding still for 3 s leaves a fingerprint.
  var ink = null, ictx = null, pts = null, holdT = 0;
  function inkLayer() {
    if (ink) { clearTimeout(ink.fade); ink.style.opacity = 1; return; }
    ink = document.createElement('canvas'); ink.className = 'egg-ink'; ink.setAttribute('aria-hidden', 'true');
    var d = window.devicePixelRatio || 1;
    ink.width = innerWidth * d; ink.height = innerHeight * d;
    ictx = ink.getContext('2d'); ictx.scale(d, d);
    ictx.strokeStyle = '#C96442'; ictx.lineWidth = 3.5; ictx.lineCap = 'round'; ictx.lineJoin = 'round';
    document.body.appendChild(ink);
  }
  function inkGone() {
    if (!ink) return;
    var el = ink; el.style.opacity = 0;
    el.fade = setTimeout(function () { el.remove(); if (ink === el) { ink = null; ictx = null; } }, 650);
  }
  if (art) {
    // No native image drag or text selection while drawing (Firefox would swallow the stroke).
    ['dragstart', 'selectstart'].forEach(function (t) { art.addEventListener(t, function (e) { e.preventDefault(); }); });
    art.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      try { art.setPointerCapture(e.pointerId); } catch (err) { }
      pts = [{ x: e.clientX, y: e.clientY }];
      inkLayer();
      ictx.clearRect(0, 0, innerWidth, innerHeight);
      clearTimeout(holdT);
      holdT = setTimeout(function () { if (pts && pts.length < 4) { var p0 = pts[0]; pts = null; inkGone(); fingerprint(p0.x, p0.y); } }, 3000);
    });
    art.addEventListener('pointermove', function (e) {
      if (!pts) return;
      var last = pts[pts.length - 1];
      if (Math.hypot(e.clientX - last.x, e.clientY - last.y) < 2) return;
      if (Math.hypot(e.clientX - pts[0].x, e.clientY - pts[0].y) > 12) clearTimeout(holdT);
      pts.push({ x: e.clientX, y: e.clientY });
      ictx.beginPath(); ictx.moveTo(last.x, last.y); ictx.lineTo(e.clientX, e.clientY); ictx.stroke();
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) {
      art.addEventListener(t, function () {
        clearTimeout(holdT);
        if (!pts) return;
        var stroke = pts; pts = null;
        inkGone();
        if (stroke.length < 6) return;
        var g = E.recognise(stroke, ['circle', 'S', 'C', 'D', 'L'], 0.16);
        if (!g) { E.toast('Not a shape I know. Try a circle, or the letters S, C, D or L.'); return; }
        if (g.name === 'circle') perfectCircle(g); else gesture(g, stroke);
      });
    });
  }

  function gesture(g, stroke) {
    if (g.name === 'L') {
      var lk = document.createElement('div'); lk.className = 'egg-lock'; lk.setAttribute('aria-hidden', 'true');
      lk.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
      document.body.appendChild(lk); setTimeout(function () { lk.remove(); }, 1900);
      E.toast('L for lock. Your PC would lock now. This page only pretends.');
      E.found('t-lock');
      return;
    }
    if (g.name === 'S') {
      E.toast('S for sign. Taking you to EasySign...');
      E.found('t-gesture');
      setTimeout(function () { location.href = '../easysign/'; }, 1400);
      return;
    }
    if (g.name === 'C') {
      var f = document.createElement('div');
      f.style.cssText = 'position:fixed;inset:0;z-index:70;background:#fff;pointer-events:none';
      document.body.appendChild(f);
      f.animate([{ opacity: 0.7 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
      setTimeout(function () { f.remove(); }, 520);
      E.sound('shutter');
      E.toast('C for capture. Screenshot taken. (A pretend one.)');
    } else if (g.name === 'D') {
      E.toast('D for Downloads? This is a website.');
    }
    E.found('t-gesture');
  }

  // A circle also opens a ring of the Easy Suite apps, like EasyTouch's circle gesture.
  function picker(x, y) {
    var old = $('.egg-picker'); if (old) old.remove();
    var p = document.createElement('div'); p.className = 'egg-picker'; p.setAttribute('role', 'menu'); p.setAttribute('aria-label', 'Easy Suite apps');
    p.style.left = E.clamp(x, 90, innerWidth - 90) + 'px'; p.style.top = E.clamp(y, 90, innerHeight - 90) + 'px';
    var apps = [['easysign', 'EasySign'], ['easypdf', 'EasyPDF'], ['easyclip', 'EasyClip'], ['easyfile', 'EasyFile'], ['easytouch', 'EasyTouch'], ['easyguard', 'EasyGuard']];
    apps.forEach(function (a, i) {
      var ang = i / apps.length * Math.PI * 2 - Math.PI / 2;
      var l = document.createElement('a'); l.href = '../' + a[0] + '/'; l.title = a[1]; l.setAttribute('role', 'menuitem'); l.setAttribute('aria-label', a[1]);
      l.style.left = (Math.cos(ang) * 70) + 'px'; l.style.top = (Math.sin(ang) * 70) + 'px'; l.style.animationDelay = (i * 0.04) + 's';
      l.innerHTML = '<img alt="" src="' + E.root + 'images/apps/' + a[0] + '.png">';
      p.appendChild(l);
    });
    document.body.appendChild(p);
    var close = function (e) { if (e && p.contains(e.target)) return; p.remove(); document.removeEventListener('pointerdown', close, true); document.removeEventListener('keydown', esc); };
    var esc = function (e) { if (e.key === 'Escape') close(); };
    setTimeout(function () { document.addEventListener('pointerdown', close, true); document.addEventListener('keydown', esc); }, 50);
    setTimeout(function () { if (p.parentNode) close(); }, 8000);
  }

  // T11 shapes straighten: a wobbly circle becomes a perfect one.
  function perfectCircle(c) {
    var r = art.getBoundingClientRect();
    var old = $('.egg-shape', art); if (old) old.remove();
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'egg-shape'); svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('viewBox', '0 0 ' + r.width + ' ' + r.height);
    var ci = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ci.setAttribute('cx', c.cx - r.left); ci.setAttribute('cy', c.cy - r.top); ci.setAttribute('r', c.r);
    svg.appendChild(ci); art.appendChild(svg);
    setTimeout(function () { svg.remove(); }, 4000);
    setTimeout(function () { picker(c.cx, c.cy); }, full ? 350 : 0);
    E.toast('Straightened, like Screen pen. And a circle opens the app ring.');
    E.found('t-shapes');
  }

  // ---------- T2 sums: type 12x7= ----------
  var calc = null, calcT = 0;
  function showCalc(top, result) {
    if (!calc) { calc = document.createElement('div'); calc.className = 'egg-calc'; calc.setAttribute('role', 'status'); document.body.appendChild(calc); }
    calc.innerHTML = '<small></small><b></b>';
    $('small', calc).textContent = top; $('b', calc).textContent = result;
    clearTimeout(calcT); calcT = setTimeout(function () { if (calc) { calc.remove(); calc = null; } }, 3200);
  }
  function fmt(v) { return isFinite(v) ? String(+(+v).toPrecision(10)) : 'Nice try.'; }
  function apply(a, op, b) { return op === '+' ? a + b : op === '-' ? a - b : op === '/' ? a / b : a * b; }
  E.pattern(/(\d{1,7})([x*+\/-])(\d{1,7})=$/, function (m) {
    var op = m[2] === 'x' ? '*' : m[2];
    showCalc(m[1] + ' ' + (op === '*' ? 'x' : op) + ' ' + m[3] + ' =', fmt(apply(+m[1], op, +m[3])));
    E.found('t-sums');
  });

  // ---------- T3 number pad ----------
  var pad = null, acc = null, op = null, cur = '';
  function padShow(text) { $('.disp', pad).textContent = text; }
  function padKey(k) {
    if (/^[0-9.]$/.test(k)) { if (k === '.' && cur.indexOf('.') >= 0) return; cur = (cur + k).slice(0, 12); padShow(cur); return; }
    if (/^[+\-*\/]$/.test(k)) {
      if (cur !== '') { acc = acc === null || op === null ? +cur : apply(acc, op, +cur); cur = ''; }
      op = k; padShow(fmt(acc === null ? 0 : acc)); return;
    }
    if (k === '=' || k === 'Enter') {
      if (cur !== '' && op !== null && acc !== null) acc = apply(acc, op, +cur); else if (cur !== '') acc = +cur;
      cur = ''; op = null; padShow(fmt(acc === null ? 0 : acc));
    }
  }
  function closePad() { if (pad) { pad.remove(); pad = null; } }
  function openPad() {
    if (pad) return;
    acc = null; op = null; cur = '';
    pad = document.createElement('div'); pad.className = 'egg-numpad'; pad.setAttribute('role', 'dialog'); pad.setAttribute('aria-label', 'Number pad');
    pad.innerHTML = '<button type="button" class="x" aria-label="Close">&times;</button><div class="disp">0</div><div class="keys">' +
      ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map(function (k) { return '<button type="button" data-k="' + k + '">' + (k === '*' ? 'x' : k) + '</button>'; }).join('') +
      '</div><small>A running total, like the real one. Esc closes.</small>';
    var r = art ? art.getBoundingClientRect() : null;
    var x = r && r.bottom > 0 && r.top < innerHeight ? r.left + r.width / 2 : innerWidth / 2, y = r && r.bottom > 0 && r.top < innerHeight ? r.top + r.height / 2 : innerHeight / 2;
    pad.style.left = E.clamp(x - 125, 12, innerWidth - 262) + 'px'; pad.style.top = E.clamp(y - 170, 70, Math.max(70, innerHeight - 350)) + 'px';
    document.body.appendChild(pad);
    $('.x', pad).addEventListener('click', closePad);
    $$('[data-k]', pad).forEach(function (b) { b.addEventListener('click', function () { padKey(b.dataset.k); E.sound('click'); }); });
    E.found('t-numpad');
  }
  // While the pad is open it gets the keys, before the page's typed words do.
  window.addEventListener('keydown', function (e) {
    if (!pad || E.inField(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Escape') { closePad(); e.stopPropagation(); return; }
    var k = e.key === 'x' ? '*' : e.key;
    if (/^[0-9.+\-*\/=]$/.test(k) || k === 'Enter') { e.preventDefault(); e.stopPropagation(); padKey(k); }
  }, true);
  E.word('numpad', openPad);
  document.addEventListener('keydown', function (e) { if (e.key === 'NumLock') openPad(); });

  // ---------- T4 laser: type pen ----------
  var laser = null;
  E.word('pen', function () {
    if (laser) return;
    var c = document.createElement('canvas'); c.className = 'egg-ink'; c.setAttribute('aria-hidden', 'true');
    var d = window.devicePixelRatio || 1; c.width = innerWidth * d; c.height = innerHeight * d;
    var x = c.getContext('2d'); x.scale(d, d); x.lineCap = 'round'; x.lineJoin = 'round';
    document.body.appendChild(c);
    var trail = [], until = performance.now() + 10000;
    function mv(e) { trail.push({ x: e.clientX, y: e.clientY, t: performance.now() }); }
    document.addEventListener('pointermove', mv, { passive: true });
    laser = c;
    (function frame() {
      var now = performance.now();
      trail = trail.filter(function (p) { return now - p.t < 1500; });
      x.clearRect(0, 0, innerWidth, innerHeight);
      for (var i = 1; i < trail.length; i++) {
        var a = 1 - (now - trail[i].t) / 1500;
        x.strokeStyle = 'rgba(230, 40, 40,' + a.toFixed(3) + ')'; x.lineWidth = 2 + 4 * a;
        x.shadowColor = 'rgba(255, 60, 60, .8)'; x.shadowBlur = 8;
        x.beginPath(); x.moveTo(trail[i - 1].x, trail[i - 1].y); x.lineTo(trail[i].x, trail[i].y); x.stroke();
      }
      if (now < until) requestAnimationFrame(frame);
      else { document.removeEventListener('pointermove', mv); c.remove(); laser = null; }
    })();
    E.chip('Laser pen: 10 seconds', 10000);
    E.found('t-laser');
  });

  // ---------- T5 spotlight ----------
  var spot = null;
  E.word('spotlight', function () {
    if (spot) return;
    var s = spot = document.createElement('div'); s.className = 'egg-spot'; s.setAttribute('aria-hidden', 'true');
    s.style.setProperty('--lx', (innerWidth / 2) + 'px'); s.style.setProperty('--ly', (innerHeight / 2) + 'px');
    var mv = function (e) { s.style.setProperty('--lx', e.clientX + 'px'); s.style.setProperty('--ly', e.clientY + 'px'); };
    document.addEventListener('pointermove', mv, { passive: true });
    document.body.appendChild(s);
    requestAnimationFrame(function () { requestAnimationFrame(function () { s.classList.add('on'); }); });
    setTimeout(function () { s.classList.remove('on'); }, 8000);
    setTimeout(function () { document.removeEventListener('pointermove', mv); s.remove(); spot = null; }, 8600);
    E.found('t-spotlight');
  });

  // ---------- T6 palm detected: 5 quick clicks spread around (or 3 fingers at once on a touch screen) ----------
  var mash = [], touching = {};
  function palm(x, y) {
    mash = []; touching = {};
    var h = document.createElement('div'); h.className = 'egg-palm'; h.setAttribute('aria-hidden', 'true');
    h.style.left = x + 'px'; h.style.top = y + 'px';
    h.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V5a1.5 1.5 0 0 1 3 0v6M11 11V4a1.5 1.5 0 0 1 3 0v7M14 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a5 5 0 0 1-4-2l-3-4a1.5 1.5 0 0 1 2.3-2L8 14"/></svg>';
    document.body.appendChild(h); setTimeout(function () { h.remove(); }, 1700);
    E.toast('Palm detected. Ignored.');
    E.found('t-palm');
  }
  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch') {
      touching[e.pointerId] = 1;
      if (Object.keys(touching).length >= 3) palm(e.clientX, e.clientY);
      return;
    }
    var now = Date.now();
    mash = mash.filter(function (m) { return now - m.t < 1600; });
    mash.push({ t: now, x: e.clientX, y: e.clientY });
    if (mash.length < 5) return;
    var xs = mash.map(function (m) { return m.x; }), ys = mash.map(function (m) { return m.y; });
    if (Math.max.apply(null, xs) - Math.min.apply(null, xs) + Math.max.apply(null, ys) - Math.min.apply(null, ys) >= 120) palm(e.clientX, e.clientY);
  });
  ['pointerup', 'pointercancel'].forEach(function (t) { document.addEventListener(t, function (e) { delete touching[e.pointerId]; }); });

  // ---------- T7 swipe: sideways over the top section (touchpad, Shift + mouse wheel, or a finger) ----------
  var hero = $('.hero'), swipeX = 0, swipeT = 0, swiped = 0;
  function swipe(dir) {
    var now = Date.now();
    if (now - swiped < 1500) return;
    swiped = now; swipeX = 0;
    E.toast((dir > 0 ? 'Swipe left: Backspace' : 'Swipe right: Enter') + ". Nothing happened. You're on a website.");
    E.found('t-swipe');
  }
  if (hero) {
    hero.addEventListener('wheel', function (e) {
      var unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerWidth : 1; // Firefox reports lines
      var dx = e.deltaX * unit, dy = e.deltaY * unit;
      if (!dx && e.shiftKey) { dx = dy; dy = 0; } // Shift + wheel scrolls sideways
      if (Math.abs(dx) <= Math.abs(dy)) return;
      e.preventDefault(); // no back or forward navigation from this swipe
      var now = Date.now();
      if (now - swipeT > 400) swipeX = 0;
      swipeT = now; swipeX += dx;
      if (Math.abs(swipeX) > 160) swipe(swipeX);
    }, { passive: false });
    var t0 = null;
    hero.addEventListener('touchstart', function (e) { var t = e.touches[0]; t0 = e.touches.length === 1 ? { x: t.clientX, y: t.clientY } : null; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (!t0) return;
      var t = e.changedTouches[0], dx = t.clientX - t0.x, dy = t.clientY - t0.y; t0 = null;
      if (Math.abs(dx) > 70 && Math.abs(dy) < Math.abs(dx) * 0.5) swipe(-dx);
    }, { passive: true });
  }

  // ---------- T8 mode timeout: 30 s without a touch ----------
  E.idle(30, function () {
    var p = document.createElement('div'); p.className = 'egg-pill'; p.setAttribute('role', 'status');
    p.textContent = 'Handwriting turned off after 30 seconds without a touch.';
    document.body.appendChild(p);
    setTimeout(function () { p.remove(); }, 4500);
    E.found('t-timeout');
  });

  // ---------- T9 fingerprint: hold still on the art for 3 s (or press and hold anywhere on a touch screen) ----------
  var WHORL = '<svg viewBox="0 0 90 110" aria-hidden="true"><path d="M45 55c0-4 4-6 6-3"/><path d="M38 58c-2-9 6-15 13-12s8 12 4 18"/><path d="M32 62c-4-14 6-26 19-24s17 18 11 30"/><path d="M26 66c-6-18 6-36 25-34s24 24 16 40"/><path d="M22 74c-9-22 5-46 30-44s30 30 18 52"/><path d="M24 88c-14-24-2-58 28-58s38 36 20 66"/></svg>';
  function fingerprint(x, y) {
    var f = document.createElement('div'); f.className = 'egg-finger';
    f.style.left = x + 'px'; f.style.top = y + 'px'; f.innerHTML = WHORL;
    document.body.appendChild(f); setTimeout(function () { f.remove(); }, 2600);
    E.toast("Lovely fingerprint. We don't keep it.");
    E.found('t-fingerprint');
  }
  E.longPress(document.body, 3000, function (e) {
    if (e.pointerType !== 'touch' || (art && art.contains(e.target))) return;
    fingerprint(e.clientX, e.clientY);
  });

  // ---------- T12 two finger tap: right-click the hero icon ----------
  var icon = $('.art .icon-big');
  if (icon && art) icon.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    art.classList.add('egg-quiet');
    setTimeout(function () { art.classList.remove('egg-quiet'); }, 1800);
    E.toast('Two finger tap. That turns a mode off.');
    E.found('t-twofinger');
  });

  // Breadcrumb: the number pad card's icon blinks once when it scrolls into view.
  var npCard = $$('#features .card').filter(function (c) { return /Number pad/.test(c.textContent); })[0];
  if (npCard && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      setTimeout(function () { var ic = $('.icon', npCard); if (ic) ic.classList.add('egg-blink'); }, 900);
    }, { threshold: 0.8 });
    io.observe(npCard);
  }

  // ---------- T13 the console ----------
  E.consoleHello(['Touchpads have feelings too.', 'Draw an S on the big icon at the top, or type numpad.'], 'tap', function () {
    return 'Tap. That was a click without clicking.';
  });
})();
