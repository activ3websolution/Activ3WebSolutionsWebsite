/**
 * Activ3 Web Solutions - Main JS
 */

(function() {
  "use strict";

  /**
   * Mobile navigation functionality
   */
  document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.navmenu a');
    
    // Toggle mobile menu
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.toggle('mobile-nav-active');
        header.classList.toggle('header-show');
        
        // Toggle icon
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }
    
    // Close menu when clicking on backdrop
    if (backdrop) {
      backdrop.addEventListener('click', function() {
        body.classList.remove('mobile-nav-active');
        header.classList.remove('header-show');
        
        // Reset toggle icon
        if (mobileNavToggle) {
          mobileNavToggle.classList.add('bi-list');
          mobileNavToggle.classList.remove('bi-x');
        }
      });
    }
    
    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 1200) {
          body.classList.remove('mobile-nav-active');
          header.classList.remove('header-show');
          
          // Reset toggle icon
          if (mobileNavToggle) {
            mobileNavToggle.classList.add('bi-list');
            mobileNavToggle.classList.remove('bi-x');
          }
        }
      });
    });
    
    // Close mobile navigation when window is resized to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1199) {
        body.classList.remove('mobile-nav-active');
        header.classList.remove('header-show');
        
        // Reset toggle icon
        if (mobileNavToggle) {
          mobileNavToggle.classList.add('bi-list');
          mobileNavToggle.classList.remove('bi-x');
        }
      }
    });

    // Typing animation
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
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

    // Free Audit Form - Simple Calendly Redirect
    const auditForm = document.getElementById('auditForm');
    if (auditForm) {
      auditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        window.open("https://calendly.com/jacobdavis-activ3websolutions/30min", "_blank");
        document.getElementById('auditModal').style.display = 'none';
      });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function() {
        const submitBtn = document.querySelector('#contact-form button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending...';
        }
      });
    }

    // Modal functionality
    const auditButton = document.getElementById('auditButton');
    const auditModal = document.getElementById('auditModal');
    const closeModal = document.getElementById('closeModal');
    
    if (auditButton && auditModal && closeModal) {
      auditButton.addEventListener('click', function() {
        auditModal.style.display = 'block';
      });
      
      closeModal.addEventListener('click', function() {
        auditModal.style.display = 'none';
      });
      
      window.addEventListener('click', function(event) {
        if (event.target === auditModal) {
          auditModal.style.display = 'none';
        }
      });
    }
  });

})();
