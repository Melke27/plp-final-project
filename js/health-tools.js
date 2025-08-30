/**
 * HealthConnect Platform - Health Tools JavaScript
 * Handles BMI calculator, symptom checker, and other health tools
 */

// Health tips database
const healthTips = [
    "Regular handwashing with soap for 20 seconds can prevent up to 80% of infectious diseases.",
    "Drinking 8-10 glasses of clean water daily helps maintain proper hydration and kidney function.",
    "30 minutes of physical activity 5 times a week can reduce the risk of chronic diseases by 50%.",
    "Eating a variety of colorful fruits and vegetables provides essential vitamins and antioxidants.",
    "Getting 7-9 hours of quality sleep is crucial for immune system function and mental health.",
    "Regular health checkups can detect problems early when they're most treatable.",
    "Avoiding tobacco and limiting alcohol consumption significantly reduces cancer and heart disease risk.",
    "Stress management through meditation or deep breathing can lower blood pressure and improve wellbeing.",
    "Proper food storage and preparation prevents foodborne illnesses and contamination.",
    "Vaccination according to schedule protects against preventable diseases for you and your community.",
    "Using mosquito nets and repellents reduces malaria transmission by up to 90%.",
    "Breastfeeding for the first 6 months provides optimal nutrition and immunity for infants."
];

// Initialize health tools when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeHealthSearch();
    initializeCategoryExpansion();
    generateHealthTip();
});

/**
 * BMI Calculator
 */
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const resultDiv = document.getElementById('bmi-result');
    
    // Validation
    if (!height || !weight || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = `
            <div class="calculator-result danger show">
                <i class="fas fa-exclamation-triangle"></i>
                Please enter valid height and weight values.
            </div>
        `;
        return;
    }
    
    if (height > 300 || weight > 500) {
        resultDiv.innerHTML = `
            <div class="calculator-result danger show">
                <i class="fas fa-exclamation-triangle"></i>
                Please check your values. Height should be in centimeters and weight in kilograms.
            </div>
        `;
        return;
    }
    
    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Determine category and advice
    let category, advice, className;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Consider consulting a healthcare provider about healthy weight gain strategies.';
        className = 'warning';
    } else if (bmi < 25) {
        category = 'Normal weight';
        advice = 'Great! Maintain your current lifestyle with regular exercise and balanced nutrition.';
        className = 'normal';
    } else if (bmi < 30) {
        category = 'Overweight';
        advice = 'Consider lifestyle changes including regular exercise and dietary modifications.';
        className = 'warning';
    } else {
        category = 'Obese';
        advice = 'Please consult with a healthcare provider for a comprehensive health assessment.';
        className = 'danger';
    }
    
    // Display result
    resultDiv.innerHTML = `
        <div class="calculator-result ${className} show">
            <h4>Your BMI: ${bmi.toFixed(1)}</h4>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Recommendation:</strong> ${advice}</p>
            <small>BMI is a general indicator. Consult healthcare providers for personalized advice.</small>
        </div>
    `;
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Symptom Checker
 */
