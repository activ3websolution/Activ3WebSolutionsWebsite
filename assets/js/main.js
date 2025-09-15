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
    initTypingAnimation();
    initForms();
    initModals();
  });

  /**
   * Mobile navigation functionality
   */
  function initMobileNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.navmenu a');
    
    // Function to close mobile menu
    const closeMobileMenu = function() {
      body.classList.remove('mobile-nav-active');
      header.classList.remove('header-show');
      
      // Reset toggle icon
      if (mobileNavToggle) {
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      }
    };
    
    // Toggle mobile menu
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpening = !body.classList.contains('mobile-nav-active');
        
        if (isOpening) {
          body.classList.add('mobile-nav-active');
          header.classList.add('header-show');
          this.classList.remove('bi-list');
          this.classList.add('bi-x');
        } else {
          closeMobileMenu();
        }
      });
    }
    
    // Close menu when clicking on backdrop
    if (backdrop) {
      backdrop.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
      });
    }
    
    // Close menu when clicking on a nav link
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

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
      if (window.innerWidth < 1200 && 
          body.classList.contains('mobile-nav-active') &&
          !header.contains(e.target) && 
          e.target !== mobileNavToggle) {
        closeMobileMenu();
      }
    });

    // Prevent clicks inside menu from closing it
    if (header) {
      header.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }

  /**
   * Typing animation for hero section
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
        
        // Close modal if it exists
        const auditModal = document.getElementById('auditModal');
        if (auditModal) {
          auditModal.style.display = 'none';
          
          // If using Bootstrap modal
          if (typeof bootstrap !== 'undefined') {
            const bsModal = bootstrap.Modal.getInstance(auditModal);
            if (bsModal) bsModal.hide();
          }
        }
        
        // Reset form
        this.reset();
      });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        // This is just visual feedback - Formspree will handle the actual submission
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
          
          // Re-enable after 5 seconds in case there's an error
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }, 5000);
        }
      });
    }
  }

  /**
   * Modal functionality
   */
  function initModals() {
    const auditButton = document.getElementById('auditButton');
    const auditModal = document.getElementById('auditModal');
    const closeModal = document.getElementById('closeModal');
    
    if (auditButton && auditModal) {
      auditButton.addEventListener('click', function() {
        // Show modal - handle both plain JS and Bootstrap modals
        if (typeof bootstrap !== 'undefined') {
          const bsModal = new bootstrap.Modal(auditModal);
          bsModal.show();
        } else {
          auditModal.style.display = 'block';
        }
      });
    }
    
    if (closeModal && auditModal) {
      closeModal.addEventListener('click', function() {
        if (typeof bootstrap !== 'undefined') {
          const bsModal = bootstrap.Modal.getInstance(auditModal);
          if (bsModal) bsModal.hide();
        } else {
          auditModal.style.display = 'none';
        }
      });
    }
    
    // Close modal when clicking outside
    if (auditModal) {
      window.addEventListener('click', function(event) {
        if (event.target === auditModal) {
          if (typeof bootstrap !== 'undefined') {
            const bsModal = bootstrap.Modal.getInstance(auditModal);
            if (bsModal) bsModal.hide();
          } else {
            auditModal.style.display = 'none';
          }
        }
      });
    }
  }

  /**
   * Helper function to check if element is in viewport
   */
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

})();
