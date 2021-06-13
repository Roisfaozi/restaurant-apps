import RestaurantDbSource from '../../data/restourantdb-source'
import UrlParser from '../../routes/url-parser'
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
  }
}

export default Detail
