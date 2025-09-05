// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    initializeCounters();
    initializeCountryCards();
    initializeTimeline();
    initializeTechVisual();
    
    // Add scroll reveal animations
    observeElements();
});

// Animation initialization
function initializeAnimations() {
    // Add animation classes to elements
    const elementsToAnimate = document.querySelectorAll(
        '.fade-in-up, .slide-in-left, .slide-in-right, .fade-in'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = getInitialTransform(element);
    });
}

function getInitialTransform(element) {
    if (element.classList.contains('fade-in-up')) {
        return 'translateY(50px)';
    }
    if (element.classList.contains('slide-in-left')) {
        return 'translateX(-50px)';
    }
    if (element.classList.contains('slide-in-right')) {
        return 'translateX(50px)';
    }
    return 'translateY(20px)';
}

// Counter animation for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .impact-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(counter, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format large numbers
        element.textContent = formatNumber(Math.floor(current));
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Country cards interaction
function initializeCountryCards() {
    const countryCards = document.querySelectorAll('.country-card');
    
    countryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click interaction for more details
        card.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            showCountryDetails(country);
        });
    });
}

function showCountryDetails(country) {
    const countryData = {
        kenya: {
            name: 'Kenya',
            capital: 'Nairobi',
            population: '54.8M',
            clinics: 12,
            served: '45,000',
            specialties: ['Rural Health', 'Maternal Care', 'Emergency Services'],
            challenges: ['Remote accessibility', 'Resource distribution']
        },
        ethiopia: {
            name: 'Ethiopia',
            capital: 'Addis Ababa',
            population: '117.8M',
            clinics: 8,
            served: '32,000',
            specialties: ['Hospital Partnerships', 'Community Health', 'Specialized Care'],
            challenges: ['Infrastructure', 'Rural connectivity']
        },
        uganda: {
            name: 'Uganda',
            capital: 'Kampala',
            population: '46.5M',
            clinics: 6,
            served: '28,000',
            specialties: ['Mobile Clinics', 'Health Education', 'Preventive Care'],
            challenges: ['Geographic barriers', 'Healthcare awareness']
        },
        tanzania: {
            name: 'Tanzania',
            capital: 'Dodoma',
            population: '60.4M',
            clinics: 5,
            served: '22,000',
            specialties: ['Community Outreach', 'Basic Healthcare', 'Disease Prevention'],
            challenges: ['Rural access', 'Health literacy']
        },
        rwanda: {
            name: 'Rwanda',
            capital: 'Kigali',
            population: '13.1M',
            clinics: 4,
            served: '18,000',
            specialties: ['Digital Health', 'Universal Coverage Support', 'Quality Care'],
            challenges: ['Rural integration', 'Technology adoption']
        },
        burundi: {
            name: 'Burundi',
            capital: 'Gitega',
            population: '12.2M',
            clinics: 3,
            served: '12,000',
            specialties: ['Basic Healthcare', 'Emergency Response', 'Health Education'],
            challenges: ['Resource limitations', 'Infrastructure development']
        }
    };
    
    const data = countryData[country];
    if (data) {
        // Create and show modal with country details
        createCountryModal(data);
    }
}

function createCountryModal(data) {
    // Remove existing modal if any
    const existingModal = document.getElementById('country-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'country-modal';
    modal.className = 'country-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${data.name} Healthcare Impact</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="country-details">
                    <div class="detail-item">
                        <strong>Population:</strong> ${data.population}
                    </div>
                    <div class="detail-item">
                        <strong>Active Clinics:</strong> ${data.clinics}
                    </div>
                    <div class="detail-item">
                        <strong>People Served:</strong> ${data.served}
                    </div>
                    <div class="detail-item">
                        <strong>Specialties:</strong>
                        <ul>
                            ${data.specialties.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="detail-item">
                        <strong>Key Challenges:</strong>
                        <ul>
                            ${data.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-overlay"></div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeButton = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    [closeButton, overlay].forEach(element => {
        element.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    // Show modal with animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

// Timeline animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-animate');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Technology visual animation
function initializeTechVisual() {
    const techLayers = document.querySelectorAll('.tech-layer');
    
    techLayers.forEach((layer, index) => {
        layer.addEventListener('mouseenter', function() {
            this.style.transform = `translateY(-10px) rotate(${index * 2}deg)`;
            this.style.zIndex = 10 + index;
        });
        
        layer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.zIndex = 3 - index;
        });
    });
}

// Scroll reveal animation observer
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.classList.contains('delay-1') ? 200 : 
                             element.classList.contains('delay-2') ? 400 : 0;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) translateX(0)';
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const elementsToObserve = document.querySelectorAll(
        '.fade-in-up, .slide-in-left, .slide-in-right, .fade-in'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// Social links interaction
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill tags interaction
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Impact circle animation
const impactCircle = document.querySelector('.impact-circle');
if (impactCircle) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 2s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(impactCircle);
}

// Newsletter form interaction
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            this.reset();
        }, 2000);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Loading state for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 500);
    });
});

// Add dynamic background particles effect to hero section
function createBackgroundParticles() {
    const hero = document.querySelector('.about-hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    hero.appendChild(particlesContainer);
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
createBackgroundParticles();
