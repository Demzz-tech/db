// Elements to animate on scroll
const scrollElements = {
    common: [
        '.section-header',
        '.navbar',
        '.footer-top',
        '.footer-bottom',
        '.container'
    ],
    home: [
        '.service-item',
        '.about-content',
        '.team-member',
        '.project-item',
        '.testimonial-item',
        '.blog-post',
        '.hero-content',
        '.services-list',
        '.about-stats',
        '.projects-grid',
        '.team-grid',
        '.testimonials-grid',
        '.blog-grid'
    ],
    about: [
        '.about-hero',
        '.story-content',
        '.values-grid',
        '.value-item',
        '.stats-grid',
        '.stats-item'
    ],
    services: [
        '.services-hero',
        '.service-header',
        '.service-description',
        '.process-steps',
        '.process-step',
        '.faq-item'
    ],
    contact: [
        '.contact-hero',
        '.contact-info-cards',
        '.contact-card',
        '.form-container',
        '.form-row',
        '.map-container',
        '.map-placeholder'
    ]
};

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '');
}

// Add scroll-animate class to all elements
function addScrollAnimationClass() {
    const currentPage = getCurrentPage();
    const elementsToAnimate = [...scrollElements.common, ...(scrollElements[currentPage] || [])];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.add('scroll-animate');
        });
    });
}

// Initialize Intersection Observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element comes into view
    });

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
        observer.observe(element);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimationClass();
    initScrollAnimations();
}); 