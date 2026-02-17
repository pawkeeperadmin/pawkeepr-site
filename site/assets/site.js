(function () {
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  var cfg = (window.pawkeepr || {});
  var testflight = (cfg.testflightUrl || '').trim();
  var androidBeta = (cfg.androidBetaUrl || '').trim();
  var seenEvents = Object.create(null);

  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  function trackOnce(eventName, key, params) {
    var dedupeKey = eventName + ':' + key;
    if (seenEvents[dedupeKey]) return;
    seenEvents[dedupeKey] = true;
    track(eventName, params);
  }

  function setLink(el, fallbackMailto, url) {
    if (!el) return;
    el.href = url && url.trim() ? url : fallbackMailto;
    el.rel = 'noopener';
    el.target = '_blank';
  }

  var testflightFallback =
    'mailto:support@pawkeepr.cc?subject=Get%20Early%20Access&body=Hi%20pawkeepr%2C%0A%0AI%27d%20like%20to%20get%20early%20access%20to%20the%20iOS%20beta.%0A%0ADevice%3A%20%0AiOS%20version%3A%20%0A%0AThanks%21';

  // Keep destination consistent across all TestFlight CTAs.
  setLink(document.getElementById('nav-testflight'), testflightFallback, testflight);
  $all('[data-testflight-link]').forEach(function (el) {
    setLink(el, testflightFallback, testflight);
  });

  function inferCtaPlacement(el) {
    if (!el) return 'unknown';
    if (el.id === 'nav-testflight') return 'nav';
    if (el.closest('#join-beta')) return 'join_beta';
    if (el.closest('.faq-head')) return 'faq';
    if (el.closest('.hero-cta')) return 'hero';
    if (el.closest('#features')) return 'features';
    if (el.closest('[aria-label=\"How it works\"]')) return 'how_it_works';
    if (el.closest('[aria-label=\"Who it’s for\"]')) return 'who_its_for';
    if (el.closest('[aria-label=\"Public beta\"]')) return 'public_beta';
    return 'page';
  }

  function bindEarlyAccessTracking(el) {
    if (!el) return;
    el.addEventListener('click', function () {
      track('early_access_click', {
        placement: inferCtaPlacement(el),
        path: window.location.pathname || '/',
        href: el.getAttribute('href') || ''
      });
    });
  }

  bindEarlyAccessTracking(document.getElementById('nav-testflight'));
  $all('[data-testflight-link]').forEach(bindEarlyAccessTracking);

  var androidFallback =
    'mailto:support@pawkeepr.cc?subject=Get%20Android%20Beta&body=Hi%20pawkeepr%2C%0A%0AI%27d%20like%20to%20join%20the%20Android%20beta.%0A%0ADevice%3A%20%0AAndroid%20version%3A%20%0A%0AThanks%21';
  setLink(document.getElementById('cta-android'), androidFallback, androidBeta);

  // Track CTA section visibility (scroll-to-CTA proxy).
  var ctaSection = document.getElementById('join-beta');
  if (ctaSection && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          trackOnce('cta_view', 'join_beta', {
            section_id: 'join-beta',
            path: window.location.pathname || '/'
          });
        }
      });
    }, { threshold: 0.35 });
    observer.observe(ctaSection);
  }

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

      track('support_form_draft', {
        path: window.location.pathname || '/',
        has_name: name ? 'yes' : 'no',
        has_email: email ? 'yes' : 'no'
      });
    });
  }

  // 404 tracking (for static pages and fallback routes).
  if (
    window.location.pathname === '/404.html' ||
    window.location.pathname === '/404' ||
    /not found/i.test(document.title)
  ) {
    track('page_not_found', {
      path: window.location.pathname || '/',
      referrer: document.referrer || ''
    });
  }

  // Basic JS error tracking.
  window.addEventListener('error', function (event) {
    track('js_error', {
      message: (event && event.message ? String(event.message) : '').slice(0, 200),
      source: (event && event.filename ? String(event.filename) : '').slice(0, 200),
      line: event && event.lineno ? String(event.lineno) : ''
    });
  });

  window.addEventListener('unhandledrejection', function (event) {
    var reason = '';
    if (event && event.reason) {
      reason = typeof event.reason === 'string'
        ? event.reason
        : (event.reason.message || JSON.stringify(event.reason));
    }
    track('js_promise_rejection', {
      reason: String(reason || '').slice(0, 200),
      path: window.location.pathname || '/'
    });
  });

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
