const mongoose = require('mongoose')

const Schema = mongoose.Schema

const port = new Schema({
  port_id: String,
  device_out: String,
  device_in: String,
  rate: Number,
  out_type: Number,
  out_def: Number,
  computer: String,
  is_switch: Boolean
})

module.exports = mongoose.model('ports', port)