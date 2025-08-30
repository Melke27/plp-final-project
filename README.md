# 🏥 HealthConnect - Mobile Health Clinics Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/healthconnect-mobile/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Bridging healthcare accessibility gaps in remote and underserved communities through technology and mobile health solutions.**

HealthConnect is a comprehensive web platform designed to connect remote communities across East Africa with mobile health clinics, providing real-time clinic tracking, appointment booking, health resources, and community support.

## 🌟 Live Demo

- **Live Site**: [HealthConnect Platform](https://healthconnect-mobile.netlify.app) *(Deploy after setup)*
- **Developer Portfolio**: [Melkamu Wako](https://melkamuwako27.netlify.app/)

## 📱 Features

### 🗺️ Interactive Clinic Locator
- **Real-time map** showing mobile clinic locations across East Africa
- **Multi-country support**: Kenya, Ethiopia, Uganda, Tanzania, Rwanda, Burundi, South Sudan, Somalia
- **Advanced filtering** by service type, date, and location
- **Geolocation support** to find nearest clinics
- **Live status updates** for clinic availability

### 📅 Smart Appointment Booking
- **Multi-step booking process** with form validation
- **Service selection** with detailed descriptions
- **Time slot management** with real-time availability
- **Emergency appointment support**
- **Automatic confirmation** with downloadable receipts
- **LocalStorage backup** for form recovery

### 🏥 Partner Hospital Network
- **Major Ethiopian hospitals** including Black Lion (Tikur Anbessa), St. Paul's, Yekatit 12
- **Detailed hospital information** with contact details and specialties
- **Emergency contact integration**
- **Referral system** coordination between mobile clinics and hospitals

### 📚 Health Resources & Education
- **Comprehensive health information** categorized by topics
- **Interactive health tools**: BMI Calculator, Symptom Checker
- **Daily health tips** and preventive care guides
- **Search functionality** with content highlighting
- **Bookmarking system** for favorite resources

### 💬 Live Chat Support
- **AI-powered chatbot** with contextual responses
- **Quick action buttons** for common tasks
- **Emergency contact integration**
- **Real-time assistance** and FAQ integration

### 📞 Contact & Support
- **Multiple contact methods** with emergency prioritization
- **Interactive FAQ system** with search capabilities
- **Partnership opportunities** for healthcare organizations
- **Support ticket system** with priority assignment

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Leaflet.js** - Interactive maps and geolocation

### Design & UX
- **Mobile-first responsive design**
- **Healthcare-optimized color scheme**
- **Accessibility (WCAG) compliance**
- **Progressive Web App (PWA) features**

### Deployment & Performance
- **Netlify** - Static site hosting and CDN
- **Performance optimization** - Minified CSS/JS
- **Security headers** - CSP, HSTS, and more
- **SEO optimization** - Meta tags and sitemap

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Text editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/melkamuwako27/healthconnect-platform.git
   cd healthconnect-platform
   ```

2. **Open the project**
   ```bash
   # Using VS Code
   code .
   
   # Or open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   ```

3. **Start local development**
   ```bash
   # Using Python (recommended)
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
healthconnect-platform/
├── 📄 index.html                 # Home page
├── 📄 clinic-locations.html      # Interactive map & clinic finder
├── 📄 partner-hospitals.html     # Ethiopian hospitals directory
├── 📄 health-resources.html      # Health education & tools
├── 📄 appointment-booking.html   # Multi-step booking system
├── 📄 contact.html              # Contact & support page
├── 📁 css/
│   └── 📄 styles.css            # Main stylesheet (mobile-first)
├── 📁 js/
│   ├── 📄 main.js               # Core functionality
│   ├── 📄 map.js                # Map & clinic data
│   ├── 📄 booking.js            # Appointment booking
│   ├── 📄 health-tools.js       # Health calculators & tools
│   ├── 📄 contact.js            # Contact forms & chat
│   └── 📄 hospitals.js          # Hospital information
├── 📁 images/                   # Placeholder for future images
├── 📁 docs/                     # Project documentation
├── 📄 _redirects               # Netlify redirects configuration
├── 📄 netlify.toml             # Netlify build configuration
└── 📄 README.md                # This file
```

## 🌍 Geographic Coverage

### East African Countries Supported:
- 🇰🇪 **Kenya** - Nairobi, Turkana, Narok, Kisumu counties
- 🇪🇹 **Ethiopia** - Addis Ababa, Gondar, Dire Dawa, Hawassa
- 🇺🇬 **Uganda** - Kampala, Gulu regions
- 🇹🇿 **Tanzania** - Dar es Salaam, Arusha regions
- 🇷🇼 **Rwanda** - Kigali region
- 🇧🇮 **Burundi** - Bujumbura region
- 🇸🇸 **South Sudan** - Juba region
- 🇸🇴 **Somalia** - Mogadishu region

## 🏥 Featured Partner Hospitals

### Ethiopia
1. **Black Lion Hospital (Tikur Anbessa)** - Ethiopia's largest hospital and teaching center
2. **St. Paul's Hospital Millennium Medical College** - Leading cardiac and neurosurgery center
3. **Yekatit 12 Hospital Medical College** - Government hospital specializing in maternal health
4. **Menelik II Referral Hospital** - Historic emergency and trauma care center
5. **Jimma University Medical Center** - Rural health and community medicine leader
6. **Hawassa University Referral Hospital** - Regional referral center for southern Ethiopia
7. **Gondar University Hospital** - Northern Ethiopia university hospital

## 📋 Page-by-Page Features

### 🏠 Home Page (`index.html`)
- Hero section with call-to-action buttons
- Real-time statistics counter
- Upcoming clinic previews
- Platform features overview
- Community testimonials
- Developer showcase section
- Emergency contact banner

### 🗺️ Clinic Locations (`clinic-locations.html`)
- Interactive Leaflet map with custom markers
- Advanced filtering (service, date, location, country)
- Clinic search functionality
- Real-time status updates
- Geolocation support
- Detailed clinic information cards

### 🏥 Partner Hospitals (`partner-hospitals.html`)
- Ethiopian hospital directory with images
- Detailed hospital information modals
- Specialty and department listings
- Contact information and emergency numbers
- Partnership workflow explanation
- Hospital comparison functionality

### 📚 Health Resources (`health-resources.html`)
- Categorized health information
- Interactive health tools:
  - BMI Calculator with health advice
  - Symptom Checker with urgency assessment
- Daily health tips rotation
- Content search and bookmarking
- Expandable resource sections

### 📅 Appointment Booking (`appointment-booking.html`)
- 4-step booking wizard with validation
- Service and clinic selection
- Time slot management
- Emergency appointment handling
- Booking confirmation with download
- Form auto-save and recovery

### 📞 Contact & Support (`contact.html`)
- Multi-method contact options
- Emergency contact prioritization
- Interactive FAQ system
- Live chat simulation
- Partnership inquiry forms
- Support ticket generation

## 🚀 Deployment to Netlify

### Method 1: Drag & Drop (Easiest)
1. Create a ZIP file of your project folder
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Drag the ZIP file to the deployment area
4. Your site will be live at a random URL (e.g., `amazing-healer-123abc.netlify.app`)

### Method 2: Git Integration (Recommended)
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial HealthConnect platform"
   git branch -M main
   git remote add origin https://github.com/melkamuwako27/healthconnect-platform.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com) → "New site from Git"
   - Choose GitHub and select your repository
   - Build settings:
     - **Build command**: Leave empty (static site)
     - **Publish directory**: `.` (root directory)
   - Click "Deploy site"

### Method 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir .
```

## ⚙️ Configuration

### Environment Variables (Netlify Dashboard)
```
SITE_URL=https://your-site-name.netlify.app
DEVELOPER_PORTFOLIO=https://melkamuwako27.netlify.app
CONTACT_EMAIL=your-email@example.com
```

### Custom Domain Setup
1. Go to Netlify Dashboard → Domain management
2. Add your custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic with Netlify)

## 🧪 Testing

### Local Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Map displays and markers are clickable
- [ ] Forms validate properly
- [ ] Chat widget functions
- [ ] Responsive design on mobile/tablet/desktop
- [ ] All links work correctly

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🔧 Customization

### Adding New Clinics
Edit `js/map.js` and add new clinic objects to the `clinicsData` array:

```javascript
{
    id: 'new-clinic',
    name: 'New Clinic Name',
    address: 'Full Address',
    country: 'Country',
    lat: 0.0000,
    lng: 0.0000,
    date: '2025-MM-DD',
    time: 'HH:MM AM - HH:MM PM',
    status: 'active|upcoming|scheduled',
    services: ['service1', 'service2'],
    serviceNames: ['Service 1', 'Service 2']
}
```

### Adding New Hospitals
Edit `js/hospitals.js` and add hospital data to the `hospitalDetails` object.

### Styling Customization
Main colors are defined in CSS variables in `css/styles.css`:
```css
:root {
    --primary-blue: #2563eb;
    --primary-green: #059669;
    --primary-teal: #0d9488;
    /* ... other variables */
}
```

## 👨‍💻 Developer Information

**Developed by**: [Melkamu Wako](https://melkamuwako27.netlify.app/)
- 🎓 Computer Science & Engineering Student at ASTU
- 💻 Full-Stack Developer specializing in healthcare technology
- 🌍 Passionate about using technology for social good in East Africa
- 🔗 [Portfolio](https://melkamuwako27.netlify.app/) | [GitHub](https://github.com/melkamuwako27)

### Development Goals
This platform was created as part of a final project to demonstrate:
- Modern web development skills
- Responsive design principles
- Healthcare technology solutions
- Community-focused application development
- East African healthcare challenges awareness

## 🤝 Contributing

We welcome contributions to improve HealthConnect! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Areas
- 🌍 **Geographic expansion** - Add more countries/regions
- 🏥 **Hospital partnerships** - Add more healthcare facilities
- 🔧 **Feature enhancement** - Improve existing functionality
- 🎨 **UI/UX improvements** - Design and accessibility enhancements
- 🌐 **Internationalization** - Multi-language support
- 📱 **Mobile optimization** - PWA features and performance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Inspiration**: Healthcare accessibility challenges in rural East Africa
- **Maps**: [OpenStreetMap](https://www.openstreetmap.org/) and [Leaflet.js](https://leafletjs.com/)
- **Icons**: [Font Awesome](https://fontawesome.com/)
- **Fonts**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Images**: [Unsplash](https://unsplash.com/) for hospital imagery
- **Hosting**: [Netlify](https://netlify.com/) for deployment and CDN

## 📞 Support & Contact

- **Technical Issues**: [Open an Issue](https://github.com/melkamuwako27/healthconnect-platform/issues)
- **General Inquiries**: Use the contact form on the platform
- **Developer Contact**: [Melkamu Wako Portfolio](https://melkamuwako27.netlify.app/)
- **Emergency**: Call your local emergency services (911, 999, etc.)

## 🔮 Future Enhancements

### Phase 2 Development
- [ ] Backend API integration
- [ ] User authentication system
- [ ] Real-time notifications
- [ ] Mobile app development
- [ ] Payment integration
- [ ] Multilingual support (Amharic, Swahili, French)
- [ ] Offline functionality (PWA)
- [ ] Advanced analytics dashboard

### Partnership Goals
- [ ] Integration with government health systems
- [ ] NGO and healthcare organization partnerships
- [ ] Medical equipment tracking
- [ ] Telemedicine capabilities
- [ ] Health insurance integration

## 🏗️ Technical Implementation

### Architecture
- **Frontend-only** static site architecture
- **Client-side routing** with clean URLs
- **Local storage** for data persistence
- **Progressive enhancement** approach
- **Mobile-first responsive design**

### Performance Features
- Optimized images and assets
- Lazy loading for images
- Efficient JavaScript bundling
- CSS minification
- CDN delivery via Netlify

### Security Measures
- Content Security Policy (CSP)
- XSS Protection headers
- Secure form handling
- HTTPS enforcement
- Privacy-focused design

---

## 🌟 Project Showcase

This HealthConnect platform demonstrates:

✨ **Modern Web Development Skills**
- Responsive design and mobile optimization
- Interactive JavaScript functionality
- Clean, semantic HTML structure
- Performance-optimized CSS

🎯 **Healthcare Technology Focus**
- Real-world problem solving for rural healthcare
- User-centered design for diverse communities
- Emergency response integration
- Data visualization and mapping

🌍 **Social Impact Technology**
- Addressing healthcare accessibility in East Africa
- Community-focused feature development
- Partnership-oriented approach
- Sustainable technology solutions

---

**Built with ❤️ for better healthcare access in East Africa**

*Developed by [Melkamu Wako](https://melkamuwako27.netlify.app/) - Computer Science Student at ASTU*
