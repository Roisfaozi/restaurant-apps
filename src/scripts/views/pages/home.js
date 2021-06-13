import RestaurantDbSource from '../../data/restourantdb-source'
import { createRestaurantItemTemplate } from '../templates/template-creator'

const Home = {
  async render () {
    return `
      <div class="hero">
                <div class="hero-container">

                    <img src="./images/heros/hero-image_2.jpg" alt="hero image">
                </div>
                <div class="text-header">
                    <h1 tabindex="0">Looking for Lunch?</h1>
                    <h2 tabindex="0">Stop find yout favorite restaurant and have a lunch break.</h2>
                    <button class="btn-info">Check it now!</button>
                </div>
            </div>
            <section id="resto">

                <div class="resto-container">
                    <h2 class="resto-list-header">Choose Restaurant</h2>
                    <div class="resto-list">
                        <!-- Resto List Here -->


                    </div>
                    <div id="not-found"></div>
                </div>
            </section>
    `
  },

  async afterRender () {
    const restaurants = await RestaurantDbSource.restaurantsList()
    const restaurantsContainer = document.querySelector('.resto-list')
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant)
    })
  }
}

export default Home
