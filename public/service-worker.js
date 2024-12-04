const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  // Add other important assets like images, fonts, etc.
];

self.addEventListener('install', (event) => {
  // Cache important assets during installation
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Try to serve the request from the cache
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return the cached response if available, otherwise fetch from network
        return cachedResponse || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  // Remove old caches that are no longer used
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});