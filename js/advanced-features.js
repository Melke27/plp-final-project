// Advanced Features for Healthcare Platform
// Enhanced user experience and modern functionality

class AdvancedFeatures {
    constructor() {
        this.init();
        this.setupDarkMode();
        this.setupNotifications();
        this.setupSearch();
        this.setupOfflineMode();
        this.setupGeolocation();
        this.setupVoiceSearch();
        this.setupChatbot();
    }

    init() {
        console.log('🚀 Initializing Advanced Features...');
        this.setupProgressiveLoading();
        this.setupAccessibility();
        this.setupPerformanceOptimizations();
    }

    // 🌙 Dark/Light Mode Toggle
    setupDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Smooth transition
                document.documentElement.style.setProperty('--transition-speed', '0.3s');
                
                this.showNotification(`Switched to ${newTheme} mode`, 'success');
            });
        }
    }

    // 🔔 Smart Notifications System
    setupNotifications() {
        this.notifications = [];
        this.createNotificationContainer();
        
        // Request permission for browser notifications
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    createNotificationContainer() {
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        const container = document.getElementById('notification-container');
        container.appendChild(notification);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
        
        // Browser notification for important alerts
        if (type === 'success' || type === 'warning') {
            this.sendBrowserNotification(message);
        }
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    sendBrowserNotification(message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('HealthConnect Platform', {
                body: message,
                icon: '/images/logo.png',
                badge: '/images/badge.png'
            });
        }
    }

    // 🔍 Advanced Search with Auto-complete
    setupSearch() {
        const searchInput = document.getElementById('globalSearch');
        if (!searchInput) return;

        let searchTimeout;
        const searchResults = this.createSearchResultsContainer();
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query, searchResults);
            }, 300);
        });
        
        // Hide search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    createSearchResultsContainer() {
        let container = document.getElementById('search-results');
        if (!container) {
            container = document.createElement('div');
            container.id = 'search-results';
            container.className = 'search-results-container';
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) {
                searchInput.parentElement.appendChild(container);
            }
        }
        return container;
    }

    async performSearch(query, resultsContainer) {
        // Simulate search data - replace with real API call
        const searchData = [
            { title: 'Find Nearby Clinics', url: '/clinic-locations.html', type: 'service' },
            { title: 'Book Appointment', url: '/appointment-booking.html', type: 'service' },
            { title: 'Health Tools', url: '/health-tools.html', type: 'tool' },
            { title: 'Community Stories', url: '/community-stories.html', type: 'content' },
            { title: 'Emergency Contact', url: '/contact.html', type: 'contact' },
            { title: 'Health Blog', url: '/health-blog.html', type: 'content' }
        ];
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displaySearchResults(results, resultsContainer);
    }

    displaySearchResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<div class="search-no-results">No results found</div>';
        } else {
            container.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="window.location.href='${result.url}'">
                    <span class="search-result-icon">${this.getSearchIcon(result.type)}</span>
                    <span class="search-result-title">${result.title}</span>
                    <span class="search-result-type">${result.type}</span>
                </div>
            `).join('');
        }
        container.style.display = 'block';
    }

    getSearchIcon(type) {
        const icons = {
            service: '🏥',
            tool: '🛠️',
            content: '📖',
            contact: '📞'
        };
        return icons[type] || '📄';
    }

    // 📱 Offline Mode with Service Worker
    setupOfflineMode() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('✅ Service Worker registered');
                        this.showNotification('App is now available offline!', 'success');
                    })
                    .catch(error => {
                        console.log('❌ Service Worker registration failed');
                    });
            });
        }
        
        // Online/Offline status
        window.addEventListener('online', () => {
            this.showNotification('You are back online!', 'success');
            document.body.classList.remove('offline-mode');
        });
        
        window.addEventListener('offline', () => {
            this.showNotification('You are offline. Some features may be limited.', 'warning');
            document.body.classList.add('offline-mode');
        });
    }

    // 📍 Geolocation for Nearby Services
    setupGeolocation() {
        const locationBtn = document.getElementById('findNearbyBtn');
        if (locationBtn) {
            locationBtn.addEventListener('click', () => {
                this.getCurrentLocation();
            });
        }
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            this.showNotification('Getting your location...', 'info');
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.findNearbyServices(latitude, longitude);
                },
                (error) => {
                    this.showNotification('Unable to get your location. Please enable location services.', 'error');
                },
                { timeout: 10000, enableHighAccuracy: true }
            );
        } else {
            this.showNotification('Geolocation is not supported by this browser.', 'error');
        }
    }

    async findNearbyServices(lat, lng) {
        // Simulate nearby services - replace with real API
        const nearbyServices = [
            { name: 'Central Health Clinic', distance: '0.8 km', type: 'clinic' },
            { name: 'Community Health Center', distance: '1.2 km', type: 'center' },
            { name: 'Mobile Health Unit', distance: '2.1 km', type: 'mobile' }
        ];
        
        this.displayNearbyServices(nearbyServices);
    }

    displayNearbyServices(services) {
        const modal = this.createModal('Nearby Health Services', `
            <div class="nearby-services">
                ${services.map(service => `
                    <div class="service-item">
                        <span class="service-icon">${service.type === 'mobile' ? '🚐' : '🏥'}</span>
                        <div class="service-info">
                            <h4>${service.name}</h4>
                            <p>📍 ${service.distance} away</p>
                        </div>
                        <button class="btn-primary" onclick="this.getDirections('${service.name}')">
                            Get Directions
                        </button>
                    </div>
                `).join('')}
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    // 🎤 Voice Search
    setupVoiceSearch() {
        const voiceBtn = document.getElementById('voiceSearchBtn');
        if (!voiceBtn || !('webkitSpeechRecognition' in window)) return;
        
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        voiceBtn.addEventListener('click', () => {
            recognition.start();
            voiceBtn.classList.add('listening');
            this.showNotification('Listening... Speak now!', 'info');
        });
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) {
                searchInput.value = transcript;
                this.performSearch(transcript, this.createSearchResultsContainer());
            }
            voiceBtn.classList.remove('listening');
        };
        
        recognition.onerror = () => {
            voiceBtn.classList.remove('listening');
            this.showNotification('Voice search failed. Please try again.', 'error');
        };
    }

    // 🤖 Simple Chatbot
    setupChatbot() {
        const chatbotBtn = document.getElementById('chatbotBtn');
        if (chatbotBtn) {
            chatbotBtn.addEventListener('click', () => {
                this.openChatbot();
            });
        }
    }

    openChatbot() {
        const chatModal = this.createModal('Health Assistant', `
            <div class="chatbot-container">
                <div class="chat-messages" id="chatMessages">
                    <div class="bot-message">
                        <span class="bot-icon">🤖</span>
                        <div class="message-content">
                            Hi! I'm your health assistant. How can I help you today?
                            <div class="quick-actions">
                                <button onclick="advancedFeatures.sendChatMessage('Find nearby clinics')">Find Clinics</button>
                                <button onclick="advancedFeatures.sendChatMessage('Book appointment')">Book Appointment</button>
                                <button onclick="advancedFeatures.sendChatMessage('Emergency help')">Emergency</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" id="chatInput" placeholder="Type your message...">
                    <button onclick="advancedFeatures.sendChatMessage()">Send</button>
                </div>
            </div>
        `);
        
        document.body.appendChild(chatModal);
        
        const chatInput = document.getElementById('chatInput');
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage();
            }
        });
    }

    sendChatMessage(message = null) {
        const chatInput = document.getElementById('chatInput');
        const userMessage = message || chatInput.value.trim();
        
        if (!userMessage) return;
        
        const chatMessages = document.getElementById('chatMessages');
        
        // Add user message
        chatMessages.innerHTML += `
            <div class="user-message">
                <div class="message-content">${userMessage}</div>
                <span class="user-icon">👤</span>
            </div>
        `;
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = this.getBotResponse(userMessage);
            chatMessages.innerHTML += `
                <div class="bot-message">
                    <span class="bot-icon">🤖</span>
                    <div class="message-content">${botResponse}</div>
                </div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        if (chatInput) chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    getBotResponse(userMessage) {
        const responses = {
            'find nearby clinics': 'I can help you find nearby clinics! <a href="/clinic-locations.html">Click here</a> to see all available locations.',
            'book appointment': 'Ready to book an appointment? <a href="/appointment-booking.html">Let\'s get started!</a>',
            'emergency help': '🚨 For emergencies, call 911 immediately. For non-emergency health concerns, <a href="/contact.html">contact us here</a>.',
            'default': 'I understand you need help with that. You can explore our services or <a href="/contact.html">contact our support team</a> for personalized assistance.'
        };
        
        const key = userMessage.toLowerCase();
        return responses[key] || responses.default;
    }

    // 🎨 Progressive Loading & Performance
    setupProgressiveLoading() {
        // Lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Loading progress indicator
        this.createLoadingIndicator();
    }

    createLoadingIndicator() {
        const loader = document.createElement('div');
        loader.id = 'pageLoader';
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Loading HealthConnect...</p>
            </div>
        `;
        document.body.appendChild(loader);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }, 500);
        });
    }

    // ♿ Accessibility Enhancements
    setupAccessibility() {
        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        // High contrast mode
        const highContrastBtn = document.getElementById('highContrastBtn');
        if (highContrastBtn) {
            highContrastBtn.addEventListener('click', () => {
                document.body.classList.toggle('high-contrast');
                localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
            });
        }
        
        // Load saved accessibility preferences
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
        }
    }

    handleKeyboardNavigation(e) {
        // Escape key closes modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.remove());
        }
    }

    // ⚡ Performance Optimizations
    setupPerformanceOptimizations() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16);
        });
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        const criticalResources = [
            '/css/styles.css',
            '/js/main.js',
            '/images/logo.png'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 
                     resource.endsWith('.js') ? 'script' : 'image';
            document.head.appendChild(link);
        });
    }

    handleScroll() {
        // Smooth scroll to top button
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        if (scrollToTopBtn) {
            scrollToTopBtn.style.display = scrollTop > 500 ? 'block' : 'none';
        }
    }

    // 🛠️ Utility Functions
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }
}

// Initialize advanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.advancedFeatures = new AdvancedFeatures();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedFeatures;
}
