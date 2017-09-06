'use strict'

require('./build/check-versions')()

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const config = require('./config')

const mongoose = require('mongoose')
const bodyParser = require("body-parser")
// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = Boolean(config.dev.autoOpenBrowser)
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable
const ejs = require('ejs')
const app = express()

const Port = require("./client/models/port")
const Device = require("./client/models/device")
app.engine('html', ejs.renderFile)
app.set("view engine", "html")
app.set('views', __dirname + '/dist')
app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.render("index", {});
})

// app.use(bodyParser.urlencoded({ extended: false }))
app.get('/ports/:port_id', function (req, res) {
  console.log(req.params)
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
  console.log(query)
  Device.find(query, function(err, devices) {
    res.send(devices)
  })
})

// enable hot-reload and state-preserving
// compilation error display
// app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./dist/assets'))

const uri = 'http://localhost:' + port

mongoose.Promise = global.Promise

module.exports = app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err)
    return
  }
  mongoose.connect('mongodb://iot:iot123@101.201.37.28:3717/iot', {
    useMongoClient: true,
  }).then(
    () => { 
      // Port.find({}, function(err, ports) {
      //   console.log(ports)
      //   // for(let port of ports) {
      //     // let mb = new Modbus(port)
      //     // mb.read() 
      //   // }
      // }) 

    },
    err => {
  
    }
  )

  // when env is testing, don't need open it
  // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
  //   opn(uri)
  // }
})
