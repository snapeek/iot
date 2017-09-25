const mongoose = require('mongoose')

const Schema = mongoose.Schema

const power = new Schema({
  name: String,
  device_id: String,
  power_id: String,
  protocol: String,
  ip: String,
  com: String,
  port: String,
  path: String,
  baud: String,
  digit: Number,
  checksum: Number,
  stop: Boolean,
  register: Number,
  digitype: Number,
  out_type: Number
})

module.exports = mongoose.model('power', power)