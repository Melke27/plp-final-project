/**
 * HealthConnect Platform - Booking Functionality
 * Handles appointment booking form and validation
 */

let currentStep = 1;
let bookingData = {};

// Initialize booking form when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeBookingForm();
    initializeTimeSlots();
    initializeServiceSelection();
    handleURLParameters();
});

/**
 * Initialize booking form functionality
 */
function initializeBookingForm() {
    const form = document.getElementById('appointment-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize step navigation
    updateStepDisplay();
    
    // Add real-time validation
    addRealTimeValidation();
}

/**
 * Handle URL parameters for pre-selecting clinic
 */
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const clinicParam = urlParams.get('clinic');
    
    if (clinicParam) {
        // Pre-select the clinic when user comes from clinic locations page
        setTimeout(() => {
            const clinicRadio = document.querySelector(`input[value="${clinicParam}"]`);
            if (clinicRadio) {
                clinicRadio.checked = true;
                updateTimeSlots(clinicParam);
            }
        }, 100);
    }
}

/**
 * Navigate to next step
 */
function nextStep(stepNumber) {
    if (validateCurrentStep()) {
        currentStep = stepNumber;
        updateStepDisplay();
        
        // Save current step data
        saveStepData();
        
        // Smooth scroll to top of form
        document.querySelector('.booking-form-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Navigate to previous step
 */
function previousStep(stepNumber) {
    currentStep = stepNumber;
    updateStepDisplay();
    
    document.querySelector('.booking-form-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Update step display
 */
function updateStepDisplay() {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update form steps
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

/**
 * Validate current step
 */
function validateCurrentStep() {
    const currentFormStep = document.getElementById(`step-${currentStep}`);
    if (!currentFormStep) return false;
    
    const requiredFields = currentFormStep.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        clearFieldError(field);
        
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            // Field-specific validation
            if (field.type === 'email' && !validateEmail(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field.type === 'tel' && !validatePhone(field.value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            } else if (field.type === 'number') {
                const age = parseInt(field.value);
                if (age < 1 || age > 120) {
                    showFieldError(field, 'Please enter a valid age (1-120)');
                    isValid = false;
                }
            }
        }
    });
    
    // Step-specific validation
    if (currentStep === 2) {
        const serviceSelected = document.querySelector('input[name="service"]:checked');
        if (!serviceSelected) {
            showErrorMessage('Please select a healthcare service');
            isValid = false;
        }
    }
    
    if (currentStep === 3) {
        const clinicSelected = document.querySelector('input[name="clinic"]:checked');
        const timeSelected = document.getElementById('selected-time').value;
        
        if (!clinicSelected) {
            showErrorMessage('Please select a clinic location');
            isValid = false;
        }
        
        if (!timeSelected) {
            showErrorMessage('Please select a time slot');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Save current step data
 */
function saveStepData() {
    const currentFormStep = document.getElementById(`step-${currentStep - 1}`);
    if (!currentFormStep) return;
    
    const formData = new FormData();
    const inputs = currentFormStep.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            if (input.checked) {
                bookingData[input.name] = input.value;
            }
        } else {
            bookingData[input.name] = input.value;
        }
    });
    
    // Save to localStorage for recovery
    saveToLocalStorage('bookingData', bookingData);
}

/**
 * Initialize service selection
 */
function initializeServiceSelection() {
    const serviceOptions = document.querySelectorAll('.service-radio');
    
    serviceOptions.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Update available clinics based on service
                updateAvailableClinics(this.value);
            }
        });
    });
}

/**
 * Initialize time slot selection
 */
function initializeTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            if (!this.disabled) {
                // Remove previous selection
                timeSlots.forEach(s => s.classList.remove('selected'));
                
                // Select current slot
                this.classList.add('selected');
                document.getElementById('selected-time').value = this.getAttribute('data-time');
            }
        });
    });
    
    // Clinic selection change
    const clinicRadios = document.querySelectorAll('.clinic-radio');
    clinicRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                updateTimeSlots(this.value);
            }
        });
    });
}

/**
 * Update available clinics based on selected service
 */
