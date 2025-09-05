/**
 * Health Tools Interactive Features
 * Comprehensive health management system
 */

class HealthToolsManager {
    constructor() {
        this.charts = {};
        this.medications = JSON.parse(localStorage.getItem('medications') || '[]');
        this.emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
        this.healthData = JSON.parse(localStorage.getItem('healthData') || '{}');
        this.reminderTimers = [];
        
        this.init();
        this.setupEventListeners();
        this.loadSavedData();
        this.setupMedicationReminders();
    }

    init() {
        // Initialize AOS animations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50
            });
        }

        this.showLoadingSpinner(false);
    }

    setupEventListeners() {
        // Quick tool navigation
        document.querySelectorAll('.quick-tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tool = e.currentTarget.dataset.tool;
                this.scrollToTool(tool);
            });
        });

        // Symptom checker
        const symptomForm = document.getElementById('symptom-form');
        if (symptomForm) {
            symptomForm.addEventListener('submit', this.handleSymptomSubmission.bind(this));
        }

        // Health tracker navigation
        document.querySelectorAll('.tracker-nav-btn').forEach(btn => {
            btn.addEventListener('click', this.switchTrackerSection.bind(this));
        });

        // Tracker forms
        this.setupTrackerForms();

        // Medication management
        this.setupMedicationEvents();

        // Emergency contacts
        this.setupEmergencyContactEvents();

        // Emergency actions
        this.setupEmergencyActions();

        // Mood selector
        this.setupMoodSelector();

        // Modal events
        this.setupModalEvents();

        // Real-time BMI calculation
        this.setupBMICalculator();

        // Severity slider
        this.setupSeveritySlider();

        // Window events
        window.addEventListener('beforeunload', this.saveAllData.bind(this));
    }

    // Symptom Checker
    async handleSymptomSubmission(e) {
        e.preventDefault();
        this.showLoadingSpinner(true);

        const formData = new FormData(e.target);
        const symptoms = {
            age: formData.get('age'),
            gender: formData.get('gender'),
            primarySymptom: formData.get('primary-symptom'),
            duration: formData.get('duration'),
            additionalSymptoms: formData.getAll('additional-symptoms')
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const results = this.analyzeSymptoms(symptoms);
        this.displaySymptomResults(results);
        this.showLoadingSpinner(false);
    }

    analyzeSymptoms(symptoms) {
        // Symptom analysis logic based on East African health patterns
        const conditions = [];
        
        const { primarySymptom, additionalSymptoms, duration, age } = symptoms;
        
        if (primarySymptom === 'fever') {
            if (additionalSymptoms.includes('body-aches')) {
                conditions.push({
                    name: 'Malaria',
                    probability: 'High',
                    severity: 'high',
                    description: 'Common in East Africa. Symptoms include fever, body aches, and fatigue.',
                    recommendations: ['Seek immediate medical attention', 'Get tested for malaria', 'Stay hydrated']
                });
            }
            conditions.push({
                name: 'Viral Infection',
                probability: 'Medium',
                severity: 'med',
                description: 'Common viral infections that cause fever and general discomfort.',
                recommendations: ['Rest and hydration', 'Monitor temperature', 'Consult doctor if fever persists']
            });
        }

        if (primarySymptom === 'diarrhea') {
            conditions.push({
                name: 'Gastroenteritis',
                probability: 'High',
                severity: 'med',
                description: 'Stomach infection causing diarrhea, often from contaminated water/food.',
                recommendations: ['Stay hydrated with ORS', 'Avoid dairy and fatty foods', 'Seek medical care if severe']
            });
        }

        if (primarySymptom === 'headache') {
            if (additionalSymptoms.includes('fever') && additionalSymptoms.includes('nausea')) {
                conditions.push({
                    name: 'Meningitis (Concern)',
                    probability: 'Low',
                    severity: 'high',
                    description: 'Serious condition requiring immediate medical attention.',
                    recommendations: ['Seek emergency medical care immediately', 'Do not delay treatment']
                });
            }
            conditions.push({
                name: 'Tension Headache',
                probability: 'High',
                severity: 'low',
                description: 'Common headache often caused by stress, dehydration, or fatigue.',
                recommendations: ['Rest in dark, quiet room', 'Stay hydrated', 'Consider mild pain relief']
            });
        }

        if (primarySymptom === 'difficulty-breathing') {
            conditions.push({
                name: 'Respiratory Infection',
                probability: 'Medium',
                severity: 'high',
                description: 'Could be pneumonia, COVID-19, or other respiratory conditions.',
                recommendations: ['Seek immediate medical attention', 'Monitor oxygen levels if possible', 'Isolate until diagnosed']
            });
        }

        if (primarySymptom === 'chest-pain') {
            conditions.push({
                name: 'Cardiac Event (Emergency)',
                probability: 'Unknown',
                severity: 'high',
                description: 'Chest pain requires immediate medical evaluation.',
                recommendations: ['Call emergency services immediately', 'Do not drive yourself', 'Chew aspirin if not allergic']
            });
        }

        // Add duration-based adjustments
        if (duration === 'more-week') {
            conditions.forEach(condition => {
                condition.description += ' Prolonged symptoms require medical evaluation.';
            });
        }

        return conditions.length > 0 ? conditions : [{
            name: 'General Health Concern',
            probability: 'Unknown',
            severity: 'med',
            description: 'Your symptoms may indicate various conditions. Medical consultation recommended.',
            recommendations: ['Consult with healthcare provider', 'Monitor symptoms', 'Rest and stay hydrated']
        }];
    }

    displaySymptomResults(results) {
        const resultsContainer = document.getElementById('symptom-results');
        const resultsContent = document.getElementById('results-content');
        const placeholder = document.querySelector('.symptom-placeholder');

        placeholder.style.display = 'none';
        resultsContainer.classList.remove('hidden');

        resultsContent.innerHTML = results.map(condition => `
            <div class="condition-card">
                <div class="condition-title">
                    <h4>${condition.name}</h4>
                    <span class="severity-badge severity-${condition.severity}">
                        ${condition.severity.toUpperCase()} RISK
                    </span>
                </div>
                <p><strong>Probability:</strong> ${condition.probability}</p>
                <p>${condition.description}</p>
                <div class="recommendations">
                    <strong>Recommendations:</strong>
                    <ul>
                        ${condition.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        this.showToast('Symptom analysis completed', 'success');
    }

    // Health Tracker
    switchTrackerSection(e) {
        const targetSection = e.currentTarget.dataset.section;
        
        // Update nav buttons
        document.querySelectorAll('.tracker-nav-btn').forEach(btn => 
            btn.classList.remove('active')
        );
        e.currentTarget.classList.add('active');

        // Switch sections
        document.querySelectorAll('.tracker-section').forEach(section => 
            section.classList.remove('active')
        );
        document.getElementById(`${targetSection}-section`).classList.add('active');
    }

    setupTrackerForms() {
        // Vitals form
        const vitalsForm = document.getElementById('vitals-form');
        if (vitalsForm) {
            vitalsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveVitals(new FormData(e.target));
            });
        }

        // Symptoms log form
        const symptomsForm = document.getElementById('symptoms-log-form');
        if (symptomsForm) {
            symptomsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.logSymptom(new FormData(e.target));
            });
        }

        // Weight form
        const weightForm = document.getElementById('weight-form');
        if (weightForm) {
            weightForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveWeight(new FormData(e.target));
            });
        }

        // Mood form
        const moodForm = document.getElementById('mood-form');
        if (moodForm) {
            moodForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveMoodSleep(new FormData(e.target));
            });
        }
    }

    saveVitals(formData) {
        const vitals = {
            date: new Date().toISOString().split('T')[0],
            systolic: formData.get('bp-systolic'),
            diastolic: formData.get('bp-diastolic'),
            heartRate: formData.get('heart-rate'),
            temperature: formData.get('temperature')
        };

        if (!this.healthData.vitals) this.healthData.vitals = [];
        this.healthData.vitals.push(vitals);
        this.saveHealthData();
        this.updateVitalsChart();
        this.updateHealthSummary();
        this.showToast('Vitals saved successfully', 'success');
        
        document.getElementById('vitals-form').reset();
    }

    logSymptom(formData) {
        const symptom = {
            date: new Date().toISOString(),
            type: formData.get('symptom-type'),
            severity: formData.get('severity'),
            notes: formData.get('symptom-notes')
        };

        if (!this.healthData.symptoms) this.healthData.symptoms = [];
        this.healthData.symptoms.push(symptom);
        this.saveHealthData();
        this.updateSymptomsDisplay();
        this.updateHealthSummary();
        this.showToast('Symptom logged successfully', 'success');
        
        document.getElementById('symptoms-log-form').reset();
        document.getElementById('severity-display').textContent = '5';
        document.getElementById('severity').value = '5';
    }

    saveWeight(formData) {
        const weight = parseFloat(formData.get('weight'));
        const height = parseFloat(formData.get('height'));
        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

        const weightEntry = {
            date: new Date().toISOString().split('T')[0],
            weight,
            height,
            bmi: parseFloat(bmi)
        };

        if (!this.healthData.weight) this.healthData.weight = [];
        this.healthData.weight.push(weightEntry);
        this.saveHealthData();
        this.updateWeightChart();
        this.updateHealthSummary();
        this.showToast('Weight data saved successfully', 'success');
        
        // Don't reset form as height usually stays the same
    }

    saveMoodSleep(formData) {
        const moodSleep = {
            date: new Date().toISOString().split('T')[0],
            mood: formData.get('mood'),
            sleepHours: formData.get('sleep-hours'),
            sleepQuality: formData.get('sleep-quality')
        };

        if (!this.healthData.moodSleep) this.healthData.moodSleep = [];
        this.healthData.moodSleep.push(moodSleep);
        this.saveHealthData();
        this.updateHealthSummary();
        this.showToast('Mood and sleep data saved', 'success');
        
        document.getElementById('mood-form').reset();
        document.getElementById('selected-mood').value = '';
        document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    }

    // Charts
    updateVitalsChart() {
        const ctx = document.getElementById('vitals-chart');
        if (!ctx) return;

        const vitalsData = this.healthData.vitals?.slice(-7) || [];
        
        if (this.charts.vitals) {
            this.charts.vitals.destroy();
        }

        this.charts.vitals = new Chart(ctx, {
            type: 'line',
            data: {
                labels: vitalsData.map(v => new Date(v.date).toLocaleDateString()),
                datasets: [{
                    label: 'Systolic BP',
                    data: vitalsData.map(v => v.systolic),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: false
                }, {
                    label: 'Diastolic BP',
                    data: vitalsData.map(v => v.diastolic),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: false
                }, {
                    label: 'Heart Rate',
                    data: vitalsData.map(v => v.heartRate),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    updateWeightChart() {
        const ctx = document.getElementById('weight-chart');
        if (!ctx) return;

        const weightData = this.healthData.weight?.slice(-10) || [];
        
        if (this.charts.weight) {
            this.charts.weight.destroy();
        }

        this.charts.weight = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weightData.map(w => new Date(w.date).toLocaleDateString()),
                datasets: [{
                    label: 'Weight (kg)',
                    data: weightData.map(w => w.weight),
                    borderColor: '#14b8a6',
                    backgroundColor: 'rgba(20, 184, 166, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    updateSymptomsDisplay() {
        const symptomsContainer = document.getElementById('symptoms-list');
        const recentSymptoms = this.healthData.symptoms?.slice(-5).reverse() || [];

        if (recentSymptoms.length === 0) {
            symptomsContainer.innerHTML = '<p>No symptoms logged yet.</p>';
            return;
        }

        symptomsContainer.innerHTML = recentSymptoms.map(symptom => `
            <div class="symptom-entry">
                <div class="symptom-header">
                    <strong>${symptom.type}</strong>
                    <span class="symptom-severity">Severity: ${symptom.severity}/10</span>
                </div>
                <div class="symptom-date">${new Date(symptom.date).toLocaleDateString()}</div>
                ${symptom.notes ? `<p class="symptom-notes">${symptom.notes}</p>` : ''}
            </div>
        `).join('');
    }

    updateHealthSummary() {
        const totalEntries = (this.healthData.vitals?.length || 0) + 
                           (this.healthData.symptoms?.length || 0) + 
                           (this.healthData.weight?.length || 0) + 
                           (this.healthData.moodSleep?.length || 0);

        document.getElementById('total-entries').textContent = totalEntries;

        // Calculate streak (simplified)
        const today = new Date().toISOString().split('T')[0];
        const hasDataToday = this.healthData.vitals?.some(v => v.date === today) ||
                            this.healthData.symptoms?.some(s => s.date.split('T')[0] === today) ||
                            this.healthData.moodSleep?.some(m => m.date === today);
        
        document.getElementById('streak-days').textContent = hasDataToday ? '1' : '0';
    }

    // Medication Management
    setupMedicationEvents() {
        const medicationForm = document.getElementById('medication-form');
        if (medicationForm) {
            medicationForm.addEventListener('submit', this.addMedication.bind(this));
        }

        const addTimeBtn = document.getElementById('add-time');
        if (addTimeBtn) {
            addTimeBtn.addEventListener('click', this.addTimeInput.bind(this));
        }

        this.displayMedications();
        this.displayTodaysSchedule();
    }

    addTimeInput() {
        const timeInputs = document.getElementById('time-inputs');
        const newInput = document.createElement('input');
        newInput.type = 'time';
        newInput.className = 'time-input';
        timeInputs.appendChild(newInput);
    }

    addMedication(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const times = Array.from(document.querySelectorAll('.time-input'))
                          .map(input => input.value)
                          .filter(time => time);

        const medication = {
            id: Date.now().toString(),
            name: formData.get('medication-name'),
            dosage: formData.get('dosage'),
            frequency: formData.get('frequency'),
            times: times,
            notes: formData.get('medication-notes'),
            active: true
        };

        this.medications.push(medication);
        this.saveMedications();
        this.displayMedications();
        this.displayTodaysSchedule();
        this.setupMedicationReminders();
        this.showToast('Medication added successfully', 'success');
        
        e.target.reset();
        // Reset time inputs to just one
        document.getElementById('time-inputs').innerHTML = '<input type="time" class="time-input" value="08:00">';
    }

    displayMedications() {
        const container = document.getElementById('medications-list');
        const placeholder = document.querySelector('.medication-placeholder');

        if (this.medications.length === 0) {
            placeholder.style.display = 'block';
            return;
        }

        placeholder.style.display = 'none';
        container.innerHTML = this.medications.map(med => `
            <div class="medication-item" data-id="${med.id}">
                <div class="item-header">
                    <h4>${med.name}</h4>
                    <div class="medication-actions">
                        <button class="btn btn-outline btn-small edit-medication" data-id="${med.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-small delete-medication" data-id="${med.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p><strong>Dosage:</strong> ${med.dosage}</p>
                <p><strong>Frequency:</strong> ${med.frequency}</p>
                <p><strong>Times:</strong> ${med.times.join(', ')}</p>
                ${med.notes ? `<p><strong>Notes:</strong> ${med.notes}</p>` : ''}
                <div class="pill-badge">Active</div>
            </div>
        `).join('');

        // Add event listeners for edit/delete
        container.querySelectorAll('.delete-medication').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const medId = e.currentTarget.dataset.id;
                this.deleteMedication(medId);
            });
        });
    }

    deleteMedication(id) {
        if (confirm('Are you sure you want to delete this medication?')) {
            this.medications = this.medications.filter(med => med.id !== id);
            this.saveMedications();
            this.displayMedications();
            this.displayTodaysSchedule();
            this.showToast('Medication deleted', 'info');
        }
    }

    displayTodaysSchedule() {
        const container = document.getElementById('todays-medications');
        const today = new Date().toISOString().split('T')[0];
        
        const todaysSchedule = [];
        
        this.medications.forEach(med => {
            med.times.forEach(time => {
                todaysSchedule.push({
                    time,
                    medication: med.name,
                    dosage: med.dosage,
                    id: `${med.id}-${time}`
                });
            });
        });

        todaysSchedule.sort((a, b) => a.time.localeCompare(b.time));

        if (todaysSchedule.length === 0) {
            container.innerHTML = '<p>No medications scheduled for today.</p>';
            return;
        }

        container.innerHTML = todaysSchedule.map(item => `
            <div class="schedule-item">
                <div>
                    <span class="schedule-time">${item.time}</span>
                    <span>${item.medication} (${item.dosage})</span>
                </div>
                <span class="schedule-status">Pending</span>
            </div>
        `).join('');
    }

    setupMedicationReminders() {
        // Clear existing timers
        this.reminderTimers.forEach(timer => clearTimeout(timer));
        this.reminderTimers = [];

        this.medications.forEach(med => {
            med.times.forEach(time => {
                this.scheduleReminder(med, time);
            });
        });
    }

    scheduleReminder(medication, time) {
        const now = new Date();
        const reminderTime = new Date();
        const [hours, minutes] = time.split(':').map(Number);
        
        reminderTime.setHours(hours, minutes, 0, 0);
        
        // If time has passed today, schedule for tomorrow
        if (reminderTime <= now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }

        const timeUntilReminder = reminderTime.getTime() - now.getTime();

        const timer = setTimeout(() => {
            this.showMedicationReminder(medication, time);
        }, timeUntilReminder);

        this.reminderTimers.push(timer);
    }

    showMedicationReminder(medication, time) {
        // Update modal content
        document.getElementById('reminder-medication-name').textContent = medication.name;
        document.getElementById('reminder-dosage').textContent = medication.dosage;
        document.getElementById('reminder-instructions').textContent = medication.notes || 'No special instructions';

        // Show modal
        document.getElementById('medication-reminder-modal').classList.remove('hidden');

        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
            new Notification('Medication Reminder', {
                body: `Time to take ${medication.name} (${medication.dosage})`,
                icon: '/favicon.ico'
            });
        }
    }

    // Emergency Contacts
    setupEmergencyContactEvents() {
        const contactForm = document.getElementById('emergency-contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.addEmergencyContact.bind(this));
        }

        this.displayEmergencyContacts();
    }

    addEmergencyContact(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const contact = {
            id: Date.now().toString(),
            name: formData.get('contact-name'),
            relationship: formData.get('contact-relationship'),
            phone: formData.get('contact-phone'),
            location: formData.get('contact-location')
        };

        this.emergencyContacts.push(contact);
        this.saveEmergencyContacts();
        this.displayEmergencyContacts();
        this.showToast('Emergency contact added', 'success');
        
        e.target.reset();
    }

    displayEmergencyContacts() {
        const container = document.getElementById('personal-contacts-list');
        const placeholder = document.querySelector('.contacts-placeholder');

        if (this.emergencyContacts.length === 0) {
            placeholder.style.display = 'block';
            return;
        }

        placeholder.style.display = 'none';
        container.innerHTML = this.emergencyContacts.map(contact => `
            <div class="contact-card">
                <div class="card-header">
                    <h4>${contact.name}</h4>
                    <button class="btn btn-danger btn-small delete-contact" data-id="${contact.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <p><strong>Relationship:</strong> ${contact.relationship}</p>
                <p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
                ${contact.location ? `<p><strong>Location:</strong> ${contact.location}</p>` : ''}
            </div>
        `).join('');

        // Add delete event listeners
        container.querySelectorAll('.delete-contact').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const contactId = e.currentTarget.dataset.id;
                this.deleteEmergencyContact(contactId);
            });
        });
    }

    deleteEmergencyContact(id) {
        if (confirm('Are you sure you want to delete this emergency contact?')) {
            this.emergencyContacts = this.emergencyContacts.filter(contact => contact.id !== id);
            this.saveEmergencyContacts();
            this.displayEmergencyContacts();
            this.showToast('Emergency contact deleted', 'info');
        }
    }

    // Emergency Actions
    setupEmergencyActions() {
        document.getElementById('call-ambulance')?.addEventListener('click', this.handleEmergencyCall.bind(this));
        document.getElementById('find-nearest-hospital')?.addEventListener('click', this.findNearestHospital.bind(this));
        document.getElementById('emergency-book-appointment')?.addEventListener('click', this.bookEmergencyAppointment.bind(this));
        document.getElementById('share-location')?.addEventListener('click', this.shareLocation.bind(this));
    }

    handleEmergencyCall() {
        document.getElementById('emergency-alert-modal').classList.remove('hidden');
    }

    findNearestHospital() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const mapsUrl = `https://www.google.com/maps/search/hospital/@${latitude},${longitude},15z`;
                window.open(mapsUrl, '_blank');
                this.showToast('Opening map to find nearest hospital', 'info');
            }, () => {
                this.showToast('Unable to get your location', 'danger');
            });
        } else {
            this.showToast('Geolocation not supported', 'danger');
        }
    }

    bookEmergencyAppointment() {
        window.location.href = 'appointment-booking.html?emergency=true';
    }

    shareLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
                
                if (navigator.share) {
                    navigator.share({
                        title: 'My Current Location - Health Emergency',
                        text: 'I need medical assistance. Here is my location:',
                        url: locationUrl
                    });
                } else {
                    navigator.clipboard.writeText(locationUrl);
                    this.showToast('Location copied to clipboard', 'success');
                }
            }, () => {
                this.showToast('Unable to get your location', 'danger');
            });
        }
    }

    // Utility Functions
    setupMoodSelector() {
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                document.getElementById('selected-mood').value = e.currentTarget.dataset.mood;
            });
        });
    }

    setupBMICalculator() {
        const weightInput = document.getElementById('weight');
        const heightInput = document.getElementById('height');
        
        if (weightInput && heightInput) {
            [weightInput, heightInput].forEach(input => {
                input.addEventListener('input', this.calculateBMI.bind(this));
            });
        }
    }

    calculateBMI() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);

        if (weight && height) {
            const bmi = (weight / ((height / 100) ** 2));
            const bmiValue = document.getElementById('bmi-value');
            const bmiCategory = document.getElementById('bmi-category');

            bmiValue.textContent = bmi.toFixed(1);

            if (bmi < 18.5) {
                bmiCategory.textContent = 'Underweight';
                bmiCategory.style.color = '#f59e0b';
            } else if (bmi < 25) {
                bmiCategory.textContent = 'Normal weight';
                bmiCategory.style.color = '#10b981';
            } else if (bmi < 30) {
                bmiCategory.textContent = 'Overweight';
                bmiCategory.style.color = '#f59e0b';
            } else {
                bmiCategory.textContent = 'Obese';
                bmiCategory.style.color = '#ef4444';
            }
        }
    }

    setupSeveritySlider() {
        const slider = document.getElementById('severity');
        const display = document.getElementById('severity-display');

        if (slider && display) {
            slider.addEventListener('input', (e) => {
                display.textContent = e.target.value;
            });
        }
    }

    setupModalEvents() {
        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', this.closeModals.bind(this));
        });

        // Modal background clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Emergency modal buttons
        document.getElementById('call-emergency')?.addEventListener('click', () => {
            window.location.href = 'tel:911'; // Default emergency number
        });

        document.getElementById('find-hospital')?.addEventListener('click', () => {
            this.findNearestHospital();
            this.closeModals();
        });

        document.getElementById('cancel-emergency')?.addEventListener('click', this.closeModals.bind(this));

        // Medication reminder buttons
        document.getElementById('mark-taken')?.addEventListener('click', () => {
            this.showToast('Medication marked as taken', 'success');
            this.closeModals();
        });

        document.getElementById('snooze-reminder')?.addEventListener('click', () => {
            this.showToast('Reminder snoozed for 10 minutes', 'info');
            this.closeModals();
        });

        document.getElementById('skip-dose')?.addEventListener('click', () => {
            this.showToast('Dose skipped', 'info');
            this.closeModals();
        });
    }

    // Utility methods
    scrollToTool(toolId) {
        const element = document.getElementById(toolId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    showLoadingSpinner(show) {
        const spinner = document.getElementById('loading-spinner');
        if (show) {
            spinner.classList.remove('hidden');
        } else {
            spinner.classList.add('hidden');
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'success' ? 'check' : 
                    type === 'danger' ? 'exclamation-triangle' : 
                    type === 'info' ? 'info-circle' : 'bell';
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    // Data persistence
    saveHealthData() {
        localStorage.setItem('healthData', JSON.stringify(this.healthData));
    }

    saveMedications() {
        localStorage.setItem('medications', JSON.stringify(this.medications));
    }

    saveEmergencyContacts() {
        localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
    }

    saveAllData() {
        this.saveHealthData();
        this.saveMedications();
        this.saveEmergencyContacts();
    }

    loadSavedData() {
        this.updateHealthSummary();
        this.updateVitalsChart();
        this.updateWeightChart();
        this.updateSymptomsDisplay();
        this.displayMedications();
        this.displayTodaysSchedule();
        this.displayEmergencyContacts();

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HealthToolsManager();
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
}

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
