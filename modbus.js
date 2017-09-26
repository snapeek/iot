const Port = require("./client/models/port")
const Device = require("./client/models/device")
const Data = require("./client/models/data")
const Power = require("./client/models/power")
const mongoose = require('mongoose')
const _ = require("lodash")
mongoose.Promise = global.Promise
var modbus = require('modbus')

function initModbus() {
  let mb = modbus.create()
  let ctxin = mb.createMaster({
     // connection type and params 
    // con: mb.createConTcp('192.168.1.75', 502),
    con: mb.createConTcp('127.0.0.1', 1502),
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
  let regs = ctxin.getRegs(0, 8)
  // console.log(ctxin.getInputRegs(30001, 8))
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
      return ctxout.setReg(index, val.val)
    }))
  } catch(err) {
    console.log(err)
  }  
  return outs
}

async function newData(val, time) {
  let nval = _.assign({
    created_at: time
  }, val)
  if(_.includes(val.port_id, 'in')) {
    nval.type = 0
  } else {
    nval.type = 1
  }  
  let data = new Data(nval)
  try {
    console.log(data)
    data.save()
  } catch(e) {
    console.log(e)
  }
}

async function run() {
  let { ctxin, ctxout } = initModbus()
  
  async function cycle() {
    let time = new Date()
    let portsIn = await getPort('in')
    let portsOut = await getPort('out')
    // console.log(portsIn)
    // console.log(portsOut)
  
    let vals = await getInput(ctxin, portsIn)
    let outs = await setOutput(ctxout, vals, portsOut)    

    for(let k in vals) {
      newData(vals[k], time)
    }
    for(let k in outs) {
      newData(outs[k], time)
    }   

    setTimeout(cycle, 5 * 1000)
  }

  cycle()
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