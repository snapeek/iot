const mongoose = require('mongoose')

const Schema = mongoose.Schema

const device = new Schema({
  name: String,
  type: Number,
  socket_id: String,
  mb_protocol: String,
  baud: Number,
  baud_parity: Number,
  data: Number,
  data_parity: Number,
  ip: String,
  port: String
})

module.exports = mongoose.model('devices', device)