document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic with LERP (Linear Interpolation) for smoothness
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursor2X = 0;
    let cursor2Y = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Main cursor follows instantly (or very fast)
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

        // Outer ring follows with smooth drag
        cursor2X += (mouseX - cursor2X) * 0.08;
        cursor2Y += (mouseY - cursor2Y) * 0.08;
        cursor2.style.transform = `translate3d(${cursor2X}px, ${cursor2Y}px, 0)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-content, .skill-tags span, .side-email-btn, .icon-box');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor2.classList.add('active');
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor2.classList.remove('active');
            cursor.classList.remove('active');
        });
    });

    // Initialize Particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }
            }
        },
        "retina_detect": true
    });

    // Advanced Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing if you want animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.animate-fade-up, .section-title, .about-content, .timeline-item, .project-card, .skill-category, .contact-content');

    fadeElements.forEach(el => {
        // No inline opacity needed, CSS handles it
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.background = 'var(--navy-light)';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.7)';
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = `Portfolio Contact from ${name}`;
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

            window.location.href = `mailto:omar.tamer.eng@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`; // No encodeURIComponent for body to keep newlines simple or use it if needed, but simple replacement is often safer for mailto clients. Actually generally safer to encode.
            // Let's use simple logic:
            // window.location.href = `mailto:omar.tamer.eng@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
        });
    }
});
