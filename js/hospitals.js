/**
 * HealthConnect Platform - Partner Hospitals Functionality
 * Handles hospital information display and interactions
 */

// Hospital details data
const hospitalDetails = {
    'tikur-anbessa': {
        name: 'Black Lion Hospital (Tikur Anbessa)',
        established: '1972',
        beds: '700+',
        departments: [
            'Emergency Department',
            'Internal Medicine',
            'General Surgery',
            'Pediatrics',
            'Obstetrics & Gynecology',
            'Orthopedics',
            'Ophthalmology',
            'Radiology',
            'Laboratory Services',
            'Pharmacy',
            'Intensive Care Unit',
            'Cardiac Care Unit'
        ],
        achievements: [
            'Largest hospital in Ethiopia',
            'Primary teaching hospital for Addis Ababa University',
            'Leading trauma and emergency care center',
            'Advanced surgical procedures',
            'International medical collaborations'
        ],
        services: {
            'Emergency Services': '24/7 emergency care with trauma center',
            'Surgical Services': 'General, cardiac, neuro, and specialized surgeries',
            'Diagnostic Services': 'CT scan, MRI, X-ray, ultrasound, laboratory tests',
            'Specialized Clinics': 'Cardiology, oncology, nephrology, endocrinology',
            'Teaching Programs': 'Medical education and residency training'
        },
        contact: {
            phone: '+251 11 276 1000',
            emergency: '+251 11 276 1111',
            email: 'info@tikuranbessa.edu.et',
            website: 'www.aau.edu.et/chs/school-of-medicine/'
        }
    },
    'st-pauls': {
        name: 'St. Paul\'s Hospital Millennium Medical College',
        established: '2007',
        beds: '400+',
        departments: [
            'Cardiac Surgery',
            'Neurosurgery',
            'Orthopedic Surgery',
            'Emergency Medicine',
            'Internal Medicine',
            'Pediatrics',
            'Gynecology & Obstetrics',
            'Ophthalmology',
            'Anesthesiology',
            'Radiology',
            'Pathology'
        ],
        achievements: [
            'First dedicated cardiac surgery center in Ethiopia',
            'Leading medical education institution',
            'Advanced neurosurgical procedures',
            'International standard cardiac care',
            'Research and development center'
        ],
        services: {
            'Cardiac Center': 'Open heart surgery, catheterization, cardiac rehabilitation',
            'Neurosurgery': 'Brain and spine surgery with advanced imaging',
            'Emergency Care': '24/7 emergency services with trauma center',
            'Specialized Clinics': 'Cardiology, neurology, orthopedics',
            'Medical Education': 'Undergraduate and postgraduate medical training'
        },
        contact: {
            phone: '+251 11 551 6000',
            emergency: '+251 11 551 6001',
            email: 'info@sphmmc.edu.et',
            website: 'www.sphmmc.edu.et'
        }
    },
    'yekatit-12': {
        name: 'Yekatit 12 Hospital Medical College',
        established: '1963',
        beds: '350+',
        departments: [
            'Internal Medicine',
            'General Surgery',
            'Obstetrics & Gynecology',
            'Pediatrics',
            'Emergency Medicine',
            'Dermatology',
            'Psychiatry',
            'Radiology',
            'Laboratory',
            'Pharmacy'
        ],
        achievements: [
            'Historic government teaching hospital',
            'Leading maternal and child health services',
            'Community health education programs',
            'Medical student training center',
            'Public health initiatives'
        ],
        services: {
            'Maternal Health': 'Prenatal care, delivery services, postnatal care',
            'General Medicine': 'Outpatient and inpatient medical services',
            'Emergency Care': '24/7 emergency medical services',
            'Surgical Services': 'General surgery and specialized procedures',
            'Medical Education': 'Clinical training for medical students'
        },
        contact: {
            phone: '+251 11 553 2000',
            emergency: '+251 11 553 2001',
            email: 'info@yekatit12.gov.et',
            website: 'www.yekatit12hospital.gov.et'
        }
    },
    'menelik-ii': {
        name: 'Menelik II Referral Hospital',
        established: '1910',
        beds: '200+',
        departments: [
            'Emergency Department',
            'General Surgery',
            'Internal Medicine',
            'Trauma Surgery',
            'Intensive Care',
            'Radiology',
            'Laboratory Services',
            'Pharmacy',
            'Physical Therapy'
        ],
        achievements: [
            'Historic referral hospital',
            'Leading emergency and trauma care',
            'Advanced ICU facilities',
            'Specialized surgical procedures',
            'Community health outreach'
        ],
        services: {
            'Emergency Care': '24/7 emergency and trauma services',
            'Surgical Services': 'General and trauma surgery',
            'Critical Care': 'Intensive care unit with advanced monitoring',
            'Diagnostic Services': 'Radiology, laboratory, and imaging services',
            'Referral Services': 'Specialized care coordination'
        },
        contact: {
            phone: '+251 11 557 7000',
            emergency: '+251 11 557 7001',
            email: 'info@menelik2hospital.gov.et',
            website: 'www.menelik2hospital.gov.et'
        }
    },
    'jimma-university': {
        name: 'Jimma University Medical Center',
        established: '1983',
        beds: '450+',
        departments: [
            'Community Health',
            'Rural Medicine',
            'General Surgery',
            'Internal Medicine',
            'Pediatrics',
            'Obstetrics & Gynecology',
            'Public Health',
            'Family Medicine',
            'Emergency Medicine',
            'Radiology'
        ],
        achievements: [
            'Leading rural health research center',
            'Community-based medical education',
            'Public health initiatives',
            'Rural health extension programs',
            'International health partnerships'
        ],
        services: {
            'Rural Health': 'Community-based healthcare delivery',
            'Medical Education': 'Training healthcare workers for rural areas',
            'General Medicine': 'Comprehensive medical services',
            'Emergency Care': '24/7 emergency medical services',
            'Public Health': 'Community health education and prevention'
        },
        contact: {
            phone: '+251 47 111 2000',
            emergency: '+251 47 111 2001',
            email: 'info@ju.edu.et',
            website: 'www.ju.edu.et'
        }
    },
    'hawassa-university': {
        name: 'Hawassa University Referral Hospital',
        established: '1986',
        beds: '300+',
        departments: [
            'General Surgery',
            'Internal Medicine',
            'Pediatrics',
            'Obstetrics & Gynecology',
            'Emergency Medicine',
            'Radiology',
            'Laboratory',
            'Pharmacy',
            'Dental Services'
        ],
        achievements: [
            'Regional referral center for SNNPR',
            'University teaching hospital',
            'Maternal and child health excellence',
            'Community health programs',
            'Medical research initiatives'
        ],
        services: {
            'Regional Care': 'Referral services for southern Ethiopia',
            'Maternal Health': 'Comprehensive maternal and child care',
            'Medical Education': 'Training medical professionals',
            'Emergency Services': '24/7 emergency medical care',
            'Specialized Care': 'Surgery and internal medicine specialties'
        },
        contact: {
            phone: '+251 46 220 4000',
            emergency: '+251 46 220 4001',
            email: 'info@hu.edu.et',
            website: 'www.hu.edu.et'
        }
    },
    'gondar-university': {
        name: 'Gondar University Hospital',
        established: '1954',
        beds: '400+',
        departments: [
            'General Medicine',
            'General Surgery',
            'Pediatrics',
            'Obstetrics & Gynecology',
            'Dentistry',
            'Emergency Medicine',
            'Radiology',
            'Laboratory',
            'Pharmacy',
            'Physical Therapy'
        ],
        achievements: [
            'Historic university hospital in northern Ethiopia',
            'Leading medical education center',
            'Regional healthcare leader',
            'Community health outreach programs',
            'Medical research and training'
        ],
        services: {
            'General Medicine': 'Comprehensive medical services',
            'Surgical Services': 'General and specialized surgery',
            'Dental Care': 'Complete dental and oral health services',
            'Emergency Care': '24/7 emergency medical services',
            'Medical Education': 'Training future healthcare professionals'
        },
        contact: {
            phone: '+251 58 114 1000',
            emergency: '+251 58 114 1001',
            email: 'info@uog.edu.et',
            website: 'www.uog.edu.et'
        }
    }
};

