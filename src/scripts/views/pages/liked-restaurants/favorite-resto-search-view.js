import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestoSearchView {
    getTempleate() {
        return`
            <div class="resto-containe">
        <input id="query" type="text">
        <h2 class="resto-list-header">Favorite Restuarant</h2>
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
        this.showFavoriteRestaurants(restaurants)
    }

    showFavoriteRestaurants(restaurants = []) {
    let html;
        if (restaurants.length) {
            html = restaurants.reduce((carry, resto) => carry.concat(createRestaurantItemTemplate(resto)), '');
        } else {
            html = this._getEmptyRestoTemplate();
        }
        document.querySelector('.resto-list').innerHTML = html;
        document.querySelector('.resto-list').dispatchEvent(new Event('resto-list:updated'));
    }

    _getEmptyRestoTemplate() {
    return '<div class="resto-list-not-found">Tidak ada Restoran untuk ditampilkan</div>';
    }
}

export default FavoriteRestoSearchView;