function updateAvailableClinics(selectedService) {
    const clinicOptions = document.querySelectorAll('.clinic-option');
    
    clinicOptions.forEach(option => {
        const services = option.querySelector('.clinic-services')
            .textContent.toLowerCase();
        
        if (selectedService === 'general-checkup' && services.includes('general')) {
            option.style.display = 'block';
        } else if (selectedService === 'vaccinations' && services.includes('vaccinations')) {
            option.style.display = 'block';
        } else if (selectedService === 'maternal-care' && services.includes('maternal')) {
            option.style.display = 'block';
        } else if (selectedService === 'child-health' && services.includes('child')) {
            option.style.display = 'block';
        } else if (selectedService === 'emergency-care' && services.includes('emergency')) {
            option.style.display = 'block';
        } else if (selectedService === 'mental-health' && services.includes('mental')) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
}

/**
 * Update time slots based on selected clinic
 */
function updateTimeSlots(clinicId) {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    // Reset all time slots
    timeSlots.forEach(slot => {
        slot.classList.remove('selected', 'unavailable');
        slot.disabled = false;
        slot.textContent = slot.getAttribute('data-time') === '16:00' ? 
            '4:00 PM' : convertTo12Hour(slot.getAttribute('data-time'));
    });
    
    // Simulate some unavailable slots based on clinic
    const unavailableSlots = {
        'kibera': ['16:00'],
        'masai-mara': ['13:00', '14:00'],
        'turkana': ['9:00', '15:00'],
        'kisumu': ['12:00']
    };
    
    if (unavailableSlots[clinicId]) {
        unavailableSlots[clinicId].forEach(time => {
            const slot = document.querySelector(`[data-time="${time}"]`);
            if (slot) {
                slot.classList.add('unavailable');
                slot.disabled = true;
                slot.textContent += ' (Full)';
            }
        });
    }
    
    // Clear previous selection
    document.getElementById('selected-time').value = '';
}

/**
 * Convert 24-hour time to 12-hour format
 */
function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Review booking details
 */
function reviewBooking() {
    if (!validateCurrentStep()) {
        return;
    }
    
    // Save final step data
    saveStepData();
    
    // Populate review section
    populateReviewSection();
    
    // Hide form steps and show review
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    const reviewSection = document.getElementById('booking-review');
    if (reviewSection) {
        reviewSection.style.display = 'block';
    }
    
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.add('active'));
}

/**
 * Populate review section with booking data
 */
function populateReviewSection() {
    // Get current form data
    const form = document.getElementById('appointment-form');
    const formData = new FormData(form);
    
    // Update review fields
    document.getElementById('review-name').textContent = 
        `${formData.get('firstName')} ${formData.get('lastName')}`;
    document.getElementById('review-email').textContent = formData.get('email');
    document.getElementById('review-phone').textContent = formData.get('phone');
    
    // Service selection
    const selectedService = document.querySelector('input[name="service"]:checked');
    if (selectedService) {
        const serviceLabel = selectedService.parentElement.querySelector('.service-content h3').textContent;
        document.getElementById('review-service').textContent = serviceLabel;
    }
    
    // Clinic selection
    const selectedClinic = document.querySelector('input[name="clinic"]:checked');
    if (selectedClinic) {
        const clinicLabel = selectedClinic.parentElement.querySelector('h4').textContent;
        const clinicDate = selectedClinic.parentElement.querySelector('.clinic-date').textContent;
        document.getElementById('review-clinic').textContent = clinicLabel;
        
        // Date and time
        const selectedTime = document.getElementById('selected-time').value;
        document.getElementById('review-datetime').textContent = 
            `${clinicDate.split('|')[0]} at ${convertTo12Hour(selectedTime)}`;
    }
    
    // Priority
    const selectedPriority = document.querySelector('input[name="priority"]:checked');
    if (selectedPriority) {
        document.getElementById('review-priority').textContent = 
            selectedPriority.value.charAt(0).toUpperCase() + selectedPriority.value.slice(1);
    }
}

/**
 * Edit booking - return to form
 */
function editBooking() {
    document.getElementById('booking-review').style.display = 'none';
    
    // Show the last step
    currentStep = 4;
    updateStepDisplay();
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate confirmation number
        const confirmationNumber = generateConfirmationNumber();
        
        // Show confirmation
        showBookingConfirmation(confirmationNumber);
        
        // Clear saved data
        localStorage.removeItem('bookingData');
        
        // Reset form
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

/**
 * Show booking confirmation
 */
function showBookingConfirmation(confirmationNumber) {
    // Hide review section
    document.getElementById('booking-review').style.display = 'none';
    
    // Show confirmation
    const confirmation = document.getElementById('booking-confirmation');
    if (confirmation) {
        confirmation.style.display = 'block';
        document.getElementById('confirmation-number').textContent = confirmationNumber;
        
        // Scroll to confirmation
        confirmation.scrollIntoView({ behavior: 'smooth' });
        
        // Show success message
        showSuccessMessage('Appointment booked successfully! Check your email for confirmation details.');
    }
}

/**
 * Generate confirmation number
 */
function generateConfirmationNumber() {
    const date = new Date();
    const dateStr = date.getFullYear().toString().substr(-2) + 
                   (date.getMonth() + 1).toString().padStart(2, '0') + 
                   date.getDate().toString().padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `HC${dateStr}${randomNum}`;
}

/**
 * Download confirmation
 */
function downloadConfirmation() {
    const confirmationData = {
        confirmationNumber: document.getElementById('confirmation-number').textContent,
        patientName: `${bookingData.firstName} ${bookingData.lastName}`,
        email: bookingData.email,
        phone: bookingData.phone,
        service: document.getElementById('review-service').textContent,
        clinic: document.getElementById('review-clinic').textContent,
        datetime: document.getElementById('review-datetime').textContent,
        priority: document.getElementById('review-priority').textContent
    };
    
    const content = `
HEALTHCONNECT APPOINTMENT CONFIRMATION

Confirmation Number: ${confirmationData.confirmationNumber}
Date Generated: ${new Date().toLocaleDateString()}

PATIENT INFORMATION:
Name: ${confirmationData.patientName}
Email: ${confirmationData.email}
Phone: ${confirmationData.phone}

APPOINTMENT DETAILS:
Service: ${confirmationData.service}
Clinic: ${confirmationData.clinic}
Date & Time: ${confirmationData.datetime}
Priority: ${confirmationData.priority}

WHAT TO BRING:
- Valid identification document
- Previous medical records (if available)
- List of current medications
- Insurance information (if applicable)

IMPORTANT NOTES:
- Arrive 15 minutes before your appointment time
- Bring this confirmation with you
- For cancellations, call +254 700 000 000
- Emergency contact: +254 719 000 000

Thank you for using HealthConnect!
For support: support@healthconnect.co.ke
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthConnect_Confirmation_${confirmationData.confirmationNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showSuccessMessage('Confirmation downloaded successfully!');
}

/**
 * Add real-time validation
 */
function addRealTimeValidation() {
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value && !validateEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && field.value && !validatePhone(field.value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    if (field.type === 'number' && field.value) {
        const age = parseInt(field.value);
        if (age < 1 || age > 120) {
            showFieldError(field, 'Please enter a valid age (1-120)');
            return false;
        }
    }
    
    return true;
}

/**
 * Auto-save form data
 */
function autoSaveFormData() {
    const form = document.getElementById('appointment-form');
    if (form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        saveToLocalStorage('autoSaveBooking', data);
    }
}

/**
 * Restore form data from auto-save
 */
function restoreFormData() {
    const savedData = getFromLocalStorage('autoSaveBooking');
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'radio' || field.type === 'checkbox') {
                    if (field.value === savedData[key]) {
                        field.checked = true;
                    }
                } else {
                    field.value = savedData[key];
                }
            }
        });
        
        showSuccessMessage('Previous form data restored');
    }
}

/**
 * Emergency appointment handling
 */
function handleEmergencyAppointment() {
    const emergencyCheckbox = document.getElementById('emergency-contact');
    
    if (emergencyCheckbox) {
        emergencyCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Set priority to emergency
                const emergencyPriority = document.querySelector('input[name="priority"][value="emergency"]');
                if (emergencyPriority) {
                    emergencyPriority.checked = true;
                }
                
                // Show emergency message
                showErrorMessage('Emergency appointment requested. Our team will contact you within 1 hour.');
                
                // Highlight emergency services
                highlightEmergencyServices();
            }
        });
    }
}

/**
 * Highlight emergency services
 */
function highlightEmergencyServices() {
    const emergencyService = document.getElementById('emergency-care');
    if (emergencyService) {
        emergencyService.checked = true;
        emergencyService.parentElement.style.border = '2px solid #ef4444';
        emergencyService.parentElement.style.background = 'rgba(239, 68, 68, 0.05)';
    }
}

/**
 * Form progress saving
 */
setInterval(autoSaveFormData, 30000); // Auto-save every 30 seconds

/**
 * Initialize emergency handling
 */
document.addEventListener('DOMContentLoaded', function() {
    handleEmergencyAppointment();
    
    // Check for saved data on page load
    const hasSavedData = getFromLocalStorage('autoSaveBooking');
    if (hasSavedData) {
        const restoreBtn = document.createElement('div');
        restoreBtn.className = 'restore-data-banner';
        restoreBtn.innerHTML = `
            <div class="restore-content">
                <i class="fas fa-info-circle"></i>
                <span>We found some previously entered information. Would you like to restore it?</span>
                <div class="restore-actions">
                    <button onclick="restoreFormData(); this.parentElement.parentElement.parentElement.remove();" class="btn btn-primary">Restore</button>
                    <button onclick="localStorage.removeItem('autoSaveBooking'); this.parentElement.parentElement.parentElement.remove();" class="btn btn-outline">Dismiss</button>
                </div>
            </div>
        `;
        
        const form = document.querySelector('.appointment-form');
        if (form) {
            form.insertBefore(restoreBtn, form.firstChild);
        }
        
        // Add styles for restore banner
        const style = document.createElement('style');
        style.textContent = `
            .restore-data-banner {
                background: rgba(59, 130, 246, 0.1);
                border: 1px solid #3b82f6;
                border-radius: 0.5rem;
                padding: 1rem;
                margin-bottom: 2rem;
            }
            
            .restore-content {
                display: flex;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .restore-content i {
                color: #3b82f6;
                font-size: 1.25rem;
            }
            
            .restore-actions {
                display: flex;
                gap: 0.5rem;
                margin-left: auto;
            }
            
            @media (max-width: 640px) {
                .restore-content {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .restore-actions {
                    margin-left: 0;
                    width: 100%;
                }
                
                .restore-actions .btn {
                    flex: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

/**
 * Booking analytics (for future implementation)
 */
function trackBookingStep(step) {
    // In a real application, you would send this to your analytics service
    console.log(`Booking step ${step} completed`);
}

/**
 * Export functions for global use
 */
window.BookingFunctions = {
    nextStep,
    previousStep,
    reviewBooking,
    editBooking,
    downloadConfirmation,
    updateTimeSlots,
    convertTo12Hour
};
