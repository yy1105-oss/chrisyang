/* ============================================
   CHRIS YANG PORTFOLIO — MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Page transition (fade in) ──
  document.body.classList.add('page-enter');

  // ── Intercept internal links for smooth transitions ──
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('#')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(6px)';
      document.body.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });

  // ── Nav: Works dropdown ──
  const dropdown = document.querySelector('.nav-dropdown');
  const trigger  = dropdown?.querySelector('.nav-dropdown-trigger');

  trigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    dropdown?.classList.remove('open');
  });

  // ── Nav: Mobile toggle ──
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks     = document.querySelector('.nav-links');

  mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('mobile-open');
    const spans = mobileToggle.querySelectorAll('span');
    if (navLinks.classList.contains('mobile-open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // ── Contact form (Formspree) ──
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          const success = document.querySelector('.form-success');
          if (success) { success.style.display = 'block'; }
          btn.textContent = 'Sent!';
        } else {
          btn.textContent = 'Something went wrong — try emailing directly';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Network error — please try again';
        btn.disabled = false;
      }
    });
  }

});
