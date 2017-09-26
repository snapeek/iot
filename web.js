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
const csv = require('express-csv')

const Port = require("./client/models/port")
const Device = require("./client/models/device")

app.engine('html', ejs.renderFile)
app.set("view engine", "html")
app.set('views', __dirname + '/dist')
app.use(bodyParser.json())
const apis = require("./apis")

app.get("/", function(req, res) {
  res.render("index", {});
})

apis.use(app)

// enable hot-reload and state-preserving
// compilation error display
// app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./dist/assets'))

const uri = 'http://localhost:' + port

mongoose.Promise = global.Promise

mongoose.connect('mongodb://iot:iot123@101.201.37.28:3717/iot', {
  useMongoClient: true,
}).then(
  () => { 
    app.listen(port, '0.0.0.0', err => {
      if (err) {
        console.log(err)
        return
      }
    })

  },
  err => {

  }
)