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
