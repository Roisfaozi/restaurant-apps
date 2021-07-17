import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestoSearchView {
    getTempleate() {
        return`
        <div id="resto-search-container">
            <input id="query" type="text">
            <div class="resto-result-container">
                <ul class="resto-list">
                </ul>
            </div>
        </div>
        `;
    }

    getFavoriteRestaurantTemplate() {
    return `
        div class="resto-container">
           <h2 class="resto-list-header">Your Favorite Restuarant</h2>
           <div id="resto-list" class="resto-list">
           </div>
       </div>       
        `;
  }

    runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
        callback(event.target.value);
    });
    }

    showRestaurants(restaurants) {
        let html
            if (restaurants.length > 0) {
                html = restaurants.reduce(
                    (carry, restaurant) => carry.concat(`<li class="resto"><span class="resto-name">${restaurant.title || '-'}</span></li>`),
                    '',
            );
            } else {
                html = '<div class="resto-not-found">Restaurant tidak ditemukan</div>';
            }
            document.querySelector('.resto-list').innerHTML = html
            document.getElementById('resto-search-container')
            .dispatchEvent(new Event('restaurants:searched:updated'));
    }

    showFavoriteRestaurants(restaurants = []) {
    let html;
        if (restaurants.length) {
            html = restaurants.reduce((carry, resto) => carry.concat(createRestaurantItemTemplate(resto)), '');
        } else {
            html = '<div class="resto-not-found"></div>';
        }

        const get = document.getElementById('resto-list').innerHTML = html;
        document.getElementById('resto-list').dispatchEvent(new Event('resto-list:updated'));
        console.lof(get)
    }
}

export default FavoriteRestoSearchView;
