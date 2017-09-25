const Port = require("./client/models/port")
const Device = require("./client/models/device")
const Data = require("./client/models/data")
const Power = require("./client/models/power")
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
var modbus = require('modbus')

function initModbus() {
  let mb = modbus.create()
  let ctxin = mb.createMaster({
     // connection type and params 
    con: mb.createConTcp('192.168.1.75', 502),
    onConnect: function () {
      //  log('onConnect');
      //  log(ctx.getRegs());
      //  ctx.destroy()
    },
    onDestroy: function () {
      log('onDestroy');
    }
  })

  // let ctxout = mb.createMaster({
  //   // connection type and params 
  //   con: mb.createConTcp('127.0.0.1', 1503),
  //   onConnect: function () {
  //    //  log('onConnect');
  //    //  log(ctx.getRegs());
  //    //  ctx.destroy()
  //   },
  //   onDestroy: function () {
  //     log('onDestroy');
  //   }
  // })
  ctxout = ctxin
  return { ctxin, ctxout }
}

async function getPort(type) {
  let ports = await Port.find({is_switch: true, port_id: new RegExp(type)})
  return ports
}

async function getInput(ctxin, ports) {
  let regs = ctxin.getInputRegs(0, 8)
  // console.log(ctxin.getInputRegs(30001, 8))
  console.log(ctxin.getRegs(0, 8))
  let vals = {}
  try {
    await Promise.all(ports.map(async (port)=>{
      let index = parseInt(port.port_id.split('_')[2])
      let val = regs[index]
      return vals[port.port_id] = await port.getval(val, port.port_id)
    }))
  } catch(err) {
    console.log(err)
  }
  return vals
}

async function setOutput(ctxout, vals, ports) {
  let outs = {}
  try {
    await Promise.all(ports.map(async (port)=>{
      let index = parseInt(port.port_id.split('_')[2])
      let val = await port.getval(vals[port.input_port].val, port.port_id)
      val.val += 4
      outs[port.port_id] = val
      return ctxout.setRegs(index, [1,2,3,4])
      // return ctxout.setReg(index, val.val)
    }))
  } catch(err) {
    console.log(err)
  }  
  return outs
}

async function run() {
  let { ctxin, ctxout } = initModbus()
  
  async function cycle() {
    let time = new Date()
    let portsIn = await getPort('in')
    let portsOut = await getPort('out')
    console.log(portsIn)
    console.log(portsOut)
  
    let vals = await getInput(ctxin, portsIn)
    let outs = await setOutput(ctxout, vals, portsOut)    

    console.log(vals)
    console.log(outs)
    setTimeout(cycle, 5 * 1000)
  }

  cycle()
  // for(let k in vals) {
  //   new Date()
  // }

  // for(let k in outs) {

  // }

  // ports.map(function(port) {
  //   getInput(port.device)

  // })
}

mongoose.connect('mongodb://iot:iot123@101.201.37.28:3717/iot', {
  useMongoClient: true,
}).then(
  () => { 
    run()
  },
  err => {

  }
)

module.exports = run