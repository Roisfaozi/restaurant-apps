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

        it('should show the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1 }]);

            expect(document.querySelectorAll('.resto').length).toEqual(1);
    
            presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
            expect(document.querySelectorAll('.resto').length).toEqual(2);
            
        });

        it('should show the title of the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }]);
            expect(document.querySelectorAll('.resto-name').item(0).textContent)
                .toEqual('Satu');

            presenter._showFoundRestaurants(
                [{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }],
            );

            const restaurantTitles = document.querySelectorAll('.resto-name');
            expect(restaurantTitles.item(0).textContent).toEqual('Satu');
            expect(restaurantTitles.item(1).textContent).toEqual('Dua');
        });

        it('should show - for found restaurant without title', () => {
            presenter._showFoundRestaurants([{ id: 1 }]);

            expect(document.querySelectorAll('.resto-name').item(0).textContent)
                .toEqual('-');
        });

        it('should show the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('resto-search-container')
                .addEventListener('restaurants:searched:updated', () => {
                    expect(document.querySelectorAll('.resto').length).toEqual(3);
                    done();
                });

            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([
                { id: 111, title: 'resto abc' },
                { id: 222, title: 'ada juga resto abcde' },
                { id: 333, title: 'ini juga boleh resto a' },
            ]);

            searchRestaurants('resto a');
        });

        it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('resto-search-container').addEventListener('restaurants:searched:updated', () => {
                const restaurantTitles = document.querySelectorAll('.resto-name');
                expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
                expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
                expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([
                { id: 111, title: 'restaurant abc' },
                { id: 222, title: 'ada juga restaurant abcde' },
                { id: 333, title: 'ini juga boleh restaurant a' },
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
            document.getElementById('resto-search-container')
                    .addEventListener('restaurants:searched:updated', () => {
                expect(document.querySelectorAll('.resto-not-found').length)
                    .toEqual(1);
                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([]);

            searchRestaurants('resto a');
        });
        
        it('should not show any restaurant', (done) => {
            document.getElementById('resto-search-container').addEventListener('restaurants:searched:updated', () => {
                expect(document.querySelectorAll('.resto').length).toEqual(0);
                done();
            });

            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([]);

            searchRestaurants('resto a');
        });

        it('should show - when the movie returned does not contain a title', (done) => {
            document.getElementById('resto-search-container').addEventListener('restaurants:searched:updated', () => {
                const restaurantTitles  = document.querySelectorAll('.resto-name');
                expect(restaurantTitles .item(0).textContent).toEqual('-');
            
                done();
            });
            
            favoriteResto.searchRestaurants.withArgs('resto a').and.returnValues([
                { id: 444 },
            ]);
            
            searchRestaurants('resto a');
        });
        
    });

});