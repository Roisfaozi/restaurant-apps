/* eslint-disable no-undef */
const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favoriteRestaurant.putResto({ id: 1 })
    favoriteRestaurant.putResto({ id: 2 })

    expect(await favoriteRestaurant.getResto(1))
      .toEqual({ id: 1 })
    expect(await favoriteRestaurant.getResto(2))
      .toEqual({ id: 2 })
    expect(await favoriteRestaurant.getResto(3))
      .toEqual(undefined)
  })

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurant.putResto({ aProperty: 'property' })

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([])
  })

  it('can return all of the restaurants that have been added', async () => {
    favoriteRestaurant.putResto({ id: 1 })
    favoriteRestaurant.putResto({ id: 2 })

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([
        { id: 1 },
        { id: 2 }
      ])
  })

  it('should remove favorite restaurant', async () => {
    favoriteRestaurant.putResto({ id: 1 })
    favoriteRestaurant.putResto({ id: 2 })
    favoriteRestaurant.putResto({ id: 3 })

    await favoriteRestaurant.deleteResto(1)

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([
        { id: 2 },
        { id: 3 }
      ])
  })

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteRestaurant.putResto({ id: 1 })
    favoriteRestaurant.putResto({ id: 2 })
    favoriteRestaurant.putResto({ id: 3 })

    await favoriteRestaurant.deleteResto(4)

    expect(await favoriteRestaurant.getAllRestos())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ])
  })

  it('should be able to search for restaurants', async () => {
    favoriteRestaurant.putResto({ id: 1, title: 'restaurant a' })
    favoriteRestaurant.putResto({ id: 2, title: 'restaurant b' })
    favoriteRestaurant.putResto({ id: 3, title: 'restaurant abc' })
    favoriteRestaurant.putResto({ id: 4, title: 'ini mah restaurant abcd' })

    expect(await favoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
      { id: 1, title: 'restaurant a' },
      { id: 3, title: 'restaurant abc' },
      { id: 4, title: 'ini mah restaurant abcd' }
    ])
  })
}

export { itActsAsFavoriteRestaurantModel }
