// Initialize AOS (Animate On Scroll) Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    }
});

// WhatsApp Integration
function openWhatsApp(message = '') {
    const phoneNumber = '5583318595567'; // Replace with actual phone number
    const defaultMessage = message || 'Olá! Gostaria de saber mais sobre os serviços da Divina Lavanderia.';
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Instagram Integration
function openInstagram() {
    const instagramURL = 'https://instagram.com/divinalavanderia'; // Replace with actual Instagram handle
    window.open(instagramURL, '_blank');
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add click tracking for WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('WhatsApp button clicked');
        });
    });

    // Add click tracking for Instagram buttons
    const instagramButtons = document.querySelectorAll('a[href*="instagram"]');
    instagramButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add analytics tracking here if needed
            console.log('Instagram button clicked');
        });
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Intersection Observer for counter animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
});

// Form validation and WhatsApp integration (if forms are added later)
function validateAndSendWhatsApp(formData) {
    const { name, phone, service, message } = formData;
    
    if (!name || !phone) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }
    
    const whatsappMessage = `
Olá! Gostaria de solicitar um orçamento:

*Nome:* ${name}
*Telefone:* ${phone}
*Serviço:* ${service || 'Não especificado'}
*Mensagem:* ${message || 'Não informado'}

Aguardo retorno. Obrigado!
    `.trim();
    
    openWhatsApp(whatsappMessage);
    return true;
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Scroll to top functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-green);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'var(--light-green)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'var(--accent-green)';
    });
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Mobile menu functionality (if needed for responsive design)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-toggle';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-blue);
        cursor: pointer;
        padding: 10px;
    `;
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            .nav-contact {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .nav-contact.active {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    mobileMenuButton.addEventListener('click', function() {
        const navContact = document.querySelector('.nav-contact');
        navContact.classList.toggle('active');
    });
    
    navbar.appendChild(mobileMenuButton);
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Analytics and tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${eventName}`, eventData);
    
    // Example: Google Analytics 4 event tracking
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel event tracking
    // fbq('track', eventName, eventData);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.whatsapp-btn')) {
        trackEvent('whatsapp_click', {
            button_location: e.target.closest('section')?.className || 'unknown'
        });
    }
    
    if (e.target.closest('.instagram-btn')) {
        trackEvent('instagram_click', {
            button_location: e.target.closest('section')?.className || 'unknown'
        });
    }
    
    if (e.target.closest('.cta-btn')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            button_location: e.target.closest('section')?.className || 'unknown'
        });
    }
});

// Page load performance tracking
window.addEventListener('load', function() {
    const loadTime = performance.now();
    trackEvent('page_load', {
        load_time: Math.round(loadTime),
        page: 'landing_page'
    });
});