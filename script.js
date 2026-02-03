const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isMobileViewport = window.matchMedia('(max-width: 768px)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const shouldReduceMotion = isTouchDevice || isMobileViewport || prefersReducedMotion;
const PASSIVE_SCROLL = { passive: true };

if (isTouchDevice) {
    document.body.classList.add('touch-device');
}

// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    // Keep first paint quick on mobile/touch devices.
    const hideDelay = shouldReduceMotion ? 250 : 700;
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, hideDelay);
});

// ===== Initialize AOS Animation =====
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: shouldReduceMotion
    });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (!header) return;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}, PASSIVE_SCROLL);

// ===== Mobile Menu =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: shouldReduceMotion ? 'auto' : 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, PASSIVE_SCROLL);

// ===== Back to Top Button =====
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;

    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}, PASSIVE_SCROLL);

    if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: shouldReduceMotion ? 'auto' : 'smooth'
        });
    });
}

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number[data-count]');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== Testimonials Slider =====
const testimonialSlider = document.querySelector('.testimonials-track');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;

if (testimonialSlider && window.innerWidth <= 768) {
    const updateSlider = () => {
        const cards = testimonialSlider.querySelectorAll('.testimonial-card');
        const cardWidth = cards[0].offsetWidth + 32; // including gap
        testimonialSlider.style.transform = `translateX(${currentSlide * cardWidth}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const cards = testimonialSlider.querySelectorAll('.testimonial-card');
            currentSlide = (currentSlide + 1) % cards.length;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const cards = testimonialSlider.querySelectorAll('.testimonial-card');
            currentSlide = (currentSlide - 1 + cards.length) % cards.length;
            updateSlider();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
}

// ===== Form Validation =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Simple validation
        if (!name || !phone || !email) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }
        
        // Success
        showNotification('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.', 'success');
        contactForm.reset();
    });
}

// ===== Notification Function =====
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.95rem;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.getElementById('notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== Play Button Click Handler =====
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        showNotification('سيتم إضافة الفيديو قريباً', 'success');
    });
});

// ===== Parallax Effect for Hero =====
const heroSection = document.querySelector('.hero');
const heroShapes = document.querySelectorAll('.hero-shape');

window.addEventListener('scroll', () => {
    if (!shouldReduceMotion && heroSection && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}, PASSIVE_SCROLL);

// ===== Feature Items Hover Effect =====
const featureItems = document.querySelectorAll('.feature-item');

if (!isTouchDevice) {
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ===== Service Cards Hover Effect =====
const serviceCards = document.querySelectorAll('.service-card');

if (!isTouchDevice) {
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            serviceCards.forEach(c => c.style.opacity = '0.7');
            this.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            serviceCards.forEach(c => c.style.opacity = '1');
        });
    });
}

// ===== Platform Cards Animation =====
const platformCards = document.querySelectorAll('.platform-card');

platformCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===== Typing Effect for Hero Title =====
const heroTitle = document.querySelector('.hero-title');

if (heroTitle && window.innerWidth > 768) {
    const originalText = heroTitle.innerHTML;
    // Keep the original text without typing effect for simplicity
}

// ===== Lazy Loading Images =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

// ===== Chart Animation =====
const chartBars = document.querySelectorAll('.chart-bars .bar');

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            chartBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, index * 100);
            });
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const chartContainer = document.querySelector('.chart-placeholder');
if (chartContainer) {
    chartBars.forEach(bar => {
        bar.style.transformOrigin = 'bottom';
        bar.style.transform = 'scaleY(0)';
        bar.style.transition = 'transform 0.5s ease';
    });
    chartObserver.observe(chartContainer);
}

// ===== Problem Tags Random Rotation =====
const problemTags = document.querySelectorAll('.problem-tag');

if (!shouldReduceMotion) {
    problemTags.forEach(tag => {
        const rotation = (Math.random() - 0.5) * 6;
        tag.style.transform = `rotate(${rotation}deg)`;
    });
}

// ===== Resize Handler =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize AOS on resize
        if (window.AOS && !shouldReduceMotion) {
            AOS.refresh();
        }
    }, 250);
});

// ===== Prevent iOS Zoom on Input Focus =====
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.fontSize = '16px';
    });
}

// ===== Console Message =====
console.log('%c🚀 Tashweesh Agency Website', 'font-size: 24px; font-weight: bold; color: #1a3a5c;');
console.log('%c نساعد المتاجر الإلكترونية في سلطنة عمان تبيع بالملايين شهرياً', 'font-size: 14px; color: #64748b;');
