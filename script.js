document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const heroCtaBtn = document.getElementById('hero-cta-btn');
    const ctaModalBtn = document.getElementById('cta-modal-btn');
    const modalForm = document.getElementById('modalForm');

    // Open modal functions
    function openModal() {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners for opening modal
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', openModal);
    }
    
    if (ctaModalBtn) {
        ctaModalBtn.addEventListener('click', openModal);
    }

    // Event listeners for closing modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            closeModal();
        }
    });

    // Form submission handling
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(modalForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = modalForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Submit to Formspree (replace with your endpoint)
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                // Show success message
                modalForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <h3 style="color: #4CAF50; margin-bottom: 1rem;">You're In!</h3>
                        <p style="color: #ccc; line-height: 1.6;">
                            Thank you for joining our waitlist. We'll be in touch soon with updates about our SEO + AI Assistants service.
                        </p>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message
                modalForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <h3 style="color: #f44336; margin-bottom: 1rem;">Oops!</h3>
                        <p style="color: #ccc; line-height: 1.6;">
                            Something went wrong. Please try again or contact us directly at hello@pioneerly.com
                        </p>
                        <button onclick="location.reload()" class="cta-button" style="margin-top: 1rem;">Try Again</button>
                    </div>
                `;
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(119, 72, 205, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.benefit-card, .step, .feature-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}); 
