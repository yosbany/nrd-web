// Service Worker for PWA offline support (Panadería Nueva Río D'or)

const CACHE_PREFIX = 'nrd-web-';
const CACHE_NAME = CACHE_PREFIX + 'v1-' + Date.now();

const ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './assets/styles/styles.css',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/images/og.jpg',
  './assets/images/brand/logo-redondo.png',
  './assets/images/gallery/fachada.jpg',
  './assets/images/gallery/vitrina.jpg',
  './assets/images/products/pan-flauta.jpg',
  './assets/images/products/bizcochos.jpg',
  './assets/images/products/medialuna-rellena.jpg',
  './assets/images/products/empanada-jamon-queso.jpg',
  './assets/images/products/pasta-frola-ddl.jpg',
  './assets/images/products/alfajor-suizo.jpg',
  './app.js',
  './views/home/index.js',
  './views/home/home.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.map((n) => (n.startsWith(CACHE_PREFIX) ? caches.delete(n) : undefined))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // Always revalidate version.json
  if (url.pathname.endsWith('/version.json') || url.pathname.endsWith('version.json')) {
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
    return;
  }

  // Avoid caching the service worker itself
  if (url.pathname.endsWith('/service-worker.js') || url.pathname.endsWith('service-worker.js')) {
    return;
  }

  const isNavigation = event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') || '').includes('text/html');

  // Network-first for everything, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request, { ignoreSearch: true });
        if (cached) return cached;
        if (isNavigation) {
          const offline = await caches.match('./offline.html');
          if (offline) return offline;
        }
        return cached;
      })
  );
});

