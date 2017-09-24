const mongoose = require('mongoose')

const Schema = mongoose.Schema

const device = new Schema({
  name: String,
  type: Number, // 0 输入 1 输出 2 功率计
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