// Initialize hospitals page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeHospitalCards();
    initializeStatsAnimation();
});

/**
 * Initialize hospital card interactions
 */
function initializeHospitalCards() {
    const hospitalCards = document.querySelectorAll('.hospital-card');
    
    hospitalCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
}

/**
 * Initialize stats counter animation
 */
function initializeStatsAnimation() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statsSection = entry.target;
                const statNumbers = statsSection.querySelectorAll('.stat-number');
                
                statNumbers.forEach(stat => {
                    if (!stat.classList.contains('animated')) {
                        animateCounter(stat);
                        stat.classList.add('animated');
                    }
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.hospital-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/**
 * Animate counter numbers
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 40);
}

/**
 * Show hospital details modal
 */
function showHospitalDetails(hospitalId) {
    const hospital = hospitalDetails[hospitalId];
    if (!hospital) return;
    
    const modal = document.getElementById('hospital-modal');
    const modalName = document.getElementById('modal-hospital-name');
    const modalContent = document.getElementById('modal-hospital-content');
    
    modalName.textContent = hospital.name;
    
    modalContent.innerHTML = `
        <div class="hospital-detail-content">
            <div class="hospital-overview">
                <div class="overview-item">
                    <strong>Established:</strong> ${hospital.established}
                </div>
                <div class="overview-item">
                    <strong>Bed Capacity:</strong> ${hospital.beds}
                </div>
                <div class="overview-item">
                    <strong>Emergency Contact:</strong> ${hospital.contact.emergency}
                </div>
            </div>
            
            <div class="hospital-detail-section">
                <h4><i class="fas fa-building"></i> Departments</h4>
                <div class="departments-grid">
                    ${hospital.departments.map(dept => `<div class="department-item">${dept}</div>`).join('')}
                </div>
            </div>
            
            <div class="hospital-detail-section">
                <h4><i class="fas fa-medical-kit"></i> Services</h4>
                <div class="services-list">
                    ${Object.entries(hospital.services).map(([service, description]) => `
                        <div class="service-item">
                            <h5>${service}</h5>
                            <p>${description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="hospital-detail-section">
                <h4><i class="fas fa-trophy"></i> Key Achievements</h4>
                <ul class="achievements-list">
                    ${hospital.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
            
            <div class="hospital-detail-section">
                <h4><i class="fas fa-phone"></i> Contact Information</h4>
                <div class="contact-details">
                    <div class="contact-row">
                        <strong>Main Phone:</strong> <a href="tel:${hospital.contact.phone.replace(/\s/g, '')}">${hospital.contact.phone}</a>
                    </div>
                    <div class="contact-row">
                        <strong>Emergency:</strong> <a href="tel:${hospital.contact.emergency.replace(/\s/g, '')}">${hospital.contact.emergency}</a>
                    </div>
                    <div class="contact-row">
                        <strong>Email:</strong> <a href="mailto:${hospital.contact.email}">${hospital.contact.email}</a>
                    </div>
                    <div class="contact-row">
                        <strong>Website:</strong> <a href="https://${hospital.contact.website}" target="_blank">${hospital.contact.website}</a>
                    </div>
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="appointment-booking.html?hospital=${hospitalId}" class="btn btn-primary">
                    <i class="fas fa-calendar-plus"></i>
                    Book Appointment
                </a>
                <a href="contact.html" class="btn btn-outline">
                    <i class="fas fa-phone"></i>
                    Contact for Referral
                </a>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

/**
 * Close hospital details modal
 */
function closeHospitalModal() {
    const modal = document.getElementById('hospital-modal');
    modal.classList.remove('show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

/**
 * Initialize partnership diagram animation
 */
function initializePartnershipDiagram() {
    const diagram = document.querySelector('.partnership-diagram');
    if (!diagram) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePartnershipDiagram();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(diagram);
}

/**
 * Animate partnership diagram
 */
function animatePartnershipDiagram() {
    const items = document.querySelectorAll('.diagram-item');
    const arrow = document.querySelector('.diagram-arrow');
    
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1)';
            item.style.opacity = '1';
        }, index * 300);
    });
    
    setTimeout(() => {
        if (arrow) {
            arrow.style.opacity = '1';
            arrow.style.transform = 'translateX(0)';
        }
    }, 600);
}

/**
 * Hospital search functionality
 */
function searchHospitals(searchTerm) {
    const hospitalCards = document.querySelectorAll('.hospital-card');
    let visibleCount = 0;
    
    hospitalCards.forEach(card => {
        const hospitalName = card.querySelector('.hospital-name').textContent.toLowerCase();
        const location = card.querySelector('.hospital-location span').textContent.toLowerCase();
        const specialties = Array.from(card.querySelectorAll('.specialty-tag'))
            .map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const searchableText = `${hospitalName} ${location} ${specialties}`;
        
        if (searchableText.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    return visibleCount;
}

/**
 * Filter hospitals by specialty
 */
function filterBySpecialty(specialty) {
    const hospitalCards = document.querySelectorAll('.hospital-card');
    let visibleCount = 0;
    
    hospitalCards.forEach(card => {
        const specialties = Array.from(card.querySelectorAll('.specialty-tag'))
            .map(tag => tag.textContent.toLowerCase());
        
        if (specialty === 'all' || specialties.includes(specialty.toLowerCase())) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    return visibleCount;
}

/**
 * Get hospital emergency contact
 */
function getEmergencyContact(hospitalId) {
    const hospital = hospitalDetails[hospitalId];
    return hospital ? hospital.contact.emergency : null;
}

/**
 * Book emergency appointment
 */
function bookEmergencyAppointment(hospitalId) {
    const hospital = hospitalDetails[hospitalId];
    if (!hospital) return;
    
    // Save emergency context
    const emergencyData = {
        hospital: hospital.name,
        hospitalId: hospitalId,
        isEmergency: true,
        timestamp: new Date().toISOString(),
        emergencyContact: hospital.contact.emergency
    };
    
    saveToLocalStorage('emergencyAppointment', emergencyData);
    
    // Redirect to booking page with emergency flag
    window.location.href = `appointment-booking.html?hospital=${hospitalId}&emergency=true`;
}

/**
 * Add hospital comparison functionality
 */
function compareHospitals(hospitalIds) {
    const comparison = hospitalIds.map(id => hospitalDetails[id]).filter(Boolean);
    
    if (comparison.length < 2) {
        showErrorMessage('Please select at least 2 hospitals to compare');
        return;
    }
    
    // Create comparison modal or page
    showHospitalComparison(comparison);
}

/**
 * Show hospital comparison
 */
function showHospitalComparison(hospitals) {
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content large">
            <div class="modal-header">
                <h3>Hospital Comparison</h3>
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="comparison-table">
                    <div class="comparison-header">
                        <div class="comparison-label">Feature</div>
                        ${hospitals.map(hospital => `<div class="comparison-hospital">${hospital.name}</div>`).join('')}
                    </div>
                    <div class="comparison-row">
                        <div class="comparison-label">Established</div>
                        ${hospitals.map(hospital => `<div class="comparison-value">${hospital.established}</div>`).join('')}
                    </div>
                    <div class="comparison-row">
                        <div class="comparison-label">Bed Capacity</div>
                        ${hospitals.map(hospital => `<div class="comparison-value">${hospital.beds}</div>`).join('')}
                    </div>
                    <div class="comparison-row">
                        <div class="comparison-label">Emergency Contact</div>
                        ${hospitals.map(hospital => `<div class="comparison-value">${hospital.contact.emergency}</div>`).join('')}
                    </div>
                    <div class="comparison-row">
                        <div class="comparison-label">Key Specialties</div>
                        ${hospitals.map(hospital => `
                            <div class="comparison-value">
                                ${hospital.departments.slice(0, 3).join(', ')}
                                ${hospital.departments.length > 3 ? '...' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

/**
 * Add CSS styles for hospital page
 */
function addHospitalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Hospital Cards */
        .hospitals-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .hospital-card {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .hospital-card.featured {
            border: 2px solid #2563eb;
        }
        
        .hospital-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        
        .hospital-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .hospital-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(37, 99, 235, 0.9);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .hospital-content {
            padding: 1.5rem;
        }
        
        .hospital-header {
            margin-bottom: 1rem;
        }
        
        .hospital-name {
            font-size: 1.25rem;
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.5rem;
        }
        
        .hospital-location {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        .hospital-description {
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .hospital-specialties h4 {
            color: #111827;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        .specialty-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .specialty-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        .hospital-contact {
            margin-bottom: 1.5rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        .hospital-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .hospital-actions .btn {
            flex: 1;
            justify-content: center;
            min-width: auto;
        }
        
        /* Partnership Info */
        .partnership-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .partnership-steps {
            margin-top: 2rem;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .step-number {
            width: 3rem;
            height: 3rem;
            background: #2563eb;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .step-content h3 {
            color: #111827;
            margin-bottom: 0.5rem;
        }
        
        .step-content p {
            color: #6b7280;
            line-height: 1.6;
        }
        
        .partnership-diagram {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
        }
        
        .diagram-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            padding: 1.5rem;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transform: scale(0.8);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .diagram-item i {
            font-size: 2rem;
            color: #2563eb;
        }
        
        .diagram-arrow {
            font-size: 1.5rem;
            color: #6b7280;
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.3s ease;
        }
        
        /* Modal Styles */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal.show {
            opacity: 1;
        }
        
        .modal-overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        
        .modal-content {
            background: white;
            border-radius: 1rem;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal.show .modal-content {
            transform: scale(1);
        }
        
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #6b7280;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: all 0.15s ease;
        }
        
        .modal-close:hover {
            background: #f3f4f6;
            color: #111827;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .hospital-detail-section {
            margin-bottom: 2rem;
        }
        
        .hospital-detail-section h4 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #111827;
            margin-bottom: 1rem;
        }
        
        .hospital-overview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            background: #f9fafb;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 2rem;
        }
        
        .overview-item {
            font-size: 0.875rem;
        }
        
        .departments-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 0.5rem;
        }
        
        .department-item {
            background: #eff6ff;
            color: #1e40af;
            padding: 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            text-align: center;
        }
        
        .services-list {
            display: grid;
            gap: 1rem;
        }
        
        .service-item {
            padding: 1rem;
            background: #f9fafb;
            border-radius: 0.5rem;
            border-left: 4px solid #2563eb;
        }
        
        .service-item h5 {
            color: #111827;
            margin-bottom: 0.5rem;
        }
        
        .service-item p {
            color: #6b7280;
            font-size: 0.875rem;
            line-height: 1.5;
        }
        
        .achievements-list {
            list-style: none;
            padding: 0;
        }
        
        .achievements-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e5e7eb;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .achievements-list li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .contact-details {
            display: grid;
            gap: 0.75rem;
        }
        
        .contact-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            background: #f9fafb;
            border-radius: 0.5rem;
        }
        
        .contact-row strong {
            min-width: 100px;
            color: #111827;
        }
        
        .contact-row a {
            color: #2563eb;
            text-decoration: none;
        }
        
        .contact-row a:hover {
            text-decoration: underline;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
        }
        
        /* Footer bottom content */
        .footer-bottom-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .developer-credit {
            text-align: right;
        }
        
        .developer-link {
            color: #2563eb;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        }
        
        .developer-link:hover {
            text-decoration: underline;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .hospitals-grid {
                grid-template-columns: 1fr;
            }
            
            .partnership-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .partnership-diagram {
                flex-direction: column;
                gap: 1rem;
            }
            
            .diagram-arrow {
                transform: rotate(90deg);
            }
            
            .footer-bottom-content {
                flex-direction: column;
                text-align: center;
            }
            
            .developer-credit {
                text-align: center;
            }
            
            .hospital-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize styles when page loads
document.addEventListener('DOMContentLoaded', function() {
    addHospitalStyles();
    initializePartnershipDiagram();
});

/**
 * Export functions for global use
 */
window.HospitalFunctions = {
    showHospitalDetails,
    closeHospitalModal,
    searchHospitals,
    filterBySpecialty,
    getEmergencyContact,
    bookEmergencyAppointment,
    compareHospitals
};
