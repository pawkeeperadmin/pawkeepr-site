(function () {
  function $(sel) { return document.querySelector(sel); }

  var cfg = (window.PAWKEEPR || {});
  var testflight = cfg.testflightUrl || '';
  var androidBeta = cfg.androidBetaUrl || '';

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
      body += '\n---\n';
      body += 'Sent from pawkeepr.cc';

      var mailto = 'mailto:support@pawkeepr.cc?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }

  // Year in footer
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
