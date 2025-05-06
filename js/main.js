// Main JavaScript for Harsh Mittal's Portfolio

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.menu-toggle') && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });

    // Fade in animations for sections
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s forwards';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Lightsaber animation
    const lightsabers = document.querySelectorAll('.lightsaber');
    
    lightsabers.forEach(saber => {
        saber.style.width = '0';
        
        const saberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        saber.style.transition = 'width 1s ease-in-out';
                        saber.style.width = saber.dataset.width || '100%';
                    }, 300);
                    saberObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        saberObserver.observe(saber);
    });

    // Typing effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Star Wars quote hover effect
    const quotes = document.querySelectorAll('.star-wars-quote');
    
    quotes.forEach(quote => {
        quote.addEventListener('mouseenter', () => {
            quote.style.color = 'var(--primary-color)';
            quote.style.textShadow = '0 0 8px var(--primary-color)';
        });
        
        quote.addEventListener('mouseleave', () => {
            quote.style.color = '';
            quote.style.textShadow = '';
        });
    });

    // Form submission with lightspeed effect
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Visual feedback
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';
            
            // Simulate form submission delay
            setTimeout(() => {
                // Add lightspeed effect to the form
                const form = document.querySelector('.contact-form');
                form.style.transition = 'transform 1s, opacity 1s';
                form.style.transform = 'translateX(100px)';
                form.style.opacity = '0';
                
                // Show success message after animation
                setTimeout(() => {
                    form.innerHTML = `
                        <div class="submission-success">
                            <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                            <h3>Transmission Received!</h3>
                            <p>Thank you for your message. I will respond to your communication shortly.</p>
                            <p class="star-wars-quote">The Force is strong with this one.</p>
                        </div>
                    `;
                    form.style.transform = 'translateX(0)';
                    form.style.opacity = '1';
                }, 1000);
            }, 1500);
        });
    }

    // Create stars dynamically for better effect
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        if (!starsContainer) return;
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Random size
            const size = Math.random() * 2;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            
            // Random twinkle delay
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // Add additional styles for stars
    function addStarStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .star {
                position: absolute;
                background-color: #FFFFFF;
                border-radius: 50%;
                animation: twinkle 4s infinite alternate;
            }
            
            @keyframes twinkle {
                0% { opacity: 0.3; }
                50% { opacity: 1; }
                100% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);
    }
    
    addStarStyles();
    createStars();

    // Parallax effect for the stars
    window.addEventListener('mousemove', (e) => {
        const stars = document.querySelectorAll('.star');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        stars.forEach((star, index) => {
            const depth = index % 5 + 1;
            const moveX = (mouseX * depth) * 2;
            const moveY = (mouseY * depth) * 2;
            
            star.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});

// Easter egg: Konami code to trigger lightsaber sound
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Konami code completed!
                activateLightsaberMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateLightsaberMode() {
        // Create lightsaber sound
        const saberSound = new Audio('https://www.soundjay.com/free-sound-effects-1.html'); // Replace with actual lightsaber sound URL
        saberSound.play();
        
        // Visual effect
        document.body.style.transition = 'box-shadow 0.5s';
        document.body.style.boxShadow = 'inset 0 0 100px var(--secondary-color)';
        
        setTimeout(() => {
            document.body.style.boxShadow = 'none';
        }, 1000);
        
        // Show message
        const message = document.createElement('div');
        message.textContent = 'The Force is now with you!';
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.right = '20px';
        message.style.background = 'rgba(0, 0, 0, 0.8)';
        message.style.color = 'var(--primary-color)';
        message.style.padding = '10px 20px';
        message.style.borderRadius = '4px';
        message.style.fontFamily = "'Pathway Gothic One', sans-serif";
        message.style.zIndex = '9999';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transition = 'opacity 1s';
            message.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 1000);
        }, 3000);
    }
})();