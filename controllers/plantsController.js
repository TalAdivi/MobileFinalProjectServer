const plantsModel = require('../models/plantSchema')
const axios = require('axios')


const getItems = async (req, res) => {
  try {
    // bring weekly weather api results
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.lon}&exclude="current,hourly,minutely"&appid=5b28e3c836da5db352b2a9441c1354e4&units=metric`)
    const dbresult = await plantsModel.findByGrowItLogic(data,req.params.type)
    res.status(200).json({ dbresult })
  } catch (e) {
    res.status(500).json({
      status: 500,
      data: null,
      req: req,
      message: e.message
    })
  }
}

const getTypes = async (req, res) => {
  try {
    const dbresult = await plantsModel.findGrowItTypes()
    // res.status(200).json({ dbresult })
    res.status(404).send('File not found')
    // res.status(404).end("check")
  } catch (e) {
    res.status(500).json({
      status: 500,
      data: null,
      req: req,
      message: e.message
    })
  }
}

module.exports = {
  getTypes,
  getItems
}

