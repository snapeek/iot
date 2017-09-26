const Port = require("../client/models/port")
const Device = require("../client/models/device")
const Data = require("../client/models/data")
const Power = require("../client/models/power")
const _ = require("lodash")
module.exports.use = function (app) {

  // app.get("/", function(req, res) {
  //   res.render("index", {});
  // })

  app.get('config', function(req, res) {

  })

  app.get('/ports', function(req, res) {
    let query = {}
    if(req.query.type != undefined && req.query.type.length > 0 ) {
      query.port_id = new RegExp(req.query.type)
    }    
    if(req.query.is_switch === true || req.query.is_switch === "true") {
      query.is_switch = true
    }
    console.log(query)
    Port.find(query, function(err, ports) {
      res.send(ports)
    })
  })

  // app.use(bodyParser.urlencoded({ extended: false }))
  app.get('/ports/:port_id', function (req, res) {
    Port.findOne({port_id: req.params.port_id}, function(err, port) {
      res.send(port)
    })
  })

  app.put('/ports/:port_id', function (req, res) {
    let port = req.body
    console.log(port)
    Port.update({port_id: port.pid}, {
      device: port.device,
      out_type: port.out_type,
      // out_def: port.out_def,
      computer: port.computer,
      is_switch: port.is_switch,
      input_port: port.input_port
    }, function(err, rport) {
      console.log(err,rport)
      res.send(rport)
    })
  })

  app.get('/datas', function (req, res) {
    Port.find({}, function(err, ports) {
      res.send(ports)
    })
  })

  app.get('/devices', function (req, res) {
    let query = {}
    if(req.query.type != undefined && req.query.type.length > 0 ) {
      query.type = parseInt(req.query.type)
    }
    Device.find(query, function(err, devices) {
      res.send(devices)
    })
  })

  app.post('/devices', function (req, res) {
    Device.create(req.body, function(err, device) {
      res.send(device)
    })
  })

  app.put('/devices/:device_id', function (req, res) {
    Device.update({_id: req.params.device_id}, req.body, function(err, device) {
      res.send(device)
    })
  })

  app.delete('/devices/:device_id', function (req, res) {
    // let device = req.body
    Device.remove({_id: req.params.device_id}, function(err, device) {
      res.send(device)
    })
  })

  app.put('/powermeter/:name', function (req, res) {
    Power.update({name: req.params.name}, req.body, function(err, power) {
      console.log(power)
      res.send(power.data)
    })
  })

  app.get('/powermeter', function (req, res) {
    Power.findOne({}, function(err, power) {
      console.log(power)
      res.send(power)
    })
  })

  app.get('/statics/:type', function(req, res) {
    let query = {}
    const types = ["in", "out", "fixed"]
    if(_.includes(types, req.params.type)) {
      query.type = types.indexOf(req.params.type)

      if(req.query.st) { 
        if(!query.created_at) { query.created_at = {} }
        query.created_at["$gte"] = new Date(req.query.st) 
      }
      if(req.query.ed) {
        if(!query.created_at) { query.created_at = {} }
        query.created_at["$lte"] = new Date(req.query.ed) 
      }
      Port
        .find({port_id: new RegExp(req.params.type), is_switch: true})
        .then(function(ports){
          Promise.all(ports.map(function(port) { 
            return Data
              .find(_.assign({port_id: port.port_id}, query)).limit(20).sort({created_at: -1})
              .then(function(data){
                return data
              })
            }))
            .then(function(datas){
              let gdatas = {}
              let isFirst = true, labels
              datas.forEach(function(data) {
                if(data.length > 0) {
                  gdatas[data[0].port_id] = data.map(function(d){ return d.origin })
                  if(isFirst) { labels = data.map(function(d){ return d.created_at }); isFirst = false }
                } else {
                  console.log('empty')
                }
              })
              res.send({
                labels,
                data: gdatas
              })
            })
        })
      } else {
        console.log(req.params)
      }
  })

  function getrows(cb) {
    Port.find({is_switch: true}).then(function(ports) {
      ports = ports.map(function(x){ return x.port_id })
        .filter(function(x) { return x.length > 8 })
      ports = _.sortedUniq(ports)
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
        .limit(100)
        .exec(function (err, data) {
          let rows = {}
          data.map(function(x){
            rows[x._id] = _.sortBy(x.origin, 'port_id').map(function(x){ return x.data })
          })
          let ret = {
            ports, rows
          }
          cb(ret)
        })
      })
  }

  app.get("/to_csv", function(req, res) {
    getrows(function(ret) {
      let csv = []
      for(let k in ret.rows) {
        csv.push(ret.rows[k])
      }
      res.csv(csv)
    })
  })

  app.get("/inout", function(req, res) {
    getrows(function(ret){
      res.send(ret)
    })
  })

      // Port.find({type: query.type, is_switch: true}, function(err, ports) {
      //   ports.map(function(port) {
      //     Data.find(_.assign({port_id: port.port_id}, query, function(err, data) {
      //       console.log(data)
      //     })).limit(20)
      //   })
      // })
      // console.log(query)
      // Data.find(query, function(err, data) {
      //   res.send(data)
      // }).limit(20)
  

  return app
}