const CACHE_NAME = 'vtuwise-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/data.js',
    '/nav.js',
    '/search.js',
    '/slider.js',
    '/auth.js',
    '/manifest.json'
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
                return fetch(event.request);
            })
    );
});
