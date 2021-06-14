import RestaurantDbSource from '../../data/restourantdb-source'
import UrlParser from '../../routes/url-parser'
import LikeButtonInitiator from '../../utils/like-button-initiators'
import { createRestaurantDetailTemplate } from '../templates/template-creator'

const Detail = {
  async render () {
    return `
      <div id="resto" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const resto = await RestaurantDbSource.detailRestaurant(url.id)
    const restoContainer = document.querySelector('#resto')
    restoContainer.innerHTML = createRestaurantDetailTemplate(resto)

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto
    })
  }
}

export default Detail
