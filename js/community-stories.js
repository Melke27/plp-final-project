/**
 * Community Stories Page JavaScript
 * Handles filtering, animations, and story submission
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    initializeCountryFilters();
    initializeStorySubmission();
    initializeStatsCounter();
    initializeLazyLoading();
});

/**
 * Country Filter System
 */
function initializeCountryFilters() {
    const filterButtons = document.querySelectorAll('.country-filter');
    const countrySections = document.querySelectorAll('.country-section');
    const featuredStories = document.querySelectorAll('.featured-story-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedCountry = this.getAttribute('data-country');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter content
            filterStories(selectedCountry, countrySections, featuredStories);
            
            // Add visual feedback
            addFilterAnimation();
        });
    });
}

function filterStories(selectedCountry, countrySections, featuredStories) {
    // Filter country sections
    countrySections.forEach(section => {
        const sectionCountry = section.getAttribute('data-country');
        
        if (selectedCountry === 'all' || sectionCountry === selectedCountry) {
            section.style.display = 'block';
            section.classList.add('filter-fade-in');
        } else {
            section.style.display = 'none';
            section.classList.remove('filter-fade-in');
        }
    });

    // Filter featured stories
    featuredStories.forEach(story => {
        const storyCountry = story.getAttribute('data-country');
        
        if (selectedCountry === 'all' || storyCountry === selectedCountry) {
            story.style.display = 'block';
            story.classList.add('filter-fade-in');
        } else {
            story.style.display = 'none';
            story.classList.remove('filter-fade-in');
        }
    });

    // Update visible count
    updateStoryCount(selectedCountry);
}

function addFilterAnimation() {
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.classList.add('filtering');
    
    setTimeout(() => {
        filterContainer.classList.remove('filtering');
    }, 300);
}

function updateStoryCount(selectedCountry) {
    const countryNames = {
        'all': 'All Countries',
        'ethiopia': 'Ethiopia',
        'kenya': 'Kenya',
        'uganda': 'Uganda',
        'tanzania': 'Tanzania',
        'rwanda': 'Rwanda',
        'burundi': 'Burundi',
        'somalia': 'Somalia',
        'south-sudan': 'South Sudan'
    };

    // You could add a story counter here
    console.log(`Showing stories from: ${countryNames[selectedCountry]}`);
}

/**
 * Story Submission Form
 */
function initializeStorySubmission() {
    const storyForm = document.getElementById('story-submission-form');
    
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleStorySubmission(this);
        });

        // Add real-time validation
        const formInputs = storyForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleStorySubmission(form) {
    // Validate form
    if (!validateStoryForm(form)) {
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const storyData = {
        name: formData.get('name'),
        location: formData.get('location'),
        category: formData.get('category'),
        story: formData.get('story'),
        consent: formData.get('consent'),
        timestamp: new Date().toISOString()
    };

    // Simulate API call
    setTimeout(() => {
        // In a real application, you would send this to your backend
        saveStoryLocally(storyData);
        
        // Show success message
        showStorySubmissionSuccess();
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

function validateStoryForm(form) {
    let isValid = true;
    
    // Name validation
    const name = form.querySelector('#story-name');
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    }

    // Location validation
    const location = form.querySelector('#story-location');
    if (!location.value.trim()) {
        showFieldError(location, 'Location is required');
        isValid = false;
    }

    // Category validation
    const category = form.querySelector('#story-category');
    if (!category.value) {
        showFieldError(category, 'Please select a category');
        isValid = false;
    }

    // Story validation
    const story = form.querySelector('#story-content');
    if (!story.value.trim()) {
        showFieldError(story, 'Please share your story');
        isValid = false;
    } else if (story.value.trim().length < 50) {
        showFieldError(story, 'Story must be at least 50 characters long');
        isValid = false;
    }

    // Consent validation
    const consent = form.querySelector('input[name="consent"]');
    if (!consent.checked) {
        showFieldError(consent, 'Please provide consent to share your story');
        isValid = false;
    }

    return isValid;
}

function validateField(event) {
    const field = event.target;
    clearFieldError(field);

    switch(field.type) {
        case 'text':
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
            }
            break;
        case 'textarea':
            if (!field.value.trim()) {
                showFieldError(field, 'Please share your story');
            } else if (field.value.trim().length < 50) {
                showFieldError(field, 'Story must be at least 50 characters long');
            }
            break;
        case 'select-one':
            if (!field.value) {
                showFieldError(field, 'Please select an option');
            }
            break;
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function saveStoryLocally(storyData) {
    // Save to localStorage for demo purposes
    const existingStories = JSON.parse(localStorage.getItem('communityStories') || '[]');
    existingStories.push(storyData);
    localStorage.setItem('communityStories', JSON.stringify(existingStories));
}

function showStorySubmissionSuccess() {
    const successMessage = createSuccessToast(
        'Thank you for sharing your story! We\'ll review it and may feature it on our platform to inspire others.'
    );
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 6000);
}

/**
 * Stats Counter Animation
 */
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number, .metric-number');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        if (!target) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    };
    
    // Use Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsInSection = entry.target.querySelectorAll('.stat-number, .metric-number');
                statsInSection.forEach(countUp);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections with stats
    document.querySelectorAll('.stories-hero, .stories-impact, .country-stats').forEach(section => {
        statsObserver.observe(section);
    });
}

/**
 * Lazy Loading for Performance
 */
function initializeLazyLoading() {
    const storyCards = document.querySelectorAll('.story-card, .featured-story-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                // You could load more content here if needed
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    storyCards.forEach(card => cardObserver.observe(card));
}

/**
 * Utility Functions
 */

function createSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success story-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    return toast;
}

/**
 * Scroll to Top Functionality
 */
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
addScrollToTop();

/**
 * Story Sharing Functionality
 */
function initializeStorySharing() {
    const storyCards = document.querySelectorAll('.story-card, .featured-story-card');
    
    storyCards.forEach(card => {
        // Add share button to each story
        const shareBtn = document.createElement('button');
        shareBtn.className = 'story-share-btn';
        shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
        shareBtn.title = 'Share this story';
        
        shareBtn.addEventListener('click', () => shareStory(card));
        
        card.appendChild(shareBtn);
    });
}

function shareStory(storyCard) {
    const title = storyCard.querySelector('h4')?.textContent || 'Community Story';
    const author = storyCard.querySelector('.story-author-mini strong')?.textContent || 'Anonymous';
    
    if (navigator.share) {
        navigator.share({
            title: `${title} - HealthConnect`,
            text: `Read this inspiring story from ${author} about healthcare in East Africa.`,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showSuccessMessage('Story link copied to clipboard!');
        });
    }
}

// Initialize sharing after DOM load
document.addEventListener('DOMContentLoaded', initializeStorySharing);

/**
 * Accessibility Enhancements
 */
function enhanceAccessibility() {
    // Add keyboard navigation for filter buttons
    const filterButtons = document.querySelectorAll('.country-filter');
    
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const nextIndex = e.key === 'ArrowRight' ? 
                    (index + 1) % filterButtons.length : 
                    (index - 1 + filterButtons.length) % filterButtons.length;
                
                filterButtons[nextIndex].focus();
                filterButtons[nextIndex].click();
            }
        });
    });
    
    // Add focus indicators
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

/**
 * Performance Monitoring
 */
function logPerformance() {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Community Stories page loaded in ${Math.round(loadTime)}ms`);
        
        // Log animation performance
        const animatedElements = document.querySelectorAll('[data-aos]');
        console.log(`${animatedElements.length} elements with AOS animations`);
    });
}

logPerformance();
