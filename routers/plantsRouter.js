const express = require('express')
const router = express.Router()
const controller = require('../controllers/plantsController')

router.get('/:type/:lat/:lon', (req, res) => {
  controller.getItems(req, res)
})

router.get('/type', (req, res) => {
  controller.getTypes(req, res)
})

// default route 
router.all('*', (req, res) => {
  res.status(404).json({
      status:404,
      message: "Wrong route",
      action: "Unknown",
      data: null
  })
});

module.exports = router
