// EasyGuard page, Cafe look: a cafe scene in the hero where a stranger walks up behind you (GD-C1), the laptop
// blurs and a shield shows only while EasyGuard is on (GD-C2), a switch that starts off (GD-C3), and chips above
// the features to pick the apps where it blurs (GD-C4). Plays by itself only while the scene is on screen.
// Styles in easyguard-cafe.css.
(function () {
  'use strict';
  var grid = document.querySelector('.hero .hero-grid');
  if (!grid) return;
  var calm = document.documentElement.classList.contains('calm');

  var scene = document.createElement('div');
  scene.className = 'gd-scene';
  scene.innerHTML = '<svg class="gd-cafe" viewBox="0 0 900 360" role="img" aria-label="A person at a cafe table with a laptop, and someone walking up behind them">' +
    '<defs><filter id="gd-blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="4"/></filter></defs>' +
    '<rect width="900" height="360" fill="#E3EBD8"/>' +
    '<rect x="590" y="28" width="270" height="180" rx="6" fill="#CFE2EA"/><path d="M725 28v180M590 118h270" stroke="#F1F4EC" stroke-width="8"/>' +
    '<rect x="40" y="70" width="170" height="10" rx="3" fill="#B9A68A"/><rect x="60" y="40" width="26" height="30" rx="4" fill="#D97757"/><rect x="96" y="48" width="22" height="22" rx="11" fill="#6C942F"/><rect x="128" y="36" width="18" height="34" rx="3" fill="#E0A458"/>' +
    '<rect y="330" width="900" height="30" fill="#CDBFA6"/>' +
    '<g class="str"><circle cx="640" cy="120" r="28" fill="#6B5B4E"/><path d="M590 330V230c0-50 22-74 50-76 28 2 50 26 50 76v100z" fill="#8A7766"/><circle cx="626" cy="118" r="4" fill="#fff"/><circle cx="642" cy="118" r="4" fill="#fff"/><rect x="584" y="214" width="22" height="28" rx="4" fill="#fff"/></g>' +
    '<rect x="150" y="256" width="520" height="12" rx="4" fill="#8B6A4A"/><rect x="180" y="268" width="12" height="62" fill="#7A5B3E"/><rect x="628" y="268" width="12" height="62" fill="#7A5B3E"/>' +
    '<circle cx="230" cy="150" r="30" fill="#3F4A35"/><path d="M182 256c2-50 20-74 48-76 30 2 48 26 50 76z" fill="#5E7C3A"/><path d="M262 214l70 30" stroke="#5E7C3A" stroke-width="16" stroke-linecap="round"/>' +
    '<path d="M320 256h170l-10-6H330z" fill="#9AA38E"/><rect x="352" y="146" width="124" height="104" rx="7" fill="#2E3627"/>' +
    '<g class="lscr"><rect x="360" y="154" width="108" height="88" rx="3" fill="#fff"/><rect x="370" y="166" width="70" height="8" rx="4" fill="#5E7C3A"/><rect x="370" y="184" width="86" height="6" rx="3" fill="#D9DED2"/><rect x="370" y="198" width="74" height="6" rx="3" fill="#D9DED2"/><rect x="370" y="212" width="86" height="6" rx="3" fill="#D9DED2"/><rect x="370" y="226" width="50" height="6" rx="3" fill="#D9DED2"/></g>' +
    '<g class="shield"><path d="M414 172l26 10v19c0 16-12 25-26 29-14-4-26-13-26-29v-19z" fill="#6C942F"/><path d="M403 201l8 8 15-16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>' +
    '<rect x="540" y="230" width="34" height="26" rx="5" fill="#fff"/><path d="M574 236c12 0 12 14 0 14" fill="none" stroke="#fff" stroke-width="5"/>' +
    '</svg><div class="gd-ctrls"><button type="button" data-b="on" aria-pressed="false"><span class="lt"></span>EasyGuard</button>' +
    '<button type="button" data-b="walk">Someone walks by</button></div><p class="gd-stat" aria-live="polite"></p>';
  grid.appendChild(scene);
  grid.classList.add('gd-on');

  var str = scene.querySelector('.str'), scr = scene.querySelector('.lscr'), sh = scene.querySelector('.shield'),
    st = scene.querySelector('.gd-stat'), bOn = scene.querySelector('[data-b=on]'), bW = scene.querySelector('[data-b=walk]');
  var onG = false, busy = false, timers = [];
  function later(f, ms) { timers.push(setTimeout(f, ms)); }
  function stat() { st.textContent = onG ? 'EasyGuard is on. It blurs the screen when a second face appears.' : 'EasyGuard is off. It stays off until you turn it on.'; }
  function setOn(v) { onG = v; bOn.setAttribute('aria-pressed', String(v)); if (!busy) stat(); }
  function reset() { str.classList.remove('in'); scr.removeAttribute('filter'); sh.classList.remove('on'); busy = false; stat(); }
  function walk() {
    if (busy) return;
    busy = true; str.classList.add('in');
    later(function () {
      if (onG) { scr.setAttribute('filter', 'url(#gd-blur)'); sh.classList.add('on'); st.textContent = 'Someone is looking. The screen is blurred.'; }
      else st.textContent = 'EasyGuard is off, so they can read your screen.';
    }, calm ? 300 : 1100);
    later(function () { str.classList.remove('in'); }, 3400);
    later(reset, 4400);
  }
  stat();
  bOn.addEventListener('click', function () { setOn(!onG); });
  bW.addEventListener('click', walk);

  // GD-C4: the apps where it blurs (the real app guards chosen apps, so a film never blurs).
  var feats = document.querySelector('#features .features');
  if (feats) {
    var chips = document.createElement('div');
    chips.className = 'gd-chips';
    chips.innerHTML = '<span>Blur in:</span>' + [['Browser', 1], ['Email', 1], ['Excel', 1], ['Films', 0], ['Games', 0]].map(function (p) {
      return '<button type="button" aria-pressed="' + !!p[1] + '">' + p[0] + '<span>' + (p[1] ? 'on' : 'off') + '</span></button>';
    }).join('');
    feats.parentNode.insertBefore(chips, feats);
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var v = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(v)); b.lastChild.textContent = v ? 'on' : 'off';
    });
  }

  // Plays by itself (a walk past while off, then on, then a walk every 6.5 s) only while the scene is in view.
  if (calm) return;
  var loop = 0, running = false, autoOn = false, onScreen = true;
  function start() {
    if (running) return; running = true;
    later(walk, 1000);
    if (!autoOn) later(function () { autoOn = true; setOn(true); }, 5600);
    loop = setInterval(walk, 6500);
  }
  function stop() { if (!running) return; running = false; clearInterval(loop); timers.forEach(clearTimeout); timers = []; reset(); }
  function update() { if (onScreen && !document.hidden) start(); else stop(); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { onScreen = e[0].isIntersecting; update(); }).observe(scene);
  document.addEventListener('visibilitychange', update);
  update();
})();
