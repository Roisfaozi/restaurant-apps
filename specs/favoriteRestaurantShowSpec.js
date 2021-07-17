import FavoriteRestoIdb from '../src/scripts/data/favoriteRestaurantDb';
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-presenter';
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-resto-show-presenter';


describe('Showing all favorite restaurants', () => {
  let view;
  const renderTemplate = () => {
      view = new FavoriteRestoSearchView();
      document.body.innerHTML = view.getTempleate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteResto = spyOnAllFunctions(FavoriteRestoIdb);

      new FavoriteRestoSearchPresenter({
        view,
        favoriteResto,
      });
      
      expect(favoriteResto.getAllRestos).toHaveBeenCalledTimes(1);
    });

    fit('should show the information that no restaurants have been liked', (done) => {
      document.querySelector('.resto-list').addEventListener('resto-list:updated', () => {
        expect(document.querySelectorAll('.resto-not-found').length)
          .toEqual(1);

        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestoIdb);
      favoriteRestaurants.getAllRestos.and.returnValues([]);

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });

    describe('When favorite restaurants exist', () => {
      it('should show the restaurants', (done) => {
        document.querySelector('.resto-list').addEventListener('esto-list:updated', () => {
          expect(document.querySelectorAll('.resto-name').length).toEqual(2);
          done();
        });

        const favoriteRestaurants = spyOnAllFunctions(FavoriteRestoIdb);
        favoriteRestaurants.getAllRestos.and.returnValues([
          {
            id: 11, title: 'A', vote_average: 3, overview: 'Sebuah restaurant A',
          },
          {
            id: 22, title: 'B', vote_average: 4, overview: 'Sebuah restaurant B',
          },
        ]);

        new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants,
        });
      });
    });
  });
});
