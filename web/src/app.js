var express = require('express')
var morgan = require('morgan')
var config = require('./config')
var realDb = require('./db')
var Storage = require('./storage').Storage

exports.build = function (db) {
  var app = express()
  if (config.httpLogFormat) {
    app.use(morgan(config.httpLogFormat))
  }
  var mainRoutes = require('./main').build(new Storage(db || realDb))
  app.use('/', mainRoutes)
  return app
}
