import FavoriteRestoIdb from '../../data/favoriteRestaurantDb'
import { createRestaurantItemTemplate } from '../templates/template-creator'
const Favorite = {
  async render () {
    return `
      <div class="resto-container">
        <h2 class="resto-list-header">Favorite Restuarant</h2>
        <div class="resto-list">
          <!-- Resto List Here -->
        </div>
      </div>
    `
  },

  async afterRender () {
    const restourants = await FavoriteRestoIdb.getAllRestos()
    const restourantsContainer = document.querySelector('.resto-list')
    restourants.forEach((resto) => {
      restourantsContainer.innerHTML += createRestaurantItemTemplate(resto)
    })
  }

}

export default Favorite
