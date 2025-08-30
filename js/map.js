/**
 * HealthConnect Platform - Map Functionality
 * Handles interactive map for clinic locations
 */

let map;
let clinicMarkers = [];

// Clinic data - East African Countries
const clinicsData = [
    // KENYA
    {
        id: 'kibera',
        name: 'Kibera Community Center',
        address: 'Kibera, Nairobi County, Kenya',
        country: 'Kenya',
        lat: -1.3129,
        lng: 36.7809,
        date: '2025-09-15',
        time: '9:00 AM - 4:00 PM',
        status: 'active',
        services: ['general', 'vaccinations', 'maternal'],
        serviceNames: ['General Checkup', 'Vaccinations', 'Maternal Care', 'Health Screening']
    },
    {
        id: 'masai-mara',
        name: 'Masai Mara Village Hall',
        address: 'Masai Mara, Narok County, Kenya',
        country: 'Kenya',
        lat: -1.4167,
        lng: 35.0000,
        date: '2025-09-18',
        time: '8:00 AM - 3:00 PM',
        status: 'upcoming',
        services: ['child', 'general', 'nutrition'],
        serviceNames: ['Child Health', 'General Checkup', 'Nutrition Counseling', 'First Aid']
    },
    {
        id: 'turkana',
        name: 'Turkana Health Post',
        address: 'Lodwar, Turkana County, Kenya',
        country: 'Kenya',
        lat: 3.1190,
        lng: 35.5977,
        date: '2025-09-22',
        time: '10:00 AM - 5:00 PM',
        status: 'scheduled',
        services: ['emergency', 'mental', 'nutrition'],
        serviceNames: ['Emergency Care', 'Mental Health', 'Nutrition Support', 'General Consultation']
    },
    {
        id: 'kisumu',
        name: 'Kisumu Rural Health Center',
        address: 'Kisumu County, Kenya',
        country: 'Kenya',
        lat: -0.0917,
        lng: 34.7680,
        date: '2025-09-25',
        time: '9:00 AM - 4:00 PM',
        status: 'scheduled',
        services: ['maternal', 'vaccinations', 'general'],
        serviceNames: ['Maternal Care', 'Vaccinations', 'General Checkup', 'Family Planning']
    },
    // ETHIOPIA
    {
        id: 'addis-ababa',
        name: 'Addis Ababa Community Health Center',
        address: 'Bole, Addis Ababa, Ethiopia',
        country: 'Ethiopia',
        lat: 9.0054,
        lng: 38.7636,
        date: '2025-09-16',
        time: '8:00 AM - 5:00 PM',
        status: 'active',
        services: ['general', 'maternal', 'child'],
        serviceNames: ['General Health Screening', 'Maternal Care', 'Child Health', 'Immunizations']
    },
    {
        id: 'gondar',
        name: 'Gondar Rural Mobile Unit',
        address: 'Gondar, Amhara Region, Ethiopia',
        country: 'Ethiopia',
        lat: 12.6090,
        lng: 37.4706,
        date: '2025-09-20',
        time: '9:00 AM - 4:00 PM',
        status: 'upcoming',
        services: ['general', 'nutrition', 'emergency'],
        serviceNames: ['General Consultation', 'Nutrition Assessment', 'Emergency Care', 'Health Education']
    },
    {
        id: 'dire-dawa',
        name: 'Dire Dawa Mobile Health Unit',
        address: 'Dire Dawa, Ethiopia',
        country: 'Ethiopia',
        lat: 9.5906,
        lng: 41.8456,
        date: '2025-09-23',
        time: '8:30 AM - 4:30 PM',
        status: 'scheduled',
        services: ['general', 'mental', 'vaccinations'],
        serviceNames: ['General Health', 'Mental Health Support', 'Vaccinations', 'Health Counseling']
    },
    // UGANDA
    {
        id: 'kampala',
        name: 'Kampala Community Outreach',
        address: 'Kawempe, Kampala, Uganda',
        country: 'Uganda',
        lat: 0.3476,
        lng: 32.5825,
        date: '2025-09-17',
        time: '9:00 AM - 5:00 PM',
        status: 'active',
        services: ['general', 'maternal', 'child'],
        serviceNames: ['General Checkup', 'Maternal Health', 'Child Immunization', 'Family Planning']
    },
    {
        id: 'gulu',
        name: 'Gulu Mobile Health Clinic',
        address: 'Gulu, Northern Uganda',
        country: 'Uganda',
        lat: 2.7796,
        lng: 32.2993,
        date: '2025-09-21',
        time: '8:00 AM - 4:00 PM',
        status: 'scheduled',
        services: ['nutrition', 'mental', 'general'],
        serviceNames: ['Nutrition Support', 'Mental Health', 'General Care', 'Health Education']
    },
    // TANZANIA
    {
        id: 'dar-es-salaam',
        name: 'Dar es Salaam Mobile Unit',
        address: 'Kinondoni, Dar es Salaam, Tanzania',
        country: 'Tanzania',
        lat: -6.7924,
        lng: 39.2083,
        date: '2025-09-19',
        time: '8:00 AM - 4:00 PM',
        status: 'upcoming',
        services: ['general', 'vaccinations', 'maternal'],
        serviceNames: ['General Health', 'Vaccinations', 'Maternal Care', 'Child Health']
    },
    {
        id: 'arusha',
        name: 'Arusha Rural Health Outreach',
        address: 'Arusha Region, Tanzania',
        country: 'Tanzania',
        lat: -3.3696,
        lng: 36.6830,
        date: '2025-09-24',
        time: '9:00 AM - 3:00 PM',
        status: 'scheduled',
        services: ['child', 'nutrition', 'general'],
        serviceNames: ['Child Health', 'Nutrition Counseling', 'General Checkup', 'Health Screening']
    },
    // RWANDA
    {
        id: 'kigali',
        name: 'Kigali Community Health Hub',
        address: 'Nyarugenge, Kigali, Rwanda',
        country: 'Rwanda',
        lat: -1.9560,
        lng: 30.0619,
        date: '2025-09-26',
        time: '8:00 AM - 5:00 PM',
        status: 'scheduled',
        services: ['general', 'maternal', 'mental'],
        serviceNames: ['General Healthcare', 'Maternal Services', 'Mental Health', 'Preventive Care']
    },
    // BURUNDI
    {
        id: 'bujumbura',
        name: 'Bujumbura Mobile Clinic',
        address: 'Bujumbura, Burundi',
        country: 'Burundi',
        lat: -3.3614,
        lng: 29.3599,
        date: '2025-09-27',
        time: '9:00 AM - 4:00 PM',
        status: 'scheduled',
        services: ['general', 'vaccinations', 'nutrition'],
        serviceNames: ['General Health', 'Vaccinations', 'Nutrition Support', 'Health Education']
    },
    // SOUTH SUDAN
    {
        id: 'juba',
        name: 'Juba Health Outreach',
        address: 'Juba, South Sudan',
        country: 'South Sudan',
        lat: 4.8594,
        lng: 31.5713,
        date: '2025-09-28',
        time: '8:00 AM - 3:00 PM',
        status: 'scheduled',
        services: ['emergency', 'general', 'child'],
        serviceNames: ['Emergency Care', 'General Health', 'Child Health', 'Basic Treatment']
    },
    // SOMALIA
    {
        id: 'mogadishu',
        name: 'Mogadishu Mobile Health Unit',
        address: 'Mogadishu, Somalia',
        country: 'Somalia',
        lat: 2.0469,
        lng: 45.3182,
        date: '2025-09-29',
        time: '9:00 AM - 2:00 PM',
        status: 'scheduled',
        services: ['emergency', 'nutrition', 'maternal'],
        serviceNames: ['Emergency Care', 'Nutrition Support', 'Maternal Health', 'Basic Care']
    }
];

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('clinic-map');
    if (mapElement) {
        initializeMap();
        initializeFilters();
    }
});

