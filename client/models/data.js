import mongoose from 'mongoose'

const Schema = mongoose.Schema

const data = new Schema({
  origin: Array,
  fixed: Array,
  created_at: Date,
  device_id: String,
  port_id: String
})

export default mongoose.model('datas', data)