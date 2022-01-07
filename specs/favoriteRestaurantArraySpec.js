/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract'

let favoriteRestaurants = []

const FavoriteRestaurantArray = {

  getResto (id) {
    if (!id) {
      return
    }

    return favoriteRestaurants.find((resto) => resto.id === id)
  },

  getAllRestos () {
    return favoriteRestaurants
  },

  putResto (resto) {
    if (!resto.hasOwnProperty('id')) {
      return
    }

    if (this.getResto(resto.id)) {
      return
    }

    favoriteRestaurants.push(resto)
  },

  deleteResto (id) {
    favoriteRestaurants = favoriteRestaurants.filter((resto) => resto.id !== id)
  },

  async searchRestaurants (query) {
    return this.getAllRestos()
      .filter((resto) => {
        const loweredCaseRestaurantTitle = (resto.name || '-').toLowerCase()
        const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '')

        const loweredCaseQuery = query.toLowerCase()
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '')

        return jammedRestaurantTitle.indexOf(jammedQuery) !== -1
      })
  }
}

// eslint-disable-next-line no-undef
describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteRestaurants = [])

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray)
})
