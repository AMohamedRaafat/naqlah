// Service Worker for Naqlah PWA
// Version 1.0.0

const CACHE_VERSION = 'naqlah-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/assets/logo.svg',
  '/assets/landing/truck.png',
  '/assets/powerdBy.svg',
  '/offline',
];

// Max number of items in dynamic cache
const DYNAMIC_CACHE_LIMIT = 50;
const IMAGE_CACHE_LIMIT = 60;

// Helper: Limit cache size
async function limitCacheSize(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await limitCacheSize(cacheName, maxItems);
  }
}

// Helper: Clean old caches
async function cleanupCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames
      .filter((name) => name.startsWith('naqlah-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE && name !== IMAGE_CACHE && name !== FONT_CACHE)
      .map((name) => caches.delete(name))
  );
}

// Install Event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...', event);
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...', event);
  
  event.waitUntil(
    cleanupCaches()
      .then(() => self.clients.claim())
  );
});

// Fetch Event - Network strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip chrome extensions and non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip API calls to external services (you can modify this based on your API)
  if (url.hostname !== self.location.hostname && !url.pathname.startsWith('/_next/')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

// Main fetch handler with different strategies
async function handleFetch(request) {
  const url = new URL(request.url);

  try {
    // Strategy 1: Cache First for static assets (images, fonts, etc.)
    if (request.destination === 'image') {
      return await cacheFirst(request, IMAGE_CACHE, IMAGE_CACHE_LIMIT);
    }

    if (request.destination === 'font' || url.pathname.includes('/fonts/')) {
      return await cacheFirst(request, FONT_CACHE);
    }

    // Strategy 2: Network First for HTML pages and API calls
    if (request.destination === 'document' || url.pathname.startsWith('/api/')) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }

    // Strategy 3: Stale While Revalidate for scripts and styles
    if (request.destination === 'script' || request.destination === 'style') {
      return await staleWhileRevalidate(request, STATIC_CACHE);
    }

    // Strategy 4: Cache First for Next.js static files
    if (url.pathname.startsWith('/_next/static/')) {
      return await cacheFirst(request, STATIC_CACHE);
    }

    // Default: Network First
    return await networkFirst(request, DYNAMIC_CACHE);

  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      const cache = await caches.open(STATIC_CACHE);
      return await cache.match('/offline') || new Response('Offline - Please check your connection', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/plain',
        }),
      });
    }

    return new Response('Network error', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

// Cache First Strategy - Fastest, best for static assets
async function cacheFirst(request, cacheName, cacheLimit) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      if (cacheLimit) {
        limitCacheSize(cacheName, cacheLimit);
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
}

// Network First Strategy - Fresh content, fallback to cache
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
      limitCacheSize(cacheName, DYNAMIC_CACHE_LIMIT);
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale While Revalidate - Return cached, update in background
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  });

  return cached || fetchPromise;
}

// Background Sync - For offline form submissions (optional)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Implement your form sync logic here
  // This is called when the device comes back online
  console.log('[SW] Syncing offline forms...');
}

// Push Notifications (optional)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New notification',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'naqlah-notification',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification('Naqlah', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handler for communication with the app
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

console.log('[SW] Service Worker loaded');

