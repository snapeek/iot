const Port = require("../client/models/port")
const Device = require("../client/models/device")
// const Data = require("../client/models/data")

module.exports.use = function (app) {

  // app.get("/", function(req, res) {
  //   res.render("index", {});
  // })

  app.get('config', function(req, res) {

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
      rate: port.rate,
      out_type: port.out_type,
      // out_def: port.out_def,
      computer: port.computer,
      is_switch: port.is_switch,
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
    let device = req.body
    Device.create(device, function(err, device) {
      res.send(device)
    })
  })

  app.put('/devices/:device_id', function (req, res) {
    let device = req.body
    Device.update({_id: req.params.device_id}, device, function(err, device) {
      res.send(device)
    })
  })

  return app
}