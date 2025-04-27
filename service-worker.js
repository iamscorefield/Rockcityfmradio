const CACHE_NAME = 'rock-city-fm-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/background.gif',
  '/icon.png',
  '/icon-96x96.png',
  '/icon-144x144.png',
  '/icon-180x180.png',
  '/icon-512x512.png',
  '/icon-1024x1024.png',
  '/screenshot1.png',
  '/screenshot2.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          return caches.match('/index.html'); // Fallback to index.html for offline
        });
      })
  );
});
