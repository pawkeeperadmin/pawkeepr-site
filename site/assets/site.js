(function () {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  // CTA configuration (links live in assets/config.js)
  var cfg = (window.PAWKEEPR || {});
  var testflight = (cfg.testflightUrl || '').trim();
  var androidBeta = (cfg.androidBetaUrl || '').trim();

  function setLink(id, fallbackMailto, url) {
    var el = document.getElementById(id);
    if (!el) return;
    el.href = url && url.trim() ? url : fallbackMailto;
    el.rel = 'noopener';
    el.target = '_blank';
  }

  setLink(
    'cta-ios',
    'mailto:support@pawkeepr.cc?subject=Join%20TestFlight&body=Hi%20pawkeepr%2C%0A%0AI%27d%20like%20to%20join%20TestFlight.%0A%0ADevice%3A%20%0AiOS%20version%3A%20%0A%0AThanks%21',
    testflight
  );

  // Header beta link (same target as the CTA)
  setLink(
    'nav-testflight',
    'mailto:support@pawkeepr.cc?subject=Join%20TestFlight&body=Hi%20pawkeepr%2C%0A%0AI%27d%20like%20to%20join%20TestFlight.%0A%0ADevice%3A%20%0AiOS%20version%3A%20%0A%0AThanks%21',
    testflight
  );

  // Optional Android beta link (if the element exists on a given page)
  setLink(
    'cta-android',
    'mailto:support@pawkeepr.cc?subject=Get%20Android%20Beta&body=Hi%20pawkeepr%2C%0A%0AI%27d%20like%20to%20join%20the%20Android%20beta.%0A%0ADevice%3A%20%0AAndroid%20version%3A%20%0A%0AThanks%21',
    androidBeta
  );

  // Support form (mailto submit)
  var form = $('#support-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = ($('#name') && $('#name').value || '').trim();
      var email = ($('#email') && $('#email').value || '').trim();
      var message = ($('#message') && $('#message').value || '').trim();

      var subject = 'pawkeepr support request';
      var body = '';
      if (name) body += 'Name: ' + name + '\n';
      if (email) body += 'Email: ' + email + '\n';
      body += '\n' + (message || '(no message)') + '\n';
      body += '\n---\nSent from pawkeepr.cc';

      window.location.href =
        'mailto:support@pawkeepr.cc?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }

  // Carousel (lightweight, no framework)
  var carousel = $('[data-carousel]');
  if (carousel) {
    var viewport = $('[data-carousel] .carousel-viewport');
    var prev = $('[data-carousel-prev]', carousel);
    var next = $('[data-carousel-next]', carousel);
    var dotsWrap = $('[data-carousel-dots]', carousel);
    var slides = $all('.carousel-slide', viewport);
    var dots = dotsWrap ? $all('.dot', dotsWrap) : [];

    function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

    function nearestIndex() {
      var x = viewport.scrollLeft;
      var best = 0;
      var bestDist = Infinity;
      for (var i = 0; i < slides.length; i++) {
        var dist = Math.abs(slides[i].offsetLeft - x);
        if (dist < bestDist) { bestDist = dist; best = i; }
      }
      return best;
    }

    function setDot(idx) {
      for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute('aria-current', i === idx ? 'true' : 'false');
      }
    }

    function goTo(idx) {
      idx = clamp(idx, 0, slides.length - 1);
      viewport.scrollTo({ left: slides[idx].offsetLeft, behavior: 'smooth' });
      setDot(idx);
    }

    if (prev) prev.addEventListener('click', function () { goTo(nearestIndex() - 1); });
    if (next) next.addEventListener('click', function () { goTo(nearestIndex() + 1); });

    viewport.addEventListener('scroll', function () {
      // Keep dots in sync while user swipes
      setDot(nearestIndex());
    }, { passive: true });

    viewport.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(nearestIndex() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(nearestIndex() + 1); }
    });

    // Init
    setDot(0);
  }
})();
