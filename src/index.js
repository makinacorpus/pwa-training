import Api from './api'

window.addEventListener('load', function() {
  // TODO : Installer le service worker
  
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