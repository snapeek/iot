const mongoose = require('mongoose')
const Port = require("../client/models/port")
const Power = require("../client/models/power")
mongoose.Promise = global.Promise

mongoose.connect('mongodb://iot:iot123@101.201.37.28:3717/iot', {
  useMongoClient: true,
}).then(
  () => { 
    cb = function(err, res) {
      console.log(err, res)
    }
    Port.findOneAndUpdate({port_id: 'port_in_0'}, {port_id: 'port_in_0'}, { upsert: true}, cb) 
    Port.findOneAndUpdate({port_id: 'port_in_1'}, {port_id: 'port_in_1'}, { upsert: true}, cb) 
    Port.findOneAndUpdate({port_id: 'port_in_2'}, {port_id: 'port_in_2'}, { upsert: true}, cb) 
    Port.findOneAndUpdate({port_id: 'port_in_3'}, {port_id: 'port_in_3'}, { upsert: true}, cb) 

    Port.findOneAndUpdate({port_id: 'port_out_0'}, {port_id: 'port_out_0'}, { upsert: true}, cb) 
    Port.findOneAndUpdate({port_id: 'port_out_1'}, {port_id: 'port_out_1'}, { upsert: true}, cb) 
    Port.findOneAndUpdate({port_id: 'port_out_2'}, {port_id: 'port_out_2'}, { upsert: true}, cb) 
    Port.findOneAndUpdate({port_id: 'port_out_3'}, {port_id: 'port_out_3'}, { upsert: true}, cb) 

    Power.findOneAndUpdate({name: 'power_01'}, {name: 'power_01'}, { upsert: true}, cb) 
    
  },
  err => {

  }
)