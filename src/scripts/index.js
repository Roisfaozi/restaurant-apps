import 'regenerator-runtime' /* for async await transpile */
import '../styles/content.css'
import '../styles/main.css'
import '../styles/mobile.css'
import '../styles/navigation.css'
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
