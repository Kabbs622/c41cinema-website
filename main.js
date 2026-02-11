// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .work-card, .process-step');
    animatedElements.forEach(el => observer.observe(el));
});

// Stats counter animation
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        if (element.textContent.includes('M')) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else if (element.textContent.includes('$')) {
            element.textContent = '$' + current + 'M+';
        } else {
            element.textContent = current + '+';
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('$5M+')) {
                    animateCounter(stat, 0, 5000000, 2000);
                } else if (text.includes('9.5M+')) {
                    animateCounter(stat, 0, 9500000, 2000);
                } else if (text.includes('5+')) {
                    animateCounter(stat, 0, 5, 1000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const name = form.querySelector('input[name="name"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const service = form.querySelector('select[name="service"]').value;
            const message = form.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !service || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        });
    }
});

// Add subtle parallax effect to hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation for images when they come into view
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const placeholder = entry.target;
            placeholder.style.animation = 'pulse 2s ease-in-out infinite';
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    const placeholderImages = document.querySelectorAll('.placeholder-image');
    placeholderImages.forEach(img => imageObserver.observe(img));
});

// Add hover sound effects (optional - can be removed if not desired)
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.btn-primary, .nav-cta, .service-card, .work-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Performance optimization: Lazy load animations
function lazyLoadAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight * 1.2) {
            element.classList.add('animate');
        }
    });
}

// Throttle scroll events for better performance
let ticking = false;
function updateOnScroll() {
    lazyLoadAnimations();
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add focus management for accessibility
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Error handling for form submission
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service worker registration for offline functionality (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Future: register service worker for offline functionality
    });
}