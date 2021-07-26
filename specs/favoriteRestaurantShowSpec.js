/* eslint-disable no-undef */
import FavoriteRestoIdb from '../src/scripts/data/favoriteRestaurantDb'
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-view'
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-resto-show-presenter'

describe('Showing all favorite restaurants', () => {
  let view
  const renderTemplate = () => {
    view = new FavoriteRestoSearchView()
    document.body.innerHTML = view.getTempleate()
  }

  beforeEach(() => {
    renderTemplate()
    console.log(renderTemplate())
  })

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestoIdb)

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
      expect(favoriteRestaurants.getAllRestos).toHaveBeenCalledTimes(1)
    })

    it('should show the information that no restaurants have been liked', (done) => {
      document.querySelector('.resto-list').addEventListener('resto-list:updated', () => {
        expect(document.querySelectorAll('.resto-list-not-found').length)
          .toEqual(1)

        done()
      })

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestoIdb)
      favoriteRestaurants.getAllRestos.and.returnValues([])

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
    })

    describe('When favorite restaurants exist', () => {
      it('should show the restaurants', (done) => {
        document.querySelector('.resto-list').addEventListener('resto-list:updated', () => {
          expect(document.querySelectorAll('.resto-name').length).toEqual(2)
          done()
        })

        const favoriteRestaurants = spyOnAllFunctions(FavoriteRestoIdb)
        favoriteRestaurants.getAllRestos.and.returnValues([
          {
            id: 11, title: 'A', vote_average: 3, overview: 'Sebuah restaurant A'
          },
          {
            id: 22, title: 'B', vote_average: 4, overview: 'Sebuah restaurant B'
          }
        ])

        new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants
        })
      })
    })
  })
})
