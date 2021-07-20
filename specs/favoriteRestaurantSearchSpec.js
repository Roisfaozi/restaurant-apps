import FavoriteRestoIdb from '../src/scripts/data/favoriteRestaurantDb';
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-presenter';
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-resto-search-view';



describe("Searching restaurants", () => {

    let presenter;
    let favoriteResto;
    let view

    const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestaurantsSearchContainer = () => {
        view = new FavoriteRestoSearchView();
        document.body.innerHTML = view.getTempleate();
    };

    const constructPresenter  = () => {
        favoriteResto = spyOnAllFunctions(FavoriteRestoIdb);
        presenter = new FavoriteRestoSearchPresenter({
            favoriteResto,
            view
        });
    };

    beforeEach(() => {
        setRestaurantsSearchContainer();
        constructPresenter();
    });
    
    describe('When query is not empty', () => {

        it("should be able to capture the query typed by the user", () => {
            searchRestaurants('resto a');
            
            expect(presenter.latestQuery)
                .toEqual('resto a');
        });
        it('should ask the model to search for liked restaurants', () => {
            searchRestaurants('resto a');

            expect(favoriteResto.searchRestaurants)
                .toHaveBeenCalledWith('resto a');
        });


        it('should show - when the restaurant returned does not contain a title', (done) => {
            document.querySelector('.resto-list').addEventListener('resto-list:updated', () => {
                const restaurantTitles = document.querySelectorAll('.resto-name');
                expect(restaurantTitles.item(0).textContent).toEqual('-');

                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([
                { id: 444 },
            ]);

            searchRestaurants('resto a');
        });

        // ini async error
        fit('should show the restaurants found by Favorite Restaurants', (done) => {
            document.querySelector('.resto-list')
                .addEventListener('.resto-list:updated', () => {
                    expect(document.querySelectorAll('.resto').length).toEqual(3);
                    done();
                });

            favoriteResto.searchRestaurants.withArgs('Kafein a').and.returnValues([
                { id: 111, name: 'Kafein abc' },
                { id: 222, name: 'ada juga Kafein abcde' },
                { id: 333, name: 'ini aja deh Kafein a' },
            ]);

            searchRestaurants('Kafein a');
        });

        it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
            document.querySelector('.resto-list').addEventListener('resto-list:updated', () => {
                const restaurantTitles = document.querySelectorAll('.resto-name');
                expect(restaurantTitles.item(0).textContent).toEqual('resto abc');
                expect(restaurantTitles.item(1).textContent).toEqual('ada juga resto abcde');
                expect(restaurantTitles.item(2).textContent).toEqual('ini aja deh resto a');

                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([
                { id: 111, name: 'resto abc' },
                { id: 222, name: 'ada juga resto abcde' },
                { id: 333, name: 'ini aja deh resto a' },
            ]);

            searchRestaurants('resto a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants(' ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('    ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            searchRestaurants('    ');

            expect(favoriteResto.getAllRestos)
                .toHaveBeenCalled();
            expect(favoriteResto.getAllRestos).toHaveBeenCalledTimes(1);
        });
    });


    describe('When no favorite movies could be found', () => {
    
        it('should show the empty message', (done) => {
            document.querySelector('.resto-list')
                    .addEventListener('resto-list:updated', () => {
                expect(document.querySelectorAll('.resto-list-not-found').length)
                    .toEqual(1);
                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([]);

            searchRestaurants('resto a');
        });
        
        // async error
        it('should not show any restaurant', (done) => {
            document.querySelector('.resto-list').addEventListener('resto-lis:updated', () => {
                expect(document.querySelectorAll('.resto').length).toEqual(0);
                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto a')
                .and
                .returnValues([]);

            searchRestaurants('resto a');
        });
        
    });

});