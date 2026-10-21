// EasySign page, Paperwork desk look: the sign-here flags, the folder tabs and the envelope at Download.
(function () {
  var full = document.documentElement.classList.contains('motion');
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // The form and the letter are signed with Jordan Avery's signature from the pad further down, stroke by stroke.
  var ink = $$('.device svg.ink path:not(.egg-flourish)');
  if (ink.length) {
    $$('svg[data-ink]').forEach(function (svg) {
      svg.setAttribute('viewBox', '0 100 640 100');
      svg.setAttribute('preserveAspectRatio', 'xMinYMax meet');
      svg.textContent = '';
      ink.forEach(function (p, i) {
        var c = p.cloneNode(false);
        c.removeAttribute('style');
        c.removeAttribute('data-len');
        c.setAttribute('pathLength', '1');
        c.style.transitionDelay = (i * 0.05).toFixed(2) + 's';
        svg.appendChild(c);
      });
    });
  }

  // A flag comes off when clicked and its line signs itself.
  $$('.desk-flag').forEach(function (f) {
    f.addEventListener('click', function () {
      var line = document.querySelector('.desk-line.' + f.dataset.line);
      if (line) line.classList.add('signed');
      f.classList.add('done');
    });
  });

  // Folder tabs: click or use the arrow keys, Home and End.
  var tabs = $$('.desk-tabs [role="tab"]');
  function pick(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab, panel = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (panel) panel.classList.toggle('on', on);
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t, false); });
    t.addEventListener('keydown', function (e) {
      var n = tabs.length, k = e.key;
      var j = k === 'ArrowRight' ? (i + 1) % n : k === 'ArrowLeft' ? (i + n - 1) % n : k === 'Home' ? 0 : k === 'End' ? n - 1 : -1;
      if (j < 0) return;
      e.preventDefault();
      pick(tabs[j], true);
    });
  });

  // The envelope opens once it is well in view; a click closes or opens it again.
  var env = document.querySelector('.desk-env');
  if (env) {
    var open = function () { env.classList.add('open'); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.disconnect();
          setTimeout(open, full ? 300 : 0);
        });
      }, { threshold: 0.6 });
      io.observe(env);
    } else open();
    env.addEventListener('click', function () { env.classList.toggle('open'); });
  }
})();
