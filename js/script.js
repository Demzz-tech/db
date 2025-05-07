// Main JavaScript file for DevBlaze website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initBackToTop();
    initFaqAccordion();
    initServiceItems();
    initAnimations();
    initScrollForMore();
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle (for responsive design)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentLocation.includes(href) && href !== '#' && href !== '') {
            item.classList.add('active');
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const dropdowns = document.querySelectorAll('.dropdown');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle dropdowns in mobile view
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button functionality
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle active class on the clicked item
                item.classList.toggle('active');
                
                // Close other items (optional - for accordion behavior)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

// Service items interaction
function initServiceItems() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle expanded state for service items
            this.classList.toggle('expanded');
        });
    });
}

// Animations for elements as they come into view
function initAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally stop observing the element after it's animated
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            element.classList.add('animated');
        });
    }
    
    // Add animation classes to elements
    document.querySelectorAll('.hero-content').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    document.querySelectorAll('.service-item, .project-item, .team-member, .testimonial-item, .blog-post').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
}

// Form validation for contact form
function validateForm(formId) {
    const form = document.getElementById(formId);
    
    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            } else {
                // For demo purposes, prevent actual form submission and show success message
                e.preventDefault();
                alert('Form submitted successfully! (This is a demo message)');
                form.reset();
            }
        });
    }
}

// Initialize form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
    validateForm('contactForm');
});

// Testimonial slider functionality (if needed)
function initTestimonialSlider() {
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalSlides = testimonials.length;
    
    if (testimonials.length > 0) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show a specific slide
        function showSlide(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
                testimonial.classList.toggle('active', i === index);
            });
        }
        
        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }
        
        // Add navigation buttons if needed
        const sliderContainer = testimonials[0].parentElement;
        
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-nav prev';
        prevButton.innerHTML = '&lt;';
        prevButton.addEventListener('click', prevSlide);
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slider-nav next';
        nextButton.innerHTML = '&gt;';
        nextButton.addEventListener('click', nextSlide);
        
        sliderContainer.appendChild(prevButton);
        sliderContainer.appendChild(nextButton);
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
}

// Call this function if the site has a testimonial slider
// document.addEventListener('DOMContentLoaded', initTestimonialSlider);

// Project filtering functionality (if needed)
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter button');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide projects based on filter
                projectItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

// Call this function if the site has project filtering
// document.addEventListener('DOMContentLoaded', initProjectFilters);

// Parallax effect removed to fix black line scrolling glitch
function initParallaxEffect() {
    // Function intentionally left empty to prevent the black line scrolling glitch
    // Original code was modifying backgroundPositionY on scroll which caused the issue
}

// Call to initParallaxEffect removed to fix black line scrolling glitch
// document.addEventListener('DOMContentLoaded', initParallaxEffect);

// Counter animation for stats section
function initCounterAnimation() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    if (statItems.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.innerText);
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const interval = duration / countTo;
                    
                    const counter = setInterval(() => {
                        count++;
                        target.innerText = count;
                        
                        if (count >= countTo) {
                            clearInterval(counter);
                            target.innerText = countTo;
                        }
                    }, interval);
                    
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statItems.forEach(item => {
            // Store the target number and set initial value to 0
            const targetNumber = item.innerText;
            item.setAttribute('data-target', targetNumber);
            item.innerText = '0';
            
            observer.observe(item);
        });
    }
}

// Call this function to enable counter animation
document.addEventListener('DOMContentLoaded', initCounterAnimation);

// Initialize scroll for more functionality
function initScrollForMore() {
    const scrollText = document.querySelector('.scroll-text');
    if (scrollText) {
        scrollText.addEventListener('click', function(e) {
            e.preventDefault();
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}
