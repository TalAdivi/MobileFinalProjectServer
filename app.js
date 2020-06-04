const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const plantsAPI = require('./routers/plantsRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    res.set('Content-Type', 'application/json')
    next()
  })

app.get('/test', plantsAPI)

app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Wrong route',
    action: 'Unknown',
    data: null
  })
})

module.exports = app
