(function() {
    'use strict';

    // Nav scroll
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

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const t = document.querySelector(id);
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // Sticky mobile CTA
    const stickyCta = document.getElementById('stickyCta');
    const heroEl = document.querySelector('.hero');
    const contactEl = document.getElementById('contact');
    if (stickyCta && heroEl) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
            const contactTop = contactEl ? contactEl.offsetTop - window.innerHeight : Infinity;
            if (window.scrollY > heroBottom && window.scrollY < contactTop) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        }, { passive: true });
    }

    // Animated stat counters
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;
        statNums.forEach(el => {
            const target = parseFloat(el.dataset.target);
            const isDecimal = target % 1 !== 0;
            const prefix = el.textContent.startsWith('$') ? '$' : '';
            const suffix = el.textContent.includes('+') ? '+' : '';
            const unit = el.textContent.match(/[A-Z]+/)?.[0] || '';
            const duration = 1800;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                const current = target * eased;
                el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + unit + suffix;
                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        });
    }

    // Intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger stat animation when trust bar is visible
                if (entry.target.closest('.trust-bar')) animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    // Elements to animate
    const animateSelectors = [
        '.section-label', '.section-title',
        '.work-card', '.service-row', '.process-step',
        '.about-content', '.about-image',
        '.testimonial-card', '.contact-text', '.contact-form',
        '.pull-quote', '.stat', '.faq-item',
        '.lead-magnet-text', '.lead-magnet-form'
    ];

    animateSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('fade-up');
            observer.observe(el);
        });
    });

    // Stagger children within grids
    document.querySelectorAll('.work-grid, .services-list, .process-grid, .testimonial-grid, .trust-stats, .faq-list').forEach(container => {
        container.querySelectorAll('.fade-up').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.07}s`;
        });
    });

})();
