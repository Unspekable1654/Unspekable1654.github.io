// Easy Suite hub: easter eggs. Uses the shared engine in eggs.js.
(function () {
  var E = window.Eggs; if (!E) return;
  var $ = E.$, $$ = E.$$, full = E.full;

  E.css('' +
    '.hard-mode main{transform:rotate(1.6deg);transform-origin:50% 0;transition:transform .5s}' +
    '.hard-mode .btn{animation:egg-wobble .5s ease-in-out infinite}' +
    '@keyframes egg-wobble{25%{transform:rotate(-3deg)}75%{transform:rotate(3deg)}}' +
    'html.calm .hard-mode .btn{animation:none}' +
    '.egg-hanger{position:absolute;right:max(16px,calc((100vw - 1120px)/2 + 24px));top:58px;z-index:25;width:150px;padding:30px 12px 14px;border-radius:14px 14px 10px 10px;background:#B8322A;color:#FFF7EC;text-align:center;font:700 .95rem/1.25 Georgia,serif;cursor:pointer;transform-origin:50% 0;border:0}' +
    '.egg-hanger::before{content:"";position:absolute;left:50%;top:9px;width:26px;height:26px;margin-left:-13px;border-radius:50%;background:var(--surface,#FAF9F5);box-shadow:inset 0 0 0 2px #8E1F17}' +
    '.egg-hanger small{display:block;margin-top:6px;font:600 .72rem "Segoe UI",sans-serif;opacity:.9}' +
    'html.motion .egg-hanger{animation:egg-swing 2.6s cubic-bezier(.3,0,.3,1) both}' +
    '@keyframes egg-swing{0%{transform:rotate(-38deg);opacity:0}25%{transform:rotate(22deg);opacity:1}45%{transform:rotate(-12deg)}65%{transform:rotate(6deg)}82%{transform:rotate(-2deg)}100%{transform:none}}' +
    '.egg-elevator{position:fixed;right:22px;bottom:84px;z-index:50;display:flex;align-items:center;gap:10px;padding:10px 16px 10px 10px;border-radius:999px;border:1px solid #8C6A2E;background:#2B241A;color:#F2D9A6;font:600 .9rem "Segoe UI",sans-serif;cursor:pointer;animation:egg-rise .4s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-elevator span{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#F7E3B5,#C9A227);color:#2B241A;font-size:.8rem}' +
    '.egg-plane{position:fixed;z-index:58;width:46px;height:46px;pointer-events:none}' +
    '.zero.plane-hint{cursor:pointer}.zero.plane-hint:hover b{text-shadow:6px 6px 0 rgba(201,100,66,.18)}' +
    '.tile.asleep img{filter:saturate(.35) brightness(.92);transform:scale(.94) rotate(-4deg)}' +
    '.tile .zz{position:absolute;right:10px;top:6px;font:italic 700 .9rem Georgia,serif;color:var(--link,#AE5433);pointer-events:none}' +
    'html.motion .tile .zz{animation:egg-zz 2.4s ease-in-out infinite}@keyframes egg-zz{0%{opacity:0;transform:translate(0,6px) scale(.8)}50%{opacity:1}100%{opacity:0;transform:translate(8px,-14px) scale(1.2)}}' +
    '.tile{position:relative}.tile.stretch img{animation:egg-stretch .6s ease}@keyframes egg-stretch{40%{transform:scale(1.12,.9)}70%{transform:scale(.95,1.08)}}' +
    '.tile .job{position:absolute;inset:0;display:grid;place-items:center;padding:10px;border-radius:18px;background:var(--accent,#C96442);color:#fff;font:600 .8rem/1.3 "Segoe UI",sans-serif;text-align:center}' +
    '.tile.dragging{z-index:30;cursor:grabbing;animation:none !important;transition:none !important;box-shadow:0 0 0 2px var(--accent,#C96442)}' +
    '.tile.drop-target{border-color:var(--accent,#C96442);transform:scale(1.06) !important}' +
    '.egg-fused{position:fixed;z-index:58;display:grid;justify-items:center;gap:6px;padding:16px 18px;border-radius:18px;background:linear-gradient(90deg,var(--surface,#FAF9F5) 50%,var(--accent-soft,#F5E6DD) 50%);border:2px solid var(--accent,#C96442);font:600 .95rem "Segoe UI",sans-serif;color:var(--text,#1F1E1D);pointer-events:none;transform:translate(-50%,-50%)}' +
    '.egg-fused .pair{display:flex}.egg-fused .pair img{width:40px;height:40px}.egg-fused .pair img+img{margin-left:-14px}' +
    'html.motion .egg-fused{animation:egg-fuse 2.6s cubic-bezier(.2,.7,.2,1) both}@keyframes egg-fuse{0%{transform:translate(-50%,-50%) scale(.3) rotate(-10deg);opacity:0}15%{transform:translate(-50%,-50%) scale(1.12) rotate(3deg);opacity:1}25%{transform:translate(-50%,-50%) scale(1)}85%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(1.4);opacity:0}}' +
    '.egg-progress{margin-top:12px;height:10px;border-radius:999px;background:var(--surface-alt,#F0EEE6);overflow:hidden}.egg-progress i{display:block;height:100%;width:0;background:var(--accent,#C96442);transition:width 2s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-progress-note{margin-top:6px;font-size:.85rem;color:var(--muted,#5B5A55)}' +
    '.flourish{cursor:pointer}.flourish-wrap{position:relative}' +
    '.egg-easyword{display:block;width:min(380px,80%);height:auto;margin:12px 0 0;overflow:visible}' +
    '.egg-easyword text{font:72px "Segoe Script","Brush Script MT","Lucida Handwriting",cursive;fill:none;stroke:var(--accent,#C96442);stroke-width:1.6}' +
    '.egg-ps{margin-top:12px;font-size:1.02rem;color:#5B5A55}');

  // ---------- H1 tile shuffle (the live logo egg) counts in the passport ----------
  var brand = $('.brand');
  if (brand) E.multiClick(brand, 5, 1500, function () { E.found('h-shuffle'); });

  // ---------- H2 easy mode / H3 hard mode ----------
  var h1 = $('.hero h1');
  var h1Html = h1 ? h1.innerHTML : '';
  var busyHead = false;
  function setHead(text, done) {
    if (!h1) return;
    h1.style.transition = 'opacity .25s';
    h1.style.opacity = 0;
    setTimeout(function () { h1.innerHTML = text; h1.style.opacity = 1; if (done) done(); }, 260);
  }
  E.word('easy', function () {
    if (busyHead || !h1) return;
    busyHead = true;
    E.chip('Easy mode', 4600);
    setHead('Small apps. Easy jobs.');
    setTimeout(function () { setHead('Apps. Easy.'); }, 1400);
    setTimeout(function () { setHead('Easy.'); }, 2800);
    setTimeout(function () { setHead(h1Html, function () { busyHead = false; }); }, 4400);
    E.found('h-easy');
  });
  E.word('hard', function () {
    if (busyHead || !h1) return;
    busyHead = true;
    document.body.classList.add('hard-mode');
    setHead('Large apps for jobs that should be difficult.');
    E.chip('Hard mode', 3200);
    setTimeout(function () {
      E.toast('Hard mode is not supported. Returning to easy.');
      document.body.classList.remove('hard-mode');
      setHead(h1Html, function () { busyHead = false; });
    }, 3200);
    E.found('h-hard');
  });

  // ---------- H4 app fusion: drag one tile onto another ----------
  var tiles = $$('.tile');
  tiles.forEach(function (t) {
    t.setAttribute('draggable', 'false');
    $$('img', t).forEach(function (im) { im.setAttribute('draggable', 'false'); });
  });
  function tileName(t) { return (t.childNodes[1] && t.childNodes[1].nodeType === 3 ? t.childNodes[1].textContent : t.textContent).trim().replace(/(Available|Coming soon|In the lab)$/, '').trim(); }
  var drag = null, suppressClick = false;
  tiles.forEach(function (t) {
    t.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      drag = { el: t, x: e.clientX, y: e.clientY, on: false, over: null, id: e.pointerId };
    });
  });
  window.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.on && Math.hypot(dx, dy) > 10) {
      drag.on = true;
      drag.el.classList.add('dragging');
      try { drag.el.setPointerCapture(e.pointerId); } catch (err) { }
    }
    if (!drag.on) return;
    e.preventDefault();
    drag.el.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + E.clamp(dx / 20, -8, 8) + 'deg)';
    var over = null;
    tiles.forEach(function (o) {
      if (o === drag.el) return;
      var r = o.getBoundingClientRect();
      if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) over = o;
    });
    if (over !== drag.over) {
      if (drag.over) drag.over.classList.remove('drop-target');
      if (over) over.classList.add('drop-target');
      drag.over = over;
    }
  }, { passive: false });
  window.addEventListener('pointerup', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var d = drag; drag = null;
    if (!d.on) return;
    suppressClick = true;
    setTimeout(function () { suppressClick = false; }, 50);
    d.el.classList.remove('dragging');
    d.el.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1)';
    d.el.style.transform = '';
    setTimeout(function () { d.el.style.transition = ''; }, 500);
    if (!d.over) return;
    d.over.classList.remove('drop-target');
    fuse(d.el, d.over);
  });
  tiles.forEach(function (t) { t.addEventListener('click', function (e) { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } }, true); });
  function fuse(a, b) {
    var r = b.getBoundingClientRect(), na = tileName(a), nb = tileName(b);
    var el = document.createElement('div');
    el.className = 'egg-fused';
    el.innerHTML = '<span class="pair"><img alt="" src="' + $('img', a).src + '"><img alt="" src="' + $('img', b).src + '"></span>' + na + nb.replace(/^Easy/, '');
    el.style.left = (r.left + r.width / 2) + 'px';
    el.style.top = (r.top + r.height / 2) + 'px';
    document.body.appendChild(el);
    E.sound('pop');
    setTimeout(function () { E.toast('Merging apps is my job. But nice try.'); }, 700);
    setTimeout(function () { el.remove(); }, full ? 2700 : 1800);
    E.found('h-fusion');
  }

  // ---------- H5 room service ----------
  var hanger = null;
  E.word('suite', function () {
    E.sound('ding');
    if (hanger) return;
    var header = $('header');
    hanger = document.createElement('button');
    hanger.type = 'button';
    hanger.className = 'egg-hanger';
    hanger.innerHTML = 'Do not disturb<small>Room service is not available. The apps are.</small>';
    hanger.setAttribute('aria-label', 'Do not disturb sign. Click to take it off.');
    hanger.addEventListener('click', function () { hanger.remove(); hanger = null; E.toast('Housekeeping can come in now.'); });
    header.appendChild(hanger);
    E.found('h-suite');
  });

  // ---------- H6 elevator: keep scrolling at the very bottom ----------
  var bottomTries = [], elevator = null;
  function atBottom() { return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4; }
  function tryDown() {
    if (!atBottom() || elevator) return;
    var now = Date.now();
    bottomTries = bottomTries.filter(function (t) { return now - t < 4000; });
    bottomTries.push(now);
    if (bottomTries.length < 5) return;
    bottomTries = [];
    elevator = document.createElement('button');
    elevator.type = 'button';
    elevator.className = 'egg-elevator';
    elevator.innerHTML = '<span aria-hidden="true">&#9650;</span>Going up';
    elevator.addEventListener('click', function () {
      E.sound('ding');
      window.scrollTo({ top: 0, behavior: full ? 'smooth' : 'auto' });
      elevator.remove(); elevator = null;
      setTimeout(function () { E.toast('Ground floor. Apps, privacy, and a very nice lobby.'); }, full ? 900 : 100);
    });
    document.body.appendChild(elevator);
    E.found('h-elevator');
  }
  var wheelGate = 0;
  window.addEventListener('wheel', function (e) { if (e.deltaY > 0 && Date.now() - wheelGate > 250) { wheelGate = Date.now(); tryDown(); } }, { passive: true });
  var touchY = null;
  window.addEventListener('touchstart', function (e) { touchY = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', function (e) { if (touchY !== null && e.changedTouches[0].clientY < touchY - 30) tryDown(); touchY = null; }, { passive: true });
  window.addEventListener('keydown', function (e) { if ((e.key === 'PageDown' || e.key === 'ArrowDown' || e.key === 'End' || e.key === ' ') && !E.inField(e.target)) tryDown(); });

  // ---------- H7 paper plane from the "0 files uploaded" counter ----------
  var PLANE = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 24 44 6 34 42 24 30z" fill="#FAF9F5" stroke="#C96442" stroke-width="2.4" stroke-linejoin="round"/><path d="M44 6 24 30v10" fill="none" stroke="#C96442" stroke-width="2.4" stroke-linejoin="round"/></svg>';
  var BALL = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 20l6-8 10 2 8 6-2 10-8 6-10-2-6-8z" fill="#F0EEE6" stroke="#C96442" stroke-width="2.4" stroke-linejoin="round"/><path d="M18 12l4 10 10-2M14 30l10-8 6 10" fill="none" stroke="#C96442" stroke-width="1.6"/></svg>';
  var planeBusy = false;
  $$('.zero').forEach(function (z) {
    if (!/uploaded/.test(z.textContent)) return;
    z.classList.add('plane-hint');
    z.addEventListener('click', function () {
      if (planeBusy) return;
      planeBusy = true;
      var r = z.getBoundingClientRect();
      var p = document.createElement('div');
      p.className = 'egg-plane'; p.innerHTML = PLANE;
      var sx = r.left + r.width / 2 - 23, sy = r.top + r.height / 2 - 23, wall = window.innerWidth - 60;
      p.style.left = sx + 'px'; p.style.top = sy + 'px';
      document.body.appendChild(p);
      E.sound('whoosh');
      var finish = function () {
        p.innerHTML = BALL;
        E.sound('thud');
        var drop = p.animate([{ transform: 'translate(' + (wall - sx) + 'px,' + (-120) + 'px)' }, { transform: 'translate(0,0) scale(.6)', opacity: 0.2 }], { duration: full ? 900 : 300, easing: 'cubic-bezier(.5,0,.7,.4)', fill: 'forwards' });
        drop.onfinish = function () { p.remove(); planeBusy = false; };
        E.toast('Nothing leaves your PC. Not even this.');
      };
      E.found('h-plane');
      if (!full) { setTimeout(finish, 200); return; }
      var fly = p.animate([
        { transform: 'translate(0,0) rotate(0)' },
        { transform: 'translate(' + ((wall - sx) * 0.6) + 'px,-160px) rotate(-12deg)', offset: 0.6 },
        { transform: 'translate(' + (wall - sx) + 'px,-120px) rotate(8deg)' }], { duration: 1100, easing: 'cubic-bezier(.3,.1,.5,1)', fill: 'forwards' });
      fly.onfinish = function () {
        var bonk = p.animate([{ transform: 'translate(' + (wall - sx) + 'px,-120px) rotate(8deg)' }, { transform: 'translate(' + (wall - sx - 18) + 'px,-110px) rotate(-30deg) scale(.9)' }, { transform: 'translate(' + (wall - sx) + 'px,-120px) scale(.8)' }], { duration: 300, fill: 'forwards' });
        bonk.onfinish = finish;
      };
    });
  });

  // ---------- H8 nap time ----------
  E.idle(60, function () {
    var tl = $('.tiles'); if (!tl) return null;
    tiles.forEach(function (t, i) {
      setTimeout(function () {
        if (t.classList.contains('awake-now')) return;
        t.classList.add('asleep');
        if (!$('.zz', t)) { var z = document.createElement('span'); z.className = 'zz'; z.textContent = 'z'; z.setAttribute('aria-hidden', 'true'); t.appendChild(z); }
      }, i * (full ? 450 : 0));
    });
    E.found('h-nap');
    return function wake() {
      tiles.forEach(function (t) {
        t.classList.remove('asleep');
        var z = $('.zz', t); if (z) z.remove();
        t.classList.add('stretch');
        setTimeout(function () { t.classList.remove('stretch'); }, 700);
      });
    };
  }, true);

  // ---------- H9 real job titles (hold Shift over a tile) ----------
  var JOBS = { EasySign: 'Ink enthusiast', EasyPDF: 'Page wrangler', EasyClip: 'Professional hoarder', EasyFile: 'Label maker',
    EasyTouch: 'Finger whisperer', EasyGuard: 'Designated looker outer' };
  var hoverTile = null, shiftDown = false;
  function showJob(t, on) {
    var j = $('.job', t);
    if (on && !j) {
      j = document.createElement('span'); j.className = 'job'; j.setAttribute('aria-hidden', 'true');
      j.textContent = tileName(t) + ': ' + (JOBS[tileName(t)] || 'Mystery');
      t.appendChild(j);
      E.found('h-jobs');
    } else if (!on && j) j.remove();
  }
  tiles.forEach(function (t) {
    t.addEventListener('mouseenter', function (e) { hoverTile = t; if (e.shiftKey || shiftDown) showJob(t, true); });
    t.addEventListener('mouseleave', function () { showJob(t, false); if (hoverTile === t) hoverTile = null; });
  });
  window.addEventListener('keydown', function (e) { if (e.key === 'Shift') { shiftDown = true; if (hoverTile) showJob(hoverTile, true); } });
  window.addEventListener('keyup', function (e) { if (e.key === 'Shift') { shiftDown = false; if (hoverTile) showJob(hoverTile, false); } });

  // ---------- H10 coming sooner ----------
  var SOONER = ['Coming sooner', 'Coming any minute', 'Okay, coming soon.'];
  $$('.tile .st, .chip.soon, .chip.lab').forEach(function (s) {
    if (!/Coming soon|In the lab/.test(s.textContent)) return;
    var orig = s.textContent, timer = 0, cycle = 0;
    s.addEventListener('mouseenter', function () {
      clearTimeout(timer); clearTimeout(cycle);
      timer = setTimeout(function step(i) {
        i = i || 0;
        s.textContent = SOONER[i];
        if (i === 0) E.found('h-sooner');
        if (i < SOONER.length - 1) cycle = setTimeout(function () { step(i + 1); }, 1300);
      }, 5000);
    });
    s.addEventListener('mouseleave', function () { clearTimeout(timer); clearTimeout(cycle); s.textContent = orig; });
  });
  // Tile statuses are small; hovering the tile counts too.
  tiles.forEach(function (t) {
    var st = $('.st', t); if (!st || !/Coming soon|In the lab/.test(st.textContent)) return;
    t.addEventListener('mouseenter', function () { st.dispatchEvent(new Event('mouseenter')); });
    t.addEventListener('mouseleave', function () { st.dispatchEvent(new Event('mouseleave')); });
  });

  // ---------- H11 honest progress (click a coming soon or lab card's icon 3 times) ----------
  $$('.app').forEach(function (card) {
    if (!$('.chip.soon, .chip.lab', card)) return;
    var icon = $('.app-head img', card); if (!icon) return;
    icon.style.cursor = 'pointer';
    E.multiClick(icon, 3, 1500, function () {
      if ($('.egg-progress', card)) return;
      var bar = document.createElement('div'); bar.className = 'egg-progress'; bar.innerHTML = '<i></i>';
      var note = document.createElement('div'); note.className = 'egg-progress-note'; note.textContent = 'Building...';
      var head = $('.app-head', card);
      head.parentNode.insertBefore(note, head.nextSibling);
      head.parentNode.insertBefore(bar, note);
      requestAnimationFrame(function () { requestAnimationFrame(function () { $('i', bar).style.width = '87%'; }); });
      setTimeout(function () { note.textContent = '87 %. The last 13 % takes 87 % of the time.'; }, 2100);
      setTimeout(function () { bar.remove(); note.remove(); }, 9000);
      E.found('h-progress');
    });
  });

  // ---------- H12 flourish untangled ----------
  var flourish = $('.hero .flourish');
  if (flourish) {
    E.multiClick(flourish, 3, 1500, function () {
      if (flourish.dataset.busy) return;
      flourish.dataset.busy = '1';
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 420 90'); svg.setAttribute('class', 'egg-easyword'); svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = '<text x="10" y="70">easy</text>';
      var path = $('path', flourish);
      path.style.transformBox = 'fill-box'; path.style.transformOrigin = 'center';
      var anim = path.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(.05)' }], { duration: full ? 600 : 200, fill: 'forwards' });
      anim.onfinish = function () {
        flourish.style.display = 'none';
        flourish.parentNode.insertBefore(svg, flourish.nextSibling);
        var text = $('text', svg), len = 900;
        text.style.strokeDasharray = len; text.style.strokeDashoffset = len;
        text.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: full ? 1800 : 400, fill: 'forwards' });
        setTimeout(function () {
          svg.remove(); flourish.style.display = '';
          path.animate([{ transform: 'scaleY(.05)' }, { transform: 'scaleY(1)' }], { duration: full ? 600 : 200, fill: 'forwards' });
          delete flourish.dataset.busy;
        }, 3600);
      };
      E.found('h-flourish');
    });
  }

  // ---------- H13 postscript ----------
  var note = $('#note blockquote');
  if (note) {
    note.addEventListener('click', function (e) {
      if (e.detail !== 3 || $('.egg-ps', note)) return;
      var ps = document.createElement('div'); ps.className = 'egg-ps';
      var by = $('.by', note);
      note.insertBefore(ps, by);
      var text = 'P.S. EasyGuard made me check over my shoulder while writing this.', i = 0;
      (function type() { ps.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(type, full ? 28 : 0); })();
      E.found('h-ps');
    });
  }

  // ---------- H14 console ----------
  E.consoleHello([
    'Hello, curious person. No trackers here, just apps.',
    'Every page on this site hides something. About a hundred secrets in all.',
    'Try typing easy, hard or suite on this page. Type passport to see what you have found.'
  ], 'easy', function () {
    console.log('%cSecret: every app has a nickname. Hold Shift over a tile to see it.', 'font:13px "Segoe UI",sans-serif;color:#AE5433');
    return 'Easy does it.';
  });
})();
