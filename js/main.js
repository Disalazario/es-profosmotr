document.addEventListener('DOMContentLoaded', () => {

  // ====== STICKY HEADER ======
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
  }, { passive: true });
  header.classList.toggle('header--scrolled', window.scrollY > 60);

  // ====== BURGER ======
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    nav.classList.toggle('nav--open');
    document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
  });
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--open');
      document.body.style.overflow = '';
    });
  });

  // ====== SCROLL ANIMATIONS ======
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fade-up--visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    fadeEls.forEach(el => obs.observe(el));
  }

  // ====== TESTIMONIALS SLIDER (copy.ai style with progress dots) ======
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonials__dot');
  let current = 0;
  let timer;

  function showSlide(i) {
    cards.forEach(c => c.classList.remove('testimonial-card--active'));
    dots.forEach(d => {
      d.classList.remove('testimonials__dot--active');
      d.innerHTML = '';
    });
    cards[i].classList.add('testimonial-card--active');
    dots[i].classList.add('testimonials__dot--active');
    // Re-trigger progress animation
    const bar = document.createElement('span');
    bar.style.cssText = 'position:absolute;inset:0;background:var(--primary);animation:dot-progress 6s linear forwards;';
    dots[i].appendChild(bar);
    current = i;
  }

  function nextSlide() {
    showSlide((current + 1) % cards.length);
  }

  if (cards.length > 1) {
    timer = setInterval(nextSlide, 6000);
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        showSlide(Number(dot.dataset.index));
        timer = setInterval(nextSlide, 6000);
      });
    });
    showSlide(0);
  }

  // ====== FAQ ======
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-item__q').addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-item--open'));
      if (!isOpen) item.classList.add('faq-item--open');
    });
  });

  // ====== TOAST ======
  const toast = document.getElementById('toast');
  function showToast(msg, type = 'success') {
    toast.textContent = msg;
    toast.className = `toast toast--show toast--${type}`;
    setTimeout(() => { toast.className = 'toast'; }, 3500);
  }

  // ====== CONTACT FORM ======
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name')?.trim();
      const phone = fd.get('phone')?.trim();
      if (!name || !phone) {
        showToast('Пожалуйста, заполните имя и телефон', 'error');
        return;
      }
      showToast('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
      form.reset();
    });
  }

  // ====== HERO FORM ======
  const heroForm = document.getElementById('heroForm');
  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Спасибо! Мы отправим демо-доступ на указанный email.', 'success');
      heroForm.reset();
    });
  }

  // ====== PAUSE LOGO SCROLL ON HOVER ======
  const logoTrack = document.getElementById('logoTrack');
  if (logoTrack) {
    logoTrack.addEventListener('mouseenter', () => { logoTrack.style.animationPlayState = 'paused'; });
    logoTrack.addEventListener('mouseleave', () => { logoTrack.style.animationPlayState = 'running'; });
  }

});
