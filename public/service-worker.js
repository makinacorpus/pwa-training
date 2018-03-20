const CACHE_NAME = 'nr-v1';

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


function isDynamicRequest(event) {
  return (
    // On vérifie que la méthode est bien GET
    event.request.method.toLowerCase() === 'get' && (
      // et on vérifie si la ressource provient de media.guim.co.uk (le domaine pour les images)
      event.request.url.indexOf('media.guim.co.uk') !== -1
      // ou si c'est un appel à l'API guardianapis.com
      || event.request.url.indexOf('guardianapis.com') !== -1
    )
  )
}

function addToCache(request, response) {
  const responseCopy = response.clone();
  caches.open(CACHE_NAME).then(cache => {
    cache.put(request, responseCopy);
  });
  return response;
}

function fetchFromCache(event) {
  return caches.match(event.request).then(response => {
    if (!response) {
      // Si la ressource n'est pas trouvée en cache,
      // On renvoit une erreur (suynchrone) qu'on va pouvoir "catcher"
      throw Error('${event.request.url} non trouvé en cache');
    }
    return response;
  })
  return response;
}

function offlineResponse() {
  return new Response('<p>Application non disponible</p>',
    { headers: { 'Content-Type': 'text/html' } }
  );
}

// Network First
function respondFromNetworkThenCache(event) {
  event.respondWith(
    fetch(event.request)
      // Si la requête aboutie, on met en cache une copie de la réponse
      .then(response => addToCache(event.request, response))
      // Si la requête échoue, on cherche si la ressource demandée n'est pas déjà en cache
      .catch(() => fetchFromCache(event))
      // Si non, on renvoie un message
      .catch(() => offlineResponse())
  );
}

// Cache First
function respondFromCacheThenNetwork(event) {
  event.respondWith(
    // On cherche si la ressource demandée est en cache
    fetchFromCache(event)
      // Si non, on cherche via le réseau
      .catch(() => fetch(event.request))
      // Si la requête échoue, on renvoie un message
      .catch(() => offlineResponse())
  );
}

self.addEventListener("install", event => {
  console.log('Service Worker installé');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  // D'abord on vérifie le type de requête
  if (isDynamicRequest(event)) {
    // Si c'est une ressource dynamique (provenant de l'API)
    // Alors on va d'abord chercher la ressource en priorité sur le réseau
    respondFromNetworkThenCache(event);
  } else {
    // Sinon, c'est une ressource statique, on charge en priorité via le cache
    respondFromCacheThenNetwork(event);
  }
});

self.addEventListener('activate', (event) => {
  // On créer une tableau de caches à "whitelister"
  var cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    // On récupère l'ensemble des caches disponibles
    caches.keys().then(cacheNames => {
      return Promise.all(
        // On itère sur chacun des caches
        cacheNames.map(cacheName => {
          // Si il n'est pas whitelisté, on le supprimme
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})