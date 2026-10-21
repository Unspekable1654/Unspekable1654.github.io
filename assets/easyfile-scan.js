// EasyFile page, Scan beam look (SC-A1 to SC-A3): a scanner light sweeps a crooked grey page, the page is found,
// snaps straight and clean, and the tidy name types itself under the old one. Runs only while the hero is on screen.
// Styles in easyfile-scan.css.
(function () {
  'use strict';
  var art = document.querySelector('.hero .art');
  if (!art) return;
  var NAME = '→ 2026-09 Quill Energy Invoice QE-1024.pdf';
  var calm = document.documentElement.classList.contains('calm');

  var box = document.createElement('div');
  box.innerHTML = '<div class="sc-scan"><div class="sc-page"><b>INVOICE</b><small>Quill Energy</small>' +
    [90, 70, 80, 40, 90, 60].map(function (w) { return '<i style="width:' + w + '%"></i>'; }).join('') +
    '</div><div class="sc-beam"></div></div><p class="sc-fname"><span>IMG_4021.jpg</span><br><span class="sc-new"></span></p>';
  var bits = document.createDocumentFragment();
  while (box.firstChild) bits.appendChild(box.firstChild);
  art.insertBefore(bits, art.firstChild);

  var page = art.querySelector('.sc-page'), beam = art.querySelector('.sc-beam'), out = art.querySelector('.sc-new');
  if (calm) { page.classList.add('clean'); out.textContent = NAME; return; }

  var timers = [], typing = 0, loop = 0, running = false;
  function clear() { timers.forEach(clearTimeout); timers = []; clearInterval(typing); }
  function cycle() {
    clear();
    page.className = 'sc-page'; out.textContent = '';
    beam.classList.remove('go'); void beam.offsetWidth; beam.classList.add('go');
    timers.push(setTimeout(function () { page.classList.add('found'); }, 700));
    timers.push(setTimeout(function () { page.classList.remove('found'); page.classList.add('clean'); }, 1400));
    timers.push(setTimeout(function () {
      var i = 0;
      typing = setInterval(function () { out.textContent = NAME.slice(0, ++i); if (i >= NAME.length) clearInterval(typing); }, 35);
    }, 2100));
  }
  function start() { if (running) return; running = true; timers.push(setTimeout(cycle, 400)); loop = setInterval(cycle, 7000); }
  function stop() {
    if (!running) return; running = false; clearInterval(loop); clear();
    page.className = 'sc-page clean'; out.textContent = NAME; beam.classList.remove('go');
  }

  var onScreen = true;
  function update() { if (onScreen && !document.hidden) start(); else stop(); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { onScreen = e[0].isIntersecting; update(); }).observe(art);
  }
  document.addEventListener('visibilitychange', update);
  update();
})();
