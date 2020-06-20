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
plantSchema.statics.testFunc2 = function () {
  return this.distinct("type", (err) => {
    if (err) { console.log('err accrue = ', err.message) }
  })
}



// 2. get all the suitable plants 
// check unix time with monthes 
// 1. bring the date with type and date and than check daily temp 
// mobile check save data (with expo) / sq lite /secure storage store 
// notificatins
// test on mobile app
plantSchema.statics.testFunc = async function (data, type) {
  const d = new Date();
  const n = d.getMonth() + 1;
  let clouds = 0, humidity = 0, temp = 0, temperture = 0;
  for (const day of data.daily) {
    clouds += day.clouds;
    humidity += day.humidity;
    temp = (day.temp.max + day.temp.min) / 2;
    temperture += temp;
  }
  humidity = humidity / data.daily.length;
  clouds = clouds / data.daily.length;
  temperture = temperture / data.daily.length;
  return this.find({ type, months: { $all: [n] }, recommendedClouds: { $lt: clouds + 10 ,  $gt: clouds - 10}, recommendedHumidity: { $lt: humidity + 10 ,  $gt: humidity - 10}, recommendedTemp: { $lt: temperture + 3 ,  $gt: temperture - 3} }, (err) => {
    if (err) { console.log('err accrue = ', err.message) }
  })
}

const userModel = model('plants', plantSchema)
module.exports = userModel
