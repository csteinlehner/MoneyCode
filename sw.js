const CACHE = 'transfersnap-v8';
const FILES = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './how.html',
  './imprint.html',
  './privacy.html',
  './manifest.json',
  './qrcode.min.js',
  './icon-192.png',
  './icon-512.png',
  './fonts/latin-400-normal.woff2',
  './fonts/latin-500-normal.woff2',
  './fonts/latin-600-normal.woff2',
  './fonts/latin-700-normal.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
