// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const header = document.querySelector('header');
const filterBtns = document.querySelectorAll('.filter-btn');
const newsletterForm = document.getElementById('newsletterForm');
const currentYear = document.getElementById('currentYear');
const backToTopBtn = document.getElementById('backToTop');
const pageLoader = document.querySelector('.page-loader');

// Gallery Data - Sorted by category and file number for easy editing
const galleryImages = [
    // Bridal Makeup Images
    { id: 1, src: "bridal/01.jpg", category: "bridal", title: "Elegant Bridal Look", desc: "Soft romantic makeup for a spring wedding" },
    { id: 2, src: "bridal/02.jpg", category: "bridal", title: "Natural Bridal Makeup", desc: "Minimalist beauty for a beach wedding" },
    { id: 3, src: "bridal/03.jpg", category: "bridal", title: "Classic Bridal Style", desc: "Timeless beauty for a traditional wedding" },
    { id: 4, src: "bridal/04.jpg", category: "bridal", title: "Soft Bridal Glam", desc: "Ethereal look for a garden wedding" },
 //   { id: 5, src: "bridal/05.jpg", category: "bridal", title: "Modern Bridal Makeup", desc: "Contemporary bridal look with a twist" },
   // { id: 6, src: "bridal/06.jpg", category: "bridal", title: "Vintage Bridal Style", desc: "Retro-inspired bridal makeup" },
    
    // Event Makeup Images
    { id: 7, src: "events/01.jpg", category: "events", title: "Special Event Makeup", desc: "Glamorous look for a gala event" },
    { id: 8, src: "events/02.jpg", category: "events", title: "Evening Glamour", desc: "Sophisticated look for an evening event" },
    { id: 9, src: "events/03.jpg", category: "events", title: "Party Makeup", desc: "Festive look for celebrations" },
    { id: 10, src: "events/04.jpg", category: "events", title: "Formal Event Makeup", desc: "Elegant makeup for corporate events" },
  //  { id: 11, src: "events/05.jpg", category: "events", title: "Red Carpet Look", desc: "Celebrity-inspired makeup for special occasions" },
    { id: 12, src: "events/06.jpg", category: "events", title: "Night Out Makeup", desc: "Trendy look for social gatherings" },
    
    // Additional categories can be added here in the future
    // Example structure for new categories:
    // { id: 13, src: "newcategory/01.jpg", category: "newcategory", title: "Title", desc: "Description" },
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize page loader
    initPageLoader();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize gallery
    if (document.getElementById('homeGallery')) {
        loadGalleryPreview();
    }
    
    if (document.getElementById('galleryGrid')) {
        initGalleryPage();
    }
    
    // Initialize forms
    initForms();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize hero particles
    initHeroParticles();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize lazy loading for images
    initLazyLoading();
});

// Page Loader - Updated for Image Logo
function initPageLoader() {
    if (!pageLoader) return;
    
    // Preload logo images to ensure they're ready
    const logoImg = document.querySelector('.loader-logo img');
    
    const hideLoader = () => {
        setTimeout(() => {
            pageLoader.classList.add('fade-out');
            
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 800);
        }, 1000);
    };
    
    if (logoImg) {
        // If image is already loaded (cached)
        if (logoImg.complete) {
            hideLoader();
        } else {
            // Wait for image to load
            logoImg.onload = hideLoader;
            logoImg.onerror = hideLoader; // Fallback if image fails to load
        }
    } else {
        // Fallback if no image
        hideLoader();
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    if (!mobileMenuBtn || !mobileNav) return;
    
    mobileMenuBtn.addEventListener('click', toggleMobileNav);
    mobileNavClose.addEventListener('click', closeMobileNav);
    
    // Close mobile nav when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
}

function toggleMobileNav() {
    mobileNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Prevent body scroll when mobile nav is open
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    } else {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }
}

function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
}

// Header Scroll Effect
function initHeaderScroll() {
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Load Gallery Preview on Homepage
function loadGalleryPreview() {
    const homeGallery = document.getElementById('homeGallery');
    if (!homeGallery) return;
    
    // Show only 4 images on homepage - mix of categories
    const previewImages = [
        galleryImages[0],  // First bridal
        galleryImages[6],  // First event
        galleryImages[2],  // Another bridal
        galleryImages[7]   // Another event
    ];
    
    previewImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        homeGallery.appendChild(galleryItem);
    });
}

// Initialize Gallery Page
function initGalleryPage() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    // Load all images initially
    loadGallery('all');
    
    // Filter buttons functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter gallery
            const filter = this.getAttribute('data-filter');
            loadGallery(filter);
        });
    });
}

// Load Gallery with Filter
function loadGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    const filteredImages = filter === 'all' 
        ? galleryImages 
        : galleryImages.filter(image => image.category === filter);
    
    filteredImages.forEach((image, index) => {
        const galleryItem = createGalleryItem(image, index);
        galleryGrid.appendChild(galleryItem);
    });
}

