/* eslint-disable no-undef */
const assert = require('assert')
Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/favorite')
})

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query')
  I.see('Tidak ada Restoran untuk ditampilkan', '.resto-list-not-found')
})

Scenario('liking restaurant', ({ I }) => {
  I.see('Tidak ada Restoran untuk ditampilkan', '.resto-list-not-found')

  I.amOnPage('/')
  I.seeElement('.resto-content a')
  I.click(locate('.resto-content a').first())

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.resto-list')
})

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada Restoran untuk ditampilkan', '.resto-list-not-found')

  I.amOnPage('/')

  I.seeElement('.resto-content a')
  I.click(locate('.resto-content a').first())

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.resto-list')

  I.seeElement('.resto-content a')
  I.click(locate('.resto-content a').first())

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.see('Tidak ada Restoran untuk ditampilkan', '.resto-list-not-found')
})

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada Restoran untuk ditampilkan', '.resto-list-not-found')

  I.amOnPage('/')

  I.seeElement('.resto-content a')

  const titles = []

  for (let i = 1; i <= 3; i++) {
    const clickRestaurant = locate('.resto-content a').at(i)
    const clickRestaurantA = await I.grabAttributeFrom(clickRestaurant, 'href')
    I.amOnPage(clickRestaurantA)
    I.seeElement('#likeButton')
    I.click('#likeButton')
    titles.push(await I.grabTextFrom('.restaurant-title'))
    I.amOnPage('/')
  }

  I.amOnPage('/#/favorite')
  I.seeElement('#query')

  const searchQuery = titles[1].substring(1, 3)
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1)
  console.log(searchQuery)
  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.resto-card')
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants)

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.resto-name').at(index + 1))
    assert.strictEqual(title, visibleTitle)
  })
})
