const createRestaurantDetailTemplate = (resto) => `
<h2 tabindex="0" class="restaurant-title">${resto.name}</h2>
<img class="restaurant-poster" src="https://restaurant-api.dicoding.dev/images/medium/${resto.pictureId}" alt="${resto.name}" />
<div class="restaurant-info">
<h3>Information</h3>
  <h4>Kota</h4>
  <p tabindex="0" >${resto.city}</p>
  <h4>Alamat</h4>
  <p tabindex="0">${resto.address}</p>
  <h4>Rating</h4>
  <p tabindex="0">${resto.rating}</p>
</div>
<div class="restaurant-desc">
  <h3 tabindex="0" >Description</h3>
  <p tabindex="0" >${resto.description}</p>
  <p tabindex="0" class="menu-category">Menu Category : ${resto.categories.map((category) => category.name)}</p>
  <p tabindex="0" class="foods-menu">Foods Menu : ${resto.menus.foods.map((food) => food.name)}</p>
  <p tabindex="0" class="drinks-menu">Drinks Menu : ${resto.menus.drinks.map((drink) => drink.name)}</p>
  <h3 tabindex="0" >Reviews</h3>
  <div id="reviews" class="reviews">
    ${resto.customerReviews.map((customerReview) => `
      <div class="review">
        <p tabindex="0" class="review-name">${customerReview.name}</p>
        <p tabindex="0" class="review-content">${customerReview.review}</p>
        <p tabindex="0" class="review-date">${customerReview.date}</p>
      </div>
    `).join('')}
  </div>
</div>
`

const createRestaurantItemTemplate = (resto) => `
  <div class="resto-card" id="${resto.id}">
    <div class="resto-image" tabIndex="0">
      <img src="https://restaurant-api.dicoding.dev/images/small/${resto.pictureId}" alt="${resto.name}">
    </div>

    <div class="resto-content">
      <a href="${`/#/detail/${resto.id}`}">
        <p tabindex="0" class="resto-name">${resto.name}</p>
        <p tabindex="0" class="resto-city">${resto.city}</p>
        <p tabindex="0" class="resto-description">${
          resto.description.slice(0, 200) + ' ...'
        }
        </p>
        <p tabindex="0" class="resto-rating">${
          resto.rating
        }</p>
      </a>
    </div>
  </div>
`

export { createRestaurantItemTemplate, createRestaurantDetailTemplate }
