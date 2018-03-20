import Api from './api'

function update(worker) {
  worker.postMessage({action: 'skipWaiting'})
}

var snackbarContainer = document.querySelector('#notification-toast-example');
function showUpdateNotification(worker) {
  snackbarContainer.MaterialSnackbar.showSnackbar({
    message: 'Une mise à jour est disponible.',
    timeout: 4000,
    actionHandler: () => update(worker),
    actionText: 'Refraîchir'
  });
}

// Service Worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(registration => {
        // Le Service Worker est déclaré !
        console.log('Service Worker déclaré !');

        // Fonction pour détecter la fin de l'installation d'un worker
        function trackInstalling(worker) {
          worker.addEventListener('statechange', () => {
            if (worker.state == 'installed') {
              // Un nouveau worker est prêt !!
              showUpdateNotification(worker)
            }
          });
        };

        // S'il n'y a pas de controller, la page n'est pas chargée via le service worker
        if (!navigator.serviceWorker.controller) {
          return;
        }

        // Si une nouvelle version est déjà installée,
        // elle est en attente, on affiche la notification
        if (registration.waiting) {
          // Un nouveau worker est prêt !!
          showUpdateNotification(registration.waiting)
          return;
        }

        // Si le SW est en cours d'installation, alors on vérifie son état
        // si il est "installed", on affiche la notification
        if (registration.installing) {
          trackInstalling(registration.installing);
          return;
        }

        // Sinon, on vérifie s'il y a un workers disponibles
        // puis on vérifie son état, si il est "installed", on affiche la notification
        registration.addEventListener('updatefound', () => {
          trackInstalling(registration.installing);
          return;
        });
      })
      .catch(error => {
        // Il y a eu un problème
        console.error('Erreur: ', error);
      });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    })
  }
}

window.addEventListener('load', function() {

  registerServiceWorker();
  
  // Script pour le chargement des news via The Guardian API
  // http://open-platform.theguardian.com/documentation/
  
  const container = document.getElementById('news-container');
  
  // On s'assure qu'il y a bien un container
  if (container) {
    // Ajout d'un loader le temps de charger les données
    container.innerHTML = '<div class="loader"><div class="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></div></div>';
    
    Api.getAll().then((res) => {
      // On vide le container pour enlever le loader, on a ajouter les données à la place
      container.innerHTML = '';
      res.map(item => {
        const news = `
          <div class="mdl-cell mdl-card mdl-shadow--4dp news-card">
            <div class="mdl-card__media">
                <img class="article-image" src="${item.fields.thumbnail || ''}" border="0" alt="">
            </div>
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">${item.webTitle}</h2>
            </div>
            <div class="mdl-card__supporting-text">
              ${item.fields.trailText}
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${item.webUrl}" target="_blank" rel="noreferrer">Read more</a>
            </div>
          </div>
        `
        container.innerHTML += news;
      })
    })
  }
});