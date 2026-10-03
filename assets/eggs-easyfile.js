// EasyFile page: easter eggs. Uses the shared engine in eggs.js. The "webcam" here is pretend: no camera is opened.
(function () {
  var E = window.Eggs; if (!E) return;
  var $ = E.$, $$ = E.$$, full = E.full;

  E.css('' +
    '.egg-scanlight{position:fixed;left:0;right:0;top:0;height:70px;z-index:58;pointer-events:none;background:linear-gradient(transparent,rgba(110,231,150,.28) 45%,rgba(140,255,170,.75) 50%,rgba(110,231,150,.28) 55%,transparent);box-shadow:0 0 30px rgba(110,231,150,.35)}' +
    'html.motion .egg-scanlight{animation:egg-scan 1.7s cubic-bezier(.45,0,.55,1) forwards}@keyframes egg-scan{from{transform:translateY(-80px)}to{transform:translateY(100vh)}}' +
    'html.calm .egg-scanlight{top:45%;animation:egg-fadeinout 1.4s ease forwards}@keyframes egg-fadeinout{0%,100%{opacity:0}40%,60%{opacity:1}}' +
    '.hero h1[contenteditable=true]{outline:2px dashed var(--accent,#C96442);outline-offset:6px;border-radius:6px;cursor:text}' +
    '.never{cursor:pointer}.never.counted::after{content:none}' +
    '.egg-folders{position:fixed;left:50%;top:84px;z-index:56;transform:translateX(-50%);display:flex;gap:12px;padding:0 12px;pointer-events:none}' +
    'html.motion .egg-folders{animation:egg-rise .3s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-folder{position:relative;width:130px;height:84px;border-radius:4px 10px 8px 8px;background:#E7C77D;border:1.5px solid #B8923A;box-shadow:0 8px 20px rgba(0,0,0,.15);display:grid;place-items:center;font:600 .9rem "Segoe UI",sans-serif;color:#4A3A12;pointer-events:auto;transition:transform .2s}' +
    '.egg-folder::before{content:"";position:absolute;left:-1.5px;top:-14px;width:56px;height:14px;border-radius:6px 6px 0 0;background:#E7C77D;border:1.5px solid #B8923A;border-bottom:0}' +
    '.egg-folder.over{transform:translateY(-8px);background:#F0D592}.egg-folder b{position:absolute;right:8px;top:6px;font-size:.75rem}' +
    '.egg-folders button{align-self:center;pointer-events:auto;padding:8px 14px;border-radius:999px;border:1px solid var(--line,#E0DDD2);background:var(--surface,#FAF9F5);color:var(--text,#1F1E1D);font:600 .85rem "Segoe UI",sans-serif;cursor:pointer}' +
    '.card.egg-dragging{position:relative;z-index:57;cursor:grabbing;pointer-events:none;box-shadow:0 16px 36px rgba(0,0,0,.2);transition:none !important}' +
    '.card.egg-filed{display:none}' +
    '.egg-frame{position:absolute;z-index:55;pointer-events:none;background:linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 0 0/26px 3px,linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 0 0/3px 26px,linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 100% 0/26px 3px,linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 100% 0/3px 26px,linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 0 100%/26px 3px,linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 0 100%/3px 26px,linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 100% 100%/26px 3px,linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 100% 100%/3px 26px;background-repeat:no-repeat}' +
    '.egg-frame span{position:absolute;left:50%;bottom:-34px;transform:translateX(-50%);padding:4px 12px;border-radius:999px;background:#1F1E1D;color:#F5F4EE;font:600 .8rem "Segoe UI",sans-serif;white-space:nowrap}' +
    '.egg-frame.snap{animation:egg-snapflash .5s ease-out}@keyframes egg-snapflash{0%{background-color:rgba(255,255,255,.8)}100%{background-color:transparent}}' +
    'html.motion .egg-frame i{position:absolute;left:12px;top:12px;width:9px;height:9px;border-radius:50%;background:#D93025;animation:egg-blink 1s steps(1) infinite}@keyframes egg-blink{50%{opacity:0}}' +
    '.art .float.cam{cursor:pointer}' +
    '.egg-tidy{position:fixed;left:50%;bottom:84px;z-index:56;transform:translateX(-50%);padding:10px 20px;border:0;border-radius:999px;background:var(--button,#AE5433);color:#fff;font:600 .95rem "Segoe UI",sans-serif;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.18)}' +
    '.egg-invoice{position:fixed;right:24px;top:96px;z-index:56;width:min(260px,calc(100vw - 48px));padding:16px 18px;background:#FFFEFB;border:1px solid #E0DDD2;box-shadow:0 12px 30px rgba(0,0,0,.16);font:.86rem/1.5 "Segoe UI",sans-serif;color:#1F1E1D;transform-origin:100% 100%}' +
    '.egg-invoice h4{margin:0 0 8px;font:1.1rem Georgia,serif}.egg-invoice dl{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;margin:0}.egg-invoice dt{color:#5B5A55}.egg-invoice dd{margin:0}' +
    '.egg-invoice .paid{margin-top:10px;display:inline-block;padding:2px 10px;border:2px solid #2E7D4F;border-radius:6px;color:#2E7D4F;font-weight:700;transform:rotate(-6deg)}' +
    'html.motion .egg-invoice{animation:egg-slidein .45s cubic-bezier(.2,.7,.2,1)}@keyframes egg-slidein{from{transform:translateX(120%)}}' +
    'html.motion .egg-invoice.filing{animation:egg-fileaway .6s cubic-bezier(.5,0,.75,0) forwards}@keyframes egg-fileaway{to{transform:translate(20px,70vh) scale(.15);opacity:.3}}' +
    'html.calm .egg-invoice.filing{opacity:0;transition:opacity .4s}' +
    '.egg-notice{position:fixed;right:18px;bottom:18px;z-index:56;width:min(320px,calc(100vw - 36px));padding:14px 16px;border-radius:12px;background:var(--surface,#FAF9F5);border:1px solid var(--line,#E0DDD2);box-shadow:0 12px 30px rgba(0,0,0,.18);font:.9rem/1.45 "Segoe UI",sans-serif;color:var(--text,#1F1E1D)}' +
    'html.motion .egg-notice{animation:egg-rise .4s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-notice b{display:block;margin-bottom:2px}.egg-notice div{display:flex;gap:8px;margin-top:10px}' +
    '.egg-notice button{padding:6px 12px;border-radius:8px;border:1px solid var(--line,#E0DDD2);background:var(--bg,#F5F4EE);color:var(--text,#1F1E1D);font:600 .84rem "Segoe UI",sans-serif;cursor:pointer}.egg-notice button.go{background:var(--button,#AE5433);border-color:transparent;color:#fff}' +
    '.egg-flytile{position:fixed;z-index:58;width:44px;height:56px;border-radius:4px;background:#FFFEFB;border:1.5px solid #C9C5BA;box-shadow:0 6px 16px rgba(0,0,0,.18);pointer-events:none}' +
    '.egg-flytile::before{content:"";position:absolute;left:8px;right:8px;top:10px;height:22px;background:repeating-linear-gradient(#C9C5BA 0 2px,transparent 2px 6px)}' +
    '.other.egg-pulse{animation:egg-pulse .9s ease 2}@keyframes egg-pulse{50%{box-shadow:0 0 0 6px var(--accent-soft,#F5E6DD);border-color:var(--accent,#C96442)}}');

  // Undo stack for F11: each entry puts one egg's change back.
  var undos = [];

  // ---------- F1 scan ----------
  function isoDate(d, monthOnly) { var m = ('0' + (d.getMonth() + 1)).slice(-2), day = ('0' + d.getDate()).slice(-2); return d.getFullYear() + '-' + m + (monthOnly ? '' : '-' + day); }
  E.word('scan', function () {
    if ($('.egg-scanlight')) return;
    var l = document.createElement('div'); l.className = 'egg-scanlight'; l.setAttribute('aria-hidden', 'true');
    document.body.appendChild(l);
    setTimeout(function () { l.remove(); E.toast('Scanned 1 page. Named: ' + isoDate(new Date()) + ' Easy Suite website.pdf', 4200); }, full ? 1700 : 1400);
    E.found('f-scan');
  });

  // ---------- F2 rename the page: double-click the heading ----------
  var h1 = $('.hero h1');
  if (h1) {
    h1.addEventListener('dblclick', function () {
      if (h1.isContentEditable) return;
      var before = { html: h1.innerHTML, label: h1.getAttribute('aria-label'), title: document.title };
      h1.textContent = before.label || h1.textContent;
      h1.contentEditable = 'true'; h1.spellcheck = false;
      h1.focus();
      var r = document.createRange(); r.selectNodeContents(h1);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      function finish(keep) {
        h1.removeEventListener('keydown', key); h1.removeEventListener('blur', blur);
        h1.contentEditable = 'false';
        var name = h1.textContent.replace(/\s+/g, ' ').trim();
        if (!keep || !name || name === before.label) { h1.innerHTML = before.html; return; }
        h1.setAttribute('aria-label', name);
        document.title = name;
        undos.push(function () { h1.innerHTML = before.html; h1.setAttribute('aria-label', before.label); document.title = before.title; E.toast('Name put back.'); });
        E.toast('Renamed. Press Ctrl+Z to undo.');
        E.found('f-rename');
      }
      function key(e) {
        if (e.key === 'Enter') { e.preventDefault(); finish(true); h1.blur(); }
        else if (e.key === 'Escape') { finish(false); h1.blur(); }
      }
      function blur() { finish(true); }
      h1.addEventListener('keydown', key);
      h1.addEventListener('blur', blur);
    });
  }

  // ---------- F3 never overwritten ----------
  var never = $('.never'), copiesMade = 1;
  if (never) {
    var neverText = never.textContent;
    E.multiClick(never, 3, 1500, function () {
      if (never.dataset.busy) return;
      never.dataset.busy = '1';
      never.classList.add('counted');
      never.textContent = 'Overwritten!';
      setTimeout(function () {
        copiesMade++;
        never.textContent = neverText + ' (' + copiesMade + ')';
        delete never.dataset.busy;
        E.toast('Saved as a copy. Nothing is ever overwritten. Not even this sentence.');
      }, full ? 700 : 300);
      undos.push(function () { copiesMade = 1; never.textContent = neverText; never.classList.remove('counted'); E.toast('Back to the original.'); });
      E.found('f-overwrite');
    });
  }

  // ---------- F4 file everything: drag a feature card into a folder ----------
  var folders = null, hideFolders = 0;
  var cards = $$('#features .card');
  function showFolders() {
    clearTimeout(hideFolders);
    if (folders) return folders;
    folders = document.createElement('div'); folders.className = 'egg-folders';
    folders.innerHTML = ['Invoices', 'Receipts', 'Misc'].map(function (n) { return '<div class="egg-folder" data-name="' + n + '">' + n + '<b></b></div>'; }).join('');
    document.body.appendChild(folders);
    return folders;
  }
  function laterHideFolders() { clearTimeout(hideFolders); hideFolders = setTimeout(function () { if (folders) { folders.remove(); folders = null; } }, 1600); }
  function folderAt(x, y) { var el = document.elementFromPoint(x, y); return el && el.closest ? el.closest('.egg-folder') : null; }
  cards.forEach(function (card) {
    card.addEventListener('dragstart', function (e) { e.preventDefault(); });
    card.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      var sx = e.clientX, sy = e.clientY, dragging = false, over = null;
      function move(ev) {
        var dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!dragging) {
          if (Math.hypot(dx, dy) < 14) return;
          dragging = true;
          if (window.getSelection) window.getSelection().removeAllRanges();
          card.classList.add('egg-dragging');
          showFolders();
        }
        ev.preventDefault();
        card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + E.clamp(dx / 40, -6, 6) + 'deg)';
        var f = folderAt(ev.clientX, ev.clientY);
        if (f !== over) { if (over) over.classList.remove('over'); over = f; if (over) over.classList.add('over'); }
      }
      function up(ev) {
        document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
        if (!dragging) return;
        card.classList.remove('egg-dragging');
        var f = folderAt(ev.clientX, ev.clientY);
        if (over) over.classList.remove('over');
        if (f) {
          card.style.transform = ''; card.classList.add('egg-filed');
          var b = $('b', f); b.textContent = String((+b.textContent || 0) + 1);
          E.sound('drawer');
          E.found('f-file');
          undos.push(function () { card.classList.remove('egg-filed'); E.toast('Unfiled.'); });
          var left = cards.filter(function (c) { return !c.classList.contains('egg-filed'); }).length;
          if (!left) {
            E.toast('Desk clear.');
            var back = document.createElement('button'); back.type = 'button'; back.textContent = 'Put them back';
            back.addEventListener('click', function () { cards.forEach(function (c) { c.classList.remove('egg-filed'); }); folders.remove(); folders = null; });
            folders.appendChild(back);
            return;
          }
          laterHideFolders();
        } else {
          card.style.transition = 'transform .35s cubic-bezier(.2,.7,.2,1)'; card.style.transform = '';
          setTimeout(function () { card.style.transition = ''; }, 400);
          laterHideFolders();
        }
      }
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
    });
  });

  // ---------- F5 scan0001: rest on the hero for 10 s ----------
  var hero = $('.hero'), heroTimer = 0, flickered = false;
  if (hero && h1) {
    hero.addEventListener('pointerenter', function () {
      clearTimeout(heroTimer);
      heroTimer = setTimeout(function () {
        if (flickered || h1.isContentEditable) return;
        flickered = true;
        var keep = h1.innerHTML;
        var steps = [['scan0001.pdf', 0], [keep, 140], ['scan0001.pdf', 260], [keep, 380], ['scan0001.pdf', 520]];
        steps.forEach(function (s) { setTimeout(function () { if (s[0] === keep) h1.innerHTML = keep; else h1.textContent = s[0]; }, full ? s[1] : 0); });
        setTimeout(function () { h1.innerHTML = keep; E.toast('Sorry. Paper in, tidy files out.'); }, 1900);
        E.found('f-scan0001');
      }, 10000);
    });
    hero.addEventListener('pointerleave', function () { clearTimeout(heroTimer); });
  }

  // ---------- F6 say cheese: the "Webcam scan" chip (no camera is opened) ----------
  var camChip = $$('.art .float').filter(function (f) { return /Webcam scan/.test(f.textContent); })[0], framing = false;
  if (camChip) {
    camChip.classList.add('cam');
    camChip.addEventListener('click', function () {
      if (framing) return;
      framing = true;
      var target = $('.art .icon-big') || camChip, r = target.getBoundingClientRect(), pad = 26;
      var fr = document.createElement('div'); fr.className = 'egg-frame'; fr.setAttribute('aria-hidden', 'true');
      fr.style.left = (r.left + scrollX - pad) + 'px'; fr.style.top = (r.top + scrollY - pad) + 'px';
      fr.style.width = (r.width + pad * 2) + 'px'; fr.style.height = (r.height + pad * 2) + 'px';
      fr.innerHTML = '<i></i><span>Hold still...</span>';
      document.body.appendChild(fr);
      setTimeout(function () { fr.classList.add('snap'); E.sound('shutter'); $('span', fr).textContent = 'Snap. No camera was used.'; }, 1600);
      setTimeout(function () { fr.remove(); framing = false; }, 3000);
      E.found('f-viewfinder');
    });
  }

  // ---------- F7 messy desk ----------
  var tidyBtn = null;
  function tidy() {
    if (!tidyBtn) return;
    cards.forEach(function (c) { c.style.transform = ''; });
    setTimeout(function () { cards.forEach(function (c) { c.style.transition = ''; }); }, 600);
    tidyBtn.remove(); tidyBtn = null;
  }
  E.word('mess', function () {
    if (tidyBtn) { tidy(); return; }
    var feats = $('#features');
    if (feats) { var r = feats.getBoundingClientRect(); if (r.top > innerHeight * 0.5 || r.bottom < 0) feats.scrollIntoView({ behavior: full ? 'smooth' : 'auto', block: 'start' }); }
    cards.forEach(function (c) {
      if (full) c.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
      c.style.transform = 'translate(' + Math.round((Math.random() - 0.5) * 80) + 'px,' + Math.round((Math.random() - 0.5) * 50) + 'px) rotate(' + Math.round((Math.random() - 0.5) * 24) + 'deg)';
    });
    tidyBtn = document.createElement('button'); tidyBtn.type = 'button'; tidyBtn.className = 'egg-tidy'; tidyBtn.textContent = 'Tidy up';
    tidyBtn.addEventListener('click', tidy);
    document.body.appendChild(tidyBtn);
    undos.push(tidy);
    E.found('f-mess');
  });

  // ---------- F8 invoice ----------
  E.word('invoice', function () {
    if ($('.egg-invoice')) return;
    var inv = document.createElement('div'); inv.className = 'egg-invoice'; inv.setAttribute('role', 'status');
    inv.innerHTML = '<h4>Invoice 0001</h4><dl><dt>Items</dt><dd>1 egg</dd><dt>Amount due</dt><dd>0</dd><dt>Status</dt><dd>Paid in curiosity</dd></dl><span class="paid">PAID</span>';
    document.body.appendChild(inv);
    setTimeout(function () { inv.classList.add('filing'); E.sound('drawer'); }, 3600);
    setTimeout(function () { inv.remove(); E.toast('Filed under Invoices.'); }, 4300);
    E.found('f-invoice');
  });

  // ---------- F9 downloads helper: after 20 s on the page ----------
  E.after(20, function () {
    if ($('.egg-notice')) return;
    var n = document.createElement('div'); n.className = 'egg-notice'; n.setAttribute('role', 'dialog'); n.setAttribute('aria-label', 'Pretend downloads helper');
    n.innerHTML = '<b>New file: curiosity.pdf</b><span>Name this by content?</span><div><button type="button" class="go">Name it</button><button type="button" class="no">Not now</button></div>';
    document.body.appendChild(n);
    var gone = setTimeout(function () { n.remove(); }, 20000);
    $('.go', n).addEventListener('click', function () {
      clearTimeout(gone);
      n.innerHTML = '<b>Named</b><span></span>';
      $('span', n).textContent = isoDate(new Date(), true) + ' Curiosity satisfied.pdf';
      E.sound('ding');
      E.found('f-downloads');
      setTimeout(function () { n.remove(); }, 3200);
    });
    $('.no', n).addEventListener('click', function () { clearTimeout(gone); n.remove(); });
  });

  // ---------- F10 day or month: type 03/04 ----------
  E.word('03/04', function () {
    if ($('.egg-notice.date')) return;
    var n = document.createElement('div'); n.className = 'egg-notice date'; n.setAttribute('role', 'dialog'); n.setAttribute('aria-label', 'Date order');
    n.innerHTML = '<b>Date order</b><span>03/04: is that 3 April or March 4?</span><div><button type="button">3 April</button><button type="button">March 4</button></div>';
    document.body.appendChild(n);
    $$('button', n).forEach(function (b) {
      b.addEventListener('click', function () {
        $('span', n).textContent = 'Both are right somewhere. EasyFile asks once and remembers.';
        $('div', n).remove();
        setTimeout(function () { n.remove(); }, 2800);
      });
    });
    setTimeout(function () { if (n.parentNode) n.remove(); }, 15000);
    E.found('f-daymonth');
  });

  // ---------- F11 undo ----------
  document.addEventListener('keydown', function (e) {
    if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.key.toLowerCase() !== 'z' || E.inField(e.target)) return;
    e.preventDefault();
    var last = undos.pop();
    if (last) last(); else E.toast('Nothing to undo. Your files are safe.');
    E.found('f-undo');
  });

  // ---------- F12 sign it: the page flies to EasySign ----------
  E.word('sign', function () {
    var link = $('.others a[href="../easysign/"]');
    var from = ($('.art .icon-big') || $('.hero')).getBoundingClientRect();
    var t = document.createElement('div'); t.className = 'egg-flytile'; t.setAttribute('aria-hidden', 'true');
    t.style.left = (from.left + from.width / 2 - 22) + 'px'; t.style.top = (from.top + from.height / 2 - 28) + 'px';
    document.body.appendChild(t);
    var to = link ? link.getBoundingClientRect() : { left: innerWidth - 80, top: innerHeight - 80, width: 0, height: 0 };
    var tx = E.clamp(to.left + to.width / 2, 30, innerWidth - 30) - (from.left + from.width / 2);
    var ty = E.clamp(to.top + to.height / 2, 30, innerHeight - 30) - (from.top + from.height / 2);
    E.sound('whoosh');
    if (full) t.animate([{ transform: 'none' }, { transform: 'translate(' + tx * 0.5 + 'px,' + (ty * 0.5 - 120) + 'px) rotate(-20deg)' }, { transform: 'translate(' + tx + 'px,' + ty + 'px) rotate(10deg) scale(.4)', opacity: 0.2 }], { duration: 1100, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    else t.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, fill: 'forwards' });
    setTimeout(function () {
      t.remove();
      if (link) { link.classList.remove('egg-pulse'); void link.offsetWidth; link.classList.add('egg-pulse'); }
    }, 1150);
    E.toast('Off to be signed.');
    E.found('f-sign');
  });

  // ---------- F13 the console ----------
  E.consoleHello(['Documents', '├─ Invoices', '├─ Receipts', '└─ Bank statements', 'Try typing scan, mess or invoice on the page.'], 'tidy', function () {
    return 'Desk tidied. 0 files lost, 0 files uploaded.';
  });
})();
