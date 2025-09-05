/**
 * Health Blog JavaScript
 * ======================
 * Handles all blog functionality including search, filtering, carousel, and dynamic content
 */

class HealthBlogManager {
  constructor() {
    this.currentCategory = 'all';
    this.currentTipIndex = 0;
    this.articlesPerPage = 9;
    this.currentPage = 1;
    this.searchQuery = '';
    
    this.articles = this.generateArticles();
    this.healthTips = this.generateHealthTips();
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderArticles();
    this.setupHealthTipsCarousel();
    this.startAutoCarousel();
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.currentPage = 1;
        this.renderArticles();
      });
    }
    
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        this.performSearch();
      });
    }

    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleCategoryFilter(e.target);
      });
    });

    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMoreArticles();
      });
    }

    // Newsletter subscription
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        this.handleNewsletterSubscription(e);
      });
    }

    // Health tips carousel controls
    const tipsNext = document.getElementById('tips-next');
    const tipsPrev = document.getElementById('tips-prev');
    
    if (tipsNext) {
      tipsNext.addEventListener('click', () => {
        this.nextTip();
      });
    }
    
    if (tipsPrev) {
      tipsPrev.addEventListener('click', () => {
        this.prevTip();
      });
    }

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevTip();
      } else if (e.key === 'ArrowRight') {
        this.nextTip();
      }
    });
  }

  generateArticles() {
    return [
      {
        id: 1,
        title: "Understanding Malaria: Prevention and Treatment in East Africa",
        excerpt: "Comprehensive guide to malaria prevention including bed nets, medication, and environmental control measures.",
        category: "prevention",
        readTime: "8 min",
        date: "2024-12-15",
        tags: ["Malaria", "Prevention", "East Africa"],
        icon: "fas fa-shield-virus"
      },
      {
        id: 2,
        title: "Maternal Health: Essential Prenatal Care Guidelines",
        excerpt: "Important prenatal care practices for expectant mothers in rural communities with limited healthcare access.",
        category: "maternal",
        readTime: "6 min",
        date: "2024-12-12",
        tags: ["Pregnancy", "Maternal Health", "Prenatal Care"],
        icon: "fas fa-baby"
      },
      {
        id: 3,
        title: "Managing Diabetes in Resource-Limited Settings",
        excerpt: "Practical strategies for diabetes management when healthcare resources are scarce.",
        category: "prevention",
        readTime: "10 min",
        date: "2024-12-10",
        tags: ["Diabetes", "Chronic Disease", "Management"],
        icon: "fas fa-heartbeat"
      },
      {
        id: 4,
        title: "Child Vaccination Schedule: Complete Guide for Parents",
        excerpt: "Essential vaccination timeline and importance of immunization for children in East Africa.",
        category: "child",
        readTime: "7 min",
        date: "2024-12-08",
        tags: ["Vaccination", "Child Health", "Immunization"],
        icon: "fas fa-syringe"
      },
      {
        id: 5,
        title: "Nutrition During Pregnancy: Foods for Healthy Development",
        excerpt: "Nutritional requirements and food recommendations for pregnant women in African communities.",
        category: "nutrition",
        readTime: "9 min",
        date: "2024-12-05",
        tags: ["Nutrition", "Pregnancy", "Diet"],
        icon: "fas fa-apple-alt"
      },
      {
        id: 6,
        title: "Mental Health Awareness: Breaking the Stigma",
        excerpt: "Understanding mental health challenges and promoting community support systems.",
        category: "mental",
        readTime: "11 min",
        date: "2024-12-03",
        tags: ["Mental Health", "Community", "Stigma"],
        icon: "fas fa-brain"
      },
      {
        id: 7,
        title: "First Aid Essentials: Emergency Response in Rural Areas",
        excerpt: "Basic first aid techniques and emergency response when professional help is not immediately available.",
        category: "emergency",
        readTime: "8 min",
        date: "2024-12-01",
        tags: ["First Aid", "Emergency", "Rural Health"],
        icon: "fas fa-first-aid"
      },
      {
        id: 8,
        title: "Tuberculosis: Recognition, Treatment, and Prevention",
        excerpt: "Complete guide to TB symptoms, treatment protocols, and prevention strategies.",
        category: "prevention",
        readTime: "12 min",
        date: "2024-11-28",
        tags: ["Tuberculosis", "TB", "Prevention"],
        icon: "fas fa-lungs"
      },
      {
        id: 9,
        title: "Water Sanitation and Hygiene (WASH) Practices",
        excerpt: "Importance of clean water, proper sanitation, and hygiene practices for disease prevention.",
        category: "prevention",
        readTime: "6 min",
        date: "2024-11-25",
        tags: ["WASH", "Sanitation", "Hygiene"],
        icon: "fas fa-hand-sparkles"
      },
      {
        id: 10,
        title: "Breastfeeding: Benefits and Best Practices",
        excerpt: "Comprehensive guide to breastfeeding benefits, techniques, and overcoming common challenges.",
        category: "maternal",
        readTime: "8 min",
        date: "2024-11-22",
        tags: ["Breastfeeding", "Maternal Health", "Infant Nutrition"],
        icon: "fas fa-baby"
      },
      {
        id: 11,
        title: "Childhood Diarrhea: Prevention and Home Management",
        excerpt: "Understanding causes of childhood diarrhea and effective home treatment methods.",
        category: "child",
        readTime: "7 min",
        date: "2024-11-20",
        tags: ["Diarrhea", "Child Health", "Home Treatment"],
        icon: "fas fa-child"
      },
      {
        id: 12,
        title: "HIV/AIDS Prevention and Support",
        excerpt: "Comprehensive information about HIV prevention, testing, and community support systems.",
        category: "prevention",
        readTime: "15 min",
        date: "2024-11-18",
        tags: ["HIV", "AIDS", "Prevention"],
        icon: "fas fa-ribbon"
      },
      {
        id: 13,
        title: "Traditional Medicine and Modern Healthcare Integration",
        excerpt: "Exploring the role of traditional medicine alongside modern healthcare practices in East Africa.",
        category: "prevention",
        readTime: "10 min",
        date: "2024-11-15",
        tags: ["Traditional Medicine", "Healthcare", "Integration"],
        icon: "fas fa-leaf"
      },
      {
        id: 14,
        title: "Managing High Blood Pressure Without Medication",
        excerpt: "Lifestyle modifications and natural approaches to controlling hypertension.",
        category: "prevention",
        readTime: "9 min",
        date: "2024-11-12",
        tags: ["Hypertension", "Blood Pressure", "Lifestyle"],
        icon: "fas fa-heart"
      },
      {
        id: 15,
        title: "Community Health Worker Training Guidelines",
        excerpt: "Essential training modules and best practices for community health workers in rural settings.",
        category: "emergency",
        readTime: "13 min",
        date: "2024-11-10",
        tags: ["CHW", "Training", "Community Health"],
        icon: "fas fa-user-md"
      }
    ];
  }

  generateHealthTips() {
    return [
      {
        icon: "fas fa-hand-sparkles",
        title: "Hand Hygiene",
        content: "Wash your hands with soap for at least 20 seconds, especially before eating, after using the bathroom, and after coughing or sneezing. This simple practice prevents many infectious diseases."
      },
      {
        icon: "fas fa-tint",
        title: "Stay Hydrated",
        content: "Drink at least 8 glasses of clean, safe water daily. Proper hydration helps your body fight infections, regulates temperature, and maintains healthy organ function."
      },
      {
        icon: "fas fa-bed",
        title: "Quality Sleep",
        content: "Get 7-9 hours of quality sleep each night. Use mosquito nets to prevent malaria while sleeping. Good sleep strengthens your immune system and improves mental health."
      },
      {
        icon: "fas fa-apple-alt",
        title: "Balanced Nutrition",
        content: "Eat a variety of local fruits, vegetables, whole grains, and proteins. Include foods rich in vitamins A, C, and iron. Proper nutrition boosts immunity and energy levels."
      },
      {
        icon: "fas fa-running",
        title: "Physical Activity",
        content: "Engage in at least 30 minutes of physical activity daily. Walking, farming, dancing, or playing sports helps maintain cardiovascular health and mental wellbeing."
      },
      {
        icon: "fas fa-shield-alt",
        title: "Vaccination",
        content: "Keep up-to-date with recommended vaccinations for you and your family. Vaccines prevent serious diseases and protect community health through herd immunity."
      },
      {
        icon: "fas fa-home",
        title: "Clean Environment",
        content: "Keep your living space clean and well-ventilated. Remove standing water to prevent mosquito breeding. A clean environment reduces disease transmission."
      },
      {
        icon: "fas fa-stethoscope",
        title: "Regular Check-ups",
        content: "Visit healthcare providers regularly for preventive screenings and check-ups. Early detection and prevention are key to maintaining good health."
      }
    ];
  }

  handleCategoryFilter(button) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    // Update current category
    this.currentCategory = button.dataset.category;
    this.currentPage = 1;
    
    // Re-render articles
    this.renderArticles();
  }

  getFilteredArticles() {
    let filtered = this.articles;

    // Filter by category
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(article => article.category === this.currentCategory);
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(this.searchQuery) ||
        article.excerpt.toLowerCase().includes(this.searchQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
      );
    }

    return filtered;
  }

  renderArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;

    const filteredArticles = this.getFilteredArticles();
    const startIndex = 0;
    const endIndex = this.currentPage * this.articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    if (articlesToShow.length === 0) {
      articlesGrid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>No articles found</h3>
          <p>Try adjusting your search terms or category filter.</p>
        </div>
      `;
      this.updateLoadMoreButton(false);
      return;
    }

    const articlesHTML = articlesToShow.map((article, index) => `
      <article class="article-card" style="animation-delay: ${index * 0.1}s">
        <div class="article-image">
          <div class="image-placeholder">
            <i class="${article.icon}"></i>
          </div>
          <div class="article-category">${this.getCategoryName(article.category)}</div>
        </div>
        <div class="article-content">
          <h3 class="article-title">${article.title}</h3>
          <p class="article-excerpt">${article.excerpt}</p>
          <div class="article-meta">
            <span class="article-date">
              <i class="fas fa-calendar"></i>
              ${this.formatDate(article.date)}
            </span>
            <span class="article-reading-time">
              <i class="fas fa-clock"></i>
              ${article.readTime} read
            </span>
          </div>
          <div class="article-tags">
            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    articlesGrid.innerHTML = articlesHTML;

    // Update load more button
    const hasMore = endIndex < filteredArticles.length;
    this.updateLoadMoreButton(hasMore);
  }

  loadMoreArticles() {
    this.currentPage++;
    this.renderArticles();
  }

  updateLoadMoreButton(hasMore) {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;

    if (hasMore) {
      loadMoreBtn.style.display = 'inline-flex';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }

  getCategoryName(category) {
    const categoryNames = {
      prevention: 'Disease Prevention',
      maternal: 'Maternal Health',
      child: 'Child Health',
      nutrition: 'Nutrition',
      mental: 'Mental Health',
      emergency: 'Emergency Care'
    };
    return categoryNames[category] || 'Health';
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  performSearch() {
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
      this.searchQuery = searchInput.value.toLowerCase();
      this.currentPage = 1;
      this.renderArticles();
      
      // Show search feedback
      this.showToast(`Searching for "${searchInput.value}"...`, 'info');
    }
  }

  setupHealthTipsCarousel() {
    const carousel = document.getElementById('tips-carousel');
    const indicators = document.getElementById('tips-indicators');
    
    if (!carousel || !indicators) return;

    // Create tip cards
    const tipsHTML = this.healthTips.map((tip, index) => `
      <div class="tip-card ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="tip-icon">
          <i class="${tip.icon}"></i>
        </div>
        <h3 class="tip-title">${tip.title}</h3>
        <p class="tip-content">${tip.content}</p>
      </div>
    `).join('');

    carousel.innerHTML = tipsHTML;

    // Create indicators
    const indicatorsHTML = this.healthTips.map((_, index) => `
      <div class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    indicators.innerHTML = indicatorsHTML;

    // Add click events to indicators
    indicators.addEventListener('click', (e) => {
      if (e.target.classList.contains('indicator')) {
        const index = parseInt(e.target.dataset.index);
        this.goToTip(index);
      }
    });
  }

  nextTip() {
    this.currentTipIndex = (this.currentTipIndex + 1) % this.healthTips.length;
    this.updateTipDisplay();
  }

  prevTip() {
    this.currentTipIndex = (this.currentTipIndex - 1 + this.healthTips.length) % this.healthTips.length;
    this.updateTipDisplay();
  }

  goToTip(index) {
    this.currentTipIndex = index;
    this.updateTipDisplay();
  }

  updateTipDisplay() {
    const tipCards = document.querySelectorAll('.tip-card');
    const indicators = document.querySelectorAll('.indicator');

    // Update tip cards
    tipCards.forEach((card, index) => {
      card.classList.toggle('active', index === this.currentTipIndex);
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentTipIndex);
    });
  }

  startAutoCarousel() {
    // Auto-rotate tips every 5 seconds
    setInterval(() => {
      this.nextTip();
    }, 5000);
  }

  handleNewsletterSubscription(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    const termsAccepted = document.getElementById('newsletter-terms').checked;

    if (!email) {
      this.showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (!termsAccepted) {
      this.showToast('Please accept the terms to subscribe.', 'error');
      return;
    }

    // Simulate subscription process
    this.showToast('Subscribing to newsletter...', 'info');
    
    setTimeout(() => {
      this.showToast('Successfully subscribed! You will receive weekly health updates.', 'success');
      document.getElementById('newsletter-form').reset();
    }, 2000);
  }

  showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.blog-toast');
    if (existingToast) {
      existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `blog-toast blog-toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-${this.getToastIcon(type)}"></i>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 4000);
  }

  getToastIcon(type) {
    const icons = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'exclamation-triangle',
      warning: 'exclamation-circle'
    };
    return icons[type] || 'info-circle';
  }

  // Public API methods
  searchArticles(query) {
    this.searchQuery = query.toLowerCase();
    this.currentPage = 1;
    this.renderArticles();
  }

  filterByCategory(category) {
    this.currentCategory = category;
    this.currentPage = 1;
    this.renderArticles();
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
  }

  resetFilters() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentPage = 1;
    
    // Reset UI
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === 'all');
    });
    
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
      searchInput.value = '';
    }
    
    this.renderArticles();
  }
}