function checkSymptoms() {
    const checkedSymptoms = document.querySelectorAll('.symptom-checkbox:checked');
    const resultDiv = document.getElementById('symptom-result');
    
    if (checkedSymptoms.length === 0) {
        resultDiv.innerHTML = `
            <div class="calculator-result warning show">
                <i class="fas fa-info-circle"></i>
                Please select at least one symptom to check.
            </div>
        `;
        return;
    }
    
    // Analyze symptoms
    let severityScores = {
        mild: 0,
        moderate: 0,
        severe: 0
    };
    
    checkedSymptoms.forEach(checkbox => {
        const severity = checkbox.getAttribute('data-severity');
        severityScores[severity]++;
    });
    
    let recommendation, className, urgency;
    
    if (severityScores.severe > 0) {
        recommendation = 'Seek immediate medical attention. These symptoms may indicate a serious condition requiring urgent care.';
        className = 'danger';
        urgency = 'Emergency';
    } else if (severityScores.moderate > 1 || (severityScores.moderate > 0 && severityScores.mild > 2)) {
        recommendation = 'Schedule an appointment with a healthcare provider within 1-3 days. Monitor symptoms closely.';
        className = 'warning';
        urgency = 'Urgent';
    } else {
        recommendation = 'Monitor your symptoms. If they persist or worsen, consider scheduling a routine appointment.';
        className = 'normal';
        urgency = 'Routine';
    }
    
    const symptomsList = Array.from(checkedSymptoms)
        .map(cb => cb.nextElementSibling.textContent)
        .join(', ');
    
    resultDiv.innerHTML = `
        <div class="calculator-result ${className} show">
            <h4>Symptom Assessment</h4>
            <p><strong>Symptoms:</strong> ${symptomsList}</p>
            <p><strong>Urgency Level:</strong> ${urgency}</p>
            <p><strong>Recommendation:</strong> ${recommendation}</p>
            ${className === 'danger' ? `
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border-radius: 0.5rem;">
                    <strong>Emergency Contacts:</strong><br>
                    General Emergency: 911 or 999<br>
                    Health Emergency: +254 719 000 000
                </div>
            ` : ''}
            <small>This is not a substitute for professional medical advice. Always consult healthcare providers for proper diagnosis.</small>
        </div>
    `;
    
    // If urgent or emergency, suggest booking
    if (className !== 'normal') {
        const bookingBtn = document.createElement('a');
        bookingBtn.href = 'appointment-booking.html';
        bookingBtn.className = 'btn btn-primary';
        bookingBtn.style.marginTop = '1rem';
        bookingBtn.innerHTML = '<i class="fas fa-calendar-plus"></i> Book Appointment Now';
        
        resultDiv.querySelector('.calculator-result').appendChild(bookingBtn);
    }
    
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Generate random health tip
 */
function generateHealthTip() {
    const tipElement = document.getElementById('daily-tip');
    if (tipElement) {
        const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
        tipElement.innerHTML = `<p>"${randomTip}"</p>`;
        
        // Add fade animation
        tipElement.style.opacity = '0';
        setTimeout(() => {
            tipElement.style.transition = 'opacity 0.3s ease';
            tipElement.style.opacity = '1';
        }, 100);
    }
}

/**
 * Health Resource Search
 */
function initializeHealthSearch() {
    const searchInput = document.getElementById('health-search');
    const searchBtn = document.getElementById('search-btn');
    const searchTags = document.querySelectorAll('.search-tag');
    
    if (searchInput && searchBtn) {
        // Search button click
        searchBtn.addEventListener('click', function() {
            performHealthSearch(searchInput.value);
        });
        
        // Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performHealthSearch(this.value);
            }
        });
        
        // Real-time search
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value.length > 2) {
                    performHealthSearch(this.value);
                } else if (this.value.length === 0) {
                    clearSearch();
                }
            }, 300);
        });
    }
    
    // Popular search tags
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.getAttribute('data-search');
            if (searchInput) {
                searchInput.value = searchTerm;
            }
            performHealthSearch(searchTerm);
        });
    });
}

/**
 * Perform health resource search
 */
