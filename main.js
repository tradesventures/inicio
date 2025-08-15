/**
 * ============================================================================
 * MAIN JAVASCRIPT FOR TRADES VENTURES
 * ============================================================================
 * Handles:
 * 1. Fluid particle animation for hero section.
 * 2. Dynamic menu indicator based on scroll position.
 * 3. GSAP scroll-triggered animations for cards.
 * 4. Mobile navigation toggle.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    /**
     * ------------------------------------------------------------------------
     * FLUID PARTICLE ANIMATION (WIND EFFECT)
     * ------------------------------------------------------------------------
     */
    function initFluidParticles(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function setCanvasSize() {
            // Set canvas size based on its parent element to ensure it fills the background
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }
        }
        setCanvasSize();

        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height; // Start at a random height
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 50; // Start from below the screen
                this.size = Math.random() * 1.5 + 0.5;
                this.speedY = -(Math.random() * 0.8 + 0.2); // Move upwards
                this.speedX = (Math.random() - 0.5) * 0.4; // Horizontal drift
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Reset particle if it goes off-screen
                if (this.y < -10) {
                    this.reset();
                    this.y = canvas.height + 10;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(244, 241, 222, ${this.opacity})`; // Beige Arena
                ctx.fill();
            }
        }

        function createParticles() {
            particles = [];
            const particleCount = Math.floor(canvas.width / 18); // Responsive particle count
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        createParticles();

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            setCanvasSize();
            createParticles();
        });
    }

    // Initialize particles only on the hero canvas
    initFluidParticles('hero-particles');

    /**
     * ------------------------------------------------------------------------
     * DYNAMIC MENU INDICATOR
     * ------------------------------------------------------------------------
     */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = 'home'; // Default to home
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) { // 150px offset for better timing
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    /**
     * ------------------------------------------------------------------------
     * GSAP SCROLL-TRIGGERED ANIMATIONS
     * ------------------------------------------------------------------------
     */
    gsap.from(".step-card", {
        scrollTrigger: { trigger: "#how-it-works", start: "top 80%", toggleActions: "play none none none" },
        y: 50, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out",
    });

    gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: "#testimonials", start: "top 80%", toggleActions: "play none none none" },
        y: 50, opacity: 0, duration: 0.6, stagger: 0.2, ease: "power2.out",
    });

    /**
     * ------------------------------------------------------------------------
     * MOBILE NAVIGATION TOGGLE
     * ------------------------------------------------------------------------
     */
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (menuToggle.checked) {
                    menuToggle.checked = false;
                }
            });
        });
    }
});
