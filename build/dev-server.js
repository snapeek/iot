'use strict'

require('./check-versions')()

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const config = require('../config')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = Boolean(config.dev.autoOpenBrowser)
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const Port = require("../client/models/port")
const Device = require("../client/models/device")

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// // proxy api requests
// Object.keys(proxyTable).forEach(context => {
//   let options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./assets'))

const uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

mongoose.Promise = global.Promise



module.exports = app.listen(port, err => {
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
