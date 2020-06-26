// importing model!
const plantsModel = require('../models/plantSchema')
const axios = require('axios')

// const test = async (req, res) => {
//   try {
//     console.log('Tested~!')
//     const data = await plantsModel.testFunc(req.body.test)
//     if (data == null) {
//       res.status(200).json({
//         status: 200,
//         message: 'cant find this test',
//         action: 'Read',
//         data: null
//       })
//     } else {
//       res.status(200).json({
//         status: 200,
//         message: 'found this test!',
//         action: 'Read',
//         data: { value: data.testProp }
//       })
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({
//       status: 500,
//       message: 'inside Catch!',
//       action: 'Read',
//       data: err
//     })
//   }
// }

const apiCall = async (req, res) => {
  try {
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.lon}&exclude="current,hourly,minutely"&appid=5b28e3c836da5db352b2a9441c1354e4&units=metric`)
    const dbresult = await plantsModel.testFunc(data,req.params.type)
    res.status(200).json({ tal: 'adivi', dbresult })
  } catch (e) {
    res.status(501).json({
      status: 502,
      data: null,
      req: req
    })
  }
}

const test = async (req, res) => {
  try {
    const dbresult = await plantsModel.testFunc2()
    res.status(200).json({ dbresult })
  } catch (e) {
    res.status(501).json({
      status: 502,
      data: null,
      req: req
    })
  }
}

module.exports = {
  test,
  apiCall
}

