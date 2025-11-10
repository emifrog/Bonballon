const CACHE_NAME = 'bonballon-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/results.html',
    '/history.html',
    '/about.html',
    '/contact.html',
    '/features.html',
    '/offline.html',
    '/manifest.json',
    
    // Styles
    '/css/style.css',
    '/css/teams.css',
    '/bootstrap/3.3.5/css/bootstrap.min.css',
    '/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Open+Sans:400,500,600,700%7CMontserrat',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    
    // Scripts
    '/js/main.js',
    '/js/results.js',
    '/js/history.js',
    '/js/pwa.js',
    '/js/jquery/1.11.3/jquery.min.js',
    '/bootstrap/3.3.5/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    
    // Images
    '/images/logo.png',
    '/images/favicon.ico',
    '/images/favicon.png',
    '/images/icons/icon-48x48.png',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Erreur lors du cache :', error);
            })
    );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - retourner la réponse du cache
                if (response) {
                    return response;
                }

                // Cloner la requête
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // Vérifier si la réponse est valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cloner la réponse
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Si la requête échoue, essayer de retourner une page offline
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
});

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Gestion des messages
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
