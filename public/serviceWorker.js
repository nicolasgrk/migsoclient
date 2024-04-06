// serviceWorker.js dans le dossier public/

const CACHE_NAME = 'version-1';
const urlsToCache = [ 'index.html', 'offline.html' ];

// Installation du SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache ouvert');
                
                return cache.addAll(urlsToCache);
            })
    );
});

// Écoute pour les requêtes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'));
            })
    )
});

// Activation du SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});
