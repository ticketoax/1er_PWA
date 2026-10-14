
const CACHE_NAME = 'coffee-pwa-v2';

const ARCHIVOS = [
    './',
    './index.html',
    './detalle.html',
    './manifest.json',
    './css/style.css',
    './js/app.js',
    './imagenes/icons/icon-72x72.png',
    './imagenes/icons/icon-96x96.png',
    './imagenes/icons/icon-128x128.png',
    './imagenes/icons/icon-144x144.png',
    './imagenes/icons/icon-152x152.png',
    './imagenes/icons/icon-192x192.png',
    './imagenes/icons/icon-384x384.png',
    './imagenes/icons/icon-512x512.png'
];

// INSTALAR SERVICE WORKER
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARCHIVOS);
            })
    );

    self.skipWaiting();
});

// ACTIVAR SERVICE WORKER
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((nombres) => {
                return Promise.all(
                    nombres
                        .filter(nombre => nombre !== CACHE_NAME)
                        .map(nombre => caches.delete(nombre))
                );
            })
    );

    self.clients.claim();
});

// CACHE FIRST
function cacheFirst(request) {
    return caches.match(request)
        .then((respuesta) => {
            if (respuesta) {
                return respuesta;
            }

            return fetch(request);
        });
}

// NETWORK FIRST
function networkFirst(request) {
    return fetch(request)
        .then((respuesta) => {
            if (respuesta && respuesta.ok) {
                const copia = respuesta.clone();

                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(request, copia);
                    });
            }

            return respuesta;
        })
        .catch(() => {
            return caches.match(request)
                .then((respuesta) => {
                    if (respuesta) {
                        return respuesta;
                    }

                    return new Response('No hay conexión a internet ni una copia guardada.', {
                        status: 503,
                        headers: {
                            'Content-Type': 'text/plain; charset=utf-8'
                        }
                    });
                });
        });
}

// EVENTO FETCH
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    // CACHE FIRST: archivos locales
    if (url.origin === self.location.origin &&
        !url.pathname.endsWith('.html')) {
        event.respondWith(cacheFirst(event.request));
    }

    // NETWORK FIRST: páginas HTML
    else {
        event.respondWith(networkFirst(event.request));
    }
});
