// Main JavaScript for Harsh Mittal's Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active') && !nav.contains(e.target) && e.target !== menuToggle) {
            nav.classList.remove('active');
        }
    });
    
    // Fade-in animations for sections
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            // Set initial state
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        fadeElements.forEach(element => {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        });
    }
    
    // Animated typing effect for the home page
    const animateTypingEffect = () => {
        const homeSection = document.getElementById('home');
        if (!homeSection) return;
        
        const tagline = homeSection.querySelector('.tagline');
        if (!tagline) return;
        
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeChar = () => {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeChar, 100);
            }
        };
        
        setTimeout(typeChar, 1000);
    };
    
    // Initial call for typing effect
    animateTypingEffect();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if ((currentPage === '' && linkPage === 'index.html') || linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        });
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Form validation for the contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                highlightInvalidField(nameInput);
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    highlightInvalidField(emailInput);
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                highlightInvalidField(messageInput);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    function highlightInvalidField(field) {
        field.style.borderColor = '#ff6b6b';
        field.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.2)';
        
        field.addEventListener('input', function removeHighlight() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
            this.removeEventListener('input', removeHighlight);
        });
    }
});