import FavoriteRestoIdb from '../../data/favoriteRestaurantDb';
import RestaurantDbSource from '../../data/restourantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { createRestaurantDetailTemplate } from '../templates/template-creator';


const Detail = {
  async render () {
    return `
      <div id="resto" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id)
    const restoContainer = document.querySelector('#resto')
    restoContainer.innerHTML = createRestaurantDetailTemplate(restaurant)

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestoIdb,
      restaurant
    })
  }
}

export default Detail
