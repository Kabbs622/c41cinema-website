// Intersection Observer for scroll-triggered reveals
document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll-triggered animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile Navigation
    const navMobile = document.querySelector('.nav-mobile');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;
    
    if (navMobile) {
        navMobile.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            toggleMobileMenu();
        });
    }
    
    function toggleMobileMenu() {
        const spans = navMobile.querySelectorAll('span');
        
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '0';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.bottom = '0';
            navLinks.style.background = 'rgba(10, 10, 10, 0.98)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.justifyContent = 'center';
            navLinks.style.alignItems = 'center';
            navLinks.style.gap = '3rem';
            navLinks.style.zIndex = '999';
            navLinks.style.fontSize = '1.5rem';
            
            // Animate hamburger to X
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            
        } else {
            navLinks.style.display = 'none';
            navLinks.style.position = 'static';
            navLinks.style.background = 'none';
            navLinks.style.backdropFilter = 'none';
            navLinks.style.flexDirection = 'row';
            navLinks.style.gap = '3rem';
            navLinks.style.fontSize = '1rem';
            
            // Reset hamburger
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    }
    
    // Close mobile menu when clicking on links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                toggleMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navMobile.contains(e.target) && !navLinks.contains(e.target)) {
            isMenuOpen = false;
            toggleMobileMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add stagger delay to reveals in same section
    const sections = ['services', 'work', 'process', 'about', 'contact'];
    
    sections.forEach(sectionName => {
        const section = document.querySelector(`.${sectionName}`);
        if (section) {
            const sectionReveals = section.querySelectorAll('.reveal');
            sectionReveals.forEach((element, index) => {
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });
    
    // Hero stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, {
        threshold: 0.5
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    function animateStats() {
        statNumbers.forEach((stat, index) => {
            const finalText = stat.textContent;
            stat.textContent = '';
            
            setTimeout(() => {
                typeText(stat, finalText, 50);
            }, index * 200);
        });
    }
    
    function typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text[i];
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
            }
        }, speed);
    }
    
    // Service hover effects
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const number = item.querySelector('.service-number');
        const originalText = number.textContent;
        
        item.addEventListener('mouseenter', () => {
            number.style.transform = 'scale(1.1) translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            number.style.transform = 'scale(1) translateX(0)';
        });
    });
    
    // Work item parallax effect
    const workItems = document.querySelectorAll('.work-item');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        workItems.forEach((item, index) => {
            const rate = scrolled * -0.5;
            const bgNumber = item.querySelector('.work-bg-number');
            
            if (bgNumber) {
                bgNumber.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    });
    
    // Form enhancements
    const form = document.querySelector('.contact-form');
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    if (form) {
        form.addEventListener('submit', (e) => {
            const submitButton = form.querySelector('.form-submit');
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
        });
    }
    
    // Add loading animation to page
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Resize handler for responsive adjustments
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(() => {
            // Reset mobile menu if window is resized
            if (window.innerWidth > 1024 && isMenuOpen) {
                isMenuOpen = false;
                toggleMobileMenu();
            }
            
            // Recalculate reveal animations
            revealElements.forEach(element => {
                if (element.classList.contains('visible')) {
                    revealObserver.unobserve(element);
                    revealObserver.observe(element);
                }
            });
        }, 250);
    });
    
    // Add subtle cursor movement parallax to hero
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth) - 0.5;
            const yPos = (clientY / innerHeight) - 0.5;
            
            heroContent.style.transform = `translate(${xPos * 10}px, ${yPos * 10}px)`;
        });
        
        hero.addEventListener('mouseleave', () => {
            heroContent.style.transform = 'translate(0, 0)';
        });
    }
    
    // Console message for developers
    console.log('%c C41 Cinema - Premium Website v2.0 ', 'background: #C41230; color: white; font-size: 16px; padding: 10px;');
    console.log('Built with passion. Stories that sell. Results that matter.');
});

// Add custom easing for smooth transitions
document.documentElement.style.setProperty('--ease-out-expo', 'cubic-bezier(0.16, 1, 0.3, 1)');
document.documentElement.style.setProperty('--ease-out-circ', 'cubic-bezier(0.075, 0.82, 0.165, 1)');
document.documentElement.style.setProperty('--ease-in-out-quart', 'cubic-bezier(0.77, 0, 0.175, 1)');

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}