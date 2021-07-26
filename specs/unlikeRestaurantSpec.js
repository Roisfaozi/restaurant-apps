/* eslint-disable no-undef */
import FavoriteRestoIdb from '../src/scripts/data/favoriteRestaurantDb'
import * as TestFactories from './helpers/testFactories'

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>'
}

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer()
    await FavoriteRestoIdb.putResto({ id: 1 })
  })

  afterEach(async () => {
    await FavoriteRestoIdb.deleteResto(1)
  })

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="unlike this resto"]'))
      .toBeTruthy()
  })

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="like this resto"]'))
      .toBeFalsy()
  })

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([])
  })

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 })

    // hapus dulu film dari daftar film yang disukai
    await FavoriteRestoIdb.deleteResto(1)

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestoIdb.getAllRestos()).toEqual([])
  })
})