// Add missing styles for no results and toast
const additionalStyles = `
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    color: #64748b;
  }
  
  .no-results-icon {
    width: 80px;
    height: 80px;
    background: #f1f5f9;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }
  
  .no-results-icon i {
    font-size: 2rem;
    color: #94a3b8;
  }
  
  .no-results h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #475569;
  }
  
  .blog-toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  }
  
  .blog-toast.show {
    transform: translateX(0);
  }
  
  .toast-content {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
  }
  
  .blog-toast-success {
    border-left: 4px solid #10b981;
  }
  
  .blog-toast-error {
    border-left: 4px solid #ef4444;
  }
  
  .blog-toast-info {
    border-left: 4px solid #3b82f6;
  }
  
  .toast-content i {
    font-size: 1.1rem;
  }
  
  .blog-toast-success .toast-content i {
    color: #10b981;
  }
  
  .blog-toast-error .toast-content i {
    color: #ef4444;
  }
  
  .blog-toast-info .toast-content i {
    color: #3b82f6;
  }
  
  @media (max-width: 768px) {
    .blog-toast {
      right: 10px;
      left: 10px;
      max-width: none;
      transform: translateY(100px);
    }
    
    .blog-toast.show {
      transform: translateY(0);
    }
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.HealthBlog = new HealthBlogManager();
});
