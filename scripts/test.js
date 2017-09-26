const Port = require("../client/models/port")
const Device = require("../client/models/device")
const Data = require("../client/models/data")
const Power = require("../client/models/power")
const mongoose = require('mongoose')
const _ = require("lodash")
mongoose.Promise = global.Promise

mongoose.connect('mongodb://iot:iot123@101.201.37.28:3717/iot', {
  useMongoClient: true,
}).then(
  async () => {
    // let data = await Data.find({}).sort({created_at: -1})
    let ports = (await Port.find({is_switch: true}))
    .map(function(x){ return x.port_id })
    .filter(function(x) { return x.length > 8 })

    Data
    .aggregate()
    .sort({created_at: 1})
    .match({port_id: { $in: ports }})
    .group({ 
      _id: '$created_at', 
      origin: { $push: {
        data: '$origin',
        port_id: '$port_id'
        } 
      } 
    })
    .limit(5)
    .exec(function (err, data) {
      let rows = {}
      data.map(function(x){
        rows[x._id] = _.sortBy(x.origin, 'port_id').map(function(x){ return x.data })
      })
      let ret = {
        ports: _.sortedUniq(ports) , rows
      }
      console.log(ret)
    })
  },
  err => {

  }
)