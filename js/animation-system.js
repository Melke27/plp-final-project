/**
 * HealthConnect Animation System
 * ===============================
 * Professional animation library for smooth user experience
 */

class AnimationSystem {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.setupHoverAnimations();
        this.setupPageTransitions();
        this.setupLoadingAnimations();
        this.bindEvents();
    }

    setupScrollReveal() {
        // Create Intersection Observer for scroll animations
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.revealElement(entry.target);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Add scroll reveal to elements
        const revealElements = document.querySelectorAll(`
            .hero-content,
            .stat-card,
            .feature-card,
            .testimonial-card,
            .clinic-card,
            .developer-showcase,
            .emergency-banner,
            .section-header
        `);

        revealElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = this.getRevealTransform(el);
            el.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
            revealObserver.observe(el);
        });

        this.observers.set('reveal', revealObserver);
    }

    getRevealTransform(element) {
        const animations = [
            'translateY(30px)',
            'translateX(-30px)',
            'translateX(30px)',
            'scale(0.8)',
            'rotateX(15deg)',
            'translateY(20px) scale(0.95)'
        ];
        
        // Assign animation based on element type
        if (element.classList.contains('stat-card')) return 'translateY(40px) scale(0.9)';
        if (element.classList.contains('feature-card')) return 'translateY(30px)';
        if (element.classList.contains('testimonial-card')) return 'translateX(-30px)';
        if (element.classList.contains('clinic-card')) return 'translateY(25px) scale(0.95)';
        
        return animations[Math.floor(Math.random() * animations.length)];
    }

    revealElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0) translateY(0) scale(1) rotateX(0)';
        this.animatedElements.add(element);

        // Add special effects for certain elements
        if (element.classList.contains('hero-content')) {
            this.animateHeroElements();
        }
        
        if (element.classList.contains('stat-card')) {
            this.animateStatNumbers(element);
        }
    }

    animateHeroElements() {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroIllustration = document.querySelector('.hero-illustration');

        if (heroTitle) {
            setTimeout(() => {
                heroTitle.style.animation = 'slideInFromLeft 0.8s ease-out';
            }, 200);
        }

        if (heroDescription) {
            setTimeout(() => {
                heroDescription.style.animation = 'fadeIn 0.8s ease-out';
            }, 400);
        }

        if (heroButtons) {
            setTimeout(() => {
                heroButtons.style.animation = 'slideInFromBottom 0.8s ease-out';
            }, 600);
        }

        if (heroIllustration) {
            setTimeout(() => {
                heroIllustration.style.animation = 'zoomIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }, 800);
        }
    }

    animateStatNumbers(statCard) {
        const numberElement = statCard.querySelector('.stat-number');
        if (!numberElement) return;

        const target = parseInt(numberElement.getAttribute('data-target')) || 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        const animateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth acceleration/deceleration
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentNumber = Math.floor(target * easeOutCubic);
            
            numberElement.textContent = this.formatNumber(currentNumber);
            
            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            }
        };
        
        requestAnimationFrame(animateNumber);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll(`
            .hero::before,
            .developer-showcase::before,
            .stats::before
        `);

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach((el, index) => {
                const speed = 0.3 + (index * 0.1); // Different speeds for variety
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    setupCounterAnimations() {
        // Enhanced counter animation for stats
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    this.animateCounter(entry.target);
                    entry.target.setAttribute('data-animated', 'true');
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-target]').forEach(counter => {
            counterObserver.observe(counter);
        });

        this.observers.set('counter', counterObserver);
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 3000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Advanced easing with multiple phases
            let easeProgress;
            if (progress < 0.5) {
                easeProgress = 2 * progress * progress;
            } else {
                easeProgress = 1 - Math.pow(-2 * progress + 2, 3) / 2;
            }
            
            const currentValue = Math.floor(target * easeProgress);
            element.textContent = this.formatNumber(currentValue);
            
            // Add pulsing effect during animation
            element.style.transform = `scale(${1 + Math.sin(progress * Math.PI) * 0.05})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.transform = 'scale(1)';
            }
        };
        
        requestAnimationFrame(animate);
    }

    setupHoverAnimations() {
        // Enhanced hover animations for interactive elements
        const interactiveElements = document.querySelectorAll(`
            .card,
            .btn,
            .clinic-card,
            .feature-card,
            .testimonial-card,
            .social-links a,
            .nav-link,
            .sidebar-link
        `);

        interactiveElements.forEach(element => {
            this.addAdvancedHoverEffects(element);
        });
    }

    addAdvancedHoverEffects(element) {
        let isHovered = false;

        element.addEventListener('mouseenter', (e) => {
            if (isHovered) return;
            isHovered = true;

            // Add ripple effect
            this.createRippleEffect(e, element);
            
            // Add magnetic effect for buttons
            if (element.classList.contains('btn')) {
                this.addMagneticEffect(element);
            }

            // Add tilt effect for cards
            if (element.classList.contains('card') || 
                element.classList.contains('clinic-card') ||
                element.classList.contains('feature-card')) {
                this.addTiltEffect(element, e);
            }
        });

        element.addEventListener('mouseleave', () => {
            isHovered = false;
            this.removeMagneticEffect(element);
            this.removeTiltEffect(element);
        });

        element.addEventListener('mousemove', (e) => {
            if (isHovered) {
                this.updateTiltEffect(element, e);
                this.updateMagneticEffect(element, e);
            }
        });
    }

    createRippleEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addMagneticEffect(element) {
        element.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    updateMagneticEffect(element, event) {
        if (!element.classList.contains('btn')) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (event.clientX - centerX) * 0.1;
        const deltaY = (event.clientY - centerY) * 0.1;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    }

    removeMagneticEffect(element) {
        element.style.transform = '';
    }

    addTiltEffect(element, event) {
        const rect = element.getBoundingClientRect();
        element.style.transformStyle = 'preserve-3d';
        element.style.transition = 'transform 0.2s ease-out';
    }

    updateTiltEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (event.clientX - centerX) / rect.width;
        const deltaY = (event.clientY - centerY) / rect.height;
        
        const rotateX = deltaY * -10; // Max 10 degrees
        const rotateY = deltaX * 10;
        
        element.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(20px)
        `;
    }

    removeTiltEffect(element) {
        element.style.transform = '';
        element.style.transformStyle = '';
    }

    setupPageTransitions() {
        // Page transition animations
        document.addEventListener('DOMContentLoaded', () => {
            this.animatePageLoad();
        });

        // Smooth page transitions for internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.isInternalLink(link)) {
                this.handlePageTransition(e, link);
            }
        });
    }

    animatePageLoad() {
        // Fade in page content
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            document.body.style.transition = 'all 0.6s ease-out';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);

        // Staggered animation for main sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                section.style.transition = `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }

    isInternalLink(link) {
        const href = link.getAttribute('href');
        return href && href.includes('.html') && !href.startsWith('http');
    }

    handlePageTransition(event, link) {
        if (event.metaKey || event.ctrlKey) return; // Allow opening in new tab
        
        event.preventDefault();
        
        // Fade out effect
        document.body.style.transition = 'opacity 0.3s ease-out';
        document.body.style.opacity = '0.3';
        
        setTimeout(() => {
            window.location.href = link.href;
        }, 150);
    }

    setupLoadingAnimations() {
        // Loading shimmer effects
        const loadingElements = document.querySelectorAll('.loading');
        
        loadingElements.forEach(element => {
            this.addShimmerEffect(element);
        });
    }

    addShimmerEffect(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        const shimmer = document.createElement('div');
        shimmer.className = 'shimmer-overlay';
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 2s infinite;
            pointer-events: none;
        `;
        
        element.appendChild(shimmer);
    }

    // Enhanced micro-interactions
    setupMicroInteractions() {
        // Button press effects
        document.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('btn')) {
                e.target.style.transform = 'scale(0.95)';
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (e.target.classList.contains('btn')) {
                e.target.style.transform = '';
            }
        });

        // Form focus animations
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
            });

            input.addEventListener('blur', (e) => {
                e.target.style.transform = '';
                e.target.style.boxShadow = '';
            });
        });
    }

    // Scroll-triggered animations
    setupScrollTriggers() {
        let ticking = false;

        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Parallax backgrounds
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = element.dataset.speed || 0.5;
                
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });

            // Scale elements on scroll
            const scaleElements = document.querySelectorAll('.scale-on-scroll');
            scaleElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                if (elementTop < windowHeight && elementTop > -elementHeight) {
                    const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / windowHeight));
                    const scale = 0.8 + (progress * 0.2);
                    element.style.transform = `scale(${scale})`;
                }
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
    }

    // Advanced button interactions
    enhanceButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createClickWave(e, button);
            });
        });
    }

    createClickWave(event, button) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const wave = document.createElement('span');
        wave.className = 'click-wave';
        wave.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: translate(-50%, -50%);
            animation: clickWave 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(wave);

        setTimeout(() => wave.remove(), 600);
    }

    // Toast notification system
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getToastIcon(type);
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="toast-content">
                <span>${message}</span>
            </div>
            <button class="toast-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Create toast container if it doesn't exist
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        container.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.removeToast(toast);
        });

        return toast;
    }

    getToastIcon(type) {
        const icons = {
            success: 'check',
            error: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    removeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    // Advanced loading states
    setLoadingState(element, isLoading) {
        if (isLoading) {
            element.classList.add('loading');
            element.style.pointerEvents = 'none';
            
            // Add loading spinner for buttons
            if (element.classList.contains('btn')) {
                const originalText = element.innerHTML;
                element.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Loading...</span>
                `;
                element.setAttribute('data-original-text', originalText);
            }
        } else {
            element.classList.remove('loading');
            element.style.pointerEvents = '';
            
            if (element.classList.contains('btn')) {
                const originalText = element.getAttribute('data-original-text');
                if (originalText) {
                    element.innerHTML = originalText;
                    element.removeAttribute('data-original-text');
                }
            }
        }
    }

    // Staggered list animations
    animateList(listElement, delay = 100) {
        const items = listElement.children;
        
        Array.from(items).forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * delay);
        });
    }

    // Intersection Observer for dynamic loading
    setupDynamicLoading() {
        const loadingObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadContent(entry.target);
                        loadingObserver.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '100px' }
        );

        document.querySelectorAll('[data-lazy-load]').forEach(element => {
            loadingObserver.observe(element);
        });

        this.observers.set('loading', loadingObserver);
    }

    loadContent(element) {
        const loadType = element.getAttribute('data-lazy-load');
        
        switch (loadType) {
            case 'image':
                this.lazyLoadImage(element);
                break;
            case 'section':
                this.lazyLoadSection(element);
                break;
        }
    }

    lazyLoadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.classList.add('fade-in');
        }
    }

    bindEvents() {
        // Enhanced micro-interactions
        this.setupMicroInteractions();
        
        // Scroll triggers
        this.setupScrollTriggers();
        
        // Enhanced buttons
        this.enhanceButtons();
        
        // Dynamic loading
        this.setupDynamicLoading();

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    handleResize() {
        // Recalculate animations on resize
        this.animatedElements.forEach(element => {
            element.style.transform = '';
            element.style.opacity = '1';
        });
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    // Public API
    reveal(element) {
        this.revealElement(element);
    }

    animate(element, animation, duration = 0.6) {
        element.style.animation = `${animation} ${duration}s ease-out`;
        
        return new Promise(resolve => {
            setTimeout(resolve, duration * 1000);
        });
    }

    cleanup() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.animatedElements.clear();
    }
}

