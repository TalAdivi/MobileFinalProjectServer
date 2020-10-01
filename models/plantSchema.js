const { Schema, model } = require('mongoose')

// db schema
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

// return all the types of plants in our db
plantSchema.statics.findGrowItTypes = function () {
  return this.distinct("type", (err) => {
    if (err) { console.log('err accrue = ', err.message) }
  })
}

// find all items by type and data from weather api
// logic: Check the month, average temperature, humidity and clouds in the area sent to us and return the appropriate items. 
plantSchema.statics.findByGrowItLogic = async function (data, type) {
  const d = new Date();
  const n = d.getMonth() + 1;
  const averagefactor = 10;
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
  return this.find({ type, months: { $all: [n] }, recommendedClouds: { $lt: clouds + averagefactor ,  $gt: clouds - averagefactor}, recommendedHumidity: { $lt: humidity + averagefactor ,  $gt: humidity - averagefactor}, recommendedTemp: { $lt: temperture + averagefactor ,  $gt: temperture - averagefactor} }, (err) => {
    if (err) { console.log('err accrue = ', err.message) }
  })
}

const userModel = model('plants', plantSchema)
module.exports = userModel
