const express = require('express')
const router = express.Router()
const controller = require('../controllers/plantsController')

router.get('*', (req, res) => {
  controller.apiCall(req, res)
})

module.exports = router
