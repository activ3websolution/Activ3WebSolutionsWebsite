/**
 * Activ3 Web Solutions - Main JS
 */

(function() {
  "use strict";

  /**
   * Initialize all functionality when DOM is loaded
   */
  document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    
    // Only run these if we're on the homepage
    if (document.getElementById('typed-text')) {
      initTypingAnimation();
    }
    
    initForms();
    initModals();
  });

  /**
   * Mobile navigation functionality - SIMPLIFIED AND ROBUST
   */
  function initMobileNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const header = document.getElementById('header');
    
    if (!mobileNavToggle || !header) return;
    
    // Function to close mobile menu
    const closeMobileMenu = function() {
      body.classList.remove('mobile-nav-active');
      header.classList.remove('header-show');
      mobileNavToggle.classList.add('bi-list');
      mobileNavToggle.classList.remove('bi-x');
    };
    
    // Function to open mobile menu
    const openMobileMenu = function() {
      body.classList.add('mobile-nav-active');
      header.classList.add('header-show');
      mobileNavToggle.classList.remove('bi-list');
      mobileNavToggle.classList.add('bi-x');
    };
    
    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (body.classList.contains('mobile-nav-active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Close menu when clicking on backdrop
    if (backdrop) {
      backdrop.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking on a nav link (for all pages)
    const navLinks = document.querySelectorAll('.navmenu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 1200) {
          closeMobileMenu();
        }
      });
    });
    
    // Close mobile navigation when window is resized to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1199) {
        closeMobileMenu();
      }
    });
  }

  /**
   * Typing animation for hero section (homepage only)
   */
  function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const words = ['Websites', 'SEO', 'Email Marketing'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        // Remove characters
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Add characters
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      // Determine action when word is complete
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before starting next word
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    setTimeout(type, 1000);
  }

  /**
   * Form handling
   */
  function initForms() {
    // Free Audit Form - Simple Calendly Redirect
    const auditForm = document.getElementById('auditForm');
    if (auditForm) {
      auditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        window.open("https://calendly.com/jacobdavis-activ3websolutions/30min", "_blank");
        
        // Reset form
        this.reset();
      });
    }

    // Contact Form Handling (homepage only)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
      });
    }
  }

  /**
   * Modal functionality (homepage only)
   */
  function initModals() {
    // Only run on homepage where these elements exist
    const auditButton = document.getElementById('auditButton');
    const auditModal = document.getElementById('auditModal');
    const closeModal = document.getElementById('closeModal');
    
    if (!auditButton || !auditModal) return;
    
    auditButton.addEventListener('click', function() {
      auditModal.style.display = 'block';
    });
    
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        auditModal.style.display = 'none';
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === auditModal) {
        auditModal.style.display = 'none';
      }
    });
  }

})();
