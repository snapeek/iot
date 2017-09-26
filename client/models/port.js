const mongoose = require('mongoose')
const Device = require("./device")

const Schema = mongoose.Schema

const port = new Schema({
  port_id: String,
  device: String,
  out_type: Number,
  out_def: Number,
  computer: String,
  is_switch: Boolean,
  input_port: String
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
      out_type: this.out_type,
      computer: computer,
      device_id: this.device,
      port_id: this.port_id,
      input_port: this.input_port
    }
  }
}

module.exports = mongoose.model('ports', port)