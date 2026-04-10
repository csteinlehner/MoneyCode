const CACHE = 'transfersnap-v12';
const FILES = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './how.html',
  './install.html',
  './imprint.html',
  './privacy.html',
  './manifest.json',
  './qrcode.min.js',
  './icon-192.png',
  './icon-512.png',
  './favicon.svg',
  './fonts/latin-400-normal.woff2',
  './fonts/latin-500-normal.woff2',
  './fonts/latin-600-normal.woff2',
  './fonts/latin-700-normal.woff2',
  './fonts/fira-sans-latin-400-normal.woff2',
  './fonts/fira-sans-latin-500-normal.woff2',
  './fonts/fira-sans-latin-600-normal.woff2',
  './fonts/fira-sans-latin-700-normal.woff2'
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
  const url = new URL(event.request.url);
  const isFont = url.pathname.startsWith('/fonts/');

  if (isFont) {
    // Cache-first for fonts (they never change, only new files get added)
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  } else {
    // Network-first for everything else (cache is offline fallback only)
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
