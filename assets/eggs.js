// Easy Suite easter eggs: the shared engine used by every page of the site.
// Typed words, idle timers, toasts, quiet sounds, a small shape recogniser, the egg passport and the eggs that work
// everywhere (retro mode, tab titles, printing, select all). Nothing here reads the clipboard, the camera or the
// network; the passport is kept only in this browser (localStorage "easysuite-eggs").
// Hello, curious reader. You're in the right place.
(function () {
  var script = document.currentScript;
  var PAGE = (script && script.dataset.page) || 'hub';
  var ROOT = script ? new URL('..', script.src).href : '/';
  var root = document.documentElement;
  var full = root.classList.contains('motion');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  // ---------- the catalogue: every egg on the site, with a clue for the passport ----------
  var PAGES = [
    { id: 'hub', name: 'Easy Suite', icon: 'images/suite-logo.png', url: '', eggs: [
      ['h-shuffle', 'Tile shuffle', 'Some logos like to be clicked. A lot.'],
      ['h-easy', 'Easy mode', 'What is the opposite of hard? Type it.'],
      ['h-hard', 'Hard mode', 'Some modes are not supported. Try one anyway.'],
      ['h-fusion', 'App fusion', 'What happens when two apps meet?'],
      ['h-suite', 'Room service', 'It is a suite, after all.'],
      ['h-elevator', 'Going up', 'Elevators work best from the bottom floor.'],
      ['h-plane', 'Paper plane', 'Nothing leaves your PC. Put it to the test.'],
      ['h-nap', 'Nap time', 'Tiles get sleepy when nobody moves.'],
      ['h-jobs', 'Real job titles', 'Shift your view of the tiles.'],
      ['h-sooner', 'Coming sooner', 'Stare at a status long enough.'],
      ['h-progress', 'Honest progress', 'The last bit always takes the longest.'],
      ['h-flourish', 'Flourish untangled', 'A squiggle with a secret.'],
      ['h-ps', 'Postscript', 'Good notes have a P.S.'],
      ['h-console', 'Console whisperer', 'Developers have their own window.'],
      ['h-404', 'The 404 detective', 'Get lost on purpose, then find your way.']] },
    { id: 'easysign', name: 'EasySign', icon: 'images/apps/easysign.png', url: 'easysign/', eggs: [
      ['s-doc', "The Doctor's Note", 'Doctors sign differently.'],
      ['s-ink-out', 'Out of Ink', 'Hold the pen down for a long, long time.'],
      ['s-commit', 'Commitment Issues', 'Some buttons are shy.'],
      ['s-quill', 'Feather Quill', 'Not every finger is a finger.'],
      ['s-smudge', 'The Smudge', 'Wet ink does not like scribbles.'],
      ['s-hancock', 'John Hancock', 'A very historic signature.'],
      ['s-wax', 'Wax Seal', 'Important papers deserve a seal.'],
      ['s-sign', 'Encore', "Type the app's favourite word."],
      ['s-autosign', 'Self signing pad', 'Click the logo until something happens.'],
      ['s-counter', 'Stubborn counter', 'Some counters are more ambitious than others.'],
      ['s-console', 'Ink in the console', 'Developers have their own window.'],
      ['s-invisible', 'Invisible ink', 'Some ink only shows under the right light.'],
      ['s-x', 'X marks the spot', 'Pirates sign differently too.'],
      ['s-love', 'Signed with love', 'Draw what you feel.'],
      ['s-line', 'Bold minimalism', 'Less is more. Much less.'],
      ['s-forge', 'Forgery detected', 'Only sign for yourself.'],
      ['s-notary', 'Notary', 'Make it official. Sort of.'],
      ['s-undo', 'Undo the past', 'Undo, undo, undo, undo...'],
      ['s-lights', 'Lights out', 'Charcoal, but for real.']] },
    { id: 'easypdf', name: 'EasyPDF', icon: 'images/apps/easypdf.png', url: 'easypdf/', eggs: [
      ['p-merge', 'Merge', 'Type what EasyPDF does to files.'],
      ['p-split', 'Split', 'And the opposite.'],
      ['p-shrink', 'Shrink', 'Make the whole page smaller.'],
      ['p-blank', 'Fill in the blank', 'Blanks are meant to be filled.'],
      ['p-rotate', 'Rotate', 'R rotates more than pages.'],
      ['p-bytes', 'Smaller and smaller', 'How small can 2 MB go?'],
      ['p-tear', 'Tear and tape', 'Pages tear. Tape fixes.'],
      ['p-papercut', 'Paper cut', 'Careful with the edges.'],
      ['p-highlighter', 'Highlighter', 'Select, select, select.'],
      ['p-staple', 'Staple', 'Pages can be stapled.'],
      ['p-jam', 'Paper jam', 'Hold on to what is available.'],
      ['p-origami', 'Origami', 'Idle paper folds itself.'],
      ['p-pages', 'Page counter', 'Read the whole thing, fast.'],
      ['p-console', 'PDF in the console', 'Developers have their own window.']] },
    { id: 'easyclip', name: 'EasyClip', icon: 'images/apps/easyclip.png', url: 'easyclip/', eggs: [
      ['c-drawer', 'History drawer', 'Copy something. Anything.'],
      ['c-secret', 'Secret wiped', 'Some codes should not stay.'],
      ['c-paste', 'Nothing to paste', 'Paste where there is nowhere to paste.'],
      ['c-cheese', 'Say cheese', 'The screenshot shortcut works here too.'],
      ['c-redact', 'Redact', 'Some words should be hidden.'],
      ['c-blur', 'Hide all', 'Make it fuzzy.'],
      ['c-pin', 'Pinned', 'Cards can be pinned.'],
      ['c-queue', 'Queue', 'Take a number.'],
      ['c-hoarder', 'Professional hoarder', 'Keep copying.'],
      ['c-date', 'Snippet fields', 'What is today, in a snippet?'],
      ['c-thirty', 'Thirty seconds', 'Click the countdown.'],
      ['c-paperclip', 'The paperclip', 'Sit still and someone may offer help.'],
      ['c-plain', 'Plain text', 'Paste it plainly.'],
      ['c-console', 'Clipboard in the console', 'Developers have their own window.']] },
    { id: 'easyfile', name: 'EasyFile', icon: 'images/apps/easyfile.png', url: 'easyfile/', eggs: [
      ['f-scan', 'Scan', 'Type what the webcam does.'],
      ['f-rename', 'Rename the page', 'Headings can be renamed too.'],
      ['f-overwrite', 'Never overwritten', 'Try to overwrite what never is.'],
      ['f-file', 'File everything', 'Cards belong in folders.'],
      ['f-scan0001', 'scan0001', 'Linger on the headline.'],
      ['f-viewfinder', 'Say cheese', 'The webcam chip wants a photo.'],
      ['f-mess', 'Messy desk', 'Make a mess.'],
      ['f-invoice', 'Invoice', 'Some paperwork is fun.'],
      ['f-downloads', 'Downloads helper', 'Stay a while and a file appears.'],
      ['f-daymonth', 'Day or month', 'Is 03/04 March or April?'],
      ['f-undo', 'Undo', 'Changed your mind?'],
      ['f-sign', 'Sign it', 'A scan wants to be signed.'],
      ['f-console', 'Folders in the console', 'Developers have their own window.']] },
    { id: 'easytouch', name: 'EasyTouch', icon: 'images/apps/easytouch.png', url: 'easytouch/', eggs: [
      ['t-gesture', 'Real gestures', 'Draw a letter on the big icon. S, C or D.'],
      ['t-sums', 'Sums', 'Type a sum, end with ='],
      ['t-numpad', 'Number pad', 'Ask for the number pad.'],
      ['t-laser', 'Laser', 'Type the screen tool.'],
      ['t-spotlight', 'Spotlight', 'All eyes on the cursor.'],
      ['t-palm', 'Palm detected', 'Click all over the place, fast.'],
      ['t-swipe', 'Swipe', 'Sideways at the top. Shift and the wheel work too.'],
      ['t-timeout', 'Mode timeout', 'Thirty seconds without a touch.'],
      ['t-fingerprint', 'Fingerprint', 'Press on the big icon and hold still.'],
      ['t-lock', 'Lock gesture', 'L is for lock. Draw it on the big icon.'],
      ['t-shapes', 'Shapes straighten', 'Draw a wobbly circle on the big icon.'],
      ['t-twofinger', 'Two finger tap', 'Right is the new two.'],
      ['t-console', 'Touch in the console', 'Developers have their own window.']] },
    { id: 'easyguard', name: 'EasyGuard', icon: 'images/apps/easyguard.png', url: 'easyguard/', eggs: [
      ['g-eyes', "Someone's looking", 'Stay a while. You may not be alone.'],
      ['g-onlooker', 'The onlooker', 'Stay even longer. Watch your cursor.'],
      ['g-switch', 'Switch it on', 'Use the real shortcut.'],
      ['g-faces', 'Faces', 'Smile. Then smile again.'],
      ['g-paused', 'Paused', 'Leave and come back.'],
      ['g-battery', 'Battery saver', 'Low battery changes things. Or just type it.'],
      ['g-spy', 'Spy', 'Type what an onlooker is.'],
      ['g-blinds', 'Blinds', 'Linger on the lock.'],
      ['g-lab', 'The experiment', 'Do not disturb the lab. Or do.'],
      ['g-anykey', 'Any key', 'When blurred, press a letter.'],
      ['g-who', 'Who?', 'Ask who it is.'],
      ['g-console', 'No camera in the console', 'Developers have their own window.']] },
    { id: 'all', name: 'Everywhere', icon: 'images/suite-logo.png', url: '', eggs: [
      ['a-retro', 'Retro mode', 'Up, up, down, down...'],
      ['a-away', 'Tab title', 'Leave a page, then look at its tab.'],
      ['a-print', 'Printed', 'Paper is so last century.'],
      ['a-selectall', 'Select all', 'Everything, all at once.']] }
  ];
  var CATALOG = {};
  PAGES.forEach(function (p) { p.eggs.forEach(function (e) { CATALOG[e[0]] = { page: p.id, name: e[1], clue: e[2] }; }); });

  // ---------- storage ----------
  var KEY = 'easysuite-eggs';
  function load() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || '{}'); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; }
  }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { } }
  var store = load();

  // ---------- styles ----------
  var css = '' +
    '.egg-toasts{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:60;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;width:min(560px,calc(100vw - 32px))}' +
    '.egg-toast{display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:12px;background:#1F1E1D;color:#F5F4EE;font:600 .92rem/1.4 "Segoe UI",system-ui,sans-serif;text-align:center;opacity:0;transform:translateY(10px);transition:opacity .3s,transform .35s cubic-bezier(.2,.7,.2,1)}' +
    '.egg-toast.on{opacity:1;transform:none}' +
    '.egg-toast.egg-stamp{background:#C96442;color:#fff}.egg-toast.egg-stamp img{width:22px;height:22px}' +
    '.egg-confetti{position:fixed;top:-60px;z-index:61;width:30px;height:30px;pointer-events:none;animation:egg-fall linear forwards}' +
    '@keyframes egg-fall{to{transform:translateY(calc(100vh + 120px)) rotate(var(--r,360deg))}}' +
    'html.calm .egg-confetti{animation-name:egg-fade}@keyframes egg-fade{0%{opacity:0}20%{opacity:1}100%{opacity:0}}' +
    '.egg-passport-btn{font:inherit;color:inherit;background:none;border:1px dashed currentColor;border-radius:999px;padding:5px 12px;cursor:pointer;opacity:.8}.egg-passport-btn:hover{opacity:1}' +
    'dialog.egg-passport{width:min(760px,94vw);max-height:88vh;padding:0;border:1px solid var(--line,#E0DDD2);border-radius:18px;background:var(--surface,#FAF9F5);color:var(--text,#1F1E1D)}' +
    'dialog.egg-passport::backdrop{background:rgba(20,19,18,.6)}' +
    '.egg-pp-head{position:sticky;top:0;display:flex;align-items:center;gap:12px;padding:18px 22px;background:var(--surface,#FAF9F5);border-bottom:1px solid var(--line,#E0DDD2);z-index:1}' +
    '.egg-pp-head h2{font:normal 1.6rem Georgia,serif;margin:0}.egg-pp-head .x{margin-left:auto;font:1.4rem Georgia,serif;width:38px;height:38px;border-radius:50%;border:1px solid var(--line,#E0DDD2);background:none;color:inherit;cursor:pointer}' +
    '.egg-pp-body{padding:8px 22px 22px}.egg-pp-page{margin-top:18px}.egg-pp-page h3{display:flex;align-items:center;gap:10px;font:normal 1.15rem Georgia,serif;margin:0 0 10px}.egg-pp-page h3 img{width:26px;height:26px}.egg-pp-page h3 small{font:600 .8rem "Segoe UI",sans-serif;color:var(--muted,#5B5A55)}' +
    '.egg-pp-page.gold h3 small{color:#B07A12}.egg-pp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px}' +
    '.egg-pp-stamp{padding:9px 12px;border-radius:10px;border:1px dashed var(--line,#E0DDD2);font-size:.86rem;color:var(--muted,#5B5A55)}' +
    '.egg-pp-stamp.got{border-style:solid;border-color:#C96442;color:var(--text,#1F1E1D);background:var(--accent-soft,#F5E6DD)}.egg-pp-stamp b{display:block;font-weight:600}' +
    '.egg-pp-page.gold .egg-pp-stamp.got{border-color:#C9A227;background:rgba(201,162,39,.16)}' +
    '.egg-pp-foot{display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;align-items:center;padding:14px 22px;border-top:1px solid var(--line,#E0DDD2);font-size:.85rem;color:var(--muted,#5B5A55)}' +
    '.egg-pp-foot button{font:inherit;border:1px solid var(--line,#E0DDD2);background:none;color:inherit;border-radius:10px;padding:6px 12px;cursor:pointer}' +
    '.egg-print{display:none}@media print{.egg-print{display:block;font:italic 14pt Georgia,serif;text-align:center;border:1px dashed #999;padding:10px;margin:10px}}' +
    'html.retro body{font-family:"Lucida Console","Courier New",monospace !important;letter-spacing:.02em}' +
    'html.retro h1,html.retro h2,html.retro h3{font-family:"Lucida Console","Courier New",monospace !important;text-transform:uppercase;letter-spacing:.04em}' +
    'html.retro img{image-rendering:pixelated}html.retro .btn,html.retro .card,html.retro .app,html.retro .tile{border-radius:0 !important}' +
    'html.retro body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:70;background:repeating-linear-gradient(to bottom,rgba(0,0,0,.06) 0 1px,transparent 1px 3px)}' +
    '.egg-chip{position:fixed;right:16px;top:76px;z-index:55;padding:6px 12px;border-radius:999px;background:#1F1E1D;color:#F5F4EE;font:600 .82rem "Segoe UI",sans-serif;pointer-events:none;animation:egg-rise .35s cubic-bezier(.2,.7,.2,1)}' +
    '@keyframes egg-rise{from{opacity:0;transform:translateY(10px)}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- toasts ----------
  var toasts = document.createElement('div');
  toasts.className = 'egg-toasts';
  toasts.setAttribute('role', 'status');
  toasts.setAttribute('aria-live', 'polite');
  document.body.appendChild(toasts);
  function toast(text, ms, cls, icon) {
    var t = document.createElement('div');
    t.className = 'egg-toast' + (cls ? ' ' + cls : '');
    if (icon) { var im = document.createElement('img'); im.src = ROOT + icon; im.alt = ''; t.appendChild(im); }
    t.appendChild(document.createTextNode(text));
    toasts.appendChild(t);
    while (toasts.children.length > 3) toasts.removeChild(toasts.firstChild);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('on'); }); });
    setTimeout(function () { t.classList.remove('on'); setTimeout(function () { t.remove(); }, 400); }, ms || 3200);
    return t;
  }
  var chipEl = null, chipTimer = 0;
  function chip(text, ms) {
    if (chipEl) chipEl.remove();
    clearTimeout(chipTimer);
    if (!text) { chipEl = null; return; }
    chipEl = document.createElement('div');
    chipEl.className = 'egg-chip';
    chipEl.textContent = text;
    document.body.appendChild(chipEl);
    if (ms) chipTimer = setTimeout(function () { chip(null); }, ms);
  }

  // ---------- found eggs and the passport ----------
  function countFor(page) {
    var p = PAGES.filter(function (x) { return x.id === page; })[0];
    if (!p) return [0, 0];
    return [p.eggs.filter(function (e) { return store[e[0]]; }).length, p.eggs.length];
  }
  function totalFound() {
    var n = 0, t = 0;
    PAGES.forEach(function (p) { var c = countFor(p.id); n += c[0]; t += c[1]; });
    return [n, t];
  }
  function found(id) {
    var c = CATALOG[id];
    if (!c || store[id]) return false;
    store[id] = Date.now();
    save(store);
    var pc = countFor(c.page);
    var where = c.page === 'all' ? 'found everywhere' : 'on this page';
    toast('Egg found: ' + c.name + ' (' + pc[0] + ' of ' + pc[1] + ' ' + where + ')', 3600, 'egg-stamp', 'images/suite-logo.png');
    passportButton();
    if (pc[0] === pc[1]) setTimeout(function () { toast('Every egg on this page found. Your stamp just turned gold.', 4200); confetti(); }, 900);
    var all = totalFound();
    if (all[0] === all[1]) setTimeout(function () { toast('All ' + all[1] + ' eggs found. You are an Easy Suite explorer.', 6000); confetti(40); }, 2200);
    return true;
  }
  var ppBtn = null;
  function passportButton() {
    if (ppBtn || !Object.keys(store).length) return;
    var foot = $('footer .wrap');
    if (!foot) return;
    ppBtn = document.createElement('button');
    ppBtn.type = 'button';
    ppBtn.className = 'egg-passport-btn';
    ppBtn.textContent = 'Egg passport';
    ppBtn.addEventListener('click', openPassport);
    foot.appendChild(ppBtn);
  }
  var dlg = null;
  function openPassport() {
    if (dlg) dlg.remove();
    dlg = document.createElement('dialog');
    dlg.className = 'egg-passport';
    dlg.setAttribute('aria-label', 'Egg passport');
    var all = totalFound();
    var html = '<div class="egg-pp-head"><h2>Egg passport</h2><span class="muted">' + all[0] + ' of ' + all[1] + ' found</span><button type="button" class="x" aria-label="Close">&times;</button></div><div class="egg-pp-body">';
    PAGES.forEach(function (p) {
      var c = countFor(p.id), gold = c[0] === c[1];
      html += '<div class="egg-pp-page' + (gold ? ' gold' : '') + '"><h3><img src="' + ROOT + p.icon + '" alt="">' + p.name + ' <small>' + c[0] + ' of ' + c[1] + (gold ? ', gold' : '') + '</small></h3><div class="egg-pp-grid">';
      p.eggs.forEach(function (e) {
        html += store[e[0]] ? '<div class="egg-pp-stamp got"><b>' + e[1] + '</b>found</div>' : '<div class="egg-pp-stamp"><b>???</b>' + e[2] + '</div>';
      });
      html += '</div></div>';
    });
    html += '</div><div class="egg-pp-foot"><span>Kept only in this browser. Nothing is sent anywhere.</span><button type="button" class="clear">Clear passport</button></div>';
    dlg.innerHTML = html;
    document.body.appendChild(dlg);
    $('.x', dlg).addEventListener('click', function () { dlg.close(); });
    $('.clear', dlg).addEventListener('click', function () {
      store = {}; save(store); dlg.close();
      if (ppBtn) { ppBtn.remove(); ppBtn = null; }
      toast('Passport cleared. Happy hunting.');
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () { dlg.remove(); dlg = null; });
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  }

  // ---------- confetti of app icons ----------
  var ICONS = ['easysign', 'easypdf', 'easyclip', 'easyfile', 'easytouch', 'easyguard'];
  function confetti(n) {
    n = n || 18;
    for (var i = 0; i < n; i++) {
      var im = document.createElement('img');
      im.src = ROOT + 'images/apps/' + ICONS[i % ICONS.length] + '.png';
      im.alt = '';
      im.className = 'egg-confetti';
      im.style.left = (Math.random() * 96) + 'vw';
      im.style.animationDuration = (full ? 2.2 + Math.random() * 1.6 : 2.4) + 's';
      im.style.animationDelay = (Math.random() * 0.8) + 's';
      im.style.setProperty('--r', (Math.random() * 720 - 360).toFixed(0) + 'deg');
      document.body.appendChild(im);
      setTimeout(function (el) { el.remove(); }.bind(null, im), 5200);
    }
  }

  // ---------- quiet sounds (Web Audio, only right after a key or click) ----------
  var ac = null;
  function ctx() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ac = ac || new AC();
      if (ac.state === 'suspended') ac.resume();
      return ac;
    } catch (e) { return null; }
  }
  function tone(type, f0, f1, dur, vol, delay) {
    var a = ctx(); if (!a) return;
    var t = a.currentTime + (delay || 0), o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(dur, vol, filter, freq, delay) {
    var a = ctx(); if (!a) return;
    var t = a.currentTime + (delay || 0);
    var b = a.createBuffer(1, Math.max(1, Math.round(a.sampleRate * dur)), a.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
    var s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    s.buffer = b; f.type = filter; f.frequency.value = freq; g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(a.destination); s.start(t);
  }
  var SOUNDS = {
    ding: function () { tone('sine', 1320, 1320, 1.2, 0.12); tone('sine', 2640, 2640, 0.6, 0.04); },
    thud: function () { tone('sine', 150, 42, 0.32, 0.25); noise(0.06, 0.2, 'lowpass', 650); },
    click: function () { noise(0.03, 0.25, 'highpass', 2400); },
    shutter: function () { noise(0.05, 0.3, 'bandpass', 3000); noise(0.05, 0.25, 'bandpass', 2200, 0.09); },
    blip: function () { tone('square', 880, 880, 0.08, 0.05); },
    pop: function () { tone('sine', 420, 900, 0.12, 0.12); },
    drawer: function () { noise(0.25, 0.15, 'lowpass', 400); tone('sine', 90, 60, 0.2, 0.12, 0.2); },
    whoosh: function () { noise(0.4, 0.12, 'bandpass', 900); },
    chomp: function () { noise(0.05, 0.3, 'highpass', 1500); tone('square', 220, 110, 0.06, 0.06, 0.04); }
  };
  function sound(name) { try { if (SOUNDS[name]) SOUNDS[name](); } catch (e) { } }

  // ---------- typed words (anywhere but text fields; reset after 2 s) ----------
  var words = [], typed = '', typedAt = 0;
  function inField(t) { return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)); }
  function word(w, fn) { words.push([w.toLowerCase(), fn]); words.sort(function (a, b) { return b[0].length - a[0].length; }); }
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || e.key.length !== 1 || inField(e.target)) return;
    var now = Date.now();
    if (now - typedAt > 2000) typed = '';
    // Firefox opens Quick Find on / and '. Mid-egg (after a digit, as in 03/04 or 12/4=) the key belongs to the egg.
    if ((e.key === '/' || e.key === "'") && /\d$/.test(typed)) e.preventDefault();
    typedAt = now;
    typed = (typed + e.key.toLowerCase()).slice(-24);
    for (var i = 0; i < words.length; i++) {
      var w = words[i][0];
      if (typed.slice(-w.length) === w) { typed = ''; words[i][1](e); return; }
    }
  });
  // Words that end with a pattern (sums like 12x7=).
  var patterns = [];
  function pattern(re, fn) { patterns.push([re, fn]); }
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1 || inField(e.target) || !patterns.length) return;
    patterns.forEach(function (p) { var m = typed.match(p[0]); if (m) { typed = ''; p[1](m); } });
  });

  // ---------- idle ----------
  var idlers = [], lastActive = Date.now();
  function idle(seconds, fn, repeat) { idlers.push({ ms: seconds * 1000, fn: fn, repeat: !!repeat, fired: false }); }
  function active() {
    lastActive = Date.now();
    idlers.forEach(function (i) { if (i.repeat) i.fired = false; if (i.wake) { var w = i.wake; i.wake = null; w(); } });
  }
  ['mousemove', 'keydown', 'scroll', 'touchstart', 'pointerdown', 'wheel'].forEach(function (t) { window.addEventListener(t, active, { passive: true }); });
  setInterval(function () {
    if (document.hidden) return;
    var quiet = Date.now() - lastActive;
    idlers.forEach(function (i) {
      if (!i.fired && quiet >= i.ms) { i.fired = true; var w = i.fn(); if (typeof w === 'function') i.wake = w; }
    });
  }, 500);

  // ---------- after some time on the page (regardless of activity) ----------
  function after(seconds, fn) { setTimeout(function () { if (!document.hidden) fn(); else document.addEventListener('visibilitychange', function once() { if (!document.hidden) { document.removeEventListener('visibilitychange', once); fn(); } }); }, seconds * 1000); }

  // ---------- long press (touch and mouse) ----------
  function longPress(el, ms, fn) {
    var timer = 0, start = null;
    el.addEventListener('pointerdown', function (e) {
      start = { x: e.clientX, y: e.clientY };
      timer = setTimeout(function () { timer = 0; fn(e); }, ms);
    });
    el.addEventListener('pointermove', function (e) { if (timer && start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 12) { clearTimeout(timer); timer = 0; } });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { el.addEventListener(t, function () { clearTimeout(timer); timer = 0; }); });
    el.addEventListener('contextmenu', function (e) { if (e.pointerType !== 'mouse' && !finePointer) e.preventDefault(); });
  }

  // ---------- clicks counted in a short window ----------
  function multiClick(el, n, windowMs, fn) {
    var times = [];
    el.addEventListener('click', function (e) {
      var now = Date.now();
      times = times.filter(function (t) { return now - t < windowMs; });
      times.push(now);
      if (times.length >= n) { times = []; fn(e); }
    });
  }

  // ---------- a small shape recogniser (unistroke, after the $1 recogniser, no rotation) ----------
  function pathLength(pts) { var d = 0; for (var i = 1; i < pts.length; i++) d += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); return d; }
  function resample(pts, n) {
    var I = pathLength(pts) / (n - 1), D = 0, out = [pts[0]], p = pts.slice();
    for (var i = 1; i < p.length; i++) {
      var d = Math.hypot(p[i].x - p[i - 1].x, p[i].y - p[i - 1].y);
      if (D + d >= I && d > 0) {
        var q = { x: p[i - 1].x + ((I - D) / d) * (p[i].x - p[i - 1].x), y: p[i - 1].y + ((I - D) / d) * (p[i].y - p[i - 1].y) };
        out.push(q); p.splice(i, 0, q); D = 0;
      } else D += d;
    }
    while (out.length < n) out.push(p[p.length - 1]);
    return out.slice(0, n);
  }
  function normalise(pts) {
    var r = resample(pts, 48), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    r.forEach(function (q) { x0 = Math.min(x0, q.x); y0 = Math.min(y0, q.y); x1 = Math.max(x1, q.x); y1 = Math.max(y1, q.y); });
    // People draw letters tall or wide: stretch both ways to a square, unless the stroke is nearly a line.
    var w = x1 - x0 || 1, h = y1 - y0 || 1, s = Math.max(w, h), cx = 0, cy = 0;
    if (Math.min(w, h) / s <= 0.3) w = h = s;
    r = r.map(function (q) { return { x: (q.x - x0) / w, y: (q.y - y0) / h }; });
    r.forEach(function (q) { cx += q.x; cy += q.y; }); cx /= r.length; cy /= r.length;
    return r.map(function (q) { return { x: q.x - cx, y: q.y - cy }; });
  }
  function curve(fn, n) { var out = []; for (var i = 0; i <= n; i++) out.push(fn(i / n)); return out; }
  var TEMPLATES = {
    // S: top arc going left and down, then bottom arc going right and down (screen y runs down).
    S: [curve(function (t) {
      if (t < 0.5) { var a = Math.PI * 0.15 + (t / 0.5) * Math.PI * 1.35; return { x: Math.cos(a) * 0.5, y: -0.5 - Math.sin(a) * 0.5 }; }
      var b = Math.PI * 0.5 - ((t - 0.5) / 0.5) * Math.PI * 1.35; return { x: Math.cos(b) * 0.5, y: 0.5 - Math.sin(b) * 0.5 };
    }, 48)],
    // C: from the top right, round the left, to the bottom right.
    C: [curve(function (t) { var a = Math.PI * 0.25 + t * Math.PI * 1.5; return { x: Math.cos(a), y: -Math.sin(a) }; }, 40)],
    // L: down, then right.
    L: [[{ x: 0, y: 0 }, { x: 0, y: 0.5 }, { x: 0, y: 1 }, { x: 0.35, y: 1 }, { x: 0.7, y: 1 }]],
    // D: down the left side, then round the right side back to the top.
    D: [[{ x: 0, y: 0 }, { x: 0, y: 0.5 }, { x: 0, y: 1 }].concat(curve(function (t) { var a = Math.PI / 2 - t * Math.PI; return { x: 0.6 * Math.cos(a), y: 0.5 + 0.5 * Math.sin(a) }; }, 24))],
    // Heart: starting at the dip at the top, either side or the point at the bottom.
    heart: [0, 0.25, 0.5, 0.75].map(function (from) {
      return curve(function (t) { var a = (t + from) * Math.PI * 2; return { x: 16 * Math.pow(Math.sin(a), 3), y: -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) }; }, 60);
    })
  };
  // Hearts drawn the other way round count too.
  TEMPLATES.heart = TEMPLATES.heart.concat(TEMPLATES.heart.map(function (t) { return t.slice().reverse(); }));
  var NORMAL = {};
  Object.keys(TEMPLATES).forEach(function (k) { NORMAL[k] = TEMPLATES[k].map(normalise); });
  function distance(a, b) { var d = 0; for (var i = 0; i < a.length; i++) d += Math.hypot(a[i].x - b[i].x, a[i].y - b[i].y); return d / a.length; }
  // Returns { name, score } for the closest of the names asked for (or all), or null when nothing is close.
  function recognise(pts, names, limit) {
    if (!pts || pts.length < 6 || pathLength(pts) < 40) return null;
    var c = normalise(pts), best = null;
    var start = pts[0], end = pts[pts.length - 1], len = pathLength(pts);
    var xs = pts.map(function (q) { return q.x; }), ys = pts.map(function (q) { return q.y; });
    var w = Math.max.apply(null, xs) - Math.min.apply(null, xs), h = Math.max.apply(null, ys) - Math.min.apply(null, ys);
    var want = function (n) { return !names || names.indexOf(n) >= 0; };
    // Lines and circles by shape, the rest by templates.
    if (want('line') && Math.hypot(end.x - start.x, end.y - start.y) / len > 0.93 && h < w * 0.18 && w > 60) return { name: 'line', score: 1 };
    if (want('circle') && Math.hypot(end.x - start.x, end.y - start.y) < Math.max(w, h) * 0.4 && w > 30 && h > 30 && Math.min(w, h) / Math.max(w, h) > 0.6 && len > Math.PI * Math.max(w, h) * 0.75) {
      var cx = (Math.max.apply(null, xs) + Math.min.apply(null, xs)) / 2, cy = (Math.max.apply(null, ys) + Math.min.apply(null, ys)) / 2, r = (w + h) / 4, dev = 0;
      pts.forEach(function (q) { dev += Math.abs(Math.hypot(q.x - cx, q.y - cy) - r); });
      // A D is round too: it wins when its straight side matches the D template well.
      var dScore = want('D') ? Math.min.apply(null, NORMAL.D.map(function (t) { return distance(c, t); })) : 1;
      if (dev / pts.length < r * 0.28 && dScore >= 0.135) return { name: 'circle', score: 1, cx: cx, cy: cy, r: r };
    }
    if (want('L') && isL(pts)) return { name: 'L', score: 0 };
    Object.keys(NORMAL).forEach(function (k) {
      if (!want(k)) return;
      NORMAL[k].forEach(function (t) { var d = distance(c, t); if (!best || d < best.score) best = { name: k, score: d }; });
    });
    if (best && best.name === 'heart' && !bottomPoint(pts)) best = null; // round loops are not hearts
    return best && best.score < (limit || 0.13) ? best : null;
  }
  // An L of any proportions: a straight stroke down, a corner, then a straight stroke to the right.
  function isL(pts) {
    var a = pts[0], z = pts[pts.length - 1], k = 0, best = -1;
    pts.forEach(function (q, i) { var d = Math.abs((z.x - a.x) * (a.y - q.y) - (a.x - q.x) * (z.y - a.y)); if (d > best) { best = d; k = i; } });
    var c = pts[k];
    var straight = function (p) { var L = pathLength(p), d = Math.hypot(p[p.length - 1].x - p[0].x, p[p.length - 1].y - p[0].y); return d > 25 && d / L > 0.8; };
    var down = c.y - a.y, right = z.x - c.x;
    return k > 1 && k < pts.length - 2 && straight(pts.slice(0, k + 1)) && straight(pts.slice(k)) &&
      down > 0 && Math.abs(c.x - a.x) < down * 0.5 && right > 0 && Math.abs(z.y - c.y) < right * 0.5;
  }
  // True when the stroke turns sharply (a point) somewhere low and near the middle, like a heart's tip.
  function bottomPoint(pts) {
    var r = resample(pts, 48), n = r.length;
    var xs = r.map(function (q) { return q.x; }), ys = r.map(function (q) { return q.y; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var closed = Math.hypot(r[n - 1].x - r[0].x, r[n - 1].y - r[0].y) < Math.max(x1 - x0, y1 - y0) * 0.25;
    var at = function (i) { return closed ? r[(i + n - 1) % (n - 1)] : r[Math.max(0, Math.min(n - 1, i))]; };
    for (var i = closed ? 0 : 2; i < (closed ? n - 1 : n - 2); i++) {
      var a = at(i - 2), b = at(i), c = at(i + 2);
      var t = Math.abs(Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(b.y - a.y, b.x - a.x));
      if (t > Math.PI) t = 2 * Math.PI - t;
      if (t > 0.95 && b.y > y0 + (y1 - y0) * 0.6 && Math.abs(b.x - (x0 + x1) / 2) < (x1 - x0) * 0.25) return true;
    }
    return false;
  }

  // ---------- everywhere: retro mode (Konami code) ----------
  var KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'], kpos = 0;
  function retro(on, quiet) {
    root.classList.toggle('retro', on);
    try { if (on) localStorage.setItem('easysuite-retro', '1'); else localStorage.removeItem('easysuite-retro'); } catch (e) { }
    if (!quiet) { toast(on ? 'Retro mode. Press start. (Enter the code again to leave.)' : 'Back to the present.'); sound('blip'); }
  }
  try { if (localStorage.getItem('easysuite-retro')) retro(true, true); } catch (e) { }
  document.addEventListener('keydown', function (e) {
    if (inField(e.target)) return;
    var k = e.key.toLowerCase();
    kpos = k === KONAMI[kpos] ? kpos + 1 : (k === KONAMI[0] ? 1 : 0);
    if (kpos === KONAMI.length) { kpos = 0; retro(!root.classList.contains('retro')); found('a-retro'); }
  });
  document.addEventListener('click', function () { if (root.classList.contains('retro')) sound('blip'); });

  // ---------- everywhere: tab title while away ----------
  var AWAY = { hub: 'The apps miss you', easysign: 'Your signature is waiting', easypdf: 'Your pages miss you', easyclip: 'Copied that? Come back',
    easyfile: 'Unfiled tab', easytouch: 'Touch base soon?', easyguard: 'Who goes there?', notfound: 'Still lost?' };
  var realTitle = document.title, leftAt = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { realTitle = document.title; leftAt = Date.now(); document.title = AWAY[PAGE] || AWAY.hub; }
    else { document.title = realTitle; if (leftAt && Date.now() - leftAt > 1500) found('a-away'); }
  });

  // ---------- everywhere: printing ----------
  var PRINT = { hub: 'You printed a website about saving paper. We need to talk.', easysign: 'You could have just signed it.',
    easypdf: 'No trees were harmed. Until now.', easyclip: 'You could have just copied it.', easyfile: 'Please file this printout under "Ironic".',
    easytouch: 'Touchpads can not touch paper. Yet.', easyguard: 'Careful. Someone may read this over your shoulder.', notfound: 'Printing a page that does not exist. Bold.' };
  var pr = document.createElement('div');
  pr.className = 'egg-print';
  pr.textContent = PRINT[PAGE] || PRINT.hub;
  document.body.insertBefore(pr, document.body.firstChild);
  window.addEventListener('beforeprint', function () { found('a-print'); });

  // ---------- everywhere: select all ----------
  var selectedAll = false;
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a' && !inField(e.target) && !selectedAll) {
      selectedAll = true;
      setTimeout(function () { toast('Everything selected. EasyClip would remember all of it.'); found('a-selectall'); }, 150);
    }
  });

  // ---------- console ----------
  function consoleHello(lines, fnName, fn) {
    try {
      console.log('%cEasy Suite', 'font:24px Georgia,serif;color:#C96442');
      lines.forEach(function (l) { console.log('%c' + l, 'font:13px "Segoe UI",sans-serif;color:#5B5A55'); });
      if (fnName && fn) {
        window[fnName] = function () { var r = fn(); found(CONSOLE_EGG[PAGE]); return r; };
        console.log('%cType ' + fnName + '() and press Enter.', 'font:13px "Segoe UI",sans-serif;color:#AE5433');
      }
    } catch (e) { }
  }
  var CONSOLE_EGG = { hub: 'h-console', easysign: 's-console', easypdf: 'p-console', easyclip: 'c-console', easyfile: 'f-console', easytouch: 't-console', easyguard: 'g-console' };

  // ---------- passport by typing ----------
  word('passport', openPassport);
  passportButton();

  window.Eggs = {
    page: PAGE, root: ROOT, full: full, finePointer: finePointer,
    found: found, toast: toast, chip: chip, sound: sound, confetti: confetti, word: word, pattern: pattern, idle: idle,
    after: after, longPress: longPress, multiClick: multiClick, recognise: recognise, consoleHello: consoleHello,
    openPassport: openPassport, inField: inField, clamp: clamp, $: $, $$: $$,
    css: function (text) { var s = document.createElement('style'); s.textContent = text; document.head.appendChild(s); }
  };
})();
