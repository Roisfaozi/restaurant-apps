/* eslint-disable no-undef */
import FavoriteRestoIdb from '../src/scripts/data/favoriteRestaurantDb'
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract'

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllRestos()).forEach(async (restaurant) => {
      await FavoriteRestoIdb.deleteResto(restaurant.id)
    })
  })

  itActsAsFavoriteRestaurantModel(FavoriteRestoIdb)
})
