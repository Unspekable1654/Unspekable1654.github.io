// EasyPDF page, Highlighter and scissors look: highlighted headings, scissors along dotted lines,
// a red pen circle and a big scan that shrinks in the Make it smaller card.
(function () {
  var full = document.documentElement.classList.contains('motion');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Marks show once in view, or once scrolled past (a jump to #download still finds the headings above it marked).
  var seen = [], queued = false;
  function check() {
    queued = false;
    var line = innerHeight * 0.88;
    seen = seen.filter(function (s) {
      if (s.el.getBoundingClientRect().top > line) return true;
      s.fn();
      return false;
    });
    if (!seen.length) removeEventListener('scroll', onScroll);
  }
  function onScroll() { if (!queued) { queued = true; requestAnimationFrame(check); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  function whenSeen(el, fn) { seen.push({ el: el, fn: fn }); onScroll(); }
  function mark(el) { whenSeen(el, function () { el.classList.add('pg-in'); }); }

  // PG-B1: the word PDF in the hero heading (already split into words by app.js) and every section heading.
  var word = $$('.hero h1 .w').filter(function (w) { return /^PDF/.test(w.textContent); })[0];
  if (word) {
    word.innerHTML = word.textContent.replace(/^PDF/, '<span class="pg-hl">PDF</span>');
    mark($('.pg-hl', word));
  }
  $$('main h2').forEach(function (h) {
    var t = document.createElement('span');
    t.className = 'pg-t';
    while (h.firstChild) t.appendChild(h.firstChild);
    h.appendChild(t);
    mark(t);
  });

  // PG-B2: dotted cut lines between sections, scissors run along them.
  ['#see', '#features', '#note'].forEach(function (id) {
    var s = $(id);
    if (!s) return;
    var cut = document.createElement('div');
    cut.className = 'pg-cut';
    cut.setAttribute('aria-hidden', 'true');
    cut.innerHTML = '<div><span>&#9986;</span></div>';
    s.parentNode.insertBefore(cut, s);
    mark(cut);
  });

  // PG-B3: a line under How it works, with the red pen circling "smaller".
  var how = $('#how h2');
  if (how) {
    var say = document.createElement('p');
    say.className = 'pg-say';
    say.innerHTML = 'Put it together, fill it in, make it <span class="pg-circ">smaller<svg viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="1" vector-effect="non-scaling-stroke" d="M8 22C4 6 92 0 96 16S20 38 6 20"/></svg></span>.';
    how.parentNode.insertBefore(say, how.nextSibling);
    mark($('.pg-circ', say));
  }

  // PG-B4: in the Make it smaller card, a 14.2 MB scan shrinks to 1.8 MB and fits one email. Click to run it again.
  var card = $$('#features .card').filter(function (c) { var h = $('h3', c); return h && /^Make it smaller/.test(h.textContent); })[0];
  if (card) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pg-shrink';
    b.setAttribute('aria-label', 'Show a 14.2 MB scan made smaller again');
    b.innerHTML = '<span class="pg-file" aria-hidden="true">PDF</span><span aria-hidden="true"><span class="pg-name">Big scan.pdf</span>' +
      '<span class="pg-meter"><i></i></span><span class="pg-size">14.2 MB</span><span class="pg-ok">Fits in one email</span></span>';
    card.appendChild(b);
    var size = $('.pg-size', b), bar = $('.pg-meter i', b), ok = $('.pg-ok', b), run = 0;
    var shrink = function () {
      var me = ++run, t0 = performance.now();
      ok.classList.remove('on');
      if (!full || !window.requestAnimationFrame) { size.textContent = '1.8 MB'; bar.style.width = '13%'; ok.classList.add('on'); return; }
      var step = function (t) {
        if (me !== run) return;
        var k = Math.min(1, (t - t0) / 1600), e = 1 - Math.pow(1 - k, 3), v = 14.2 - 12.4 * e;
        size.textContent = v.toFixed(1) + ' MB';
        bar.style.width = (v / 14.2 * 100) + '%';
        if (k < 1) requestAnimationFrame(step); else ok.classList.add('on');
      };
      requestAnimationFrame(step);
    };
    whenSeen(b, function () { setTimeout(shrink, full ? 500 : 0); });
    b.addEventListener('click', shrink);
  }
})();
