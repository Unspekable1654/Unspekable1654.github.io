// EasyTouch page, Neon writing look: the neon sum on a touchpad in the hero (TC-B1), a soft glow that follows the
// pointer (TC-B2) and a glowing glyph on each feature card (TC-B3). Styles in easytouch-neon.css.
(function () {
  'use strict';
  var root = document.documentElement, calm = root.classList.contains('calm');

  // TC-B1: the pad sits inside the hero art, so drawing on the art (an egg) still works over it.
  var art = document.querySelector('.hero .art');
  if (art) {
    var pad = document.createElement('div');
    pad.className = 'tc-pad';
    pad.innerHTML = '<svg class="tc-hw" viewBox="0 0 420 130" role="img" aria-label="12 x 7 = 84 written by hand">' +
      '<text class="sum" x="8" y="96">12 x 7 =</text><text class="ans" x="300" y="96">84</text></svg>' +
      '<small>Write on your touchpad. EasyTouch types it.</small>';
    art.insertBefore(pad, art.firstChild);
    // Rest the neon when the hero is off screen.
    if (!calm && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { pad.classList.toggle('paused', !e[0].isIntersecting); }).observe(pad);
    }
  }

  // TC-B3: one hand-drawn glyph per feature, by name; the icon box stays (an egg blinks it).
  var glyphs = [[/Handwriting/, 'Hi'], [/Gestures/, 'S'], [/Number pad/, '84'], [/Screen pen/, '~'], [/Palm/, '//'], [/NumberPad/, '+']];
  Array.prototype.forEach.call(document.querySelectorAll('#features .card'), function (c) {
    var h = c.querySelector('h3'), icon = c.querySelector('.icon');
    if (!h || !icon) return;
    var g = null;
    glyphs.forEach(function (x) { if (x[0].test(h.textContent)) g = x[1]; });
    if (!g) return;
    var s = document.createElement('span');
    s.className = 'tc-gly'; s.setAttribute('aria-hidden', 'true'); s.textContent = g;
    icon.appendChild(s); icon.classList.add('tc-has');
  });

  // TC-B2: soft glow under a mouse or pen, moved with transform so only the glow repaints.
  if (calm || !matchMedia('(pointer: fine)').matches) return;
  var glow = document.createElement('div');
  glow.className = 'tc-glow'; glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);
  var x = 0, y = 0, queued = false;
  function place() { queued = false; glow.style.transform = 'translate(' + x + 'px,' + y + 'px)'; }
  addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    x = e.clientX; y = e.clientY;
    glow.classList.add('on');
    if (!queued) { queued = true; requestAnimationFrame(place); }
  }, { passive: true });
  document.addEventListener('pointerleave', function () { glow.classList.remove('on'); });
})();
