var filesToCache = [
  // Ressources locales
  '/',
  '/bundle.js',
  '/style.css',
  '/images/icon.png',
  '/images/news.svg',
  '/mdl/material.min.css',
  '/mdl/material.min.js',

  // Ressources externes
  'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];


self.addEventListener("install", event => {
  console.log('Service Worker installé');
  event.waitUntil(
    // On Install
    caches.open('nr-v1').then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', event => {
  event.respondWith(
    // Cache First
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});