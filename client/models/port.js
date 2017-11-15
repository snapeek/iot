const mongoose = require('mongoose')
const Device = require("./device")

const Schema = mongoose.Schema

const port = new Schema({
  port_id: String,
  device: String,
  out_type_speed: Number,
  out_type_direct: Number,
  out_def: Number,
  speed_computer: String,
  direct_computer: String,
  is_switch: Boolean,
  speed_port: String,
  direct_port: String
})

function compute(val, computer) {
  return val
}

port.methods = {
  async getval(val, port_id) {
    // let index = parInt(this.port_id.split('_')[2])
    let fixedVal, computer
    if(this.out_type == 0) {
      let device = await Device.find({_id: this.device})
      computer = device.computer
      fixedVal = compute(val, computer)
    } else if(this.out_type == 1) {
      computer = this.computer
      fixedVal = compute(val, computer)
    } else {
      fixedVal = val
    }
    return {
      origin: val,
      val: fixedVal,
      fixed: fixedVal,
      out_type_speed: this.out_type_speed,
      out_type_direct: this.out_type_direct,
      direct_computer: this.direct_computer,
      speed_computer: this.speed_computer,
      device_id: this.device,
      port_id: this.port_id,
      speed_port: this.speed_port,
      direct_port: this.direct_port
    }
  }
}

module.exports = mongoose.model('ports', port)