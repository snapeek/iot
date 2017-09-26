const mongoose = require('mongoose')

const Schema = mongoose.Schema

const data = new Schema({
  origin: Number,
  fixed: Number,
  created_at: Date,
  device_id: String,
  port_id: String,
  input_port: String,
  // device_id: String,
  out_type: Number,
  computer: String,
  type: Number
})

module.exports = mongoose.model('datas', data)