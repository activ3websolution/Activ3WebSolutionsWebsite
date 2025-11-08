// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.querySelector('.mobile-nav-backdrop');
    const body = document.body;

    // Toggle mobile navigation
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        backdrop.classList.toggle('active');
        body.classList.toggle('nav-open');
        
        // Toggle icon
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('bi-list');
            icon.classList.add('bi-x');
        } else {
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
        }
    });

    // Close navigation when clicking backdrop
    backdrop.addEventListener('click', function() {
        sidebar.classList.remove('active');
        backdrop.classList.remove('active');
        body.classList.remove('nav-open');
        
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('bi-x');
        icon.classList.add('bi-list');
    });

    // Close navigation when clicking nav links (mobile only)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1199) {
                sidebar.classList.remove('active');
                backdrop.classList.remove('active');
                body.classList.remove('nav-open');
                
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('bi-x');
                icon.classList.add('bi-list');
            }
        });
    });

    // Close mobile nav on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1199) {
            sidebar.classList.remove('active');
            backdrop.classList.remove('active');
            body.classList.remove('nav-open');
            
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('bi-x');
            icon.classList.add('bi-list');
        }
    });
});

// Typing Animation for Hero Section
(function initTyping() {
    function startTyping() {
        const typedTextElement = document.getElementById('typed-text');
        if (!typedTextElement) return;

        const words = ['Websites', 'SEO', 'Hosting & Maintenance'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        // Smoother, more natural cadence with slight random variance
        const typeSpeedBase = 90;      // ms per char when typing
        const deleteSpeedBase = 70;    // ms per char when deleting
        const variance = 60;           // add up to ~60ms variance for natural feel
        const pauseTime = 1400;        // dwell on full word before deleting

        function typeWriter() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, Math.max(0, charIndex - 1));
                charIndex = Math.max(0, charIndex - 1);
            } else {
                typedTextElement.textContent = currentWord.substring(0, Math.min(currentWord.length, charIndex + 1));
                charIndex = Math.min(currentWord.length, charIndex + 1);
            }

            // Calculate next frame delay with variance for smoothness
            let nextTimeout = (isDeleting ? deleteSpeedBase : typeSpeedBase) + Math.floor(Math.random() * variance);

            if (!isDeleting && charIndex === currentWord.length) {
                // Pause briefly on the full word
                nextTimeout = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word and give a slight pause before typing
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                nextTimeout = 500;
            }

            setTimeout(typeWriter, nextTimeout);
        }

        // Start the animation
        typeWriter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startTyping);
    } else {
        startTyping();
    }
})();

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                const sidebarWidth = window.innerWidth > 1199 ? 280 : 0;
                
                window.scrollTo({
                    top: offsetTop - 80,
                    left: sidebarWidth,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            if (btnLoader) {
                btnLoader.style.display = 'block';
            }
            
            // Create FormData object
            const formData = new FormData(this);
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
                if (btnLoader) {
                    btnLoader.style.display = 'none';
                }
            });
        });
    }
    
    // Show message function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-${type}`;
        messageDiv.textContent = message;
        
        // Insert message before form
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageDiv, form);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Add scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .portfolio-card, .feature-card, .testimonial-card, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Active navigation highlight
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('btn-primary') && !this.disabled) {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateInput(this);
                }
            });
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
        
        return isValid;
    }
});

// Add CSS for ripple effect and form validation
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group input.valid,
    .form-group textarea.valid {
        border-color: #28a745;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }
    
    .form-group input.invalid,
    .form-group textarea.invalid {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
`;
document.head.appendChild(style);