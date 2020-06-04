// importing model!
const plantsModel = require('../models/plantSchema')

const test = async (req, res) => {
  try {
    console.log('Tested~!')
    const data = await plantsModel.testFunc(req.body.test)
    if (data == null) {
      res.status(200).json({
        status: 200,
        message: 'cant find this test',
        action: 'Read',
        data: null
      })
    } else {
      res.status(200).json({
        status: 200,
        message: 'found this test!',
        action: 'Read',
        data: { value: data.testProp }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 500,
      message: 'inside Catch!',
      action: 'Read',
      data: err
    })
  }
}

module.exports = {
  test
}
