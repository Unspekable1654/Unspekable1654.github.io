// Easy Suite error theatre: every web error gets its own little scene on the 404 page.
// GitHub Pages only lets a site replace its 404 page (server errors come from GitHub itself), so each error has its
// own address instead: /errors/503/ and so on (served through the 404 page), and typing a three digit error on the
// page plays its scene. Everything here is drawn by the browser; nothing is loaded or sent.
(function () {
  var E = window.Eggs;
  var $ = function (s) { return document.querySelector(s); };
  var code = $('.code'), lens = $('.lens'), d1 = $('.d1'), d2 = $('.d2'), h1 = $('h1'), lead = $('.lead'), guess = $('.guess');
  if (!code || !lens || !d1 || !d2) return;

  // ---------- art ----------
  var A = 'var(--accent)';
  function svg(inner, box) { return '<svg viewBox="' + (box || '0 0 80 92') + '" aria-hidden="true">' + inner + '</svg>'; }
  var ICON = {
    question: svg('<circle cx="38" cy="46" r="31" fill="none" stroke="currentColor" stroke-width="8"/><path d="M27 36a11 11 0 1 1 15 10c-3 2-4 4-4 8" fill="none" stroke="' + A + '" stroke-width="8" stroke-linecap="round"/><circle cx="38" cy="67" r="5" fill="' + A + '"/>'),
    lock: svg('<path d="M24 42V30a14 14 0 0 1 28 0v12" fill="none" stroke="currentColor" stroke-width="8"/><rect x="14" y="42" width="48" height="40" rx="8" fill="' + A + '"/><circle cx="38" cy="60" r="5" fill="#fff"/><path d="M38 62v9" stroke="#fff" stroke-width="5" stroke-linecap="round"/>'),
    noentry: svg('<circle cx="38" cy="46" r="32" fill="' + A + '"/><rect x="18" y="40" width="40" height="12" rx="3" fill="#fff"/>'),
    door: svg('<rect x="16" y="10" width="44" height="74" rx="4" fill="none" stroke="currentColor" stroke-width="7"/><circle cx="50" cy="50" r="4.5" fill="' + A + '"/>'),
    hourglass: svg('<path d="M18 8h40M18 84h40M22 8c0 22 32 26 32 38S22 62 22 84M54 8c0 22-32 26-32 38s32 16 32 38" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path class="sand" d="M30 74h16l-8-10z" fill="' + A + '"/>'),
    spark: svg('<circle cx="38" cy="46" r="28" fill="none" stroke="currentColor" stroke-width="8" stroke-dasharray="26 8"/><path d="M42 20L28 50h14l-6 24 18-32H40z" fill="' + A + '"/>'),
    cone: svg('<path d="M38 8L60 80H16z" fill="' + A + '"/><path d="M30 34h16M25 52h26" stroke="#fff" stroke-width="7"/><rect x="8" y="78" width="60" height="8" rx="3" fill="currentColor"/>'),
    broken: svg('<path d="M30 30l-8-8a12 12 0 0 0-17 17l10 10M46 62l8 8a12 12 0 0 0 17-17L61 43" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><path d="M33 52l-8 6M43 40l8-6M38 30v-8M38 62v8" stroke="' + A + '" stroke-width="6" stroke-linecap="round"/>', '-6 0 88 92'),
    closed: svg('<path d="M38 6L14 30M38 6l24 24" stroke="currentColor" stroke-width="4"/><circle cx="38" cy="6" r="4" fill="currentColor"/><rect x="-6" y="30" width="88" height="40" rx="6" fill="' + A + '"/><text x="38" y="55" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#fff">BACK SOON</text>'),
    phone: svg('<path d="M20 14c6-4 10-2 13 4l5 10c2 5 0 8-4 10l-4 2c3 9 9 16 18 20l3-4c3-4 6-5 10-3l10 5c6 3 7 8 3 13l-5 6c-5 5-14 4-25-3C30 60 20 46 16 33c-3-9-1-15 4-19z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path class="ring" d="M50 12a24 24 0 0 1 18 18M50 2a34 34 0 0 1 26 26" fill="none" stroke="' + A + '" stroke-width="5" stroke-linecap="round"/>'),
    version: svg('<rect x="10" y="22" width="56" height="48" rx="8" fill="none" stroke="currentColor" stroke-width="7"/><text x="38" y="56" text-anchor="middle" font-family="Courier New,monospace" font-weight="bold" font-size="22" fill="' + A + '">1.0</text>'),
    swap: svg('<path d="M14 32h44l-10-10M62 60H18l10 10" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="38" cy="46" r="5" fill="' + A + '"/>'),
    box: svg('<path d="M8 32l30-14 30 14v40L38 86 8 72z" fill="' + A + '" opacity=".9"/><path d="M8 32l30 14 30-14M38 46v40" fill="none" stroke="#fff" stroke-width="4"/><path d="M22 20l-6-12M54 20l6-12M38 14V2" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'),
    loop: svg('<path d="M60 46a22 22 0 1 1-8-17" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><path d="M46 20l10 9-12 5z" fill="' + A + '" stroke="' + A + '" stroke-width="4" stroke-linejoin="round"/>'),
    arrow: svg('<path d="M10 46h52M44 26l20 20-20 20" fill="none" stroke="' + A + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'),
    snow: svg('<g stroke="#6FA3C8" stroke-width="6" stroke-linecap="round"><path d="M38 10v72M7 28l62 36M7 64l62-36"/><path d="M30 14l8 8 8-8M30 78l8-8 8 8" fill="none"/></g>'),
    check: svg('<circle cx="38" cy="46" r="30" fill="none" stroke="#4E6B3A" stroke-width="9"/><path d="M24 47l10 10 20-22" fill="none" stroke="#4E6B3A" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'),
    teapot: svg('<path d="M12 50c0-15 12-24 26-24s26 9 26 24c0 13-9 22-26 22S12 63 12 50z" fill="' + A + '"/><path d="M63 44c10-4 14 4 8 10l-8 6" fill="none" stroke="' + A + '" stroke-width="6" stroke-linecap="round"/><path d="M13 46c-8-6-12-2-10 4" fill="none" stroke="' + A + '" stroke-width="6" stroke-linecap="round"/><rect x="26" y="19" width="24" height="8" rx="4" fill="currentColor"/><path class="steam" d="M30 12c-3-4 3-6 0-10M40 13c-3-4 3-6 0-10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>'),
    wifi: svg('<circle cx="38" cy="74" r="6" fill="' + A + '"/><path class="w1" d="M26 62a17 17 0 0 1 24 0" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path class="w2" d="M16 50a31 31 0 0 1 44 0" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path class="w3" d="M6 38a45 45 0 0 1 64 0" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>')
  };

  // Things drawn around the number for some scenes (a stage over it, never blocking clicks).
  var STAGE = {
    zzz: '<span class="zz z1">z</span><span class="zz z2">z</span><span class="zz z3">Z</span>',
    tape: '<span class="tape">UNDER CONSTRUCTION &nbsp; UNDER CONSTRUCTION &nbsp; UNDER CONSTRUCTION</span>',
    barrier: '<span class="tape barrier">NO ENTRY &nbsp; NO ENTRY &nbsp; NO ENTRY &nbsp; NO ENTRY</span>',
    redact: '<span class="rbar r1"></span><span class="rbar r2"></span><span class="stamp">REDACTED</span>',
    crack: '<span class="crack"></span>',
    sun: '<span class="sun"></span>',
    snow: '<span class="flake f1">*</span><span class="flake f2">*</span><span class="flake f3">*</span><span class="flake f4">*</span>',
    frame: '<span class="frame"></span>',
    pushpull: '<span class="pp">PUSH</span>',
    sparks: '<span class="sparkle s1"></span><span class="sparkle s2"></span><span class="sparkle s3"></span><span class="smoke"></span>',
    measure: '<span class="measure"></span>',
    crowd: '<span class="crowd">!!! !!! !!!</span>',
    wifi: '<span class="wifi">' + ICON.wifi + '</span>'
  };

  // ---------- the scenes: name, headline, line, animation, middle icon, stage ----------
  var SCENES = {
    '200': ['OK', 'Everything is fine.', 'It is not. The page is still missing. But it is nice to pretend for a moment.', 'ok', 'check', ''],
    '301': ['Moved Permanently', 'This page moved house.', 'It packed everything and left for good. The new address is on the home page.', 'move', 'arrow', ''],
    '304': ['Not Modified', 'Nothing has changed.', 'Same as last time. Frozen in time, like a fridge magnet.', 'freeze', 'snow', 'snow'],
    '400': ['Bad Request', 'That request made no sense.', 'The server read it twice and still could not work out what was asked. Not your fault. Probably.', 'tilt', 'question', ''],
    '401': ['Unauthorized', 'Who goes there?', 'This page wants to know who you are first. Easy Suite never asks for an account, so this door leads nowhere.', 'lock', 'lock', ''],
    '403': ['Forbidden', 'No entry, sorry.', 'This door is closed for everyone. Even us. Especially us.', 'barrier', 'noentry', 'barrier'],
    '405': ['Method Not Allowed', 'Not like that.', 'Right page, wrong way of asking. Like pushing a door that says pull.', 'door', 'door', 'pushpull'],
    '408': ['Request Timeout', 'We waited. And waited.', 'The request took so long that the server nodded off. Try again; it has had a nap now.', 'sleep', 'hourglass', 'zzz'],
    '410': ['Gone', 'Gone. Not lost, gone.', 'This page left on purpose and is not coming back. It did say goodbye.', 'ghost', '', ''],
    '413': ['Payload Too Large', 'That is too big to carry.', 'Whatever was sent would not fit through the door. EasyPDF has a Make smaller button, just saying.', 'inflate', '', 'frame'],
    '414': ['URI Too Long', 'That address goes on and on.', 'The server stopped reading halfway and went for lunch.', 'stretch', '', ''],
    '418': ["I'm a Teapot", "I'm a teapot.", 'Short and stout. Wrong error, though: this page is still missing. Kettle on?', 'teapot', 'teapot', ''],
    '425': ['Too Early', 'Too early.', 'The server has not had its coffee yet. Come back after sunrise.', 'sunrise', '', 'sun'],
    '429': ['Too Many Requests', 'Easy, tiger.', 'Lots of requests in a very short time. Take a breath and try again in a minute.', 'jitter', '', 'crowd'],
    '451': ['Unavailable For Legal Reasons', 'We cannot show you this.', 'For legal reasons, this page is [redacted]. The lawyers say hello. Also [redacted].', 'redact', '', 'redact'],
    '500': ['Internal Server Error', 'Something broke on our side.', 'The server tripped over its own cables. It is not you. It is very much the server.', 'shake', 'spark', 'sparks'],
    '501': ['Not Implemented', 'Not built yet.', 'This is on the to-do list. Somewhere near the bottom, under "tidy the to-do list".', 'tape', 'cone', 'tape'],
    '502': ['Bad Gateway', 'The bridge is out.', 'One server asked another one for help and got nonsense back.', 'split', 'broken', 'crack'],
    '503': ['Service Unavailable', 'Back in a moment.', 'Closed for a quick tidy-up. The sign is on the door, swinging a little.', 'swing', 'closed', ''],
    '504': ['Gateway Timeout', 'Nobody answered.', 'One server called another and let the phone ring and ring. Still ringing.', 'walk', 'phone', ''],
    '505': ['HTTP Version Not Supported', 'Wrong version.', 'Your browser and the server speak different dialects of the web. Like 1.0 meeting 2.0 at a party.', 'fonts', 'version', ''],
    '506': ['Variant Also Negotiates', 'Stuck in a negotiation.', 'Two choices kept pointing at each other. Nobody wanted to go first. They are still at it.', 'swap', 'swap', ''],
    '507': ['Insufficient Storage', 'The cupboard is full.', 'No room left to save anything. EasyFile would have this tidied up in a minute.', 'squash', 'box', 'frame'],
    '508': ['Loop Detected', 'Round and round.', 'The server found itself going in circles. Then it went round again. Then it went round again.', 'orbit', 'loop', ''],
    '510': ['Not Extended', 'It needs a little more.', 'The request needed extra details the server never got. Measure twice, ask once.', 'stretch', '', 'measure'],
    '511': ['Network Authentication Required', 'Sign in to the Wi-Fi first.', 'Café Wi-Fi, probably. Accept the terms on the sign-in page, then try again.', 'wifi', '', 'wifi']
  };
  var CODES = Object.keys(SCENES).sort();

  // ---------- styles ----------
  var css = document.createElement('style');
  css.textContent = [
    '.hero{position:relative;display:inline-block;isolation:isolate}',
    '.wifi{position:absolute;right:2%;top:-4%;width:70px;height:80px}.wifi svg{width:100%;height:100%;overflow:visible}',
    '.stage{position:absolute;inset:-10% -20%;pointer-events:none;font-family:"Segoe UI",system-ui,sans-serif}',
    '.lens .mid{display:block;text-align:center;width:100%}',
    '.lens.wide{width:.62em}',
    '.code{transition:color .4s}',
    '.scene-note{color:var(--muted);font-size:.92rem;margin:-14px auto 26px;max-width:560px}',
    '.museum{margin:0 auto 44px;max-width:860px}',
    '.museum .chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}',
    '.museum a{display:inline-flex;gap:6px;align-items:baseline;padding:6px 12px;border-radius:999px;border:1px solid var(--line);background:var(--surface);text-decoration:none;font-size:.88rem}',
    '.museum a b{font-family:Georgia,serif;font-weight:normal;color:var(--accent)}',
    '.museum a[aria-current]{background:var(--soft);border-color:var(--accent)}',
    '.museum a:focus-visible{outline:3px solid var(--accent);outline-offset:2px}',
    // animations (html.calm keeps every scene still)
    'html.motion .a-tilt .digit,html.motion .a-tilt .lens{animation:es-tilt 2.4s ease-in-out infinite}',
    'html.motion .a-tilt .lens{animation-delay:.25s}html.motion .a-tilt .d2{animation-delay:.5s}',
    '@keyframes es-tilt{0%,100%{transform:none}30%{transform:rotate(-12deg)}60%{transform:rotate(9deg)}}',
    'html.motion .a-lock .lens svg{animation:es-drop .9s cubic-bezier(.3,1.5,.5,1) both}',
    'html.motion .a-lock .digit{animation:es-nudge .3s .7s 2}',
    '@keyframes es-drop{0%{transform:translateY(-140%)}100%{transform:none}}',
    '@keyframes es-nudge{50%{transform:translateX(-4px)}}',
    '.tape{position:absolute;left:-5%;right:-5%;top:44%;padding:6px 0;background:repeating-linear-gradient(-45deg,#E8B83A 0 22px,#1F1E1D 22px 44px);color:#fff;font:700 13px/1 "Segoe UI",sans-serif;letter-spacing:.2em;white-space:nowrap;overflow:hidden;text-shadow:0 1px 2px #000;transform:rotate(-6deg)}',
    '.tape.barrier{background:repeating-linear-gradient(-45deg,#C9443A 0 22px,#F5F4EE 22px 44px);color:#1F1E1D;text-shadow:none}',
    'html.motion .tape{animation:es-tape .7s cubic-bezier(.2,.7,.2,1) both}',
    '@keyframes es-tape{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0 0 0)}}',
    'html.motion .a-door .digit,html.motion .a-door .lens{animation:es-door 1.6s ease-in-out infinite;transform-origin:0 50%}',
    '@keyframes es-door{0%,100%{transform:none}40%{transform:perspective(400px) rotateY(-28deg)}}',
    '.pp{position:absolute;right:0;top:0;padding:4px 10px;border:2px solid currentColor;border-radius:6px;font:700 14px "Segoe UI",sans-serif;letter-spacing:.12em}',
    '.a-sleep .digit,.a-sleep .lens{transform:rotate(-7deg) translateY(.04em);opacity:.8}',
    'html.motion .a-sleep .code{animation:es-breathe 3.2s ease-in-out infinite}',
    '@keyframes es-breathe{50%{transform:scale(.97) translateY(4px)}}',
    '.zz{position:absolute;right:12%;top:30%;font:italic 600 28px Georgia,serif;color:var(--accent);opacity:0}',
    'html.motion .zz{animation:es-z 3s ease-out infinite}html.calm .zz{opacity:.8}',
    '.z2{animation-delay:1s!important;font-size:36px!important}.z3{animation-delay:2s!important;font-size:46px!important}',
    'html.calm .z2{right:7%;top:16%}html.calm .z3{right:2%;top:2%}',
    '@keyframes es-z{0%{opacity:0;transform:none}20%{opacity:1}100%{opacity:0;transform:translate(60px,-90px)}}',
    'html.motion .a-ghost .digit,html.motion .a-ghost .lens{animation:es-ghost 3.4s ease-in infinite}',
    'html.motion .a-ghost .lens{animation-delay:.4s}html.motion .a-ghost .d2{animation-delay:.8s}',
    '.a-ghost .code{color:var(--muted)}html.calm .a-ghost .code{opacity:.35}',
    '@keyframes es-ghost{0%{transform:none;opacity:1;filter:blur(0)}80%,100%{transform:translateY(-70px) scale(.9);opacity:0;filter:blur(3px)}}',
    'html.motion .a-inflate .code{animation:es-inflate 2.2s cubic-bezier(.3,1.4,.5,1) infinite}',
    '@keyframes es-inflate{0%,100%{transform:scale(1)}45%{transform:scale(1.28,1.12)}60%{transform:scale(1.18,1.22)}}',
    '.frame{position:absolute;left:24%;right:24%;top:12%;bottom:12%;border:6px solid var(--accent);border-radius:10px}',
    'html.motion .a-stretch .code{animation:es-stretch 2.4s ease-in-out infinite}.a-stretch .code{transform-origin:0 50%}',
    'html.calm .a-stretch .code{transform:scaleX(1.4)}',
    '@keyframes es-stretch{0%,100%{transform:none}50%{transform:scaleX(1.7)}}',
    '.measure{position:absolute;left:20%;right:20%;bottom:6%;height:14px;background:repeating-linear-gradient(90deg,var(--accent) 0 2px,transparent 2px 12px),#E8B83A;border-radius:3px}',
    'html.motion .lens .steam{animation:es-steam 1.6s ease-in-out infinite}',
    '@keyframes es-steam{0%{transform:translateY(4px);opacity:0}50%{opacity:.6}100%{transform:translateY(-8px);opacity:0}}',
    '.sun{position:absolute;left:50%;width:150px;height:150px;margin-left:-75px;bottom:-30%;border-radius:50%;background:radial-gradient(circle,#F2C45A 0 45%,rgba(242,196,90,.25) 46% 70%,transparent 71%);z-index:-1}',
    'html.motion .sun{animation:es-rise 4s ease-out both}html.calm .sun{bottom:38%}',
    '@keyframes es-rise{0%{bottom:-20%;opacity:0}100%{bottom:38%;opacity:1}}',
    '.a-sunrise .stage{z-index:-1}',
    'html.motion .a-jitter .digit,html.motion .a-jitter .lens{animation:es-jitter .18s steps(2) infinite}',
    'html.motion .a-jitter .lens{animation-delay:.06s}html.motion .a-jitter .d2{animation-delay:.12s}',
    '@keyframes es-jitter{0%{transform:translate(-3px,2px) rotate(-2deg)}50%{transform:translate(3px,-2px) rotate(2deg)}100%{transform:translate(-2px,-1px)}}',
    '.crowd{position:absolute;left:0;right:0;bottom:0;text-align:center;font:700 22px "Segoe UI",sans-serif;color:var(--accent);letter-spacing:.3em}',
    'html.motion .crowd{animation:es-blink .4s steps(2) infinite}',
    '@keyframes es-blink{50%{opacity:.2}}',
    '.rbar{position:absolute;height:22%;background:var(--text);border-radius:3px;left:22%;right:22%}',
    '.r1{top:26%}.r2{top:56%;right:30%}',
    'html.motion .rbar{animation:es-redact .7s cubic-bezier(.2,.7,.2,1) both}html.motion .r2{animation-delay:.35s}',
    '@keyframes es-redact{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0 0 0)}}',
    '.stamp{position:absolute;right:16%;bottom:2%;padding:4px 12px;border:3px solid #B23A2A;color:#B23A2A;font:800 18px "Segoe UI",sans-serif;letter-spacing:.18em;transform:rotate(-10deg);border-radius:4px}',
    'html.motion .stamp{animation:es-stamp .5s .9s cubic-bezier(.3,1.6,.5,1) both}',
    '@keyframes es-stamp{0%{transform:rotate(-10deg) scale(2.4);opacity:0}100%{transform:rotate(-10deg) scale(1);opacity:1}}',
    'html.motion .a-shake .code{animation:es-shake .45s linear infinite}',
    '.a-shake .d2{transform:rotate(12deg) translateY(.06em)}.a-shake .d1{transform:rotate(-5deg)}',
    '@keyframes es-shake{0%,100%{transform:none}20%{transform:translate(-6px,2px)}40%{transform:translate(5px,-3px)}60%{transform:translate(-4px,3px)}80%{transform:translate(6px,-1px)}}',
    '.sparkle{position:absolute;width:10px;height:10px;border-radius:50%;background:#F2C45A;box-shadow:0 0 12px 4px rgba(242,196,90,.7);opacity:0}',
    '.s1{left:30%;top:20%}.s2{left:66%;top:30%}.s3{left:48%;top:72%}',
    'html.motion .sparkle{animation:es-spark 1.1s ease-out infinite}html.motion .s2{animation-delay:.4s}html.motion .s3{animation-delay:.75s}',
    '@keyframes es-spark{0%{opacity:0;transform:scale(.3)}15%{opacity:1;transform:scale(1.2)}100%{opacity:0;transform:translateY(40px) scale(.2)}}',
    '.smoke{position:absolute;left:55%;top:0;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,rgba(120,110,100,.35),transparent 70%);opacity:0}',
    'html.motion .smoke{animation:es-smoke 3s ease-out infinite}',
    '@keyframes es-smoke{0%{opacity:0;transform:none}30%{opacity:1}100%{opacity:0;transform:translate(30px,-80px) scale(2.2)}}',
    '.a-split .d1{transform:translateX(-.18em) rotate(-8deg)}.a-split .d2{transform:translateX(.18em) rotate(8deg)}',
    'html.motion .a-split .d1{animation:es-splitl 2.6s ease-in-out infinite}html.motion .a-split .d2{animation:es-splitr 2.6s ease-in-out infinite}',
    '@keyframes es-splitl{0%,100%{transform:none}40%,70%{transform:translateX(-.2em) rotate(-8deg)}}',
    '@keyframes es-splitr{0%,100%{transform:none}40%,70%{transform:translateX(.2em) rotate(8deg)}}',
    '.crack{position:absolute;left:50%;top:5%;bottom:5%;width:4px;margin-left:-2px;background:repeating-linear-gradient(170deg,var(--accent) 0 10px,transparent 10px 14px);opacity:.7}',
    '.a-swing .lens svg{transform-origin:50% 5%}',
    'html.motion .a-swing .lens svg{animation:es-swing 2.2s ease-in-out infinite}',
    '@keyframes es-swing{0%,100%{transform:rotate(9deg)}50%{transform:rotate(-9deg)}}',
    'html.motion .a-walk .digit,html.motion .a-walk .lens{animation:es-walk 7s ease-in-out infinite}',
    'html.motion .a-walk .lens{animation-delay:.2s}html.motion .a-walk .d2{animation-delay:.4s}',
    '@keyframes es-walk{0%,10%{transform:none}55%{transform:translateX(70vw) rotate(4deg)}55.01%{transform:translateX(-70vw)}100%{transform:none}}',
    'html.motion .lens .ring{animation:es-blink .5s steps(2) infinite}',
    'html.motion .a-swap .d1{animation:es-swapl 3s ease-in-out infinite}html.motion .a-swap .d2{animation:es-swapr 3s ease-in-out infinite}',
    '@keyframes es-swapl{0%,25%{transform:none}50%,75%{transform:translate(1.42em,-.12em)}100%{transform:none}}',
    '@keyframes es-swapr{0%,25%{transform:none}50%,75%{transform:translate(-1.42em,.12em)}100%{transform:none}}',
    '.a-squash .code{transform:scale(.8,.55);transform-origin:50% 100%}',
    'html.motion .a-squash .code{animation:es-squash 2.4s ease-in-out infinite}',
    '@keyframes es-squash{0%,100%{transform:scale(.8,.55)}50%{transform:scale(.72,.5)}}',
    'html.motion .a-orbit .code{animation:es-orbit 3.6s linear infinite}',
    '@keyframes es-orbit{to{transform:rotate(360deg)}}',
    '.a-freeze .code{color:#6FA3C8}',
    '.flake{position:absolute;font:700 30px Georgia,serif;color:#6FA3C8;opacity:.8}',
    '.f1{left:12%;top:8%}.f2{left:84%;top:18%}.f3{left:20%;top:76%}.f4{left:76%;top:70%}',
    'html.motion .flake{animation:es-flake 4s linear infinite}html.motion .f2{animation-delay:1s}html.motion .f3{animation-delay:2s}html.motion .f4{animation-delay:3s}',
    '@keyframes es-flake{0%{transform:translateY(-30px) rotate(0);opacity:0}20%{opacity:.9}100%{transform:translateY(60px) rotate(180deg);opacity:0}}',
    'html.motion .a-move .digit,html.motion .a-move .lens{animation:es-move 3.4s cubic-bezier(.6,0,.4,1) infinite}',
    '@keyframes es-move{0%,15%{transform:none;opacity:1}45%{transform:translateX(60vw);opacity:0}46%{transform:translateX(-60vw);opacity:0}80%,100%{transform:none;opacity:1}}',
    '.a-ok .code{color:#4E6B3A}html.motion .a-ok .lens svg{animation:es-pop .6s cubic-bezier(.3,1.6,.5,1) both}',
    '@keyframes es-pop{0%{transform:scale(.2)}100%{transform:none}}',
    'html.motion .a-wifi .w1{animation:es-blink 1.4s steps(1) infinite}html.motion .a-wifi .w2{animation:es-blink 1.4s .35s steps(1) infinite}html.motion .a-wifi .w3{animation:es-blink 1.4s .7s steps(1) infinite}',
    'html.motion .lens .sand{animation:es-sand 2s linear infinite}',
    '@keyframes es-sand{0%{opacity:.2}100%{opacity:1}}',
    'html.motion .a-tape .code{animation:es-nudge 1s infinite}'
  ].join('');
  document.head.appendChild(css);

  // The number gets a stage around it.
  var hero = document.createElement('div');
  hero.className = 'hero';
  code.parentNode.insertBefore(hero, code);
  hero.appendChild(code);
  var stage = document.createElement('div');
  stage.className = 'stage';
  stage.setAttribute('aria-hidden', 'true');
  hero.appendChild(stage);

  var original = { lens: lens.innerHTML, h1: h1.textContent, lead: lead.innerHTML, title: document.title };
  var current = null, timer = 0, fontTimer = 0, routed = false;

  function show(c) {
    var s = SCENES[c];
    if (!s) return false;
    clearTimeout(timer);
    clearInterval(fontTimer);
    current = c;
    hero.className = 'hero a-' + s[3];
    document.body.classList.add('scene-on');
    d1.textContent = c.charAt(0);
    d2.textContent = c.charAt(2);
    var icon = s[4] && (c.charAt(1) === '0' || s[4] === 'teapot') ? ICON[s[4]] : null;
    lens.innerHTML = icon || '<span class="mid">' + c.charAt(1) + '</span>';
    lens.classList.toggle('wide', !icon);
    stage.innerHTML = STAGE[s[5]] || '';
    if (s[3] === 'door') {
      var pp = stage.querySelector('.pp'), push = true;
      fontTimer = setInterval(function () { push = !push; if (pp) pp.textContent = push ? 'PUSH' : 'PULL'; }, 800);
    }
    if (s[3] === 'fonts') {
      var fonts = ['"Courier New", monospace', '"Segoe UI", sans-serif', '"Lucida Console", monospace', '"Palatino Linotype", serif', 'Georgia, serif'], i = 0;
      fontTimer = setInterval(function () { code.style.fontFamily = fonts[i++ % fonts.length]; }, 700);
    }
    code.setAttribute('aria-label', c + ' ' + s[0]);
    h1.textContent = s[1];
    lead.textContent = s[2];
    if (guess) guess.classList.remove('on');
    document.title = c + ' ' + s[0] + ': Easy Suite';
    collect(c);
    if (c === '418' && E) E.found('n-teapot');
    if (c === '200' && E) E.found('n-ok');
    return true;
  }

  function reset() {
    clearInterval(fontTimer);
    current = null;
    hero.className = 'hero';
    document.body.classList.remove('scene-on');
    code.style.fontFamily = '';
    d1.textContent = '4';
    d2.textContent = '4';
    lens.innerHTML = original.lens;
    lens.classList.remove('wide');
    stage.innerHTML = '';
    code.setAttribute('aria-label', '404');
    h1.textContent = original.h1;
    lead.innerHTML = original.lead;
    var p = lead.querySelector('.path');
    if (p) p.textContent = window.__lostPath || p.textContent;
    document.title = original.title;
  }

  // ---------- the collector ----------
  function collect(c) {
    var seen = [];
    try { seen = JSON.parse(localStorage.getItem('easysuite-errors') || '[]'); } catch (e) { seen = []; }
    if (seen.indexOf(c) < 0) seen.push(c);
    try { localStorage.setItem('easysuite-errors', JSON.stringify(seen)); } catch (e) { }
    if (E && seen.length >= 5) E.found('n-codes');
    if (E && seen.length >= 5 && seen.length < 6 && !routed) E.toast('Five errors collected. You have a strange hobby.');
  }

  // ---------- the museum: every error, each with its own address ----------
  function museum(scroll) {
    var m = document.querySelector('.museum');
    if (!m) {
      m = document.createElement('section');
      m.className = 'museum';
      m.setAttribute('aria-label', 'Error museum');
      var html = '<p class="kicker">The error museum</p><div class="chips">';
      CODES.concat(['404']).sort().forEach(function (c) {
        var name = c === '404' ? 'Not Found' : SCENES[c][0];
        html += '<a href="/errors/' + c + '/"' + (c === current || (c === '404' && !current && routed) ? ' aria-current="page"' : '') + '><b>' + c + '</b>' + name + '</a>';
      });
      m.innerHTML = html + '</div>';
      var actions = document.querySelector('.actions');
      actions.parentNode.insertBefore(m, actions.nextSibling);
    }
    if (scroll) m.scrollIntoView({ behavior: E && E.full ? 'smooth' : 'auto', block: 'center' });
    return m;
  }

  // ---------- an address like /errors/503/ shows that scene ----------
  var m = location.pathname.match(/^\/errors?\/(\d{3})\/?$/);
  if (m) {
    routed = true;
    if (m[1] !== '404' && show(m[1])) {
      var note = document.createElement('p');
      note.className = 'scene-note';
      note.textContent = 'This room shows our take on error ' + m[1] + ', ' + SCENES[m[1]][0] + '. The rest of the site is fine.';
      lead.parentNode.insertBefore(note, lead.nextSibling);
    }
    museum(false);
    if (E) E.found('n-museum');
  }

  if (!E) return;

  // Typing an error plays its scene for a while.
  E.pattern(/(\d{3})$/, function (match) {
    var c = match[1];
    if (c === '404') { E.toast(routed && current ? 'Back to the classic.' : 'You are already here. Welcome back.'); if (routed && current) reset(); return; }
    if (!SCENES[c]) { E.toast(c + '? Not an error we know. Lucky you.'); return; }
    show(c);
    E.sound(c.charAt(0) === '5' ? 'thud' : 'pop');
    if (!routed) timer = setTimeout(reset, 7000);
  });

  E.word('museum', function () { museum(true); E.found('n-museum'); E.toast('Welcome to the error museum. Please do not touch the exhibits.'); });
})();
