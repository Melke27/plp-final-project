/**
 * Enhanced About Page JavaScript
 * Provides interactive animations and enhanced user experience
 */

class AboutPageEnhancer {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAnimations();
        this.initializeCounters();
        this.setupScrollEffects();
        this.initializeTimeline();
        this.setupParallaxEffects();
    }

    init() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });
        }

        this.initializeElements();
        this.setupIntersectionObserver();
    }

    initializeElements() {
        this.elements = {
            heroStats: document.querySelectorAll('.hero-stat .stat-number'),
            impactNumbers: document.querySelectorAll('.impact-number'),
            timelineItems: document.querySelectorAll('.timeline-item'),
            countryCards: document.querySelectorAll('.country-card'),
            techLayers: document.querySelectorAll('.tech-layer'),
            skillTags: document.querySelectorAll('.skill-tag'),
            socialLinks: document.querySelectorAll('.social-link'),
            valueItems: document.querySelectorAll('.value-item'),
            techFeatures: document.querySelectorAll('.tech-feature')
        };
    }

    setupEventListeners() {
        // Skill tag hover effects
        this.elements.skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', this.handleSkillTagHover.bind(this));
            tag.addEventListener('mouseleave', this.handleSkillTagLeave.bind(this));
        });

        // Country card interactions
        this.elements.countryCards.forEach(card => {
            card.addEventListener('click', this.handleCountryCardClick.bind(this));
            card.addEventListener('mouseenter', this.handleCountryCardHover.bind(this));
        });

        // Tech layer interactions
        this.elements.techLayers.forEach(layer => {
            layer.addEventListener('mouseenter', this.handleTechLayerHover.bind(this));
            layer.addEventListener('mouseleave', this.handleTechLayerLeave.bind(this));
        });

        // Social link hover effects
        this.elements.socialLinks.forEach(link => {
            link.addEventListener('mouseenter', this.handleSocialLinkHover.bind(this));
        });

        // Value item interactions
        this.elements.valueItems.forEach(item => {
            item.addEventListener('click', this.handleValueItemClick.bind(this));
        });

        // Smooth scrolling for internal links
        document.addEventListener('click', this.handleSmoothScroll.bind(this));

        // Window resize handler
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Scroll handler for parallax effects
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    }

    startAnimations() {
        // Start hero animations
        this.animateHeroContent();
        
        // Start continuous animations
        this.startContinuousAnimations();

        // Animate elements on page load
        setTimeout(() => {
            document.querySelectorAll('.fade-in-up').forEach((el, index) => {
                el.style.animationDelay = `${index * 0.1}s`;
                el.classList.add('animate-in');
            });
        }, 300);
    }

    animateHeroContent() {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroStats = document.querySelector('.hero-stats');

        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s ease-out';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 200);
        }

        if (heroDescription) {
            heroDescription.style.opacity = '0';
            heroDescription.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroDescription.style.transition = 'all 0.8s ease-out';
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 400);
        }

        if (heroStats) {
            heroStats.style.opacity = '0';
            heroStats.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroStats.style.transition = 'all 0.8s ease-out';
                heroStats.style.opacity = '1';
                heroStats.style.transform = 'translateY(0)';
            }, 600);
        }
    }

    startContinuousAnimations() {
        // Floating animation for developer avatar
        const avatar = document.querySelector('.developer-avatar-large');
        if (avatar) {
            this.startFloatingAnimation(avatar);
        }

        // Rotating animation for impact circle
        const impactCircle = document.querySelector('.impact-circle');
        if (impactCircle) {
            this.startRotatingAnimation(impactCircle);
        }

        // Pulsing animation for tech layers
        this.elements.techLayers.forEach((layer, index) => {
            setTimeout(() => {
                this.startPulsingAnimation(layer);
            }, index * 500);
        });
    }

    initializeCounters() {
        this.setupCounterObserver();
    }

    setupCounterObserver() {
        const counterElements = [...this.elements.heroStats, ...this.elements.impactNumbers];
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, {
            threshold: 0.5
        });

        counterElements.forEach(el => observer.observe(el));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target) || parseInt(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            element.textContent = this.formatNumber(Math.floor(current));
        }, 16);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    setupScrollEffects() {
        this.setupScrollProgressIndicator();
        this.setupScrollTriggeredAnimations();
    }

    setupScrollProgressIndicator() {
        // Create progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        document.body.appendChild(progressBar);

        // Add styles
        const styles = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                z-index: 9999;
                backdrop-filter: blur(10px);
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--primary-blue), var(--primary-teal));
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        
        if (!document.querySelector('#scroll-progress-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'scroll-progress-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    setupScrollTriggeredAnimations() {
        const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            if (el.classList.contains('slide-in-left')) {
                el.style.transform = 'translateX(-50px)';
            } else if (el.classList.contains('slide-in-right')) {
                el.style.transform = 'translateX(50px)';
            }
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });
    }

    initializeTimeline() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.animateTimelineItem(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        this.elements.timelineItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            timelineObserver.observe(item);
        });
    }

    animateTimelineItem(item) {
        const marker = item.querySelector('.timeline-marker');
        const content = item.querySelector('.timeline-content');

        if (marker) {
            setTimeout(() => {
                marker.style.transform = 'scale(1.1)';
                marker.style.background = 'var(--primary-blue)';
                marker.style.color = 'var(--white)';
                
                setTimeout(() => {
                    marker.style.transform = 'scale(1)';
                }, 200);
            }, 300);
        }

        if (content) {
            content.style.transform = 'translateX(10px)';
            setTimeout(() => {
                content.style.transform = 'translateX(0)';
            }, 500);
        }
    }

    setupParallaxEffects() {
        this.parallaxElements = document.querySelectorAll('.parallax-element, .about-hero::before, .impact-circle');
        
        // Initial setup
        this.parallaxElements.forEach(el => {
            el.style.transition = 'transform 0.1s ease-out';
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleElementInView(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe all major sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    handleElementInView(element) {
        // Add entrance animations for sections
        if (!element.classList.contains('animated')) {
            element.classList.add('animated');
            this.triggerSectionAnimation(element);
        }
    }

    triggerSectionAnimation(section) {
        const animatedChildren = section.querySelectorAll('[class*="fade"], [class*="slide"]');
        
        animatedChildren.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translate(0, 0)';
            }, index * 100);
        });
    }

    // Event Handlers
    handleSkillTagHover(e) {
        const tag = e.currentTarget;
        tag.style.transform = 'translateY(-3px) scale(1.05)';
        tag.style.boxShadow = '0 5px 15px rgba(37, 99, 235, 0.3)';
    }

    handleSkillTagLeave(e) {
        const tag = e.currentTarget;
        tag.style.transform = 'translateY(0) scale(1)';
        tag.style.boxShadow = 'none';
    }

    handleCountryCardClick(e) {
        const card = e.currentTarget;
        const country = card.dataset.country;
        
        // Add click animation
        card.style.transform = 'translateY(-15px) scale(1.02)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px) scale(1)';
        }, 150);

        // Show country details (could expand to modal)
        this.showCountryDetails(country, card);
    }

    handleCountryCardHover(e) {
        const card = e.currentTarget;
        const flag = card.querySelector('.country-flag');
        
        if (flag) {
            flag.style.animation = 'wave 0.5s ease-in-out';
            setTimeout(() => {
                flag.style.animation = 'wave 2s ease-in-out infinite';
            }, 500);
        }
    }

    handleTechLayerHover(e) {
        const layer = e.currentTarget;
        layer.style.animationPlayState = 'paused';
        layer.style.transform = 'scale(1.1)';
        layer.style.zIndex = '100';
    }

    handleTechLayerLeave(e) {
        const layer = e.currentTarget;
        layer.style.animationPlayState = 'running';
        layer.style.transform = 'scale(1)';
        layer.style.zIndex = 'auto';
    }

    handleSocialLinkHover(e) {
        const link = e.currentTarget;
        const originalTransform = link.style.transform;
        
        link.style.transform = 'translateY(-8px) scale(1.2) rotate(5deg)';
        
        setTimeout(() => {
            link.style.transform = originalTransform;
        }, 300);
    }

    handleValueItemClick(e) {
        const item = e.currentTarget;
        const icon = item.querySelector('i');
        
        // Add ripple effect
        this.createRippleEffect(item, e);
        
        // Icon animation
        if (icon) {
            icon.style.animation = 'pulse-icon 0.6s ease';
        }
    }

    handleSmoothScroll(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    handleResize() {
        // Recalculate animations and positions
        this.updateParallaxElements();
        
        // Trigger AOS refresh if available
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    handleScroll() {
        // Update scroll progress
        this.updateScrollProgress();
        
        // Update parallax effects
        this.updateParallaxElements();
        
        // Update sticky elements
        this.updateStickyElements();
    }

    // Animation Helpers
    startFloatingAnimation(element) {
        let position = 0;
        const animate = () => {
            position += 0.02;
            element.style.transform = `translateY(${Math.sin(position) * 5}px)`;
            requestAnimationFrame(animate);
        };
        animate();
    }

    startRotatingAnimation(element) {
        let rotation = 0;
        const animate = () => {
            rotation += 0.2;
            element.style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(animate);
        };
        animate();
    }

    startPulsingAnimation(element) {
        let scale = 1;
        let direction = 1;
        
        const animate = () => {
            scale += direction * 0.002;
            if (scale >= 1.05) direction = -1;
            if (scale <= 0.98) direction = 1;
            
            element.style.transform = `scale(${scale})`;
            requestAnimationFrame(animate);
        };
        animate();
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    showCountryDetails(country, card) {
        // Create a detailed view or tooltip
        const stats = card.querySelectorAll('.stat-value');
        const description = card.querySelector('p');
        
        // For now, just highlight the card
        card.classList.add('highlighted');
        setTimeout(() => {
            card.classList.remove('highlighted');
        }, 2000);
        
        console.log(`Showing details for ${country}`);
    }

    updateScrollProgress() {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressFill.style.width = `${Math.min(scrolled, 100)}%`;
        }
    }

    updateParallaxElements() {
        const scrollY = window.scrollY;
        
        this.parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollY * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    updateStickyElements() {
        // Add sticky behavior for navigation or other elements
        const header = document.querySelector('.header');
        if (header) {
            const scrolled = window.scrollY > 100;
            header.classList.toggle('scrolled', scrolled);
        }
    }

    // Utility functions
    debounce(func, wait) {
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

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AboutPageEnhancer();
});

// Add additional CSS animations
const additionalStyles = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .highlighted {
        box-shadow: 0 0 30px rgba(37, 99, 235, 0.5) !important;
        transform: translateY(-15px) scale(1.02) !important;
    }
    
    .header.scrolled {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateX(0) !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject additional styles
if (!document.querySelector('#about-enhanced-additional-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'about-enhanced-additional-styles';
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AboutPageEnhancer;
}