function performHealthSearch(searchTerm) {
    if (!searchTerm) {
        clearSearch();
        return;
    }
    
    const categories = document.querySelectorAll('.category-card');
    const articles = document.querySelectorAll('.health-article');
    let foundResults = false;
    
    // Search through articles
    articles.forEach(article => {
        const title = article.querySelector('h4').textContent.toLowerCase();
        const content = article.textContent.toLowerCase();
        const category = article.closest('.category-card');
        
        if (title.includes(searchTerm.toLowerCase()) || content.includes(searchTerm.toLowerCase())) {
            // Expand the category
            expandCategory(category);
            
            // Highlight the article
            article.style.background = 'rgba(37, 99, 235, 0.1)';
            article.style.border = '2px solid #2563eb';
            
            foundResults = true;
            
            // Scroll to first result
            if (!document.querySelector('.search-highlighted')) {
                article.classList.add('search-highlighted');
                setTimeout(() => {
                    article.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        } else {
            // Reset highlighting
            article.style.background = '';
            article.style.border = '';
            article.classList.remove('search-highlighted');
        }
    });
    
    // Show search results message
    showSearchResults(searchTerm, foundResults);
}

/**
 * Clear search results
 */
function clearSearch() {
    const articles = document.querySelectorAll('.health-article');
    
    articles.forEach(article => {
        article.style.background = '';
        article.style.border = '';
        article.classList.remove('search-highlighted');
    });
    
    // Hide search message
    const searchMessage = document.querySelector('.search-results-message');
    if (searchMessage) {
        searchMessage.remove();
    }
}

/**
 * Show search results message
 */
function showSearchResults(searchTerm, foundResults) {
    // Remove existing message
    const existingMessage = document.querySelector('.search-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = 'search-results-message';
    
    if (foundResults) {
        message.innerHTML = `
            <div class="search-success">
                <i class="fas fa-search"></i>
                <span>Found health information related to "${searchTerm}"</span>
                <button onclick="clearSearch(); this.parentElement.parentElement.remove();" class="btn btn-outline btn-sm">
                    <i class="fas fa-times"></i> Clear Search
                </button>
            </div>
        `;
    } else {
        message.innerHTML = `
            <div class="search-no-results">
                <i class="fas fa-search"></i>
                <span>No results found for "${searchTerm}". Try different keywords or browse categories below.</span>
                <button onclick="clearSearch(); this.parentElement.parentElement.remove();" class="btn btn-outline btn-sm">
                    <i class="fas fa-times"></i> Clear Search
                </button>
            </div>
        `;
    }
    
    // Insert message
    const searchSection = document.querySelector('.search-section');
    const categoriesSection = document.querySelector('.categories-section');
    
    if (searchSection && categoriesSection) {
        searchSection.parentNode.insertBefore(message, categoriesSection);
    }
    
    // Add styles
    addSearchMessageStyles();
}

/**
 * Add styles for search messages
 */
function addSearchMessageStyles() {
    if (!document.querySelector('.search-message-styles')) {
        const style = document.createElement('style');
        style.className = 'search-message-styles';
        style.textContent = `
            .search-results-message {
                padding: 2rem 0;
                text-align: center;
            }
            
            .search-success,
            .search-no-results {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
                background: white;
                padding: 1rem 2rem;
                border-radius: 0.75rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: 0 auto;
            }
            
            .search-success {
                border-left: 4px solid #10b981;
                color: #059669;
            }
            
            .search-no-results {
                border-left: 4px solid #f59e0b;
                color: #d97706;
            }
            
            .btn-sm {
                padding: 0.375rem 0.75rem;
                font-size: 0.75rem;
            }
            
            @media (max-width: 640px) {
                .search-success,
                .search-no-results {
                    flex-direction: column;
                    gap: 0.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Category expansion functionality
 */
function initializeCategoryExpansion() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const category = this.closest('.category-card');
            
            if (targetContent) {
                toggleCategory(category, targetContent, this);
            }
        });
    });
    
    // Initialize with first category expanded
    const firstCategory = document.querySelector('.category-card');
    if (firstCategory) {
        const firstButton = firstCategory.querySelector('.expand-btn');
        const firstContent = firstCategory.querySelector('.category-content');
        if (firstButton && firstContent) {
            expandCategory(firstCategory, firstContent, firstButton);
        }
    }
}

/**
 * Toggle category expansion
 */
function toggleCategory(category, content, button) {
    const isExpanded = content.classList.contains('expanded');
    
    if (isExpanded) {
        collapseCategory(category, content, button);
    } else {
        expandCategory(category, content, button);
    }
}

/**
 * Expand category
 */
function expandCategory(category, content = null, button = null) {
    if (!content) {
        content = category.querySelector('.category-content');
        button = category.querySelector('.expand-btn');
    }
    
    if (content && button) {
        content.classList.add('expanded');
        content.style.display = 'block';
        button.classList.add('expanded');
        
        // Animate expansion
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        content.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
        }, 10);
        
        // Remove maxHeight after animation
        setTimeout(() => {
            content.style.maxHeight = 'none';
        }, 300);
    }
}

/**
 * Collapse category
 */
function collapseCategory(category, content, button) {
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        content.style.maxHeight = '0';
        content.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        content.classList.remove('expanded');
        content.style.display = 'none';
        button.classList.remove('expanded');
    }, 300);
}

/**
 * Health resource filtering
 */
function filterHealthResources(category) {
    const allCategories = document.querySelectorAll('.category-card');
    
    if (category === 'all') {
        allCategories.forEach(cat => cat.style.display = 'block');
    } else {
        allCategories.forEach(cat => {
            if (cat.id === category) {
                cat.style.display = 'block';
                expandCategory(cat);
            } else {
                cat.style.display = 'none';
            }
        });
    }
}

/**
 * Disease information lookup
 */
const diseaseDatabase = {
    'malaria': {
        symptoms: ['High fever', 'Chills', 'Headache', 'Muscle aches', 'Fatigue'],
        prevention: ['Use mosquito nets', 'Apply repellent', 'Remove standing water', 'Take antimalarial medication if prescribed'],
        treatment: 'Seek immediate medical attention for proper diagnosis and antimalarial medication'
    },
    'diabetes': {
        symptoms: ['Excessive thirst', 'Frequent urination', 'Unexplained weight loss', 'Fatigue', 'Blurred vision'],
        prevention: ['Maintain healthy weight', 'Exercise regularly', 'Eat balanced diet', 'Limit sugar intake'],
        treatment: 'Requires ongoing medical management with medication, diet, and lifestyle changes'
    },
    'hypertension': {
        symptoms: ['Often no symptoms', 'Headaches', 'Shortness of breath', 'Nosebleeds', 'Chest pain'],
        prevention: ['Reduce sodium intake', 'Exercise regularly', 'Maintain healthy weight', 'Limit alcohol', 'Manage stress'],
        treatment: 'Lifestyle changes and medication as prescribed by healthcare provider'
    }
};

/**
 * Quick disease lookup
 */
function lookupDisease(diseaseName) {
    const disease = diseaseDatabase[diseaseName.toLowerCase()];
    
    if (disease) {
        const modal = createDiseaseModal(diseaseName, disease);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => modal.classList.add('show'), 10);
    } else {
        showErrorMessage('Disease information not found. Please contact a healthcare provider for more information.');
    }
}

/**
 * Create disease information modal
 */
function createDiseaseModal(name, data) {
    const modal = document.createElement('div');
    modal.className = 'disease-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${name.charAt(0).toUpperCase() + name.slice(1)} Information</h3>
                <button class="modal-close" onclick="this.closest('.disease-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="disease-section">
                    <h4><i class="fas fa-thermometer-half"></i> Common Symptoms</h4>
                    <ul>
                        ${data.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                    </ul>
                </div>
                <div class="disease-section">
                    <h4><i class="fas fa-shield-alt"></i> Prevention</h4>
                    <ul>
                        ${data.prevention.map(prev => `<li>${prev}</li>`).join('')}
                    </ul>
                </div>
                <div class="disease-section">
                    <h4><i class="fas fa-prescription-bottle-alt"></i> Treatment</h4>
                    <p>${data.treatment}</p>
                </div>
            </div>
            <div class="modal-footer">
                <a href="appointment-booking.html" class="btn btn-primary">Book Consultation</a>
                <button onclick="this.closest('.disease-modal').remove()" class="btn btn-outline">Close</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    addModalStyles();
    
    return modal;
}

/**
 * Add modal styles
 */
function addModalStyles() {
    if (!document.querySelector('.modal-styles')) {
        const style = document.createElement('style');
        style.className = 'modal-styles';
        style.textContent = `
            .disease-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .disease-modal.show {
                opacity: 1;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 1rem;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                width: 90%;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6b7280;
                cursor: pointer;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .disease-section {
                margin-bottom: 1.5rem;
            }
            
            .disease-section h4 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
                color: #2563eb;
            }
            
            .disease-section ul {
                list-style: none;
                padding-left: 0;
            }
            
            .disease-section li {
                padding: 0.5rem 0;
                border-bottom: 1px solid #f3f4f6;
                position: relative;
                padding-left: 1.5rem;
            }
            
            .disease-section li::before {
                content: '•';
                color: #2563eb;
                font-weight: bold;
                position: absolute;
                left: 0;
            }
            
            .modal-footer {
                display: flex;
                gap: 1rem;
                padding: 1.5rem;
                border-top: 1px solid #e5e7eb;
                justify-content: flex-end;
            }
            
            @media (max-width: 640px) {
                .modal-footer {
                    flex-direction: column;
                }
                
                .modal-footer .btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Health tips recommendation based on user input
 */
function getPersonalizedTips(userProfile) {
    const tips = [];
    
    if (userProfile.age < 18) {
        tips.push("Ensure regular vaccinations according to the childhood immunization schedule");
        tips.push("Encourage physical activity and limit screen time for healthy development");
    } else if (userProfile.age > 65) {
        tips.push("Consider annual health screenings for early detection of age-related conditions");
        tips.push("Maintain social connections to support mental health and cognitive function");
    }
    
    if (userProfile.gender === 'female') {
        tips.push("Schedule regular cervical cancer screenings and breast self-examinations");
        tips.push("Ensure adequate folic acid intake, especially during reproductive years");
    }
    
    return tips;
}

/**
 * Health resource bookmarking
 */
function bookmarkResource(resourceId, resourceTitle) {
    const bookmarks = getFromLocalStorage('healthBookmarks') || [];
    
    const bookmark = {
        id: resourceId,
        title: resourceTitle,
        url: window.location.href,
        timestamp: new Date().toISOString()
    };
    
    // Check if already bookmarked
    if (!bookmarks.find(b => b.id === resourceId)) {
        bookmarks.push(bookmark);
        saveToLocalStorage('healthBookmarks', bookmarks);
        showSuccessMessage('Resource bookmarked successfully!');
    } else {
        showErrorMessage('Resource is already bookmarked.');
    }
}

/**
 * Export functions for global use
 */
window.HealthTools = {
    calculateBMI,
    checkSymptoms,
    generateHealthTip,
    lookupDisease,
    bookmarkResource,
    performHealthSearch,
    clearSearch
};
