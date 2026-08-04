// Nightfall Crypt — shared site behavior
document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Theme filter (story archive) — deep-linkable via /stories#theme-slug
  var filterBar = document.getElementById('theme-filter');
  if (filterBar) {
    var applyTheme = function (theme) {
      var btn = filterBar.querySelector('[data-theme="' + theme + '"]');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      document.querySelectorAll('.stories-grid .story-card').forEach(function (card) {
        var themes = (card.getAttribute('data-themes') || '').split(' ');
        card.style.display =
          (theme === 'all' || themes.indexOf(theme) !== -1) ? '' : 'none';
      });
    };
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      var theme = btn.getAttribute('data-theme');
      applyTheme(theme);
      history.replaceState(null, '', theme === 'all'
        ? location.pathname : '#' + theme);
    });
    if (location.hash) applyTheme(location.hash.slice(1));
  }

  // Thumbnails: YouTube 404s thumbnails for private (premiere-pending)
  // videos — hide the broken image; the card degrades to text-only.
  document.querySelectorAll('.story-thumb').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
    if (img.complete && img.naturalWidth === 0) img.style.display = 'none';
  });

  // Upcoming premieres: cards carry data-premiere (ISO date with offset).
  // If the premiere is still in the future, swap the month label for a badge.
  var now = new Date();
  document.querySelectorAll('.story-card[data-premiere]').forEach(function (card) {
    var when = new Date(card.getAttribute('data-premiere'));
    if (isNaN(when) || when <= now) return;
    var meta = card.querySelector('.story-meta');
    if (!meta) return;
    var badge = document.createElement('span');
    badge.className = 'premiere-badge';
    badge.textContent = 'Premieres ' + when.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    }) + ' · ' + when.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit'
    });
    meta.replaceChildren(badge);
  });
});
