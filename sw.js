/**
 * HealthConnect Service Worker
 * Provides offline functionality and caching strategies
 */

const CACHE_NAME = 'healthconnect-v1.0.0';
const STATIC_CACHE_NAME = 'healthconnect-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'healthconnect-dynamic-v1.0.0';

// Files to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/clinic-locations.html',
  '/health-resources.html',
  '/appointment-booking.html',
  '/community-stories.html',
  '/health-tools.html',
  '/contact.html',
  '/css/styles.css',
  '/css/community-stories.css',
  '/css/about-enhanced.css',
  '/css/health-tools.css',
  '/js/main.js',
  '/js/community-stories.js',
  '/js/about-enhanced.js',
  '/js/health-tools.js',
  '/manifest.json',
  // External resources that should be cached
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// API endpoints that should be cached dynamically
const API_CACHE_PATTERNS = [
  /^https:\/\/api\./,
  /\/api\//,
  /\/data\//
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).catch(error => {
      console.error('[SW] Failed to cache static assets:', error);
      // Cache essential files only if full caching fails
      return caches.open(STATIC_CACHE_NAME).then(cache => {
        const essentialAssets = ['/', '/index.html', '/css/styles.css', '/js/main.js'];
        return cache.addAll(essentialAssets);
      });
    })
  );
  
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all pages immediately
  return self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests with appropriate strategies
  if (request.method === 'GET') {
    if (isStaticAsset(request.url)) {
      event.respondWith(cacheFirst(request));
    } else if (isApiRequest(request.url)) {
      event.respondWith(networkFirst(request));
    } else if (isPageRequest(request)) {
      event.respondWith(staleWhileRevalidate(request));
    } else {
      event.respondWith(networkFirst(request));
    }
  }
});

// Cache strategies
async function cacheFirst(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Cache first strategy failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline page for navigation requests
    if (isPageRequest(request)) {
      return caches.match('/index.html');
    }
    
    return new Response('Content not available offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
  return url.includes('/css/') || 
         url.includes('/js/') || 
         url.includes('/images/') ||
         url.includes('fonts.googleapis.com') ||
         url.includes('cdnjs.cloudflare.com') ||
         url.includes('unpkg.com');
}

function isApiRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

function isPageRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  switch (event.tag) {
    case 'health-data-sync':
      event.waitUntil(syncHealthData());
      break;
    case 'appointment-sync':
      event.waitUntil(syncAppointments());
      break;
    case 'medication-sync':
      event.waitUntil(syncMedications());
      break;
  }
});

// Push notifications for medication reminders
self.addEventListener('push', event => {
  console.log('[SW] Push message received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'You have a health reminder!',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'health-reminder',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/action-view.png'
      },
      {
        action: 'snooze',
        title: 'Snooze 10min',
        icon: '/images/action-snooze.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('HealthConnect Reminder', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  switch (event.action) {
    case 'view':
      event.waitUntil(
        clients.openWindow('/health-tools.html#medication-reminder')
      );
      break;
    case 'snooze':
      // Schedule another notification in 10 minutes
      setTimeout(() => {
        self.registration.showNotification('HealthConnect Reminder', {
          body: 'Snoozed reminder: Time for your medication!',
          icon: '/images/icon-192x192.png',
          tag: 'health-reminder'
        });
      }, 10 * 60 * 1000);
      break;
    default:
      event.waitUntil(
        clients.openWindow('/health-tools.html')
      );
  }
});

// Sync functions for offline data
async function syncHealthData() {
  try {
    const healthData = await getStoredHealthData();
    if (healthData && healthData.length > 0) {
      // Send data to server when online
      const response = await fetch('/api/sync/health-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(healthData)
      });
      
      if (response.ok) {
        // Clear local storage after successful sync
        await clearStoredHealthData();
        console.log('[SW] Health data synced successfully');
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync health data:', error);
  }
}

async function syncAppointments() {
  try {
    const appointments = await getStoredAppointments();
    if (appointments && appointments.length > 0) {
      const response = await fetch('/api/sync/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointments)
      });
      
      if (response.ok) {
        await clearStoredAppointments();
        console.log('[SW] Appointments synced successfully');
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync appointments:', error);
  }
}

async function syncMedications() {
  try {
    const medications = await getStoredMedications();
    if (medications && medications.length > 0) {
      const response = await fetch('/api/sync/medications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medications)
      });
      
      if (response.ok) {
        await clearStoredMedications();
        console.log('[SW] Medications synced successfully');
      }
    }
  } catch (error) {
    console.error('[SW] Failed to sync medications:', error);
  }
}

// Helper functions for data management
async function getStoredHealthData() {
  return new Promise(resolve => {
    // This would typically access IndexedDB or localStorage
    const data = localStorage.getItem('healthData');
    resolve(data ? JSON.parse(data) : []);
  });
}

async function clearStoredHealthData() {
  localStorage.removeItem('healthData');
}

async function getStoredAppointments() {
  return new Promise(resolve => {
    const data = localStorage.getItem('offlineAppointments');
    resolve(data ? JSON.parse(data) : []);
  });
}

async function clearStoredAppointments() {
  localStorage.removeItem('offlineAppointments');
}

async function getStoredMedications() {
  return new Promise(resolve => {
    const data = localStorage.getItem('medications');
    resolve(data ? JSON.parse(data) : []);
  });
}

async function clearStoredMedications() {
  localStorage.removeItem('medications');
}

// Periodic background sync for keeping data updated
self.addEventListener('periodicsync', event => {
  if (event.tag === 'clinic-updates') {
    event.waitUntil(syncClinicData());
  }
});

async function syncClinicData() {
  try {
    const response = await fetch('/api/clinics/updates');
    if (response.ok) {
      const data = await response.json();
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      await cache.put('/api/clinics/updates', new Response(JSON.stringify(data)));
      console.log('[SW] Clinic data updated');
    }
  } catch (error) {
    console.error('[SW] Failed to sync clinic data:', error);
  }
}

// Handle app updates
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service worker loaded successfully');
