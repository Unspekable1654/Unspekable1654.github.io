// Shared behaviour for the Easy Suite app pages: motion switch, word reveals, scroll effects, card tilt.
(function () {
  var root = document.documentElement;
  var full = root.classList.contains('motion');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Footer switch: full motion or calm, remembered on this device only (shared by every page of the site).
  var sw = $('.motion-switch');
  if (sw) {
    sw.textContent = 'Animations: ' + (full ? 'full' : 'calm');
    sw.setAttribute('aria-pressed', full ? 'true' : 'false');
    sw.addEventListener('click', function () {
      try { localStorage.setItem('easysign-motion', full ? 'calm' : 'full'); } catch (e) { }
      location.reload();
    });
  }

  // Headings split into words; the statement keeps its highlighted words.
  $$('.split').forEach(function (el) {
    var i = 0;
    el.setAttribute('aria-label', el.textContent);
    el.innerHTML = el.textContent.split(/\s+/).map(function (w) { return '<span class="w" aria-hidden="true" style="--i:' + (i++) + '">' + w + '</span>'; }).join(' ');
  });
  $$('.split-words').forEach(function (el) {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    var out = [];
    Array.prototype.forEach.call(el.childNodes, function (n) {
      var hot = n.nodeType === 1;
      (n.textContent || '').split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        out.push(/^\s+$/.test(part) ? part : '<span class="w' + (hot ? ' hot' : '') + '" aria-hidden="true">' + part + '</span>');
      });
    });
    el.innerHTML = out.join('');
  });

  $$('.flourish path').forEach(function (p) { try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (e) { } });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  if (full && finePointer) {
    $$('.tilt').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        if (!c.classList.contains('in')) return;
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'rotateY(' + (x * 6).toFixed(2) + 'deg) rotateX(' + (-y * 6).toFixed(2) + 'deg)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }

  var bar = $('.progress'), header = $('header'), lastY = window.scrollY;
  var scene = $('.statement-scene'), words = $$('.statement .w');
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (full && header) header.classList.toggle('away', y > lastY && y > 200);
    lastY = y;
    if (full && scene) {
      var r = scene.getBoundingClientRect();
      var p = clamp(-r.top / Math.max(1, r.height - innerHeight), 0, 1);
      var lit = Math.round(p * 1.25 * words.length);
      words.forEach(function (w, i) { w.classList.toggle('on', i < lit); });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
