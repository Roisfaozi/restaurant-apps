
import { createLikeButtonRestaurantTemplate, createUnlikeRestaurantButtonTemplate } from '../views/templates/template-creator'

const LikeButtonPresenter = {
  async init ({ likeButtonContainer, favoriteRestaurants, restaurant }) {
    this._likeButtonContainer = likeButtonContainer
    this._resto = restaurant
    this._favoriteRestaurants = favoriteRestaurants;
    
    await this._renderButton()
  },
  
  async _renderButton () {
    const { id } = this._resto
    if (await this._isRestoExist(id)) {
      this._renderLiked()
    } else {
      this._renderLike()
    }
  },

  async _isRestoExist (id) {
    const resto = await this._favoriteRestaurants.getResto(id)
    return !!resto
  },

  _renderLike () {
    this._likeButtonContainer.innerHTML = createLikeButtonRestaurantTemplate()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putResto(this._resto)
      this._renderButton()
    })
  },

  _renderLiked () {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate()

    const likeButton = document.querySelector('#likeButton')
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteResto(this._resto.id)
      this._renderButton()
    })
  }
}

export default LikeButtonPresenter
