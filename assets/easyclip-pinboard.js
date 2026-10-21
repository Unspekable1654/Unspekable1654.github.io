// EasyClip page, Pinboard look: staggers the feature notes as they drop onto the board,
// and adds a small pinned screenshot that stays on top while you scroll (CL-C4). Styles in easyclip-pinboard.css.
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };

  // CL-C3: notes in the same row land one after another.
  Array.prototype.forEach.call(document.querySelectorAll('#features .card'), function (c, i) {
    c.style.setProperty('--delay', (i % 3) * 0.12 + 's');
  });

  // CL-C4: pinned screenshot, shown once the hero is scrolled past, hidden while Download is on screen.
  var hero = $('.hero'), download = $('#download');
  if (!hero) return;
  var unpinned = false;
  try { unpinned = sessionStorage.getItem('easyclip-unpinned') === '1'; } catch (e) { }
  if (unpinned) return;

  var pin = document.createElement('aside');
  pin.className = 'clip-pin';
  pin.setAttribute('aria-label', 'Pinned screenshot');
  pin.innerHTML = '<span class="tag">Pinned</span>' +
    '<img src="../images/easyclip/easyclip-editor.png" alt="" width="1100" height="704" loading="lazy" decoding="async">' +
    '<b>Stays on top while you scroll</b>' +
    '<button type="button" aria-label="Unpin">&times;</button>';
  document.body.appendChild(pin);

  var queued = false;
  function check() {
    queued = false;
    var pastHero = hero.getBoundingClientRect().bottom < 0;
    var atDownload = download && download.getBoundingClientRect().top < innerHeight;
    pin.classList.toggle('on', pastHero && !atDownload);
  }
  function onScroll() { if (!queued) { queued = true; requestAnimationFrame(check); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  check();

  pin.querySelector('button').addEventListener('click', function () {
    removeEventListener('scroll', onScroll);
    removeEventListener('resize', onScroll);
    pin.classList.remove('on');
    setTimeout(function () { pin.remove(); }, 400);
    try { sessionStorage.setItem('easyclip-unpinned', '1'); } catch (e) { }
  });
})();
