(function () {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  var cfg = (window.PAWKEEPR || {});
  var testflight = (cfg.testflightUrl || '').trim();
  var androidBeta = (cfg.androidBetaUrl || '').trim();

  function setLink(el, fallbackMailto, url) {
    if (!el) return;
    el.href = url && url.trim() ? url : fallbackMailto;
    el.rel = 'noopener';
    el.target = '_blank';
  }

  var testflightFallback =
    'mailto:support@pawkeepr.cc?subject=Join%20TestFlight&body=Hi%20pawkeepr%2C%0A%0AI%27d%20like%20to%20join%20TestFlight.%0A%0ADevice%3A%20%0AiOS%20version%3A%20%0A%0AThanks%21';

  // Keep destination consistent across all TestFlight CTAs.
  setLink(document.getElementById('nav-testflight'), testflightFallback, testflight);
  $all('[data-testflight-link]').forEach(function (el) {
    setLink(el, testflightFallback, testflight);
  });

  var androidFallback =
    'mailto:support@pawkeepr.cc?subject=Get%20Android%20Beta&body=Hi%20pawkeepr%2C%0A%0AI%27d%20like%20to%20join%20the%20Android%20beta.%0A%0ADevice%3A%20%0AAndroid%20version%3A%20%0A%0AThanks%21';
  setLink(document.getElementById('cta-android'), androidFallback, androidBeta);

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

  // Lightbox gallery (no dependencies)
  var lightbox = $('#screens-lightbox');
  var openBtn = $('[data-open-lightbox]');
  var closeBtn = $('[data-close-lightbox]');
  var previousFocus = null;

  function openLightbox() {
    if (!lightbox) return;
    previousFocus = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  }

  if (openBtn) {
    openBtn.addEventListener('click', function () {
      openLightbox();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      closeLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
