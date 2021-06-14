const createRestaurantDetailTemplate = (resto) => `
<h2 tabindex="0" class="restaurant-title">${resto.name} <span>/ ⭐️${resto.rating}</span></h2>
<img class="restaurant-poster" src="https://restaurant-api.dicoding.dev/images/medium/${resto.pictureId}" alt="${resto.name}" />


  <h3>Alamat</h3>
  <p>${resto.address} ${resto.city}</p>

<div class="restaurant-desc">
  <h3 tabindex="0" >Description</h3>
  <p tabindex="0" >${resto.description}</p>
  <p tabindex="0" class="menu-category"><span>Menu Category :</span> ${resto.categories.map((category) => category.name)}</p>
  <p tabindex="0" class="foods-menu"><span>Foods Menu :</span> ${resto.menus.foods.map((food) => food.name)}</p>
  <p tabindex="0" class="drinks-menu"><span>Drinks Menu :</span> ${resto.menus.drinks.map((drink) => drink.name)}</p>
  <h3 tabindex="0" >Reviews</h3>
  <div id="reviews" class="reviews">
    ${resto.customerReviews.map((customerReview) => `
      <div class="review">
        <p tabindex="0" class="review-name"><span>${customerReview.name}</span></p>
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
