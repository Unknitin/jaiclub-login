// ===========================
// JAICLUB - MAIN JAVASCRIPT
// script.js
// ===========================

document.addEventListener('DOMContentLoaded', function () {

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ===== STICKY CTA =====
  const stickyCta = document.getElementById('stickyCta');
  if (stickyCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    });
  }

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(i => {
          i.classList.remove('active');
          const q = i.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        });
        // Open clicked if it wasn't active
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ===== FADE-UP INTERSECTION OBSERVER =====
  const fadeElements = document.querySelectorAll('.fade-up, .fade-up-delay');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== CONTACT FORM HANDLER =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '✅ Message Sent!';
      btn.disabled = true;
      btn.style.background = '#22C55E';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ===== STATS COUNTER ANIMATION =====
  function animateCounter(el, target, suffix) {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Just let the static numbers show — counters optional
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statsObserver.observe(statsBar);
  }

  // ===== ACTIVE NAV HIGHLIGHT ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
    });
  }

  // ===== HERO ANIMATE ON LOAD =====
  setTimeout(() => {
    document.querySelectorAll('.fade-up, .fade-up-delay').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);

});
