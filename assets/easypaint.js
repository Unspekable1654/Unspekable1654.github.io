// EasyPaint page: hero timelapse, surface picker, view tools, doodles.
(function () {
  var root = document.documentElement;
  var full = root.classList.contains('motion');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Hand-drawn doodles draw themselves when they come into view (needs each path's length).
  $$('.doodle path').forEach(function (p) { try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (e) { } });

  // S1: plays by itself with full animations; calm shows the finished picture with a play button.
  $$('.hero-paint video').forEach(function (v) {
    if (full) { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function () { v.controls = true; }); }
    else {
      v.removeAttribute('autoplay'); v.pause(); v.controls = true;
      // Show the finished picture, not the blank first frame.
      var toEnd = function () { try { v.currentTime = Math.max(0, v.duration - 0.05); } catch (e) { } };
      if (v.readyState >= 1) toEnd(); else v.addEventListener('loadedmetadata', toEnd, { once: true });
    }
  });

  // S3: surface picker; turns over by itself while on screen until someone picks one.
  var tabs = $$('.surface-tabs button'), imgs = $$('.surface-stage img'), about = $('.surface-about');
  function pick(i) {
    tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    imgs.forEach(function (im, k) { im.classList.toggle('on', k === i); });
    if (about) { about.querySelector('h3').textContent = tabs[i].textContent; about.querySelector('p').textContent = tabs[i].getAttribute('data-about'); }
  }
  var auto = null, cur = 0, picked = false;
  tabs.forEach(function (t, i) { t.addEventListener('click', function () { picked = true; clearInterval(auto); cur = i; pick(i); }); });
  if (tabs.length) {
    pick(0);
    var stage = $('.surface-stage');
    if (full && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          clearInterval(auto);
          if (e.isIntersecting && !picked) auto = setInterval(function () { cur = (cur + 1) % tabs.length; pick(cur); }, 2600);
        });
      }, { threshold: 0.4 }).observe(stage);
    }
  }

  // S4: turn, mirror, grey, squint: only the view changes, as in the app. Keys R, F, Shift+G work too.
  var view = $('.fresh-view');
  if (view) {
    var turn = 0, flip = false, grey = false, squint = false;
    var b = {}; $$('.fresh-tools button').forEach(function (x) { b[x.getAttribute('data-do')] = x; });
    function show() {
      view.style.setProperty('--turn', turn + 'deg');
      view.style.setProperty('--flip', flip ? -1 : 1);
      view.classList.toggle('grey', grey);
      view.classList.toggle('squint', squint);
      view.classList.toggle('changed', turn !== 0 || flip || grey || squint);
      if (b.flip) b.flip.setAttribute('aria-pressed', flip);
      if (b.grey) b.grey.setAttribute('aria-pressed', grey);
      if (b.squint) b.squint.setAttribute('aria-pressed', squint);
      if (b.turn) b.turn.setAttribute('aria-pressed', turn !== 0);
      var on = []; if (turn) on.push('turned'); if (flip) on.push('mirrored'); if (grey) on.push('grey'); if (squint) on.push('squint');
      $('.fresh-badge', view).textContent = on.join(', ') + ' (view only)';
    }
    function act(what) {
      if (what === 'turn') turn = (turn + 15) % 360;
      if (what === 'straight') turn = 0;
      if (what === 'flip') flip = !flip;
      if (what === 'grey') grey = !grey;
      if (what === 'squint') squint = !squint;
      show();
    }
    Object.keys(b).forEach(function (k) { b[k].addEventListener('click', function () { act(k); }); });
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.altKey || e.metaKey || /input|textarea|select/i.test(e.target.tagName)) return;
      var r = view.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return; // only while the picture is on screen
      if (e.key === 'r' || e.key === 'R') act('straight');
      else if (e.key === 'f' || e.key === 'F') act('flip');
      else if ((e.key === 'G' || e.key === 'g') && e.shiftKey) act('grey');
    });
    // Drag with Shift held to turn, as in the app (Shift+Space and drag there).
    var dragging = false, startA = 0, startTurn = 0;
    function angle(e) { var r = view.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
    view.addEventListener('pointerdown', function (e) { if (!e.shiftKey) return; dragging = true; startA = angle(e); startTurn = turn; view.setPointerCapture(e.pointerId); e.preventDefault(); });
    view.addEventListener('pointermove', function (e) { if (!dragging) return; turn = Math.round(startTurn + angle(e) - startA); show(); });
    view.addEventListener('pointerup', function () { dragging = false; });
    show();
  }
})();
