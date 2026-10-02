
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

self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARCHIVOS);
            })
    );

    self.skipWaiting();
});


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


self.addEventListener('fetch', (event) => {

    event.respondWith(

        caches.match(event.request)
            .then((respuesta) => {

                if (respuesta) {
                    return respuesta;
                }

                return fetch(event.request);

            })

    );

});

