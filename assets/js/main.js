/**
 * Activ3 Web Solutions - Main JS (Clean & Enhanced)
 */

(function() {
  "use strict";

  document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initHeroTyping();
    initForms();
    initModals();
  });

  /*--------------------------------------------------------------
  # Mobile Navigation
  --------------------------------------------------------------*/
  function initMobileNavigation() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const header = document.getElementById('header');
    if (!toggle || !header) return;

    const closeMenu = () => {
      body.classList.remove('mobile-nav-active');
      header.classList.remove('header-show');
      toggle.classList.add('bi-list');
      toggle.classList.remove('bi-x');
    };

    const openMenu = () => {
      body.classList.add('mobile-nav-active');
      header.classList.add('header-show');
      toggle.classList.remove('bi-list');
      toggle.classList.add('bi-x');
    };

    toggle.addEventListener('click', e => {
      e.preventDefault();
      body.classList.contains('mobile-nav-active') ? closeMenu() : openMenu();
    });

    backdrop?.addEventListener('click', closeMenu);
    document.querySelectorAll('.navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1200) closeMenu();
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1199) closeMenu();
    });
  }

  /*--------------------------------------------------------------
  # Hero Section Typing Animation
  --------------------------------------------------------------*/
  function initHeroTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const words = ['Websites', 'SEO', 'Email Marketing'];
    let wordIndex = 0, charIndex = 0, deleting = false, speed = 100;

    const type = () => {
      const currentWord = words[wordIndex];
      el.textContent = deleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);

      charIndex += deleting ? -1 : 1;
      speed = deleting ? 50 : 100;

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        speed = 1000;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
      }
      setTimeout(type, speed);
    };

    setTimeout(type, 500);
  }

  /*--------------------------------------------------------------
  # Forms (Audit & Contact)
  --------------------------------------------------------------*/
  function initForms() {
    // Free Audit Form
    const auditForm = document.getElementById('auditForm');
    auditForm?.addEventListener('submit', e => {
      e.preventDefault();
      window.open("https://calendly.com/jacobdavis-activ3websolutions/30min", "_blank");
      auditForm.reset();
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm?.addEventListener('submit', e => {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending...';
      }
    });
  }

  /*--------------------------------------------------------------
  # Modal (Audit Modal)
  --------------------------------------------------------------*/
  function initModals() {
    const modal = document.getElementById('auditModal');
    const btn = document.getElementById('auditButton');
    const closeBtn = document.getElementById('closeModal');
    if (!modal || !btn) return;

    // Open modal
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    // Close modal
    closeBtn?.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close by clicking outside
    window.addEventListener('click', e => {
      if (e.target === modal) modal.style.display = 'none';
    });

    // Optional: Close modal on ESC key
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') modal.style.display = 'none';
    });
  }

})();
