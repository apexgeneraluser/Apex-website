/* Standardized header behaviour: mobile menu toggle + dropdown a11y.
   Mobile/small screens get one panel; desktop uses hover/focus-within. */
(function () {
  var header = document.querySelector('header');
  if (!header) return;
  var toggle = header.querySelector('.menu-toggle');
  var nav = header.querySelector('nav.primary-nav');
  var parentLink = nav && nav.querySelector('.nav-parent');
  var sub = parentLink && parentLink.parentElement.querySelector('.nav-sub');

  function setExpanded(el, state) { if (el) el.setAttribute('aria-expanded', state ? 'true' : 'false'); }

  function closeMenu() {
    header.classList.remove('nav-open');
    setExpanded(toggle, false);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      setExpanded(toggle, open);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); if (header) header.querySelectorAll('.nav-item.open').forEach(function (i) { i.classList.remove('open'); setExpanded(parentLink, false); }); }
  });

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) { closeMenu(); header.querySelectorAll('.nav-item.open').forEach(function (i) { i.classList.remove('open'); }); setExpanded(parentLink, false); }
  });

  window.addEventListener('resize', function () { if (window.innerWidth > 760) closeMenu(); });

  /* touch devices (no hover): tap the Services carets marker toggles the panel */
  if (parentLink && sub) {
    var hoverable = window.matchMedia('(hover: hover)');
    parentLink.addEventListener('mouseenter', function () { setExpanded(parentLink, true); });
    parentLink.addEventListener('mouseleave', function () { setExpanded(parentLink, false); });
    parentLink.addEventListener('focus', function () { setExpanded(parentLink, true); });
    parentLink.addEventListener('blur', function () { setExpanded(parentLink, false); });
    parentLink.addEventListener('click', function (e) {
      if (window.innerWidth <= 760) return;      /* panel handles it */
      if (hoverable.matches) return;             /* desktop hover handles it */
      if (!parentLink.parentElement.classList.contains('open')) {
        e.preventDefault();
        parentLink.parentElement.classList.add('open');
        setExpanded(parentLink, true);
      }
    });
  }
})();
