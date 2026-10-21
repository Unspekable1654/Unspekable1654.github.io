// Easy Suite hub, A day with Easy Suite look: a section under the hero where you scroll through a day. The clock
// winds to each moment (SU-C1), the sky changes from morning to evening (SU-C2), each moment lights up with the app
// that helps (SU-C3), and a count closes the day (SU-C4). App names and icons come from the page's own tiles, so a
// renamed app stays right. Loaded with defer. Styles in hub-day.css.
(function () {
  'use strict';
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var calm = document.documentElement.classList.contains('calm');

  // [time, page, name if no tile, accent, sky, moment, what the app does ({n} is the app name), coming soon]
  var DAY = [
    ['08:40', 'easysign/', 'EasySign', '#0092BD', '#F9DDB1', 'A contract lands in your inbox.', 'Sign it with your finger on the touchpad and send it back before your coffee is cold.'],
    ['09:15', 'easypdf/', 'EasyPDF', '#CA5E6A', '#F6E6C4', 'The PDF is too big to email.', 'Make it smaller in {n}. Same pages, a fraction of the size.'],
    ['10:00', 'easynote/', 'EasyNote', '#A768BA', '#D7EAF5', 'The weekly team call.', 'Record it with {n} and every line is written down when you stop, so you can just listen.', 1],
    ['11:30', 'easyfile/', 'EasyFile', '#AD7B02', '#C6E2F4', 'A pile of paper receipts.', 'Hold each one up to the webcam. {n} straightens it and names the file by what it says.'],
    ['13:00', 'easyguard/', 'EasyGuard', '#6C942F', '#BFDDF2', 'Lunch at a busy cafe.', 'Someone leans in to look. {n} blurs the screen, and any key brings it back.'],
    ['14:20', 'easyclip/', 'EasyClip', '#009B85', '#C9E0EE', 'Where was that link from this morning?', 'Press Ctrl+Alt+V. Everything you copied today is there, searchable.'],
    ['16:00', 'easytouch/', 'EasyTouch', '#717BD7', '#F3CFA2', 'Adding up the expenses.', 'Write 48 + 19 + 7 = on the touchpad and {n} writes 74.'],
    ['19:30', 'easypaint/', 'EasyPaint', '#BE6097', '#3E4272', 'Time for yourself.', 'Paint the evening sky in watercolour on paper that feels real.', 1]
  ];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function appOf(d) {
    var tile = document.querySelector('.tiles .tile[href="' + d[1] + '"]'), name = d[2], icon = 'images/apps/' + d[1].replace('/', '') + '.png';
    if (tile) {
      var t = tile.firstChild;
      while (t && !(t.nodeType === 3 && t.textContent.trim())) t = t.nextSibling;
      if (t) name = t.textContent.trim();
      var img = tile.querySelector('img');
      if (img) icon = img.getAttribute('src');
    }
    return { name: name, icon: icon };
  }
  function mins(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  function hand(len, w, cls) { return '<line class="hand ' + cls + '" x1="100" y1="100" x2="100" y2="' + (100 - len) + '" stroke="#2B2622" stroke-width="' + w + '" stroke-linecap="round"/>'; }

  var ticks = '';
  for (var k = 0; k < 12; k++) ticks += '<line x1="100" y1="16" x2="100" y2="' + (k % 3 ? 26 : 32) + '" stroke="#2B2622" stroke-width="' + (k % 3 ? 3 : 5) + '" stroke-linecap="round" transform="rotate(' + k * 30 + ' 100 100)"/>';
  var apps = DAY.map(appOf);
  var sec = document.createElement('section');
  sec.id = 'day';
  sec.setAttribute('aria-label', 'A day with Easy Suite');
  sec.innerHTML = '<div class="wrap"><div class="day-head"><p class="kicker">A day with Easy Suite</p><h2>A normal day, made a little easier.</h2>' +
    '<p class="lead">Eight small apps for the jobs that pop up between nine and five, and after. Scroll through the day.</p></div>' +
    '<div class="day-grid"><div class="day-clockbox"><svg class="day-clock" viewBox="0 0 200 200" aria-hidden="true"><circle class="face" cx="100" cy="100" r="92" stroke="#2B2622" stroke-width="6"/>' +
    ticks + hand(48, 9, 'hr') + hand(72, 5, 'mn') + '<circle cx="100" cy="100" r="7" fill="#D97757"/></svg><span class="day-tnow" aria-hidden="true"></span><span class="day-anow" aria-hidden="true"></span></div>' +
    '<div class="day-moments">' + DAY.map(function (d, i) {
      var a = apps[i];
      return '<div class="day-mo" data-i="' + i + '" style="--c:' + d[3] + '"><time>' + d[0] + '</time><h3>' + esc(d[5]) + '</h3>' +
        '<a class="day-fix" href="' + d[1] + '"><img src="' + esc(a.icon) + '" alt="" width="32" height="32"><p><b>' + esc(a.name) + '.</b> ' +
        esc(d[6].replace('{n}', a.name)) + (d[7] ? '<span class="soon">Coming soon</span>' : '') + '</p></a></div>';
    }).join('') + '</div></div>' +
    '<div class="day-tally"><h2>That was the day</h2><div class="nums"><div><b data-n="8">8</b><span>everyday jobs</span></div><div><b data-n="8">8</b><span>small free apps</span></div>' +
    '<div><b data-n="0">0</b><span>accounts made</span></div><div><b data-n="0">0</b><span>files uploaded</span></div></div></div></div>';
  hero.parentNode.insertBefore(sec, hero.nextSibling);

  var box = sec.querySelector('.day-clockbox'), hr = sec.querySelector('.hr'), mn = sec.querySelector('.mn'),
    tnow = sec.querySelector('.day-tnow'), anow = sec.querySelector('.day-anow'), mos = sec.querySelectorAll('.day-mo');
  function set(mo) {
    var i = +mo.getAttribute('data-i'), d = DAY[i], t = mins(d[0]), a = apps[i];
    Array.prototype.forEach.call(mos, function (m) { m.classList.toggle('on', m === mo); });
    hr.style.transform = 'rotate(' + t * .5 + 'deg)'; mn.style.transform = 'rotate(' + t * 6 + 'deg)';
    box.style.backgroundColor = d[4]; box.classList.toggle('night', t >= 18 * 60);
    tnow.textContent = d[0];
    anow.innerHTML = '<img src="' + esc(a.icon) + '" alt="" width="32" height="32">' + esc(a.name);
  }
  set(mos[0]);
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) set(e.target); }); }, { rootMargin: '-45% 0px -45% 0px' });
  Array.prototype.forEach.call(mos, function (m) { io.observe(m); });

  // SU-C4: the numbers count up once when the tally comes into view.
  if (calm) return;
  var nums = sec.querySelectorAll('.day-tally b');
  Array.prototype.forEach.call(nums, function (b) { b.textContent = '0'; });
  var tio = new IntersectionObserver(function (es) {
    if (!es[0].isIntersecting) return;
    tio.disconnect();
    Array.prototype.forEach.call(nums, function (b) {
      var n = +b.getAttribute('data-n'), v = 0;
      if (!n) return;
      var id = setInterval(function () { b.textContent = ++v; if (v >= n) clearInterval(id); }, 120);
    });
  }, { threshold: .5 });
  tio.observe(sec.querySelector('.day-tally .nums'));
})();
