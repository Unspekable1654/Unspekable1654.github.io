// EasyNote page, Tape deck look: a cassette recorder in the hero (NT-C1), VU needles for You and Others (NT-C2) and a
// REC button that starts and stops it with a counter (NT-C3). It starts recording by itself unless calm, and rests
// while off screen. Loaded with defer, so it runs once the page is read. Styles in easynote-tape.css.
(function () {
  'use strict';
  var art = document.querySelector('.hero .art');
  if (!art) return;
  var calm = document.documentElement.classList.contains('calm');

  function reel(cx) {
    return '<circle cx="' + cx + '" cy="155" r="' + (cx < 200 ? 40 : 33) + '" fill="#4A3A2E"/><g class="reel"><circle cx="' + cx + '" cy="155" r="28" fill="#F4EAD6"/>' +
      '<circle cx="' + cx + '" cy="155" r="20" fill="none" stroke="#8C7B66" stroke-width="3" stroke-dasharray="7 6"/><circle cx="' + cx + '" cy="155" r="9" fill="#2F2724"/>' +
      '<rect x="' + (cx - 2) + '" y="128" width="4" height="12" fill="#8C7B66"/></g>';
  }
  function vu(n) {
    return '<div class="nt-vu">' + n + '<svg viewBox="0 0 100 50" aria-hidden="true"><path d="M10 46A40 40 0 0190 46" fill="none" stroke="#6B5A48" stroke-width="2"/>' +
      '<path d="M71 12A40 40 0 0190 46" fill="none" stroke="#C8452F" stroke-width="3"/><line class="needle" x1="50" y1="46" x2="50" y2="10" stroke="#2B2118" stroke-width="2" stroke-linecap="round"/></svg></div>';
  }
  var deck = document.createElement('div');
  deck.className = 'nt-deck';
  deck.innerHTML = '<svg class="nt-cass" viewBox="0 0 400 250" aria-hidden="true"><rect x="6" y="6" width="388" height="238" rx="18" fill="#D9CBB2"/>' +
    '<rect x="30" y="26" width="340" height="70" rx="6" fill="#F4EAD6"/><rect x="30" y="26" width="340" height="14" fill="#A768BA"/><rect x="30" y="40" width="340" height="7" fill="#E07A3F"/><rect x="30" y="47" width="340" height="5" fill="#F0B93A"/>' +
    '<text x="200" y="84" text-anchor="middle" font-family="Ink Free, Segoe Print, cursive" font-size="22" fill="#3A2E24">Team meeting, 21 Oct</text>' +
    '<rect x="70" y="112" width="260" height="86" rx="43" fill="#2F2724"/>' + reel(115) + reel(285) +
    '<rect x="160" y="140" width="80" height="30" rx="4" fill="#5A4636"/><path d="M120 244l20-34h120l20 34" fill="#C7B699"/></svg>' +
    '<div class="nt-vus">' + vu('YOU') + vu('OTHERS') + '<button type="button" class="nt-rec" aria-pressed="false" aria-label="Record">REC</button></div>' +
    '<div class="nt-ctr"><span>00:00:00</span><span>Ctrl+Alt+M</span></div>';
  art.appendChild(deck);
  art.classList.add('nt-on');
  art.removeAttribute('aria-hidden');

  var ctr = deck.querySelector('.nt-ctr span'), btn = deck.querySelector('.nt-rec'), sec = 0, tick = 0, onScreen = true;
  function hms(s) { return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(function (v) { return (v < 10 ? '0' : '') + v; }).join(':'); }
  function recording() { return deck.classList.contains('rec'); }
  // The counter only runs while recording, on screen and in a visible tab.
  function update() {
    var go = recording() && onScreen && !document.hidden;
    deck.classList.toggle('rest', !go);
    if (go && !tick) tick = setInterval(function () { sec++; ctr.textContent = hms(sec); }, 1000);
    if (!go && tick) { clearInterval(tick); tick = 0; }
  }
  function set(v) {
    deck.classList.toggle('rec', v);
    btn.textContent = v ? 'STOP' : 'REC';
    btn.setAttribute('aria-pressed', String(v));
    btn.setAttribute('aria-label', v ? 'Stop recording' : 'Record');
    update();
  }
  btn.addEventListener('click', function () { set(!recording()); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { onScreen = e[0].isIntersecting; update(); }).observe(deck);
  document.addEventListener('visibilitychange', update);
  if (!calm) set(true);
})();