// Create Gallery Item
function createGalleryItem(image, index = 0) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', image.category);
    galleryItem.style.animationDelay = `${index * 0.1}s`;
    
    galleryItem.innerHTML = `
        <img src="${image.src}" alt="${image.title}" loading="lazy">
        <div class="gallery-item-overlay">
            <h4>${image.title}</h4>
            <p>${image.desc}</p>
        </div>
    `;
    
    // Add click event to open modal
    galleryItem.addEventListener('click', () => {
        openModal(image.src, image.title, image.desc);
    });
    
    return galleryItem;
}

// Modal functionality
function openModal(src, title, desc = '') {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (!modal || !modalImage) return;
    
    modal.classList.add('active');
    modalImage.src = src;
    modalImage.alt = title;
    
    if (modalCaption && desc) {
        modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    }
    
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking close button or outside the image
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.onclick = () => {
            closeImageModal();
        };
    }
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    };
    
    // Close with ESC key
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeImageModal();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Initialize Forms
function initForms() {
    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Validate email
            if (!isValidEmail(emailInput.value)) {
                showFormMessage(this, 'Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription
            emailInput.style.opacity = '0.7';
            emailInput.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showFormMessage(this, 'Thank you for subscribing! You\'ll receive beauty tips and updates.', 'success');
                this.reset();
                emailInput.style.opacity = '1';
                emailInput.disabled = false;
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Form message display
    function showFormMessage(form, message, type) {
        // Remove existing message
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }
        
        // Create message element
        const msgElement = document.createElement('div');
        msgElement.className = `form-message form-message-${type}`;
        msgElement.textContent = message;
        msgElement.style.cssText = `
            margin-top: 12px;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 0.9rem;
            background-color: ${type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
            color: ${type === 'success' ? '#4caf50' : '#f44336'};
            border: 1px solid ${type === 'success' ? '#4caf50' : '#f44336'};
            text-align: center;
        `;
        
        form.appendChild(msgElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            msgElement.remove();
        }, 5000);
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a link to another page or empty anchor
            if (href === '#' || href.includes('.html')) return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile nav if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    closeMobileNav();
                }
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Hero Particles Effect
function initHeroParticles() {
    const heroParticles = document.getElementById('heroParticles');
    if (!heroParticles || window.innerWidth < 768) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(heroParticles);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background-color: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            z-index: 0;
        `;
        
        container.appendChild(particle);
        
        // Animate particle
        animateParticle(particle);
    }
    
    function animateParticle(element) {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        element.animate([
            { 
                transform: `translate(${startX}vw, ${startY}vh)`,
                opacity: 0
            },
            { 
                transform: `translate(${startX + Math.random() * 15 - 7.5}vw, ${startY + Math.random() * 15 - 7.5}vh)`,
                opacity: 0.5
            },
            { 
                transform: `translate(${startX}vw, ${startY}vh)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            iterations: Infinity
        });
    }
}

// Testimonial Slider - FIXED VERSION
function initTestimonialSlider() {
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!testimonialPrev || !testimonialNext || testimonialCards.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;
    
    function updateSlider() {
        // Hide all slides
        testimonialCards.forEach((card, index) => {
            card.classList.remove('active');
            card.style.opacity = '0';
            card.style.transform = 'translateX(100%)';
            card.style.position = 'absolute';
            card.style.visibility = 'hidden';
            
            // Only for debugging - add index for easier identification
            card.setAttribute('data-slide-index', index);
        });
        
        // Show current slide
        testimonialCards[currentSlide].classList.add('active');
        testimonialCards[currentSlide].style.opacity = '1';
        testimonialCards[currentSlide].style.transform = 'translateX(0)';
        testimonialCards[currentSlide].style.position = 'relative';
        testimonialCards[currentSlide].style.visibility = 'visible';
        
        // Update dots
        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Initialize slider
    if (totalSlides > 1) {
        updateSlider();
        
        // Auto slide every 5 seconds
        let slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
        
        // Previous button
        testimonialPrev.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            // Restart auto-slide
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
        
        // Next button
        testimonialNext.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            // Restart auto-slide
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                currentSlide = index;
                updateSlider();
                // Restart auto-slide
                slideInterval = setInterval(() => {
                    nextSlide();
                }, 5000);
            });
        });
        
        // Pause auto-slide on hover (desktop only)
        if (window.innerWidth > 768) {
            const testimonialsContainer = document.querySelector('.testimonials-slider');
            if (testimonialsContainer) {
                testimonialsContainer.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                testimonialsContainer.addEventListener('mouseleave', () => {
                    slideInterval = setInterval(() => {
                        nextSlide();
                    }, 5000);
                });
            }
        }
        
        // Touch swipe for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const testimonialsContainer = document.querySelector('.testimonials-container');
        
        if (testimonialsContainer && window.innerWidth <= 768) {
            testimonialsContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(slideInterval);
            });
            
            testimonialsContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                slideInterval = setInterval(() => {
                    nextSlide();
                }, 5000);
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - next slide
                nextSlide();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
}

// Lazy Loading for Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Fix for iOS viewport height issue
function fixViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', fixViewportHeight);
fixViewportHeight();

// Add click outside to close mobile menu
document.addEventListener('click', (e) => {
    if (mobileNav && mobileNav.classList.contains('active') && 
        !mobileNav.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        closeMobileNav();
    }
});

// Prevent zoom on double-tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);