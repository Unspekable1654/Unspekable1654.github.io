// EasyGuard page: easter eggs. Uses the shared engine in eggs.js. Nothing here opens or asks for the camera.
(function () {
  var E = window.Eggs; if (!E) return;
  var $ = E.$, $$ = E.$$, full = E.full;

  E.css('' +
    'body.egg-guarded main,body.egg-guarded header,body.egg-guarded footer{filter:blur(10px) brightness(.92);transition:filter .3s}' +
    '.egg-guardmsg{position:fixed;left:50%;top:50%;z-index:60;transform:translate(-50%,-50%);max-width:calc(100vw - 40px);padding:14px 22px;border-radius:14px;background:rgba(31,30,29,.9);color:#F5F4EE;font:600 1rem "Segoe UI",sans-serif;text-align:center;box-shadow:0 12px 34px rgba(0,0,0,.3)}' +
    '.egg-eyeslot{position:absolute;right:22%;top:100%;width:84px;height:40px;overflow:hidden;pointer-events:none}' +
    '.egg-eyes{display:flex;gap:6px;justify-content:center;padding-top:4px;transform:translateY(-100%);transition:transform .35s cubic-bezier(.2,.7,.2,1)}.egg-eyes.peek{transform:none}' +
    '.egg-eyes i{position:relative;width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid #1F1E1D;box-sizing:border-box}' +
    '.egg-eyes i b{position:absolute;left:50%;top:50%;width:11px;height:11px;margin:-5.5px 0 0 -5.5px;border-radius:50%;background:#1F1E1D}' +
    '.egg-ghost{position:fixed;left:0;top:0;z-index:59;width:22px;height:30px;pointer-events:none;opacity:.55}' +
    '.egg-camdot{position:absolute;left:50%;top:5px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:#2B2A27;opacity:.55;pointer-events:none;transition:background-color .3s,box-shadow .3s}' +
    '.egg-camdot.on{background:#2ECC71;opacity:1;box-shadow:0 0 0 3px rgba(46,204,113,.25),0 0 10px #2ECC71}' +
    '.egg-vignette{position:fixed;inset:0;z-index:49;pointer-events:none;box-shadow:inset 0 0 120px 30px rgba(20,60,35,.28);opacity:0;transition:opacity .5s}.egg-vignette.on{opacity:1}' +
    'body.egg-spy,body.egg-spy *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'9\' fill=\'%23ffffff\' fill-opacity=\'.3\' stroke=\'%231F1E1D\' stroke-width=\'2.5\'/%3E%3Cpath d=\'M20 20l9 9\' stroke=\'%231F1E1D\' stroke-width=\'3.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E") 13 13,zoom-in !important}' +
    '.egg-spyglass{position:fixed;z-index:58;width:140px;height:140px;margin:-70px 0 0 -70px;border-radius:50%;pointer-events:none;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);box-shadow:0 0 0 2px rgba(31,30,29,.35)}' +
    '#privacy{position:relative;overflow:hidden}.lock{cursor:pointer}' +
    '.egg-blinds{position:absolute;inset:0;z-index:3;pointer-events:none;transform-origin:50% 0;transform:scaleY(0);background:repeating-linear-gradient(#E7E2D4 0 26px,#C9C3B2 26px 28px,#F0ECE1 28px 30px);box-shadow:inset 0 -6px 0 #A8A08A}' +
    'html.motion .egg-blinds{transition:transform .8s cubic-bezier(.4,0,.2,1)}html.calm .egg-blinds{transition:transform .01s,opacity .4s}.egg-blinds.down{transform:none}' +
    '.egg-beaker{display:inline-block;position:relative;width:26px;height:30px;margin-left:8px;vertical-align:middle}' +
    '.egg-beaker svg{width:100%;height:100%}.egg-bubble{position:absolute;left:50%;bottom:16px;width:7px;height:7px;margin-left:-3.5px;border-radius:50%;border:1.5px solid #6FA88A;background:rgba(111,168,138,.25);pointer-events:none}' +
    'html.motion .egg-bubble{animation:egg-bubble 1.3s ease-out forwards}@keyframes egg-bubble{to{transform:translate(var(--dx,0),-46px) scale(1.3);opacity:0}}' +
    'html.calm .egg-bubble{animation:egg-bubble-fade 1.2s ease forwards}@keyframes egg-bubble-fade{to{opacity:0}}' +
    '.egg-smoke{position:absolute;left:50%;top:-10px;width:60px;height:40px;margin-left:-30px;border-radius:50%;background:radial-gradient(rgba(150,150,140,.6),transparent 70%);pointer-events:none;animation:egg-smoke 1.4s ease-out forwards}@keyframes egg-smoke{from{transform:scale(.3)}to{transform:translate(0,-30px) scale(1.8);opacity:0}}' +
    '.hero .chip.lab{cursor:pointer;user-select:none}');

  // ---------- the blur everything shares (G1, G2, G4) and G10 any key ----------
  var guarded = false, msg = null, onRestore = null;
  function guard(text, after) {
    if (guarded) return;
    guarded = true; onRestore = after || null;
    document.body.classList.add('egg-guarded');
    msg = document.createElement('div'); msg.className = 'egg-guardmsg'; msg.setAttribute('role', 'alert');
    msg.textContent = text || 'Someone may be looking. Press any key to show.';
    document.body.appendChild(msg);
  }
  function restore(key) {
    if (!guarded) return;
    guarded = false;
    document.body.classList.remove('egg-guarded');
    if (msg) { msg.remove(); msg = null; }
    if (key && /^[a-z0-9]$/i.test(key)) { E.toast('You pressed ' + key.toUpperCase() + '. Screen restored.'); E.found('g-anykey'); }
    else E.toast('Screen restored.');
    if (onRestore) { var f = onRestore; onRestore = null; f(); }
  }
  document.addEventListener('keydown', function (e) { if (guarded) { e.preventDefault(); e.stopPropagation(); restore(e.key); } }, true);
  document.addEventListener('pointerdown', function (e) { if (guarded) { e.preventDefault(); restore(); } }, true);

  // ---------- G1 someone's looking: eyes peek from behind the header after 20 s ----------
  var header = $('header'), mouse = { x: -999, y: -999 };
  document.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  E.after(20, function () {
    if (!header) return;
    var slot = document.createElement('div'); slot.className = 'egg-eyeslot'; slot.setAttribute('aria-hidden', 'true');
    slot.innerHTML = '<div class="egg-eyes"><i><b></b></i><i><b></b></i></div>';
    header.appendChild(slot);
    var eyes = $('.egg-eyes', slot), pupils = $$('b', slot), stareT = 0, duckT = 0, done = false;
    function peek() {
      if (done) return;
      eyes.classList.add('peek');
      clearTimeout(stareT);
      stareT = setTimeout(function () {
        if (done || guarded) return;
        done = true;
        guard('Someone may be looking. Press any key to show.', function () { slot.remove(); });
        E.found('g-eyes');
      }, 3300);
    }
    function duck() {
      eyes.classList.remove('peek');
      clearTimeout(stareT); clearTimeout(duckT);
      duckT = setTimeout(peek, 2500);
    }
    function look() {
      if (done) return;
      var r = slot.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + 18;
      var d = Math.hypot(mouse.x - cx, mouse.y - cy);
      if (eyes.classList.contains('peek') && d < 150) duck();
      var a = Math.atan2(mouse.y - cy, mouse.x - cx), k = Math.min(1, d / 200) * 6;
      pupils.forEach(function (p) { p.style.transform = 'translate(' + (Math.cos(a) * k).toFixed(1) + 'px,' + (Math.sin(a) * k).toFixed(1) + 'px)'; });
      requestAnimationFrame(look);
    }
    setTimeout(peek, 50);
    requestAnimationFrame(look);
  });

  // ---------- G2 the onlooker: after 2 minutes a ghost cursor follows yours ----------
  var GHOST = '<svg viewBox="0 0 22 30" aria-hidden="true"><path d="M2 2v22l6-5 4 9 4-2-4-9h8z" fill="#fff" stroke="#1F1E1D" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  E.after(120, function () {
    var g = document.createElement('div'); g.className = 'egg-ghost'; g.innerHTML = GHOST;
    var x = innerWidth - 40, y = innerHeight - 50;
    document.body.appendChild(g);
    var caught = false;
    (function follow() {
      if (!g.parentNode) return;
      if (!caught) {
        var tx = mouse.x < -900 ? innerWidth / 2 : mouse.x + 14, ty = mouse.y < -900 ? innerHeight / 2 : mouse.y + 10;
        x += (tx - x) * 0.02; y += (ty - y) * 0.02;
        g.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        if (Math.hypot(tx - x, ty - y) < 40 && !guarded) {
          caught = true;
          guard('Someone may be looking. Press any key to show.', function () {
            g.animate([{ transform: g.style.transform }, { transform: 'translate(' + (innerWidth + 60) + 'px,' + (y - 80) + 'px)' }], { duration: full ? 700 : 200, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' });
            setTimeout(function () { g.remove(); E.toast('It scurried off.'); }, full ? 720 : 220);
          });
          E.found('g-onlooker');
        }
      }
      requestAnimationFrame(follow);
    })();
  });

  // ---------- G3 switch it on: Ctrl+Alt+G or type guard ----------
  var camdot = null, vignette = null, watching = false;
  if (header) { camdot = document.createElement('span'); camdot.className = 'egg-camdot'; camdot.setAttribute('aria-hidden', 'true'); header.appendChild(camdot); }
  function toggleWatch() {
    watching = !watching;
    if (camdot) camdot.classList.toggle('on', watching);
    if (!vignette) { vignette = document.createElement('div'); vignette.className = 'egg-vignette'; vignette.setAttribute('aria-hidden', 'true'); document.body.appendChild(vignette); }
    requestAnimationFrame(function () { vignette.classList.toggle('on', watching); });
    E.toast(watching ? 'Watching. Not really. This is a website.' : 'Switched off. The camera light is off.');
    if (watching) E.found('g-switch');
  }
  document.addEventListener('keydown', function (e) { if (e.ctrlKey && e.altKey && e.code === 'KeyG') { e.preventDefault(); toggleWatch(); } });
  E.word('guard', toggleWatch);

  // ---------- G4 faces: type :) and then :) again ----------
  var smiles = [];
  E.word(':)', function () {
    var now = Date.now();
    smiles = smiles.filter(function (t) { return now - t < 3000; }); smiles.push(now);
    if (smiles.length >= 2) { smiles = []; E.toast('2 faces. Blurring...'); setTimeout(function () { guard('2 faces. Press any key to show.'); }, 600); }
    else E.toast("1 face. That's you. Fine.");
    E.found('g-faces');
  });

  // ---------- G5 paused while away ----------
  var leftAt = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { leftAt = Date.now(); return; }
    if (leftAt && Date.now() - leftAt > 1500) { E.toast('Paused while you were away. Welcome back.'); E.found('g-paused'); }
  });

  // ---------- G6 battery saver (where the browser shares it) ----------
  function batterySaver() { E.toast('Battery saver is on. EasyGuard would pause now.', 4200); E.found('g-battery'); }
  E.word('battery', batterySaver);
  if (navigator.getBattery) {
    navigator.getBattery().then(function (b) {
      var told = false;
      function check() {
        if (told || b.charging || b.level > 0.2) return;
        told = true;
        batterySaver();
      }
      check();
      b.addEventListener('levelchange', check); b.addEventListener('chargingchange', check);
    }).catch(function () { });
  }

  // ---------- G7 spy: text under the spyglass blurs instead of growing ----------
  var spying = false;
  E.word('spy', function () {
    if (spying) return;
    spying = true;
    document.body.classList.add('egg-spy');
    var gl = document.createElement('div'); gl.className = 'egg-spyglass'; gl.setAttribute('aria-hidden', 'true');
    gl.style.left = (mouse.x < -900 ? innerWidth / 2 : mouse.x) + 'px'; gl.style.top = (mouse.y < -900 ? innerHeight / 2 : mouse.y) + 'px';
    document.body.appendChild(gl);
    var mv = function (e) { gl.style.left = e.clientX + 'px'; gl.style.top = e.clientY + 'px'; };
    document.addEventListener('pointermove', mv, { passive: true });
    E.toast('Nice try, spy.');
    setTimeout(function () { document.removeEventListener('pointermove', mv); gl.remove(); document.body.classList.remove('egg-spy'); spying = false; }, 8000);
    E.found('g-spy');
  });

  // ---------- G8 blinds: rest on the lock for 2 s ----------
  var lock = $('#privacy .lock'), band = $('#privacy'), blindT = 0, blinding = false;
  if (lock && band) {
    lock.addEventListener('pointerenter', function () {
      clearTimeout(blindT);
      blindT = setTimeout(function () {
        if (blinding) return;
        blinding = true;
        var bl = document.createElement('div'); bl.className = 'egg-blinds'; bl.setAttribute('aria-hidden', 'true');
        band.appendChild(bl);
        requestAnimationFrame(function () { requestAnimationFrame(function () { bl.classList.add('down'); }); });
        setTimeout(function () { bl.classList.remove('down'); }, full ? 2400 : 1600);
        setTimeout(function () { bl.remove(); blinding = false; }, full ? 3300 : 2100);
        E.found('g-blinds');
      }, 2000);
    });
    lock.addEventListener('pointerleave', function () { clearTimeout(blindT); });
  }

  // ---------- G9 the experiment: the "In the lab" chip ----------
  var lab = $('.hero .chip.lab'), beaker = null, labClicks = 0;
  if (lab) {
    lab.addEventListener('click', function () {
      if (!beaker) {
        beaker = document.createElement('span'); beaker.className = 'egg-beaker'; beaker.setAttribute('aria-hidden', 'true');
        beaker.innerHTML = '<svg viewBox="0 0 26 30"><path d="M9 2h8M10 2v9L3 26a2 2 0 0 0 2 3h16a2 2 0 0 0 2-3L16 11V2" fill="#EAF4EE" stroke="#4B7F64" stroke-width="1.6" stroke-linejoin="round"/><path d="M6 20h14l3 6a2 2 0 0 1-2 3H5a2 2 0 0 1-2-3z" fill="#9CCBB0"/></svg>';
        lab.parentNode.insertBefore(beaker, lab.nextSibling);
      }
      for (var i = 0; i < 3; i++) {
        var b = document.createElement('span'); b.className = 'egg-bubble';
        b.style.setProperty('--dx', ((Math.random() - 0.5) * 16).toFixed(0) + 'px'); b.style.animationDelay = (i * 0.18) + 's';
        beaker.appendChild(b);
        setTimeout(function (n) { n.remove(); }.bind(null, b), 1800);
      }
      E.sound('pop');
      E.found('g-lab');
      if (++labClicks === 5) {
        labClicks = 0;
        var s = document.createElement('span'); s.className = 'egg-smoke';
        beaker.appendChild(s); setTimeout(function () { s.remove(); }, 1500);
        E.sound('thud');
        E.toast('Okay, back to testing.');
      }
    });
  }

  // ---------- G11 who ----------
  E.word('who', function () {
    E.toast('Faces are only counted, never recognised. So: no idea.');
    E.found('g-who');
  });

  // ---------- G13 the console ----------
  E.consoleHello(['No camera was opened, harmed or even asked on this website.', 'Try typing :) and then :) again on the page.'], 'look', function () {
    return 'Nobody here but you. Probably.';
  });
})();
