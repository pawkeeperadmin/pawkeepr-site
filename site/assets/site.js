(function () {
  function byId(id) { return document.getElementById(id); }
  function all(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }

  var year = byId('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var cfg = window.pawkeepr || {};
  var appStoreUrl = (cfg.appStoreUrl || '').trim();
  var supportEmail = (cfg.supportEmail || 'support@pawkeepr.cc').trim();

  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  function resolveAppStoreHref() {
    if (appStoreUrl) return appStoreUrl;
    return 'mailto:' + encodeURIComponent(supportEmail) + '?subject=' + encodeURIComponent('Notify me when pawkeepr is live');
  }

  all('[data-appstore-link]').forEach(function (el) {
    el.href = resolveAppStoreHref();
    el.target = '_blank';
    el.rel = 'noopener';
    el.addEventListener('click', function () {
      track('app_store_click', {
        path: window.location.pathname || '/',
        has_app_store_url: appStoreUrl ? 'yes' : 'no'
      });
    });
  });

  var screensSection = byId('screens');
  if (screensSection && 'IntersectionObserver' in window) {
    var sent = false;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !sent) {
          sent = true;
          track('screens_view', { path: window.location.pathname || '/' });
        }
      });
    }, { threshold: 0.35 }).observe(screensSection);
  }
})();