// CSS for animations (injected into head)
const animationCSS = `
<style id="animation-system-styles">
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }

    @keyframes clickWave {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }

    .fade-in {
        animation: fadeIn 0.6s ease-out;
    }

    .toast-container {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        pointer-events: none;
    }

    .toast {
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        padding: 16px 20px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        max-width: 500px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: all;
        border-left: 4px solid var(--health-primary);
    }

    .toast.show {
        opacity: 1;
        transform: translateX(0);
    }

    .toast.success {
        border-left-color: var(--health-success);
    }

    .toast.error {
        border-left-color: var(--health-error);
    }

    .toast.warning {
        border-left-color: var(--health-warning);
    }

    .toast-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        flex-shrink: 0;
    }

    .toast.success .toast-icon {
        background: var(--health-success);
    }

    .toast.error .toast-icon {
        background: var(--health-error);
    }

    .toast.warning .toast-icon {
        background: var(--health-warning);
    }

    .toast.info .toast-icon {
        background: var(--health-info);
    }

    .toast-content {
        flex: 1;
        color: var(--gray-700);
        font-size: 14px;
        line-height: 1.4;
    }

    .toast-close {
        background: none;
        border: none;
        color: var(--gray-400);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .toast-close:hover {
        color: var(--gray-600);
        background: var(--gray-100);
    }

    /* Enhanced loading spinner */
    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Improved focus states */
    .focus-visible {
        outline: 2px solid var(--health-primary);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    }

    /* Enhanced hover states for accessibility */
    @media (hover: hover) {
        .hover-lift:hover {
            transform: translateY(-2px);
        }
        
        .hover-grow:hover {
            transform: scale(1.05);
        }
        
        .hover-glow:hover {
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
    }
</style>
`;

// Initialize animation system
document.addEventListener('DOMContentLoaded', () => {
    // Inject animation CSS
    document.head.insertAdjacentHTML('beforeend', animationCSS);
    
    // Initialize animation system
    window.HealthConnectAnimations = new AnimationSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationSystem;
}
