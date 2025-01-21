const CACHE_NAME = 'bonballon-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/results.html',
    '/css/style.css',
    '/css/teams.css',
    '/js/main.js',
    '/js/results.js',
    '/js/jquery/1.11.3/jquery.min.js',
    '/bootstrap/3.3.5/css/bootstrap.min.css',
    '/bootstrap/3.3.5/js/bootstrap.min.js',
    '/font-awesome/4.7.0/css/font-awesome.min.css',
    '/images/logo.png',
    '/images/favicon.ico'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
