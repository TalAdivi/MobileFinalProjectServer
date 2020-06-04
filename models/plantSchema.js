const { Schema, model } = require('mongoose')

const plantSchema = new Schema({
  testProp: { type: String, required: true }
})

plantSchema.statics.testFunc = function (text) {
  return this.findOne({ testProp: text }, (err) => {
    if (err) { console.log('err accrue = ', err.message) }
  })
}

const userModel = model('plants', plantSchema)

module.exports = userModel
