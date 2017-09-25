const Port = require("../client/models/port")
const Device = require("../client/models/device")
// const Data = require("../client/models/data")
const Power = require("../client/models/power")

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

  app.get('/statics', function(req, res) {
    Data.find({}, function(err, data) {

    })
  })

  return app
}