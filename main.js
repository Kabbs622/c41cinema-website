(function() {
    'use strict';

    // Nav scroll effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });

    // Mobile menu
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const t = document.querySelector(id);
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // Scroll-triggered fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-up class to elements and observe them
    const animateSelectors = [
        '.section-header',
        '.work-card',
        '.service-card',
        '.process-step',
        '.about-content',
        '.about-image',
        '.testimonial-card',
        '.contact-text',
        '.contact-form',
        '.inline-quote',
        '.stat'
    ];

    animateSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('fade-up');
            // Stagger siblings
            el.style.transitionDelay = `${i * 0.08}s`;
            observer.observe(el);
        });
    });

    // Reset stagger per group (so each section starts from 0)
    document.querySelectorAll('.work-grid, .services-grid, .process-grid, .testimonial-grid, .trust-stats').forEach(grid => {
        grid.querySelectorAll('.fade-up').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.1}s`;
        });
    });

})();
