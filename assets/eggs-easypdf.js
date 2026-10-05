// EasyPDF page: easter eggs. Uses the shared engine in eggs.js.
(function () {
  var E = window.Eggs; if (!E) return;
  var $ = E.$, $$ = E.$$, full = E.full;

  E.css('' +
    '::selection{background:#FFE45C;color:#1F1E1D}' +
    '.egg-split-clone *{animation-delay:-60s !important}' +
    '.egg-split-gap{position:fixed;left:50%;top:50%;z-index:40;transform:translate(-50%,-50%) rotate(90deg);font:italic 1rem Georgia,serif;color:var(--muted,#5B5A55);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .3s}' +
    '.egg-split-gap.on{opacity:1}' +
    '.egg-split-line{position:fixed;left:50%;top:0;bottom:0;z-index:39;border-left:1.5px dashed var(--accent,#C96442);pointer-events:none;opacity:0;transition:opacity .3s}.egg-split-line.on{opacity:.7}' +
    'body.egg-shrunk main{cursor:zoom-in}' +
    '.art .float.bytes{cursor:pointer;pointer-events:auto}' +
    '.art .icon-big{cursor:grab;touch-action:none;transition:rotate .35s cubic-bezier(.2,.7,.2,1)}html.calm .art .icon-big{transition-duration:.15s}' +
    '@media (hover:hover){.art .icon-big:hover{filter:drop-shadow(3px 4px 0 rgba(201,100,66,.18))}}' +
    '.egg-half{pointer-events:auto;cursor:grab;user-select:none;-webkit-user-drag:none}.egg-half.l{rotate:-4deg}.egg-half.r{rotate:5deg}' +
    '.egg-tape{position:absolute;z-index:4;width:22%;height:12%;background:rgba(244,232,196,.85);border:1px solid rgba(180,160,110,.5);transform:translate(-50%,-50%) rotate(-82deg);pointer-events:none}' +
    '.egg-plaster{position:absolute;right:-8px;top:-8px;width:46px;height:18px;border-radius:9px;background:#E9C49F;transform:rotate(35deg);box-shadow:0 1px 2px rgba(0,0,0,.15);pointer-events:none}' +
    '.egg-plaster::after{content:"";position:absolute;left:15px;top:4px;width:16px;height:10px;border-radius:3px;background:#F4DCC2;background-image:radial-gradient(#D9AE86 1px,transparent 1.5px);background-size:4px 4px}' +
    'html.motion .egg-plaster{animation:egg-rise .3s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-staple{position:absolute;left:14px;top:-5px;z-index:5;width:30px;height:9px;border:3px solid #8F8D86;border-bottom:0;border-radius:2px 2px 0 0;pointer-events:none}' +
    '.egg-printer{margin:-6px 0 16px;max-width:280px;font:600 .82rem "Segoe UI",sans-serif;color:var(--muted,#5B5A55)}' +
    '.egg-printer i{display:block;height:6px;margin-top:5px;border-radius:999px;background:var(--surface-alt,#F0EEE6);overflow:hidden}' +
    '.egg-printer i b{display:block;height:100%;width:0;background:var(--accent,#C96442);transition:width .8s}.egg-printer.jam i b{background:#B42318}' +
    '.egg-crane{position:fixed;z-index:45;width:84px;height:54px;pointer-events:none}' +
    'html.motion .egg-crane{animation:egg-glide 7s cubic-bezier(.4,0,.6,1) forwards}' +
    '@keyframes egg-glide{0%{transform:translate(0,0) rotate(-4deg)}25%{transform:translate(28vw,-30px) rotate(3deg)}50%{transform:translate(55vw,10px) rotate(-3deg)}75%{transform:translate(82vw,-20px) rotate(4deg)}100%{transform:translate(calc(100vw + 120px),-60px) rotate(-6deg)}}' +
    'html.calm .egg-crane{animation:egg-crane-fade 4s ease forwards}@keyframes egg-crane-fade{0%,100%{opacity:0}20%,80%{opacity:1}}' +
    '.egg-sheet{position:fixed;z-index:45;width:44px;height:44px;background:#FAF9F5;border:1.6px solid #C96442;pointer-events:none;animation:egg-fold .7s ease forwards}' +
    '@keyframes egg-fold{0%{transform:rotate(0) scale(1)}60%{transform:rotate(45deg) scale(.8,.5)}100%{transform:rotate(45deg) scale(.2,.1);opacity:0}}' +
    '.egg-pagebadge{position:fixed;right:18px;bottom:18px;z-index:55;padding:7px 14px;border-radius:8px;background:rgba(31,30,29,.88);color:#F5F4EE;font:600 .85rem "Segoe UI",sans-serif;pointer-events:none;opacity:0;transition:opacity .25s}.egg-pagebadge.on{opacity:1}');

  var main = $('main'), mainBusy = false;

  // ---------- P1 merge: the headline squashes into one word ----------
  var h1 = $('.hero h1'), h1Html = h1 ? h1.innerHTML : '', merged = false;
  function merge() {
    if (!h1 || mainBusy) return;
    if (merged) { unmerge(); return; }
    merged = true;
    h1.style.transition = 'word-spacing .45s, letter-spacing .45s';
    h1.style.wordSpacing = '-.32em'; h1.style.letterSpacing = '-.04em';
    setTimeout(function () {
      h1.textContent = h1.getAttribute('aria-label').replace(/\s+/g, '').replace(/[.,]+$/, '');
      h1.style.wordSpacing = ''; h1.style.letterSpacing = '-.03em'; h1.style.overflowWrap = 'anywhere';
    }, full ? 460 : 0);
    E.sound('chomp');
    E.toast('Merged into one. Type merge again, or press Ctrl+Z, to unmerge.');
    E.found('p-merge');
  }
  function unmerge() {
    merged = false;
    h1.innerHTML = h1Html; h1.style.letterSpacing = ''; h1.style.wordSpacing = ''; h1.style.overflowWrap = '';
    E.toast('Unmerged.');
  }
  E.word('merge', merge);
  document.addEventListener('keydown', function (e) {
    if (merged && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !E.inField(e.target)) { e.preventDefault(); unmerge(); }
  });

  // ---------- P2 split: the page parts down the middle ----------
  E.word('split', function () {
    if (mainBusy || !main) return;
    mainBusy = true;
    E.found('p-split');
    var gap = document.createElement('div'); gap.className = 'egg-split-gap'; gap.textContent = "It's PDFs all the way down";
    document.body.appendChild(gap);
    if (!full) {
      var line = document.createElement('div'); line.className = 'egg-split-line'; document.body.appendChild(line);
      requestAnimationFrame(function () { line.classList.add('on'); gap.classList.add('on'); });
      setTimeout(function () { line.classList.remove('on'); gap.classList.remove('on'); }, 2200);
      setTimeout(function () { line.remove(); gap.remove(); mainBusy = false; }, 2600);
      return;
    }
    var r = main.getBoundingClientRect();
    var clone = main.cloneNode(true);
    clone.removeAttribute('id'); $$('[id]', clone).forEach(function (n) { n.removeAttribute('id'); });
    clone.setAttribute('aria-hidden', 'true'); clone.inert = true; clone.classList.add('egg-split-clone');
    clone.style.cssText = 'position:absolute;left:' + (r.left + scrollX) + 'px;top:' + (r.top + scrollY) + 'px;width:' + r.width + 'px;margin:0;z-index:2;clip-path:inset(0 0 0 50%);transition:transform .5s cubic-bezier(.2,.7,.2,1);background:var(--bg)';
    main.style.clipPath = 'inset(0 50% 0 0)';
    main.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
    document.body.appendChild(clone);
    E.sound('whoosh');
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      main.style.transform = 'translateX(-22px)'; clone.style.transform = 'translateX(22px)'; gap.classList.add('on');
    }); });
    setTimeout(function () { main.style.transform = ''; clone.style.transform = ''; gap.classList.remove('on'); }, 2300);
    setTimeout(function () { clone.remove(); gap.remove(); main.style.clipPath = ''; main.style.transition = ''; mainBusy = false; }, 2900);
  });

  // ---------- P3 shrink: the whole page gets 40 % smaller ----------
  E.word('shrink', function () {
    if (mainBusy || !main) return;
    mainBusy = true;
    var origin = scrollY + innerHeight / 2 - (main.getBoundingClientRect().top + scrollY);
    main.style.transformOrigin = '50% ' + origin + 'px';
    main.style.transition = 'transform ' + (full ? '.6s' : '.2s') + ' cubic-bezier(.2,.7,.2,1)';
    main.style.transform = 'scale(.6)';
    document.body.classList.add('egg-shrunk');
    E.toast('40 % smaller. Still readable?');
    E.found('p-shrink');
    var done = false;
    function back(e) {
      if (done) return; done = true;
      if (e && e.type === 'click') { e.preventDefault(); e.stopPropagation(); }
      document.removeEventListener('click', back, true);
      main.style.transform = ''; document.body.classList.remove('egg-shrunk');
      setTimeout(function () { main.style.transition = ''; main.style.transformOrigin = ''; mainBusy = false; }, 650);
    }
    setTimeout(function () { document.addEventListener('click', back, true); }, 200);
    setTimeout(back, 4000);
  });

  // ---------- P4 fill in the blank ----------
  var blank = $('.blank'), greeted = '';
  if (blank) {
    blank.addEventListener('focus', function () {
      if (blank.dataset.told) return;
      blank.dataset.told = '1';
      E.toast('See? It found the blank.');
      E.found('p-blank');
    });
    blank.addEventListener('input', function () {
      var v = blank.value.trim().toLowerCase().replace(/\s+/g, ' ');
      if (v === 'jordan avery' && greeted !== v) { greeted = v; E.toast('Hello, Jordan.'); }
    });
    blank.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && blank.value.trim()) { blank.blur(); E.toast('Saved as a new copy. (Not really. Nothing is saved.)'); }
    });
  }

  // ---------- P5 rotate: R while the pointer is on the hero icon ----------
  var art = $('.art'), icon = $('.art .icon-big'), overArt = false, turns = 0;
  if (art) {
    art.addEventListener('pointerenter', function () { overArt = true; });
    art.addEventListener('pointerleave', function () { overArt = false; });
  }
  document.addEventListener('keydown', function (e) {
    if (!icon || !overArt || e.ctrlKey || e.metaKey || e.altKey || e.key.toLowerCase() !== 'r' || E.inField(e.target)) return;
    turns += e.shiftKey ? -1 : 1;
    icon.style.rotate = (turns * 90) + 'deg';
    E.sound('click');
    E.found('p-rotate');
    if (turns && turns % 4 === 0) setTimeout(function () { E.chip('Dizzy', 2200); }, 350);
  });

  // ---------- P6 smaller and smaller: the "Under 2 MB" chip ----------
  var sizeChip = $$('.art .float').filter(function (f) { return /Under 2 MB/.test(f.textContent); })[0];
  if (sizeChip) {
    var label = sizeChip.lastChild, sizes = ['1 MB', '500 KB', '12 KB', '1 byte', '0 bytes. I think we went too far.'], step = 0, original = label.textContent;
    sizeChip.classList.add('bytes');
    sizeChip.addEventListener('click', function () {
      if (step === sizes.length) { step = 0; label.textContent = original; return; }
      label.textContent = sizes[step++];
      E.sound('pop');
      if (step === sizes.length) E.found('p-bytes');
    });
  }

  // ---------- P7 tear and tape: drag the hero icon away ----------
  var TEAR_L = 'polygon(0 0,52% 0,46% 12%,54% 25%,45% 38%,55% 50%,46% 63%,54% 76%,47% 88%,52% 100%,0 100%)';
  var TEAR_R = 'polygon(52% 0,100% 0,100% 100%,52% 100%,47% 88%,54% 76%,46% 63%,55% 50%,45% 38%,54% 25%,46% 12%)';
  var torn = null;
  if (icon && art) {
    icon.draggable = false;
    icon.addEventListener('dragstart', function (e) { e.preventDefault(); });
    icon.addEventListener('pointerdown', function (e) {
      if (torn) return;
      e.preventDefault();
      var sx = e.clientX, sy = e.clientY, id = e.pointerId;
      function move(ev) {
        if (ev.pointerId !== id || torn) return;
        if (Math.hypot(ev.clientX - sx, ev.clientY - sy) > 24) { cleanup(); tear(ev, sx, sy); }
      }
      function cleanup() { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', cleanup); }
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', cleanup);
    });
  }
  function tear(ev, sx, sy) {
    var ar = art.getBoundingClientRect(), ir = icon.getBoundingClientRect();
    var halves = ['l', 'r'].map(function (side) {
      var n = document.createElement('img');
      n.src = icon.src; n.alt = ''; n.className = 'egg-half ' + side; n.draggable = false;
      n.style.cssText = 'position:absolute;left:' + (ir.left - ar.left) + 'px;top:' + (ir.top - ar.top) + 'px;width:' + ir.width + 'px;height:' + ir.height + 'px;margin:0;z-index:3;touch-action:none;clip-path:' + (side === 'l' ? TEAR_L : TEAR_R);
      art.appendChild(n);
      return n;
    });
    icon.style.visibility = 'hidden';
    torn = { l: halves[0], r: halves[1], dx: ev.clientX - sx, dy: ev.clientY - sy, timer: 0 };
    E.sound('whoosh');
    drag(torn.r, sx, sy);
  }
  // Moves the right half with the pointer until it is let go; near home it is taped back on.
  function drag(el, ox, oy) {
    function place(x, y) { torn.dx = x - ox; torn.dy = y - oy; el.style.translate = torn.dx + 'px ' + torn.dy + 'px'; }
    function move(ev) { place(ev.clientX, ev.clientY); }
    function up() {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (Math.hypot(torn.dx, torn.dy) < 40) { mend(); return; }
      E.toast('Torn in two. Drag it back to tape it.');
      clearTimeout(torn.timer);
      torn.timer = setTimeout(function () { if (torn) { E.toast("Fine. I'll tape it myself."); mend(); } }, 15000);
      el.onpointerdown = function (e2) {
        e2.preventDefault(); clearTimeout(torn.timer);
        var startX = e2.clientX - torn.dx, startY = e2.clientY - torn.dy;
        drag(el, startX, startY);
      };
    }
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  }
  function mend() {
    if (!torn) return;
    var t = torn; torn = null;
    clearTimeout(t.timer);
    t.r.onpointerdown = null;
    t.r.style.transition = 'translate .3s cubic-bezier(.2,.7,.2,1), rotate .3s'; t.r.style.translate = '0px 0px'; t.r.style.rotate = '0deg';
    t.l.style.transition = 'rotate .3s'; t.l.style.rotate = '0deg';
    setTimeout(function () {
      var tape = document.createElement('div'); tape.className = 'egg-tape';
      tape.style.left = (parseFloat(t.l.style.left) + t.l.offsetWidth * 0.51) + 'px';
      tape.style.top = (parseFloat(t.l.style.top) + t.l.offsetHeight * 0.5) + 'px';
      art.appendChild(tape);
      E.sound('click');
      E.toast('Merged again.');
      E.found('p-tear');
      setTimeout(function () { t.l.remove(); t.r.remove(); tape.remove(); icon.style.visibility = ''; }, 2600);
    }, 320);
  }

  // ---------- P8 paper cut: a fast sweep across a feature card's edge ----------
  var last = null, speed = 0, cuts = 0;
  document.addEventListener('pointermove', function (e) {
    var now = performance.now();
    if (last) speed = Math.hypot(e.clientX - last.x, e.clientY - last.y) / Math.max(1, now - last.t);
    last = { x: e.clientX, y: e.clientY, t: now };
  }, { passive: true });
  $$('#features .card').forEach(function (card) {
    ['pointerenter', 'pointerleave'].forEach(function (t) {
      card.addEventListener(t, function (e) {
        if (e.pointerType !== 'mouse' || speed < 1.8 || cuts >= 3 || $('.egg-plaster', card)) return;
        cuts++;
        card.style.position = 'relative';
        var p = document.createElement('span'); p.className = 'egg-plaster'; p.setAttribute('aria-hidden', 'true');
        card.appendChild(p);
        E.toast('Ouch. Paper cut.');
        E.found('p-papercut');
      });
    });
  });

  // ---------- P9 highlighter: selections are yellow; the third one gets a tip ----------
  var picks = 0, lastPick = '';
  function picked() {
    var s = String(window.getSelection ? window.getSelection() : '').trim();
    if (s.length < 3 || s === lastPick) return;
    lastPick = s;
    if (++picks === 3) { E.toast("You'd love the Highlight tool."); E.found('p-highlighter'); }
  }
  ['mouseup', 'keyup', 'touchend'].forEach(function (t) { document.addEventListener(t, function () { setTimeout(picked, 30); }); });

  // ---------- P10 staple: the feature cards jump into a stack ----------
  var stapling = false;
  E.word('staple', function () {
    var cards = $$('#features .card');
    if (stapling || !cards.length) return;
    stapling = true;
    E.found('p-staple');
    var feats = $('#features');
    var r = feats.getBoundingClientRect();
    var wait = r.top > innerHeight * 0.4 || r.bottom < innerHeight * 0.4 ? (feats.scrollIntoView({ behavior: full ? 'smooth' : 'auto', block: 'start' }), full ? 800 : 60) : 0;
    setTimeout(function () {
      var top = cards[0], staple = document.createElement('span');
      staple.className = 'egg-staple'; staple.setAttribute('aria-hidden', 'true');
      top.style.position = 'relative';
      E.sound('chomp');
      E.toast('Stapled.');
      if (!full) {
        top.appendChild(staple);
        setTimeout(function () { staple.remove(); stapling = false; }, 2400);
        return;
      }
      var r0 = top.getBoundingClientRect();
      cards.forEach(function (c, i) {
        var rc = c.getBoundingClientRect();
        c.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1)';
        c.style.position = 'relative'; c.style.zIndex = String(20 - i);
        c.style.transform = 'translate(' + (r0.left - rc.left + i * 3) + 'px,' + (r0.top - rc.top + i * 3) + 'px) rotate(' + ((i % 3) - 1) * 2 + 'deg)';
      });
      setTimeout(function () { top.appendChild(staple); }, 380);
      setTimeout(function () { cards.forEach(function (c) { c.style.transform = ''; }); staple.remove(); }, 2000);
      setTimeout(function () { cards.forEach(function (c) { c.style.transition = ''; c.style.zIndex = ''; }); stapling = false; }, 2600);
    }, wait);
  });

  // ---------- P11 paper jam: hold the chip at the top ("Available" since 2.0.0) ----------
  var soon = $('.hero .chip.ok') || $('.hero .chip.soon'), printing = false;
  if (soon) {
    soon.style.cursor = 'pointer'; soon.style.userSelect = 'none';
    E.longPress(soon, 2000, function () {
      if (printing) return;
      printing = true;
      var box = document.createElement('div'); box.className = 'egg-printer'; box.setAttribute('role', 'status');
      box.innerHTML = '<span>Printing 1 %</span><i><b></b></i>';
      soon.parentNode.insertBefore(box, soon.nextSibling);
      var text = $('span', box), bar = $('b', box);
      E.sound('click');
      requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = '7%'; }); });
      setTimeout(function () { text.textContent = 'Printing 7 %'; }, 700);
      setTimeout(function () { box.classList.add('jam'); text.textContent = 'Paper jam in tray 2.'; E.sound('thud'); }, 1800);
      setTimeout(function () { text.textContent = "Just kidding. There's no printer. That's the point."; }, 3800);
      setTimeout(function () { box.remove(); printing = false; }, 7600);
      E.found('p-jam');
    });
  }

  // ---------- P12 origami: a sheet folds into a crane and glides across ----------
  var CRANE = '<svg viewBox="0 0 80 50" aria-hidden="true"><path d="M4 30 30 26 40 6 46 26 76 18 52 32 44 44 36 32Z" fill="#FAF9F5" stroke="#C96442" stroke-width="1.6" stroke-linejoin="round"/><path d="M40 6v26M30 26l22 6" fill="none" stroke="#C96442" stroke-width="1"/></svg>';
  E.idle(45, function () {
    var y = Math.round(innerHeight * 0.32), x = full ? -90 : Math.round(innerWidth * 0.62);
    function crane() {
      var c = document.createElement('div'); c.className = 'egg-crane'; c.innerHTML = CRANE;
      c.style.left = x + 'px'; c.style.top = y + 'px';
      document.body.appendChild(c);
      setTimeout(function () { c.remove(); }, 7200);
    }
    if (full) {
      var sheet = document.createElement('div'); sheet.className = 'egg-sheet';
      sheet.style.left = '40px'; sheet.style.top = y + 'px';
      document.body.appendChild(sheet);
      setTimeout(function () { sheet.remove(); crane(); }, 700);
    } else crane();
    E.found('p-origami');
  });

  // ---------- P13 page counter: scroll fast from top to bottom ----------
  var badge = document.createElement('div'); badge.className = 'egg-pagebadge'; badge.setAttribute('aria-hidden', 'true');
  document.body.appendChild(badge);
  var ly = scrollY, lt = performance.now(), hideT = 0, readAll = false;
  window.addEventListener('scroll', function () {
    var now = performance.now(), v = Math.abs(scrollY - ly) / Math.max(1, now - lt);
    ly = scrollY; lt = now;
    var max = document.documentElement.scrollHeight - innerHeight;
    var frac = max > 0 ? scrollY / max : 1, n = Math.min(7, 1 + Math.floor(frac * 7));
    if (v < 1.5 && !badge.classList.contains('on')) return;
    if (readAll) return;
    badge.textContent = 'Page ' + n + ' of 7';
    badge.classList.add('on');
    clearTimeout(hideT);
    if (frac > 0.985) {
      readAll = true;
      badge.textContent = 'Page 7 of 7. You read the whole thing.';
      E.found('p-pages');
      hideT = setTimeout(function () { badge.classList.remove('on'); readAll = false; }, 3200);
      return;
    }
    hideT = setTimeout(function () { badge.classList.remove('on'); }, 1200);
  }, { passive: true });

  // ---------- P15 the console ----------
  E.consoleHello(['%PDF-1.7', '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj', '2 0 obj << /Type /Pages /Kids [] /Count 0 >> endobj', '%%EOF',
    'A very small PDF. Try typing merge, split or shrink on the page.'], 'pdf', function () {
    return 'Saved nothing.pdf: 0 bytes, made on this PC, sent nowhere.';
  });
})();
