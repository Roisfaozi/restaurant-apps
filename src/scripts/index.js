import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import Data from '../DATA.json'

const hamburgerButtonElement = document.querySelector('#hamburger')
const drawerElement = document.querySelector('.nav-menu')

hamburgerButtonElement.addEventListener('click', event => {
  drawerElement.classList.toggle('active')
  event.stopPropagation()
})

function getData (data = Data) {
  const restoList = document.querySelector('.resto-list')
  const notFound = document.getElementById('#not-found')
  console.log('ini', data)
  if (data.restaurants.length === 0) {
    const element = document.createElement('div')
    element.innerHTML += `
        <div class="not-found">
            <p>Restaurant Not Found...</p>
        </div>
        `
    notFound.appendChild(element)
  } else {
    console.log(data)
    console.log(data)
    data.restaurants.forEach(resto => {
      restoList.innerHTML += `
            <div class="resto-card" id="${resto.id}">
                        <div class="resto-image" tabIndex="0">
                            <img src="${resto.pictureId}" alt="${resto.name}">
                        </div>

                                <div class="resto-content">
                            <p tabindex="0" class="resto-name">${resto.name}</p>
                            <p tabindex="0" class="resto-city">${resto.city}</p>
                            <p tabindex="0" class="resto-description">${
                              resto.description.slice(0, 200) + ' ...'
                            }
                            </p>
                            <p tabindex="0" class="resto-rating">${
                              resto.rating
                            }</p>
                        </div>

                    </div>
            `
    })
  }
}

getData()
