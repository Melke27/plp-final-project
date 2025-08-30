/**
 * HealthConnect Platform - Contact Functionality
 * Handles contact form, FAQ, and chat functionality
 */

// Initialize contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
    initializeChat();
});

/**
 * Initialize contact form
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateContactField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    clearFieldError(this);
                }
            });
        });
    }
}

/**
 * Handle contact form submission
 */
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Validate form
    if (!validateContactForm(form)) {
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        document.getElementById('contact-success').style.display = 'block';
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to success message
        document.getElementById('contact-success').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Save inquiry for follow-up (in real app, this would go to backend)
        saveInquiry(new FormData(form));
        
    }, 2000);
}

/**
 * Validate contact form
 */
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateContactField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate individual contact field
 */
function validateContactField(field) {
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
    
    if (field.name === 'message' && field.value.trim().length < 10) {
        showFieldError(field, 'Please provide more details (at least 10 characters)');
        return false;
    }
    
    return true;
}

/**
 * Save inquiry data
 */
function saveInquiry(formData) {
    const inquiries = getFromLocalStorage('contactInquiries') || [];
    
    const inquiry = {
        id: generateInquiryId(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        inquiryType: formData.get('inquiryType'),
        message: formData.get('message'),
        updates: formData.get('updates') === 'on',
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    inquiries.push(inquiry);
    saveToLocalStorage('contactInquiries', inquiries);
    
    console.log('Inquiry saved:', inquiry);
}

/**
 * Generate unique inquiry ID
 */
function generateInquiryId() {
    return 'INQ' + Date.now() + Math.floor(Math.random() * 1000);
}

/**
 * Initialize FAQ functionality
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

/**
 * Toggle FAQ item
 */
function toggleFAQ(questionButton) {
    const faqItem = questionButton.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = questionButton.querySelector('i');
    
    const isExpanded = answer.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        answer.classList.remove('expanded');
        answer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Expand
        answer.classList.add('expanded');
        answer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
        
        // Smooth scroll to FAQ item
        setTimeout(() => {
            faqItem.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

/**
 * Initialize chat functionality
 */
function initializeChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
    }
    
    // Chat input handling
    const chatInput = document.getElementById('chat-message');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Initialize chat bot responses
    initializeChatBot();
}

/**
 * Toggle chat widget
 */
function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const notification = document.getElementById('chat-notification');
    
    if (chatWidget.classList.contains('open')) {
        closeChat();
    } else {
        openChat();
    }
}

/**
 * Open chat widget
 */
function openChat() {
    const chatWidget = document.getElementById('chat-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const notification = document.getElementById('chat-notification');
    
    chatWidget.classList.add('open');
    chatToggle.style.display = 'none';
    
    // Hide notification
    if (notification) {
        notification.style.display = 'none';
    }
    
    // Focus on input
    const chatInput = document.getElementById('chat-message');
    if (chatInput) {
        setTimeout(() => chatInput.focus(), 100);
    }
}

/**
 * Close chat widget
 */
function closeChat() {
    const chatWidget = document.getElementById('chat-widget');
    const chatToggle = document.getElementById('chat-toggle');
    
    chatWidget.classList.remove('open');
    chatToggle.style.display = 'flex';
}

/**
 * Send chat message
 */
function sendChatMessage() {
    const chatInput = document.getElementById('chat-message');
    const chatBody = document.getElementById('chat-body');
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addChatMessage(botResponse, 'bot');
    }, 1000);
}

/**
 * Add message to chat
 */
function addChatMessage(message, sender) {
    const chatBody = document.getElementById('chat-body');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p style="background: #2563eb; color: white;">${message}</p>
                <span class="message-time">${currentTime}</span>
            </div>
            <div class="message-avatar" style="background: #6b7280;">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${currentTime}</span>
            </div>
        `;
    }
    
    chatBody.appendChild(messageDiv);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

/**
 * Generate bot response
 */
function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple chatbot responses based on keywords
    if (message.includes('appointment') || message.includes('book')) {
        return "I can help you book an appointment! You can use our online booking system or I can transfer you to a booking specialist. Would you like me to guide you through the booking process?";
    } else if (message.includes('clinic') || message.includes('location')) {
        return "You can find all our mobile clinic locations and schedules on our 'Clinic Locations' page. We serve communities across Kenya including Nairobi, Turkana, Narok, and Kisumu counties. Which area are you interested in?";
    } else if (message.includes('emergency') || message.includes('urgent')) {
        return "For medical emergencies, please call 911 or 999 immediately. For urgent but non-life-threatening issues, you can call our health emergency line at +254 719 000 000. How can I help you further?";
    } else if (message.includes('service') || message.includes('what')) {
        return "Our mobile clinics provide general checkups, vaccinations, maternal care, child health services, emergency care, mental health support, and nutrition counseling. Services vary by location. What specific service are you looking for?";
    } else if (message.includes('cost') || message.includes('price') || message.includes('fee')) {
        return "Many of our basic health services are provided free of charge or at subsidized rates. Some specialized services may have minimal fees. We accept cash, mobile money, and health insurance. Would you like more information about specific services?";
    } else if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
        return "Hello! I'm here to help you with information about our mobile health clinic services. I can assist with booking appointments, finding clinic locations, or answering questions about our services. What would you like to know?";
    } else if (message.includes('thanks') || message.includes('thank you')) {
        return "You're welcome! Is there anything else I can help you with today? I'm here to assist with any questions about our mobile health clinic services.";
    } else {
        return "I understand you're asking about: '" + userMessage + "'. Let me connect you with a human agent who can provide more detailed assistance. In the meantime, you can also check our FAQ section or call our support line at +254 700 000 000.";
    }
}

/**
 * Initialize chatbot with predefined responses
 */
function initializeChatBot() {
    // Add quick response buttons
    setTimeout(() => {
        addQuickResponses();
    }, 2000);
}

/**
 * Add quick response buttons to chat
 */
function addQuickResponses() {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;
    
    const quickResponsesDiv = document.createElement('div');
    quickResponsesDiv.className = 'quick-responses';
    quickResponsesDiv.innerHTML = `
        <div class="quick-response-label">Quick actions:</div>
        <div class="quick-response-buttons">
            <button class="quick-btn" onclick="handleQuickResponse('book appointment')">
                <i class="fas fa-calendar-plus"></i> Book Appointment
            </button>
            <button class="quick-btn" onclick="handleQuickResponse('find clinics')">
                <i class="fas fa-map-marker-alt"></i> Find Clinics
            </button>
            <button class="quick-btn" onclick="handleQuickResponse('emergency')">
                <i class="fas fa-exclamation-triangle"></i> Emergency
            </button>
            <button class="quick-btn" onclick="handleQuickResponse('health resources')">
                <i class="fas fa-book-medical"></i> Health Info
            </button>
        </div>
    `;
    
    chatBody.appendChild(quickResponsesDiv);
    
    // Add styles for quick responses
    addQuickResponseStyles();
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

/**
 * Handle quick response selection
 */
function handleQuickResponse(response) {
    // Simulate user clicking the quick response
    addChatMessage(response, 'user');
    
    // Generate and send bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(response);
        addChatMessage(botResponse, 'bot');
        
        // Add relevant action button
        addActionButton(response);
    }, 800);
}

/**
 * Add action button based on response
 */
function addActionButton(response) {
    const chatBody = document.getElementById('chat-body');
    
    let actionButton = '';
    
    switch (response) {
        case 'book appointment':
            actionButton = `
                <div class="chat-action">
                    <a href="appointment-booking.html" class="btn btn-primary">
                        <i class="fas fa-calendar-plus"></i> Go to Booking Page
                    </a>
                </div>
            `;
            break;
        case 'find clinics':
            actionButton = `
                <div class="chat-action">
                    <a href="clinic-locations.html" class="btn btn-primary">
                        <i class="fas fa-map"></i> View Clinic Locations
                    </a>
                </div>
            `;
            break;
        case 'emergency':
            actionButton = `
                <div class="chat-action">
                    <div class="emergency-contacts-mini">
                        <p><strong>Emergency Numbers:</strong></p>
                        <p><a href="tel:911">911</a> | <a href="tel:999">999</a> | <a href="tel:+254719000000">+254 719 000 000</a></p>
                    </div>
                </div>
            `;
            break;
        case 'health resources':
            actionButton = `
                <div class="chat-action">
                    <a href="health-resources.html" class="btn btn-primary">
                        <i class="fas fa-book-medical"></i> Browse Health Resources
                    </a>
                </div>
            `;
            break;
    }
    
    if (actionButton) {
        const actionDiv = document.createElement('div');
        actionDiv.innerHTML = actionButton;
        chatBody.appendChild(actionDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

/**
 * Add styles for quick responses and actions
 */
function addQuickResponseStyles() {
    if (!document.querySelector('.chat-quick-response-styles')) {
        const style = document.createElement('style');
        style.className = 'chat-quick-response-styles';
        style.textContent = `
            .quick-responses {
                margin: 1rem 0;
                padding: 1rem;
                background: #f9fafb;
                border-radius: 0.5rem;
                border: 1px solid #e5e7eb;
            }
            
            .quick-response-label {
                font-size: 0.875rem;
                color: #6b7280;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }
            
            .quick-response-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
            }
            
            .quick-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 0.375rem;
                cursor: pointer;
                font-size: 0.75rem;
                transition: all 0.15s ease;
            }
            
            .quick-btn:hover {
                background: #2563eb;
                color: white;
                border-color: #2563eb;
            }
            
            .chat-action {
                text-align: center;
                margin: 1rem 0;
            }
            
            .chat-action .btn {
                font-size: 0.875rem;
                padding: 0.5rem 1rem;
            }
            
            .emergency-contacts-mini {
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid #ef4444;
                border-radius: 0.5rem;
                padding: 1rem;
                text-align: center;
            }
            
            .emergency-contacts-mini p {
                margin: 0.25rem 0;
                font-size: 0.875rem;
            }
            
            .emergency-contacts-mini a {
                color: #ef4444;
                font-weight: 600;
                text-decoration: none;
            }
            
            .emergency-contacts-mini a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Chat analytics and insights
 */
function trackChatInteraction(action, data = {}) {
    const interaction = {
        action,
        data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    // In a real application, send to analytics service
    console.log('Chat interaction:', interaction);
}

/**
 * FAQ search functionality
 */
function searchFAQ(searchTerm) {
    const faqItems = document.querySelectorAll('.faq-item');
    let foundResults = false;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (question.includes(searchTerm.toLowerCase()) || answer.includes(searchTerm.toLowerCase())) {
            item.style.display = 'block';
            item.style.background = 'rgba(37, 99, 235, 0.05)';
            foundResults = true;
            
            // Auto-expand matching FAQ
            const faqAnswer = item.querySelector('.faq-answer');
            const faqQuestion = item.querySelector('.faq-question');
            if (!faqAnswer.classList.contains('expanded')) {
                toggleFAQ(faqQuestion);
            }
        } else {
            item.style.display = 'none';
            item.style.background = '';
        }
    });
    
    return foundResults;
}

