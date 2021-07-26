const express = require('express')

const PORT = 3000

const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  // eslint-disable-next-line no-undef
  response.sendFile(path.resolve(__dirname, 'dist/index.html'))
})

// listen for requests :)
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`)
})
