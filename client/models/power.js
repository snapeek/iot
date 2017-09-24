const mongoose = require('mongoose')

const Schema = mongoose.Schema

const port = new Schema({
  device_id: String,
  power_id: String,
  protocol: String,
  ip: String,
  com: String,
  path: String,
  baud: String,
  digit: Number,
  checksum: Number,
  stop: Boolean,
  register: Number,
  digitype: Number,
  out_type: Number
})

module.exports = mongoose.model('ports', port)