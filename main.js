/* ============================================
   AQUILIX — Script condiviso da tutte le pagine
   ============================================ */

// Tema chiaro/scuro: la scelta fatta con il pulsante viene salvata e vale su
// tutte le pagine. Senza una scelta salvata si segue il tema del sistema.
// Lo snippet inline nel <head> applica il tema salvato prima del rendering.
(function () {
  const KEY = 'aquilix-theme';
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  const mq = matchMedia('(prefers-color-scheme: dark)');

  function getSaved() {
    try {
      const v = localStorage.getItem(KEY);
      return v === 'dark' || v === 'light' ? v : null;
    } catch (e) {
      return null;
    }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) { /* storage non disponibile */ }
  }

  let d = getSaved() || (mq.matches ? 'dark' : 'light');
  apply();

  t && t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    save(d);
    apply();
  });

  // Se l'utente non ha scelto, segue i cambi di tema del sistema
  mq.addEventListener && mq.addEventListener('change', (e) => {
    if (getSaved()) return;
    d = e.matches ? 'dark' : 'light';
    apply();
  });

  function apply() {
    r.setAttribute('data-theme', d);
    if (!t) return;
    t.setAttribute('aria-label', 'Attiva tema ' + (d === 'dark' ? 'chiaro' : 'scuro'));
    t.innerHTML = d === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// Header che si nasconde scorrendo in giù
(function () {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('header--scrolled', y > 8);
    if (y > lastY && y > 120) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    lastY = y;
  }, { passive: true });
})();

// Menu mobile
(function () {
  const btn = document.getElementById('navToggle');
  btn && btn.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  });
  document.querySelectorAll('.mobile-menu a').forEach((a) => {
    a.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Apri il menu');
      }
    });
  });
})();

// FAQ a fisarmonica (presente solo nella home)
(function () {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.setAttribute('data-open', 'false');
        const q = i.querySelector('.faq-question');
        q && q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
