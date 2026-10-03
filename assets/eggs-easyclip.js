// EasyClip page: easter eggs. Uses the shared engine in eggs.js. Nothing here reads the clipboard: copies show only
// the text selected on this page, held in memory until the page is closed, and pastes are noticed, never read.
(function () {
  var E = window.Eggs; if (!E) return;
  var $ = E.$, $$ = E.$$, full = E.full;

  E.css('' +
    '.egg-drawer{position:fixed;left:16px;bottom:16px;z-index:56;width:min(320px,calc(100vw - 32px));background:var(--surface,#FAF9F5);border:1px solid var(--line,#E0DDD2);border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.18);font:.88rem/1.4 "Segoe UI",sans-serif;color:var(--text,#1F1E1D);overflow:hidden}' +
    'html.motion .egg-drawer{animation:egg-rise .35s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-drawer .hd{display:flex;align-items:center;gap:8px;padding:9px 10px 9px 12px;border-bottom:1px solid var(--line,#E0DDD2);font-weight:600}.egg-drawer .hd img{width:20px;height:20px}' +
    '.egg-drawer .n{margin-left:auto;font-weight:400;color:var(--muted,#5B5A55);font-size:.78rem}' +
    '.egg-drawer .x{border:0;background:none;font-size:1.2rem;line-height:1;padding:2px 6px;cursor:pointer;color:var(--muted,#5B5A55);border-radius:6px}' +
    '.egg-drawer ol{list-style:none;margin:0;padding:6px;max-height:210px;overflow:auto}' +
    '.egg-drawer li{padding:7px 9px;border-radius:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity 1s,filter 1s}' +
    '.egg-drawer li:first-child{background:var(--accent-soft,#F5E6DD)}.egg-drawer li.secret{letter-spacing:.18em}.egg-drawer li.gone{opacity:0;filter:blur(4px)}' +
    '.egg-drawer .mini{display:inline-block;width:38px;height:24px;margin-right:8px;vertical-align:middle;border:1px solid var(--line,#E0DDD2);border-radius:4px;background:linear-gradient(var(--accent,#C96442),var(--accent,#C96442)) 6px 6px/10px 10px no-repeat,linear-gradient(#C9C5BA,#C9C5BA) 19px 7px/14px 2px no-repeat,linear-gradient(#C9C5BA,#C9C5BA) 19px 12px/10px 2px no-repeat,var(--bg,#F5F4EE)}' +
    '.egg-drawer .ft{padding:8px 12px;border-top:1px solid var(--line,#E0DDD2);color:var(--muted,#5B5A55);font-size:.76rem}' +
    '.egg-flash{position:fixed;inset:0;z-index:70;background:#fff;pointer-events:none;animation:egg-flash .5s ease-out forwards}@keyframes egg-flash{from{opacity:.75}to{opacity:0}}' +
    '.egg-crop{position:absolute;z-index:57;border:2px dashed var(--accent,#C96442);border-radius:6px;pointer-events:none;box-shadow:0 0 0 9999px rgba(31,30,29,.18);transition:opacity .5s}' +
    '.egg-redact{background:#1F1E1D;color:transparent;border-radius:2px;transition:color .2s,background-color .2s;-webkit-box-decoration-break:clone;box-decoration-break:clone}' +
    '.egg-redact:hover{background:transparent;color:inherit;outline:1px dashed var(--muted,#5B5A55)}' +
    'body.egg-blurred main,body.egg-blurred header{filter:blur(8px) saturate(.7);transition:filter .35s}' +
    '.egg-unblur{position:fixed;left:50%;top:50%;z-index:60;transform:translate(-50%,-50%);padding:12px 22px;border:0;border-radius:999px;background:#1F1E1D;color:#F5F4EE;font:600 1rem "Segoe UI",sans-serif;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.25)}' +
    '.egg-pinned{position:fixed !important;right:16px;bottom:16px;z-index:54;width:min(300px,calc(100vw - 32px));margin:0;opacity:1 !important;transform:none !important;box-shadow:0 14px 34px rgba(0,0,0,.2);border-color:var(--accent,#C96442) !important}' +
    'html.motion .egg-pinned{animation:egg-rise .35s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-pinned .pin-x{position:absolute;right:8px;top:6px;border:0;background:none;font-size:1.2rem;cursor:pointer;color:var(--muted,#5B5A55)}' +
    '.egg-pinned .pin-tag{position:absolute;left:14px;top:-11px;padding:2px 9px;border-radius:999px;background:var(--accent,#C96442);color:#fff;font:600 .72rem "Segoe UI",sans-serif}' +
    '.egg-queue{position:fixed;left:50%;bottom:84px;z-index:55;transform:translateX(-50%);display:flex;gap:10px;pointer-events:none}' +
    '.egg-queue .t{display:grid;place-items:center;width:58px;height:40px;border:1.5px dashed var(--accent,#C96442);border-radius:6px;background:var(--surface,#FAF9F5);color:var(--text,#1F1E1D);font:700 1.1rem Georgia,serif;transition:background-color .2s,color .2s}' +
    '.egg-queue .t.now{background:var(--accent,#C96442);color:#fff}' +
    'html.motion .egg-queue .t{animation:egg-march .7s cubic-bezier(.2,.7,.2,1) both}@keyframes egg-march{from{transform:translateX(-60vw)}to{transform:none}}' +
    '.egg-snippet{position:fixed;left:50%;bottom:84px;z-index:55;transform:translateX(-50%);width:min(360px,calc(100vw - 32px));padding:12px 16px;border-radius:12px;background:var(--surface,#FAF9F5);border:1px solid var(--line,#E0DDD2);box-shadow:0 10px 28px rgba(0,0,0,.16);font:1rem "Segoe UI",sans-serif;color:var(--text,#1F1E1D)}' +
    '.egg-snippet small{display:block;color:var(--muted,#5B5A55);font-size:.75rem;margin-bottom:4px}.egg-snippet mark{background:var(--accent-soft,#F5E6DD);color:inherit;border-radius:4px;padding:0 3px}' +
    '.art .float.thirty{cursor:pointer;transition:opacity 1s,filter 1s}.art .float.thirty.gone{opacity:0 !important;filter:blur(6px)}' +
    '.egg-clip{position:fixed;right:18px;bottom:18px;z-index:57;display:flex;align-items:flex-end;gap:10px;max-width:calc(100vw - 36px)}' +
    'html.motion .egg-clip{animation:egg-peek .6s cubic-bezier(.2,1.3,.4,1) both}@keyframes egg-peek{from{transform:translateY(160px)}to{transform:none}}' +
    '.egg-clip svg{width:58px;height:96px;flex:0 0 auto}' +
    '.egg-clip .bubble{max-width:250px;padding:12px 14px;border-radius:12px;background:#FFF8D6;border:1px solid #D9C88A;color:#1F1E1D;font:.88rem/1.4 "Segoe UI",sans-serif;box-shadow:0 8px 22px rgba(0,0,0,.14)}' +
    '.egg-clip .bubble div{display:flex;gap:8px;margin-top:10px}.egg-clip button{padding:6px 12px;border-radius:8px;border:1px solid #BFAE6E;background:#fff;color:#1F1E1D;font:600 .82rem "Segoe UI",sans-serif;cursor:pointer}' +
    'html.egg-plain h1,html.egg-plain h2,html.egg-plain h3{font-family:"Segoe UI",system-ui,sans-serif !important;font-weight:600}' +
    '.fine .decoy{font-variant-numeric:tabular-nums}');

  // ---------- C1 history drawer, C2 secret wiped, C9 professional hoarder ----------
  var copied = [], copies = 0, drawer = null, hideT = 0;
  function openDrawer() {
    if (drawer) return drawer;
    drawer = document.createElement('div');
    drawer.className = 'egg-drawer'; drawer.setAttribute('role', 'region'); drawer.setAttribute('aria-label', 'Pretend EasyClip history');
    drawer.innerHTML = '<div class="hd"><img alt="" src="' + E.root + 'images/apps/easyclip.png">EasyClip<span class="n"></span><button type="button" class="x" aria-label="Close">&times;</button></div><ol></ol><div class="ft">EasyClip would remember this. This page only, gone when you close it.</div>';
    document.body.appendChild(drawer);
    $('.x', drawer).addEventListener('click', closeDrawer);
    return drawer;
  }
  function closeDrawer() { if (drawer) { drawer.remove(); drawer = null; } }
  function keepOpen() { clearTimeout(hideT); hideT = setTimeout(closeDrawer, 12000); }
  function addRow(text, cls, html) {
    openDrawer();
    var li = document.createElement('li');
    if (cls) li.className = cls;
    if (html) li.innerHTML = html; else li.textContent = text;
    var ol = $('ol', drawer); ol.insertBefore(li, ol.firstChild);
    while (ol.children.length > 8) ol.removeChild(ol.lastChild);
    $('.n', drawer).textContent = copies ? copies + ' of 500' : '';
    keepOpen();
    return li;
  }
  document.addEventListener('copy', function () {
    var text = String(window.getSelection ? window.getSelection() : '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    copies++;
    if (/482\s?913/.test(text)) {
      var li = addRow('••• •••', 'secret');
      setTimeout(function () { li.classList.add('gone'); }, 4000);
      setTimeout(function () { li.remove(); E.toast("Secret wiped. That's what EasyClip does with real ones."); }, 5000);
      E.found('c-secret');
    } else {
      copied.unshift(text.slice(0, 200));
      addRow(text.length > 80 ? text.slice(0, 80) + '...' : text);
    }
    E.found('c-drawer');
    if (copies === 10) { E.toast('10 of 500. Keep going?'); E.found('c-hoarder'); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); unblur(); unpin(); } });

  // ---------- C3 nothing to paste (the paste is noticed, its content is never read) ----------
  var pasteAt = 0;
  function nothingToPaste(e) {
    if (E.inField(e.target) || Date.now() - pasteAt < 500) return;
    pasteAt = Date.now();
    E.toast('Nothing to paste here. Great reflexes though.');
    E.found('c-paste');
  }
  document.addEventListener('paste', nothingToPaste);
  document.addEventListener('keydown', function (e) { if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'v') nothingToPaste(e); });

  // ---------- C4 say cheese: Ctrl+Alt+P or Print Screen ----------
  function cheese() {
    var flash = document.createElement('div'); flash.className = 'egg-flash';
    document.body.appendChild(flash); setTimeout(function () { flash.remove(); }, 600);
    E.sound('shutter');
    var hero = $('.hero .wrap') || $('main'), r = hero.getBoundingClientRect();
    var crop = document.createElement('div'); crop.className = 'egg-crop';
    crop.style.left = (r.left + scrollX - 8) + 'px'; crop.style.top = (r.top + scrollY - 8) + 'px';
    crop.style.width = (r.width + 16) + 'px'; crop.style.height = (r.height + 16) + 'px';
    document.body.appendChild(crop);
    setTimeout(function () { crop.style.opacity = 0; }, 1100);
    setTimeout(function () { crop.remove(); }, 1700);
    setTimeout(function () { addRow('', '', '<span class="mini"></span>Screenshot of the top of this page'); }, 500);
    E.toast('Say cheese. Screenshot saved to the history. (A pretend one.)');
    E.found('c-cheese');
  }
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'p') { e.preventDefault(); cheese(); }
  });
  document.addEventListener('keyup', function (e) { if (e.key === 'PrintScreen') cheese(); });

  // ---------- C5 redact: random words get black bars for 6 s ----------
  var redacted = [];
  E.word('redact', function () {
    if (redacted.length) return;
    var nodes = [];
    $$('main p, main h3, main li').forEach(function (el) {
      if (el.closest('.art')) return;
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n;
      while ((n = w.nextNode())) if (/\w{4,}/.test(n.nodeValue)) nodes.push(n);
    });
    nodes.sort(function () { return Math.random() - 0.5; }).slice(0, 26).forEach(function (n) {
      var words = [], re = /\w{4,}/g, m;
      while ((m = re.exec(n.nodeValue))) words.push(m);
      if (!words.length || !n.parentNode) return;
      m = words[Math.floor(Math.random() * words.length)];
      var mid = n.splitText(m.index); mid.splitText(m[0].length);
      var s = document.createElement('span'); s.className = 'egg-redact';
      mid.parentNode.replaceChild(s, mid); s.appendChild(mid);
      redacted.push(s);
    });
    E.toast('Redacted. Hover a bar to peek.');
    E.found('c-redact');
    setTimeout(function () {
      redacted.forEach(function (s) { var p = s.parentNode; if (!p) return; p.replaceChild(s.firstChild, s); p.normalize(); });
      redacted = [];
    }, 6000);
  });

  // ---------- C6 hide all: the page blurs until the button is clicked ----------
  var unblurBtn = null;
  function unblur() {
    if (!unblurBtn) return;
    document.body.classList.remove('egg-blurred'); unblurBtn.remove(); unblurBtn = null;
  }
  E.word('blur', function () {
    if (unblurBtn) { unblur(); return; }
    document.body.classList.add('egg-blurred');
    unblurBtn = document.createElement('button'); unblurBtn.type = 'button'; unblurBtn.className = 'egg-unblur';
    unblurBtn.textContent = 'Hidden. Click to show';
    unblurBtn.addEventListener('click', unblur);
    document.body.appendChild(unblurBtn);
    E.found('c-blur');
  });

  // ---------- C7 pinned: double-click a feature card ----------
  var pinned = null;
  function unpin() { if (pinned) { pinned.remove(); pinned = null; } }
  $$('#features .card').forEach(function (card) {
    card.addEventListener('dblclick', function () {
      unpin();
      if (window.getSelection) window.getSelection().removeAllRanges();
      pinned = card.cloneNode(true);
      pinned.classList.remove('reveal', 'flip', 'tilt', 'in');
      pinned.classList.add('egg-pinned'); pinned.removeAttribute('style');
      pinned.setAttribute('role', 'complementary'); pinned.setAttribute('aria-label', 'Pinned card');
      pinned.insertAdjacentHTML('afterbegin', '<span class="pin-tag">Pinned</span><button type="button" class="pin-x" aria-label="Unpin">&times;</button>');
      $('.pin-x', pinned).addEventListener('click', unpin);
      document.body.appendChild(pinned);
      E.found('c-pin');
    });
  });

  // ---------- C8 queue: three tickets ----------
  var queueing = false;
  E.word('queue', function () {
    if (queueing) return;
    queueing = true;
    var q = document.createElement('div'); q.className = 'egg-queue'; q.setAttribute('aria-hidden', 'true');
    q.innerHTML = '<span class="t" style="animation-delay:0s">1</span><span class="t" style="animation-delay:.15s">2</span><span class="t" style="animation-delay:.3s">3</span>';
    document.body.appendChild(q);
    var tickets = $$('.t', q);
    E.toast('Now serving number 1... 2... 3.', 4200);
    tickets.forEach(function (t, i) {
      setTimeout(function () { tickets.forEach(function (o) { o.classList.toggle('now', o === t); }); E.sound('ding'); }, (full ? 900 : 300) + i * 900);
    });
    setTimeout(function () { q.remove(); queueing = false; }, (full ? 900 : 300) + 3200);
    E.found('c-queue');
  });

  // ---------- C10 snippet fields: date ----------
  var snippet = null;
  E.word('date', function () {
    if (snippet) return;
    snippet = document.createElement('div'); snippet.className = 'egg-snippet'; snippet.setAttribute('role', 'status');
    snippet.innerHTML = '<small>Snippet</small><span></span>';
    document.body.appendChild(snippet);
    var out = $('span', snippet), text = 'Signed on {date}', i = 0;
    var today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    (function type() {
      out.textContent = text.slice(0, ++i);
      if (i < text.length) { setTimeout(type, full ? 45 : 0); return; }
      setTimeout(function () { out.innerHTML = 'Signed on <mark></mark>'; $('mark', out).textContent = today; }, 600);
      setTimeout(function () { snippet.remove(); snippet = null; }, 4200);
    })();
    E.found('c-date');
  });

  // ---------- C11 thirty seconds: the "Wiped in 30 s" chip ----------
  var timerChip = $$('.art .float').filter(function (f) { return /Wiped in 30 s/.test(f.textContent); })[0];
  if (timerChip) {
    var tLabel = timerChip.lastChild, tText = tLabel.textContent, counting = false;
    timerChip.classList.add('thirty');
    timerChip.addEventListener('click', function () {
      if (counting) return;
      counting = true;
      var n = 30;
      (function tick() {
        tLabel.textContent = 'Wiped in ' + n + ' s';
        if (n-- > 0) { setTimeout(tick, 100); return; }
        timerChip.classList.add('gone');
        E.found('c-thirty');
        setTimeout(function () { tLabel.textContent = tText; timerChip.classList.remove('gone'); counting = false; }, 1600);
      })();
    });
  }

  // ---------- C12 the paperclip ----------
  var CLIP = '<svg viewBox="0 0 60 100" aria-hidden="true"><path d="M20 34v42a10 10 0 0 0 20 0V22a16 16 0 0 0-32 0v52" fill="none" stroke="#8F8D86" stroke-width="5" stroke-linecap="round"/>' +
    '<circle cx="21" cy="40" r="7" fill="#fff" stroke="#1F1E1D" stroke-width="1.5"/><circle cx="38" cy="40" r="7" fill="#fff" stroke="#1F1E1D" stroke-width="1.5"/><circle cx="23" cy="42" r="3" fill="#1F1E1D"/><circle cx="40" cy="42" r="3" fill="#1F1E1D"/></svg>';
  E.idle(45, function () {
    if ($('.egg-clip')) return;
    var c = document.createElement('div'); c.className = 'egg-clip'; c.setAttribute('role', 'dialog'); c.setAttribute('aria-label', 'A helpful paperclip');
    c.innerHTML = '<div class="bubble"><span>It looks like you\'re reading a website. Want help copying something?</span><div><button type="button" class="yes">Yes</button><button type="button" class="no">Go away</button></div></div>' + CLIP;
    if (pinned) c.style.bottom = (pinned.offsetHeight + 34) + 'px'; // sit above a pinned card
    document.body.appendChild(c);
    var leave = setTimeout(function () { c.remove(); }, 20000);
    $('.yes', c).addEventListener('click', function () {
      clearTimeout(leave); c.remove();
      addRow(document.title);
      E.toast("Copied nothing. Here's the page title instead.");
    });
    $('.no', c).addEventListener('click', function () {
      clearTimeout(leave);
      $('.bubble', c).textContent = "Fine. I'll be in the history.";
      setTimeout(function () { c.remove(); }, 1600);
    });
    E.found('c-paperclip');
  });

  // ---------- C13 plain text: headings lose their serif ----------
  E.word('plain', function () {
    var root = document.documentElement;
    if (root.classList.contains('egg-plain')) return;
    root.classList.add('egg-plain');
    E.toast('Pasted as plain text.');
    setTimeout(function () { root.classList.remove('egg-plain'); }, 4000);
    E.found('c-plain');
  });

  // ---------- C14 the console ----------
  E.consoleHello(["We can't see your clipboard. Promise.", 'Try typing redact, queue or blur on the page.'], 'clips', function () {
    return copied.length ? copied.slice() : 'Nothing copied on this page yet. Select some text and press Ctrl+C.';
  });
})();
