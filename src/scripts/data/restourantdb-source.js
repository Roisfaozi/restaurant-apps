import API_ENDPOINT from '../globals/api-endpoint'

class RestaurantDbSource {
  static async restaurantsList () {
    const response = await fetch(API_ENDPOINT.RESTAURANTS_LIST)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async detailRestaurant (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    const responseJson = await response.json()
    console.log(responseJson.restaurant)
    return responseJson.restaurant
  }
}

export default RestaurantDbSource
