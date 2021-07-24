
import FavoriteRestoIdb from '../../data/favoriteRestaurantDb';
import FavoriteRestoSearchPresenter from './liked-restaurants/favorite-resto-search-presenter';
import FavoriteRestoSearchView from './liked-restaurants/favorite-resto-search-view';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-resto-show-presenter';

const view = new FavoriteRestoSearchView()

const Favorite = {
  async render () {
    return view.getTempleate()
  },

  async afterRender () {
    new FavoriteRestaurantShowPresenter({view, favoriteRestaurants: FavoriteRestoIdb})
    new FavoriteRestoSearchPresenter({view, favoriteResto: FavoriteRestoIdb})
  }

}

export default Favorite
