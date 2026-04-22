// ===== KAERU LP — SHARED INTERACTIONS =====
(function(){
  // TOPBAR scrolled state
  const topbar = document.getElementById('topbar');
  if (topbar) {
    const onScroll = () => topbar.classList.toggle('scrolled', window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // HERO media crossfade
  const heroMedia = document.getElementById('heroMedia');
  if (heroMedia) {
    const imgs = heroMedia.querySelectorAll('img');
    if (imgs.length > 1) {
      let i = 0;
      setInterval(() => {
        imgs[i].classList.remove('active');
        i = (i + 1) % imgs.length;
        imgs[i].classList.add('active');
        const cur = document.getElementById('heroCur');
        if (cur) cur.textContent = String(i + 1).padStart(2, '0');
      }, 5500);
    }
  }

  // REVEAL on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .why-card').forEach(el => io.observe(el));

  // Prevent hash jump for demo links
  document.querySelectorAll('a[href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

  // SIDE CTA visibility + toggle
  const sideCta = document.getElementById('sideCta');
  const sideCtaBtn = document.getElementById('sideCtaBtn');
  if (sideCta && sideCtaBtn) {
    const contactEl = document.getElementById('contact');
    function updateSide() {
      const scrollY = window.scrollY;
      const viewBottom = scrollY + window.innerHeight;
      const contactTop = contactEl ? contactEl.offsetTop : Infinity;
      // show after 600px scroll, hide when reaching contact section
      if (scrollY > 600 && viewBottom < contactTop) {
        sideCta.classList.add('visible');
      } else {
        sideCta.classList.remove('visible');
        sideCta.classList.remove('open');
      }
    }
    updateSide();
    window.addEventListener('scroll', updateSide, { passive: true });
    window.addEventListener('resize', updateSide);

    sideCtaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sideCta.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (sideCta.classList.contains('open') && !sideCta.contains(e.target)) {
        sideCta.classList.remove('open');
      }
    });
  }
})();
