document.addEventListener("DOMContentLoaded", () => {
    // **Loader**
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.display = 'none';
        });
    }

    // **Smooth scrolling**
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // **Mobile menu toggle**
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav ul");

    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            nav.classList.toggle("active");
        });

        document.querySelectorAll("nav ul li a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                nav.classList.remove("active");
            });
        });
    }

    // **Throttled Sticky Header**
    const header = document.querySelector("header");
    let lastScrollY = 0;
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                if (window.scrollY > lastScrollY) {
                    header.classList.add("sticky");
                } else {
                    header.classList.remove("sticky");
                }
            }
            lastScrollY = window.scrollY;
        }, { passive: true });
    }

    // **Hero section animation**
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('active');
        }, 250);
    }

    // **Parallax Effect for Hero Background**
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                heroBackground.style.transform = `translateY(${window.pageYOffset * 0.3}px)`;
            });
        }, { passive: true });
    }

    // **Optimized Animated Counter**
    const counters = document.querySelectorAll('.stat-number');
    const counterSection = document.querySelector('.stats');
    if (counterSection && counters.length > 0) {
        let started = false;

        const animateCounter = () => {
            counters.forEach(counter => {
                let target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = Math.ceil(target / 120);

                const updateCount = () => {
                    count += increment;
                    counter.innerText = count > target ? target : count;
                    if (count < target) requestAnimationFrame(updateCount);
                };

                updateCount();
            });
        };

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !started) {
                animateCounter();
                started = true;
            }
        }, { threshold: 0.5 });

        observer.observe(counterSection);
    }

    // **Optimized Staff Carousel**
    let slideIndex = 1;
    const slides = document.getElementsByClassName("staff-slide");

    if (slides.length > 0) {
        const showSlides = (n) => {
            slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;
            Array.from(slides).forEach(slide => slide.classList.remove("active"));
            slides[slideIndex - 1].classList.add("active");
        };

        showSlides(slideIndex);

        let autoSlideInterval = setInterval(() => showSlides(slideIndex += 1), 5000);

        const staffCarousel = document.querySelector('.staff-carousel');
        if (staffCarousel) {
            staffCarousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            staffCarousel.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => showSlides(slideIndex += 1), 5000);
            });
        }
    }

    // **Lazy Loading Images**
    document.querySelectorAll("img").forEach(img => img.setAttribute("loading", "lazy"));

    // **Initialize AOS (Animate on Scroll)**
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 700, once: true });
    }

    // **Form Submission Placeholder**
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert('Form submitted! (This is a placeholder, replace with your own form handling logic)');
            form.reset();
        });
    }

    // **Optimized Logo Click Redirect**
    const logoLink = document.querySelector(".logo a");
    if (logoLink) {
        logoLink.addEventListener("click", e => {
            e.preventDefault();
            window.location.href = "/";
        });
    }
});
