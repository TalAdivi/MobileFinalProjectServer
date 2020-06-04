require('dotenv').config()
const http = require('http')
const port = process.env.PORT || 3000
const app = require('./app')
const dbConnection = require('./dbConnection')

http.createServer(app).listen(port, () => {
  console.log(`listening on port ${port}`)
  dbConnection.then(() => {
    console.log('connected to DB')
  }).catch(err => {
    console.log('failed to connect to db! ', err.message)
  })
})