/**
 * Partnership form handling
 */
function openPartnershipForm() {
    const modal = document.createElement('div');
    modal.className = 'partnership-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Partnership Opportunities</h3>
                <button class="modal-close" onclick="this.closest('.partnership-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>We're always looking for partners to help expand mobile health services to underserved communities.</p>
                
                <h4>Partnership Types:</h4>
                <ul>
                    <li><strong>Healthcare Organizations:</strong> Collaborate on service delivery</li>
                    <li><strong>NGOs & Nonprofits:</strong> Community outreach partnerships</li>
                    <li><strong>Government Agencies:</strong> Policy and funding collaboration</li>
                    <li><strong>Technology Partners:</strong> Platform development and innovation</li>
                    <li><strong>Corporate Sponsors:</strong> Funding and resource support</li>
                </ul>
                
                <h4>Get Started:</h4>
                <p>To explore partnership opportunities, please contact us with details about your organization and how you'd like to collaborate.</p>
            </div>
            <div class="modal-footer">
                <button onclick="fillPartnershipForm()" class="btn btn-primary">Contact Us About Partnership</button>
                <button onclick="this.closest('.partnership-modal').remove()" class="btn btn-outline">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

/**
 * Fill partnership form
 */
function fillPartnershipForm() {
    // Close partnership modal
    document.querySelector('.partnership-modal').remove();
    
    // Pre-fill contact form
    const inquiryType = document.getElementById('inquiry-type');
    if (inquiryType) {
        inquiryType.value = 'partnership';
    }
    
    const messageField = document.getElementById('contact-message');
    if (messageField) {
        messageField.value = 'I am interested in exploring partnership opportunities with HealthConnect. Please provide more information about how we can collaborate to bring mobile health services to underserved communities.\n\nOrganization: \nType of Partnership: \nContact Person: \nAdditional Details: ';
        messageField.focus();
    }
    
    // Scroll to contact form
    document.querySelector('.contact-form-container').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    showSuccessMessage('Partnership inquiry template added to contact form');
}

/**
 * Support ticket system (basic)
 */
function createSupportTicket(inquiry) {
    const ticket = {
        id: generateTicketId(),
        ...inquiry,
        status: 'open',
        priority: determinePriority(inquiry.inquiryType),
        createdAt: new Date().toISOString()
    };
    
    // Save ticket
    const tickets = getFromLocalStorage('supportTickets') || [];
    tickets.push(ticket);
    saveToLocalStorage('supportTickets', tickets);
    
    return ticket;
}

/**
 * Generate ticket ID
 */
function generateTicketId() {
    const prefix = 'HC';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${prefix}${timestamp}${random}`;
}

/**
 * Determine ticket priority
 */
function determinePriority(inquiryType) {
    const priorityMap = {
        'emergency': 'high',
        'booking': 'medium',
        'technical': 'medium',
        'clinic-request': 'high',
        'general': 'low',
        'feedback': 'low',
        'partnership': 'medium'
    };
    
    return priorityMap[inquiryType] || 'low';
}

/**
 * Knowledge base search for chat responses
 */
const knowledgeBase = {
    'booking': {
        keywords: ['book', 'appointment', 'schedule', 'reserve'],
        response: "To book an appointment, visit our booking page where you can select your preferred service, clinic location, and time slot. The process takes just a few minutes!"
    },
    'locations': {
        keywords: ['location', 'clinic', 'where', 'find', 'near'],
        response: "We have mobile clinics serving communities across Kenya. Check our Clinic Locations page to see schedules and find the nearest clinic to you."
    },
    'services': {
        keywords: ['service', 'treatment', 'care', 'what', 'do'],
        response: "We offer general checkups, vaccinations, maternal care, child health, emergency care, mental health support, and nutrition counseling."
    },
    'emergency': {
        keywords: ['emergency', 'urgent', 'help', 'crisis'],
        response: "For emergencies, call 911 or 999. For health emergencies, call +254 719 000 000. Our emergency contacts are also listed on the contact page."
    }
};

/**
 * Search knowledge base for relevant response
 */
function searchKnowledgeBase(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [category, data] of Object.entries(knowledgeBase)) {
        if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return data.response;
        }
    }
    
    return null;
}

/**
 * Export functions for global use
 */
window.ContactFunctions = {
    toggleFAQ,
    toggleChat,
    openChat,
    closeChat,
    sendChatMessage,
    openPartnershipForm,
    searchFAQ
};
