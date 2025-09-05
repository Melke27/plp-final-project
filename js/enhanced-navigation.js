/**
 * Enhanced Navigation System with Animations
 * ==========================================
 * Handles all navigation interactions, animations, and responsive behavior
 */

class EnhancedNavigation {
  constructor() {
    this.init();
    this.bindEvents();
    this.setupScrollEffects();
    this.setupProgressBar();
    this.setupBreadcrumbs();
    this.setupSearch();
    this.setupFAB();
    this.loadActiveStates();
  }

  init() {
    // Create navigation elements if they don't exist
    this.createNavigationHTML();
    
    // Get DOM elements
    this.header = document.querySelector('.header');
    this.navToggle = document.querySelector('.nav-toggle');
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarOverlay = document.querySelector('.sidebar-overlay');
    this.navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
    this.progressBar = document.querySelector('.nav-progress-bar');
    this.fab = document.querySelector('.fab');
    this.searchInput = document.querySelector('.nav-search input');
    
    // State management
    this.isMenuOpen = false;
    this.currentPage = this.getCurrentPage();
    this.scrollPosition = 0;
  }

  createNavigationHTML() {
    const existingHeader = document.querySelector('.header');
    if (existingHeader) return; // Don't create if already exists

    const navigationHTML = `
      <!-- Enhanced Header -->
      <header class="header">
        <nav class="navbar">
          <div class="nav-container">
            <!-- Logo -->
            <a href="index.html" class="nav-logo">
              <i class="fas fa-heartbeat"></i>
              <span>HealthConnect</span>
            </a>

            <!-- Desktop Search -->
            <div class="nav-search">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Search health resources..." />
            </div>

            <!-- Desktop Navigation Menu -->
            <ul class="nav-menu">
              <li class="nav-item">
                <a href="clinic-locations.html" class="nav-link">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>Map</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="about.html" class="nav-link">
                  <i class="fas fa-info-circle"></i>
                  <span>About</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="contact.html" class="nav-link">
                  <i class="fas fa-envelope"></i>
                  <span>Contact</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="settings.html" class="nav-link">
                  <i class="fas fa-cog"></i>
                  <span>Settings</span>
                </a>
              </li>
            </ul>

            <!-- Mobile Menu Toggle -->
            <button class="nav-toggle" aria-label="Toggle navigation menu">
              <div class="hamburger"></div>
              <div class="hamburger"></div>
              <div class="hamburger"></div>
            </button>
          </div>
        </nav>
        
        <!-- Progress Bar -->
        <div class="nav-progress">
          <div class="nav-progress-bar"></div>
        </div>
      </header>

      <!-- Mobile Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <i class="fas fa-heartbeat"></i>
            <span>HealthConnect</span>
          </div>
          <p class="sidebar-tagline">Connecting you to better health</p>
        </div>

        <!-- Quick Actions -->
        <div class="sidebar-quick-actions">
          <button class="quick-action-btn emergency">
            <i class="fas fa-phone"></i>
            Emergency Call
          </button>
          <button class="quick-action-btn">
            <i class="fas fa-calendar"></i>
            Book Appointment
          </button>
        </div>

        <nav class="sidebar-nav">
          <!-- Main Navigation -->
          <div class="sidebar-section">
            <h3 class="sidebar-section-title">Navigation</h3>
            <ul class="sidebar-menu">
              <li class="sidebar-item">
                <a href="index.html" class="sidebar-link">
                  <i class="fas fa-home"></i>
                  <span>Home</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="services.html" class="sidebar-link">
                  <i class="fas fa-stethoscope"></i>
                  <span>Services</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="health-tools.html" class="sidebar-link">
                  <i class="fas fa-tools"></i>
                  <span>Health Tools</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="health-blog.html" class="sidebar-link">
                  <i class="fas fa-newspaper"></i>
                  <span>Health Blog</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="about.html" class="sidebar-link">
                  <i class="fas fa-info-circle"></i>
                  <span>About</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="contact.html" class="sidebar-link">
                  <i class="fas fa-envelope"></i>
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Health Resources -->
          <div class="sidebar-section">
            <h3 class="sidebar-section-title">Health Resources</h3>
            <ul class="sidebar-menu">
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fas fa-heartbeat"></i>
                  <span>Symptom Checker</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fas fa-pills"></i>
                  <span>Medication Guide</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fas fa-user-md"></i>
                  <span>Find Doctor</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fas fa-hospital"></i>
                  <span>Hospital Locator</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Account -->
          <div class="sidebar-section">
            <h3 class="sidebar-section-title">Account</h3>
            <ul class="sidebar-menu">
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fas fa-user"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="settings.html" class="sidebar-link">
                  <i class="fas fa-cog"></i>
                  <span>Settings</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="#" class="sidebar-link">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-social">
            <a href="#" class="sidebar-social-link" title="Facebook">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" class="sidebar-social-link" title="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="sidebar-social-link" title="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="sidebar-social-link" title="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
          <p class="sidebar-credit">© 2024 HealthConnect</p>
        </div>
      </aside>

      <!-- Sidebar Overlay -->
      <div class="sidebar-overlay"></div>

      <!-- Floating Action Button -->
      <button class="fab" title="Quick Actions">
        <i class="fas fa-plus"></i>
      </button>
    `;

    // Insert at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navigationHTML);
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Sidebar overlay click
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => this.closeMobileMenu());
    }

    // Escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Navigation link clicks
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavigation(e));
    });

    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
      this.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.performSearch(e.target.value);
        }
      });
    }

    // FAB functionality
    if (this.fab) {
      this.fab.addEventListener('click', () => this.showQuickActions());
    }

    // Quick action buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-action-btn')) {
        this.handleQuickAction(e.target);
      }
    });

    // Window resize
    window.addEventListener('resize', () => this.handleResize());

    // Page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.saveState();
      } else {
        this.loadActiveStates();
      }
    });
  }

  setupScrollEffects() {
    let ticking = false;

    const updateScrollEffects = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - this.scrollPosition;
      this.scrollPosition = scrollY;

      // Header shadow and backdrop effect
      if (this.header) {
        if (scrollY > 50) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }

        // Hide/show header based on scroll direction (optional)
        if (scrollDelta > 0 && scrollY > 100) {
          // Scrolling down
          this.header.style.transform = 'translateY(-100%)';
        } else if (scrollDelta < 0) {
          // Scrolling up
          this.header.style.transform = 'translateY(0)';
        }
      }

      // Show/hide FAB
      if (this.fab) {
        if (scrollY > 300) {
          this.fab.classList.add('show');
        } else {
          this.fab.classList.remove('show');
        }
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }

  setupProgressBar() {
    if (!this.progressBar) return;

    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
  }

  setupBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb-nav');
    if (!breadcrumbContainer) {
      // Create breadcrumb container if it doesn't exist
      const breadcrumbHTML = `
        <div class="breadcrumb-nav">
          <div class="container">
            <ol class="breadcrumb" id="breadcrumb-list">
              <!-- Breadcrumbs will be inserted here -->
            </ol>
          </div>
        </div>
      `;
      
      // Insert after header
      if (this.header) {
        this.header.insertAdjacentHTML('afterend', breadcrumbHTML);
      }
    }

    this.updateBreadcrumbs();
  }

  updateBreadcrumbs() {
    const breadcrumbList = document.getElementById('breadcrumb-list');
    if (!breadcrumbList) return;

    const path = window.location.pathname;
    const pathSegments = path.split('/').filter(segment => segment);
    
    let breadcrumbs = [
      { name: 'Home', url: 'index.html', icon: 'fas fa-home' }
    ];

    // Add current page breadcrumb
    const currentPage = this.getCurrentPageInfo();
    if (currentPage && currentPage.name !== 'Home') {
      breadcrumbs.push(currentPage);
    }

    // Generate breadcrumb HTML
    const breadcrumbHTML = breadcrumbs.map((crumb, index) => {
      const isLast = index === breadcrumbs.length - 1;
      return `
        <li class="breadcrumb-item">
          ${index > 0 ? '<i class="breadcrumb-separator fas fa-chevron-right"></i>' : ''}
          <a href="${crumb.url}" class="breadcrumb-link">
            <i class="${crumb.icon}"></i>
            ${crumb.name}
          </a>
        </li>
      `;
    }).join('');

    breadcrumbList.innerHTML = breadcrumbHTML;
  }

  setupSearch() {
    // Setup search suggestions and functionality
    this.searchSuggestions = [
      { name: 'Find Doctor', url: '#', category: 'Services' },
      { name: 'Book Appointment', url: '#', category: 'Services' },
      { name: 'Symptom Checker', url: 'health-tools.html', category: 'Tools' },
      { name: 'Medication Reminders', url: 'health-tools.html', category: 'Tools' },
      { name: 'Emergency Contacts', url: 'health-tools.html', category: 'Tools' },
      { name: 'Health Resources', url: '#', category: 'Information' },
      { name: 'Contact Us', url: 'contact.html', category: 'Support' }
    ];
  }

  setupFAB() {
    // Floating Action Button functionality
    this.fabActions = [
      { name: 'Emergency Call', icon: 'fas fa-phone', action: 'emergency', class: 'emergency' },
      { name: 'Book Appointment', icon: 'fas fa-calendar', action: 'appointment' },
      { name: 'Find Doctor', icon: 'fas fa-user-md', action: 'doctor' },
      { name: 'Health Tools', icon: 'fas fa-tools', action: 'tools' }
    ];
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    this.isMenuOpen = true;
    this.navToggle?.classList.add('active');
    this.sidebar?.classList.add('open');
    this.sidebarOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add staggered animation to sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach((link, index) => {
      link.style.transitionDelay = `${0.1 + index * 0.05}s`;
    });

    // Announce to screen readers
    this.announceToScreenReader('Navigation menu opened');
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.navToggle?.classList.remove('active');
    this.sidebar?.classList.remove('open');
    this.sidebarOverlay?.classList.remove('active');
    document.body.style.overflow = '';

    // Reset transition delays
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
      link.style.transitionDelay = '';
    });

    // Announce to screen readers
    this.announceToScreenReader('Navigation menu closed');
  }

  handleNavigation(e) {
    const link = e.target.closest('a');
    if (!link) return;

    // Close mobile menu if open
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Add loading animation
    link.classList.add('nav-loading');
    
    // Remove loading animation after a short delay
    setTimeout(() => {
      link.classList.remove('nav-loading');
    }, 500);

    // Update active states
    this.updateActiveStates(link.getAttribute('href'));
    
    // Save navigation state
    this.saveState();
  }

  handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
      this.hideSearchSuggestions();
      return;
    }

    const matches = this.searchSuggestions.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    this.showSearchSuggestions(matches, query);
  }

  showSearchSuggestions(matches, query) {
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
      existingSuggestions.remove();
    }

    if (matches.length === 0) return;

    const searchContainer = document.querySelector('.nav-search');
    if (!searchContainer) return;

    const suggestionsHTML = `
      <div class="search-suggestions">
        <div class="search-suggestions-header">
          <span>Search Results for "${query}"</span>
        </div>
        <div class="search-suggestions-list">
          ${matches.map(match => `
            <a href="${match.url}" class="search-suggestion-item">
              <div class="search-suggestion-content">
                <span class="search-suggestion-name">${match.name}</span>
                <span class="search-suggestion-category">${match.category}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;

    searchContainer.insertAdjacentHTML('afterend', suggestionsHTML);

    // Add click handlers to suggestions
    const suggestionItems = document.querySelectorAll('.search-suggestion-item');
    suggestionItems.forEach(item => {
      item.addEventListener('click', () => {
        this.hideSearchSuggestions();
        if (this.searchInput) {
          this.searchInput.value = '';
        }
      });
    });
  }

  hideSearchSuggestions() {
    const suggestions = document.querySelector('.search-suggestions');
    if (suggestions) {
      suggestions.remove();
    }
  }

  performSearch(query) {
    // Implement actual search functionality
    console.log('Performing search for:', query);
    
    // For now, redirect to a search results page or show results
    // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    
    this.hideSearchSuggestions();
    this.showToast(`Searching for "${query}"...`, 'info');
  }

  showQuickActions() {
    // Create quick actions modal/popup
    const existingModal = document.querySelector('.quick-actions-modal');
    if (existingModal) {
      existingModal.remove();
    }

    const modalHTML = `
      <div class="quick-actions-modal">
        <div class="quick-actions-content">
          <div class="quick-actions-header">
            <h3>Quick Actions</h3>
            <button class="close-quick-actions" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="quick-actions-grid">
            ${this.fabActions.map(action => `
              <button class="quick-action-item ${action.class || ''}" data-action="${action.action}">
                <i class="${action.icon}"></i>
                <span>${action.name}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="quick-actions-overlay"></div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Bind events
    const modal = document.querySelector('.quick-actions-modal');
    const closeBtn = modal.querySelector('.close-quick-actions');
    const overlay = modal.querySelector('.quick-actions-overlay');
    const actionItems = modal.querySelectorAll('.quick-action-item');

    const closeModal = () => modal.remove();

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    actionItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const action = e.currentTarget.dataset.action;
        this.handleQuickAction(e.currentTarget);
        closeModal();
      });
    });

    // Animate in
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });
  }

  handleQuickAction(button) {
    const actionType = button.dataset.action || button.textContent.toLowerCase().trim();
    
    switch (actionType) {
      case 'emergency':
        this.handleEmergencyCall();
        break;
      case 'appointment':
        this.handleBookAppointment();
        break;
      case 'doctor':
        this.handleFindDoctor();
        break;
      case 'tools':
        window.location.href = 'health-tools.html';
        break;
      default:
        this.showToast(`${button.textContent} feature coming soon!`, 'info');
    }
  }

  handleEmergencyCall() {
    const emergencyNumbers = {
      'Kenya': '999',
      'Uganda': '999',
      'Tanzania': '999',
      'Rwanda': '912',
      'Global': '112'
    };

    const confirmCall = confirm('Do you want to call emergency services?\n\nThis will dial your local emergency number.');
    
    if (confirmCall) {
      // In a real app, this would initiate a phone call
      window.location.href = `tel:${emergencyNumbers.Kenya}`;
      this.showToast('Calling emergency services...', 'emergency');
    }
  }

  handleBookAppointment() {
    this.showToast('Redirecting to appointment booking...', 'info');
    // In a real app, redirect to appointment booking page
    // window.location.href = 'appointments.html';
  }

  handleFindDoctor() {
    this.showToast('Searching for nearby doctors...', 'info');
    // In a real app, redirect to doctor finder page
    // window.location.href = 'find-doctor.html';
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '');
  }

  getCurrentPageInfo() {
    const pages = {
      'index': { name: 'Home', url: 'index.html', icon: 'fas fa-home' },
      'services': { name: 'Services', url: 'services.html', icon: 'fas fa-stethoscope' },
      'health-tools': { name: 'Health Tools', url: 'health-tools.html', icon: 'fas fa-tools' },
      'health-blog': { name: 'Health Blog', url: 'health-blog.html', icon: 'fas fa-newspaper' },
      'about': { name: 'About', url: 'about.html', icon: 'fas fa-info-circle' },
      'contact': { name: 'Contact', url: 'contact.html', icon: 'fas fa-envelope' },
      'clinic-locations': { name: 'Map', url: 'clinic-locations.html', icon: 'fas fa-map-marker-alt' },
      'settings': { name: 'Settings', url: 'settings.html', icon: 'fas fa-cog' }
    };

    return pages[this.getCurrentPage()] || pages['index'];
  }

  updateActiveStates(activeHref) {
    // Remove all active states
    this.navLinks.forEach(link => link.classList.remove('active'));

    // Add active state to current page links
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === activeHref || 
          (activeHref === 'index.html' && (href === '/' || href === 'index.html')) ||
          (window.location.pathname.includes(href) && href !== '#')) {
        link.classList.add('active');
      }
    });
  }

  loadActiveStates() {
    const currentPage = this.getCurrentPage();
    const activeHref = currentPage === 'index' ? 'index.html' : `${currentPage}.html`;
    this.updateActiveStates(activeHref);
  }

  saveState() {
    const state = {
      currentPage: this.getCurrentPage(),
      scrollPosition: window.scrollY,
      timestamp: Date.now()
    };
    
    localStorage.setItem('nav_state', JSON.stringify(state));
  }

  loadState() {
    const savedState = localStorage.getItem('nav_state');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return null;
  }

  showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.nav-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `nav-toast nav-toast-${type}`;
    toast.innerHTML = `
      <div class="nav-toast-content">
        <i class="fas fa-${type === 'emergency' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Public API methods
  navigate(url) {
    window.location.href = url;
  }

  setActiveNavItem(href) {
    this.updateActiveStates(href);
  }

  showNotification(message, type) {
    this.showToast(message, type);
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.HealthConnectNav = new EnhancedNavigation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedNavigation;
}
