import 'whatwg-fetch'

export const API_URL = 'https://content.guardianapis.com/search'
const API_KEY = '38dac9cb-d687-4d88-909c-942ce5868e83';

class Api {
  /**
   * Get the list of all articles
   */
  getAll() {
    return fetch(API_URL + '?api-key=' + API_KEY + '&show-fields=trailText,thumbnail')
      .then(response => response.json())
      .then(res => res.response && res.response.results)
  }
}

export default new Api();