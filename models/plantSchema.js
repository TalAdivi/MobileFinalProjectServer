const { Schema, model } = require('mongoose')

const plantSchema = new Schema({
  name: { type: String, required: true },
  family: { type: String, required: true },
  type: { type: String, required: true },
  waterAmount: { type: String, required: true },
  imgUrl: { type: String, required: true },
  months: { type: Array, required: true },
  howToITreat: { type: String, required: true },
  recommendedTemp: { type: Number, required: true },
  recommendedHumidity: { type: Number, required: true },
  recommendedClouds: { type: Number, required: true }
})
// what we need?
// 1. to get all the kind of family to make flat list of icons in the home page




// 2. get all the suitable plants 
plantSchema.statics.testFunc = function (data) {
  let clouds=0;
  let humidity=0;
  let temp = 0;
  let temperture = 0;
  let i = 0;
  for (const day of data.daily) {
    clouds+= day.clouds;
    humidity+= day.humidity;
    temp = (day.temp.max + day.temp.min) / 2;
    temperture += temp;

  }
  console.log("humidity ",humidity / data.daily.length);
  console.log("clouds ",clouds / data.daily.length);
  console.log("temperture ",temperture / data.daily.length);
  return this.find({ recommendedTemp: { $lt: temperture / data.daily.length } }, (err) => {
    if (err) { console.log('err accrue = ', err.message) }
  })
}

const userModel = model('plants', plantSchema)

module.exports = userModel