/**
 * Initialize the Leaflet map
 */
function initializeMap() {
    // Center the map on East Africa (covering all countries)
    map = L.map('clinic-map').setView([0.0, 35.0], 5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add clinic markers
    addClinicMarkers();
    
    // Fit map to show all markers
    if (clinicMarkers.length > 0) {
        const group = new L.featureGroup(clinicMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

/**
 * Add clinic markers to the map
 */
function addClinicMarkers() {
    clinicsData.forEach(clinic => {
        const marker = createClinicMarker(clinic);
        clinicMarkers.push(marker);
        marker.addTo(map);
    });
}

/**
 * Create a marker for a clinic
 */
function createClinicMarker(clinic) {
    // Define marker colors based on status
    const markerColors = {
        active: '#10b981',     // Green
        upcoming: '#f59e0b',   // Orange
        scheduled: '#3b82f6'   // Blue
    };
    
    // Create custom icon
    const icon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-pin" style="background-color: ${markerColors[clinic.status]}">
                <i class="fas fa-truck-medical"></i>
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
    
    // Create marker
    const marker = L.marker([clinic.lat, clinic.lng], { icon: icon });
    
    // Create popup content
    const popupContent = `
        <div class="clinic-popup">
            <div class="popup-header">
                <h3 class="popup-title">${clinic.name}</h3>
                <span class="popup-status ${clinic.status}">${clinic.status.charAt(0).toUpperCase() + clinic.status.slice(1)}</span>
            </div>
            <div class="popup-content">
                <p class="popup-address">
                    <i class="fas fa-map-marker-alt"></i>
                    ${clinic.address}
                </p>
                <p class="popup-schedule">
                    <i class="fas fa-calendar"></i>
                    ${clinic.date} | ${clinic.time}
                </p>
                <div class="popup-services">
                    <strong>Services:</strong>
                    <div class="popup-tags">
                        ${clinic.serviceNames.map(service => `<span class="popup-tag">${service}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="popup-actions">
                <a href="appointment-booking.html?clinic=${clinic.id}" class="btn-popup btn-primary">
                    <i class="fas fa-calendar-plus"></i>
                    Book Appointment
                </a>
            </div>
        </div>
    `;
    
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'clinic-popup-container'
    });
    
    // Store clinic data on marker for filtering
    marker.clinicData = clinic;
    
    return marker;
}

/**
 * View specific location on map
 */
function viewOnMap(lat, lng) {
    if (map) {
        map.setView([lat, lng], 12);
        
        // Find and open the popup for this location
        clinicMarkers.forEach(marker => {
            const markerLatLng = marker.getLatLng();
            if (Math.abs(markerLatLng.lat - lat) < 0.001 && Math.abs(markerLatLng.lng - lng) < 0.001) {
                marker.openPopup();
            }
        });
        
        // Scroll to map section
        const mapSection = document.querySelector('.map-section');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

/**
 * Initialize filter functionality
 */
function initializeFilters() {
    const serviceFilter = document.getElementById('service-filter');
    const dateFilter = document.getElementById('date-filter');
    const locationFilter = document.getElementById('location-filter');
    const clearFilters = document.getElementById('clear-filters');
    
    // Add event listeners
    if (serviceFilter) {
        serviceFilter.addEventListener('change', applyFilters);
    }
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }
    if (locationFilter) {
        locationFilter.addEventListener('change', applyFilters);
    }
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }
}

/**
 * Apply filters to clinic cards and map markers
 */
function applyFilters() {
    const serviceFilter = document.getElementById('service-filter')?.value || 'all';
    const dateFilter = document.getElementById('date-filter')?.value || 'all';
    const locationFilter = document.getElementById('location-filter')?.value || 'all';
    
    const clinicCards = document.querySelectorAll('.clinic-detail-card');
    const noResults = document.getElementById('no-results');
    
    let visibleCount = 0;
    
    // Filter clinic cards
    clinicCards.forEach(card => {
        const services = card.getAttribute('data-services')?.split(',') || [];
        const location = card.getAttribute('data-location') || '';
        const date = card.getAttribute('data-date') || '';
        
        let showCard = true;
        
        // Service filter
        if (serviceFilter !== 'all' && !services.includes(serviceFilter)) {
            showCard = false;
        }
        
        // Location filter
        if (locationFilter !== 'all' && location !== locationFilter) {
            showCard = false;
        }
        
        // Date filter
        if (dateFilter !== 'all') {
            const cardDate = new Date(date);
            const today = new Date();
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            
            switch (dateFilter) {
                case 'today':
                    if (cardDate.toDateString() !== today.toDateString()) {
                        showCard = false;
                    }
                    break;
                case 'week':
                    if (cardDate > weekFromNow || cardDate < today) {
                        showCard = false;
                    }
                    break;
                case 'month':
                    if (cardDate > monthFromNow || cardDate < today) {
                        showCard = false;
                    }
                    break;
            }
        }
        
        if (showCard) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Filter map markers
    clinicMarkers.forEach(marker => {
        const clinic = marker.clinicData;
        let showMarker = true;
        
        // Service filter
        if (serviceFilter !== 'all' && !clinic.services.includes(serviceFilter)) {
            showMarker = false;
        }
        
        // Location filter (map clinic id to location)
        const clinicLocation = getLocationFromClinicId(clinic.id);
        if (locationFilter !== 'all' && clinicLocation !== locationFilter) {
            showMarker = false;
        }
        
        // Date filter
        if (dateFilter !== 'all') {
            const clinicDate = new Date(clinic.date);
            const today = new Date();
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            
            switch (dateFilter) {
                case 'today':
                    if (clinicDate.toDateString() !== today.toDateString()) {
                        showMarker = false;
                    }
                    break;
                case 'week':
                    if (clinicDate > weekFromNow || clinicDate < today) {
                        showMarker = false;
                    }
                    break;
                case 'month':
                    if (clinicDate > monthFromNow || clinicDate < today) {
                        showMarker = false;
                    }
                    break;
            }
        }
        
        if (showMarker) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
    
    // Show/hide no results message
    if (noResults) {
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

/**
 * Clear all filters
 */
function clearAllFilters() {
    const serviceFilter = document.getElementById('service-filter');
    const dateFilter = document.getElementById('date-filter');
    const locationFilter = document.getElementById('location-filter');
    
    if (serviceFilter) serviceFilter.value = 'all';
    if (dateFilter) dateFilter.value = 'all';
    if (locationFilter) locationFilter.value = 'all';
    
    // Re-apply filters (which will show all items)
    applyFilters();
    
    showSuccessMessage('Filters cleared successfully');
}

/**
 * Get location code from clinic ID
 */
function getLocationFromClinicId(clinicId) {
    const locationMap = {
        'kibera': 'nairobi',
        'masai-mara': 'narok',
        'turkana': 'turkana',
        'kisumu': 'kisumu'
    };
    return locationMap[clinicId] || '';
}

/**
 * Add custom CSS for map markers and popups
 */
function addMapStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker {
            background: none;
            border: none;
        }
        
        .marker-pin {
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .marker-pin:hover {
            transform: rotate(-45deg) scale(1.1);
        }
        
        .marker-pin i {
            transform: rotate(45deg);
        }
        
        .clinic-popup-container {
            font-family: 'Inter', sans-serif;
        }
        
        .clinic-popup {
            padding: 0;
        }
        
        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .popup-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #111827;
            margin: 0;
        }
        
        .popup-status {
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.75rem;
            font-weight: 500;
            text-transform: capitalize;
        }
        
        .popup-status.active {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
        }
        
        .popup-status.upcoming {
            background: rgba(245, 158, 11, 0.1);
            color: #f59e0b;
        }
        
        .popup-status.scheduled {
            background: rgba(59, 130, 246, 0.1);
            color: #3b82f6;
        }
        
        .popup-content {
            margin-bottom: 1rem;
        }
        
        .popup-address,
        .popup-schedule {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
            color: #6b7280;
            font-size: 0.875rem;
        }
        
        .popup-services {
            margin-bottom: 1rem;
        }
        
        .popup-services strong {
            color: #111827;
            font-size: 0.875rem;
        }
        
        .popup-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25rem;
            margin-top: 0.5rem;
        }
        
        .popup-tag {
            background: #f3f4f6;
            color: #374151;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
        }
        
        .popup-actions {
            text-align: center;
        }
        
        .btn-popup {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background 0.15s ease;
        }
        
        .btn-popup:hover {
            background: #0d9488;
            color: white;
        }
        
        .leaflet-popup-content-wrapper {
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .leaflet-popup-tip {
            background: white;
        }
    `;
    document.head.appendChild(style);
}

// Add map styles when script loads
addMapStyles();

/**
 * Update map markers based on current filters
 */
function updateMapMarkers() {
    // Clear existing markers
    clinicMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    
    // Re-add filtered markers
    clinicMarkers = [];
    addClinicMarkers();
}

/**
 * Get clinic data by ID
 */
function getClinicById(clinicId) {
    return clinicsData.find(clinic => clinic.id === clinicId);
}

/**
 * Search functionality for clinic locations
 */
function searchClinics(searchTerm) {
    if (!searchTerm) {
        applyFilters();
        return;
    }
    
    const clinicCards = document.querySelectorAll('.clinic-detail-card');
    const noResults = document.getElementById('no-results');
    let visibleCount = 0;
    
    clinicCards.forEach(card => {
        const clinicName = card.querySelector('.clinic-name')?.textContent.toLowerCase() || '';
        const clinicAddress = card.querySelector('.clinic-address')?.textContent.toLowerCase() || '';
        const services = Array.from(card.querySelectorAll('.service-tag'))
            .map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const searchableText = `${clinicName} ${clinicAddress} ${services}`;
        
        if (searchableText.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update map markers based on search
    clinicMarkers.forEach(marker => {
        const clinic = marker.clinicData;
        const searchableText = `${clinic.name} ${clinic.address} ${clinic.serviceNames.join(' ')}`.toLowerCase();
        
        if (searchableText.includes(searchTerm.toLowerCase())) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
    
    // Show/hide no results
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

/**
 * Real-time updates simulation
 */
function simulateRealTimeUpdates() {
    const updatesData = [
        {
            time: '2 hours ago',
            type: 'info',
            message: '<strong>Kibera Community Center:</strong> Additional vaccination doses available. Walk-ins welcome until 3:00 PM.'
        },
        {
            time: '1 day ago',
            type: 'calendar',
            message: '<strong>Masai Mara Village Hall:</strong> Clinic visit confirmed for September 18th. Pre-registration now open.'
        },
        {
            time: '3 days ago',
            type: 'warning',
            message: '<strong>Weather Alert:</strong> Turkana County clinic may be delayed due to road conditions. Updates to follow.'
        }
    ];
    
    const updatesFeed = document.getElementById('updates-feed');
    if (updatesFeed) {
        updatesFeed.innerHTML = '';
        
        updatesData.forEach((update, index) => {
            setTimeout(() => {
                const updateElement = document.createElement('div');
                updateElement.className = 'update-item';
                updateElement.style.opacity = '0';
                updateElement.style.transform = 'translateY(20px)';
                
                const iconClass = update.type === 'info' ? 'fa-info-circle' : 
                                update.type === 'calendar' ? 'fa-calendar-alt' : 'fa-exclamation-triangle';
                
                updateElement.innerHTML = `
                    <div class="update-time">${update.time}</div>
                    <div class="update-content">
                        <i class="fas ${iconClass}"></i>
                        <p>${update.message}</p>
                    </div>
                `;
                
                updatesFeed.appendChild(updateElement);
                
                // Animate in
                setTimeout(() => {
                    updateElement.style.transition = 'all 0.3s ease';
                    updateElement.style.opacity = '1';
                    updateElement.style.transform = 'translateY(0)';
                }, 100);
                
            }, index * 500);
        });
    }
}

// Initialize real-time updates
document.addEventListener('DOMContentLoaded', function() {
    simulateRealTimeUpdates();
});

/**
 * Geolocation functionality
 */
function getUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Add user location marker
                const userIcon = L.divIcon({
                    className: 'user-location-marker',
                    html: '<div class="user-pin"><i class="fas fa-user"></i></div>',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });
                
                const userMarker = L.marker([userLat, userLng], { icon: userIcon })
                    .addTo(map)
                    .bindPopup('Your Location');
                
                // Find nearest clinic
                let nearestClinic = null;
                let minDistance = Infinity;
                
                clinicsData.forEach(clinic => {
                    const distance = calculateDistance(userLat, userLng, clinic.lat, clinic.lng);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestClinic = clinic;
                    }
                });
                
                if (nearestClinic) {
                    showSuccessMessage(`Nearest clinic: ${nearestClinic.name} (${Math.round(minDistance)} km away)`);
                }
            },
            function(error) {
                console.warn('Geolocation error:', error);
                showErrorMessage('Could not get your location. Please allow location access to find nearby clinics.');
            }
        );
    } else {
        showErrorMessage('Geolocation is not supported by your browser.');
    }
}

/**
 * Calculate distance between two points (Haversine formula)
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

/**
 * Export functions for use in other files
 */
window.HealthConnectMap = {
    viewOnMap,
    clearAllFilters,
    searchClinics,
    getUserLocation,
    getClinicById
};
