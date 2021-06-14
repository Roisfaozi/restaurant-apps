import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import '../styles/responsive.css'
import swRegister from './utils/sw-register'
import App from './views/app'

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('.nav-menu'),
  content: document.querySelector('#content')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})

// import Data from '../DATA.json'

// const hamburgerButtonElement = document.querySelector('#hamburger')
// const drawerElement = document.querySelector('.nav-menu')

// hamburgerButtonElement.addEventListener('click', event => {
//   drawerElement.classList.toggle('active')
//   event.stopPropagation()
// })

// function getData (data = Data) {
//   const restoList = document.querySelector('.resto-list')
//   const notFound = document.getElementById('#not-found')
//   console.log('ini', data)
//   if (data.restaurants.length === 0) {
//     const element = document.createElement('div')
//     element.innerHTML += `
//         <div class="not-found">
//             <p>Restaurant Not Found...</p>
//         </div>
//         `
//     notFound.appendChild(element)
//   } else {
//     console.log(data)
//     console.log(data)
//     data.restaurants.forEach(resto => {
//       restoList.innerHTML += `
//             `
//     })
//   }
// }

// getData()
