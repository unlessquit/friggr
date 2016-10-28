var express = require('express')
var realDb = require('./db')
var Storage = require('./storage').Storage

exports.build = function (db) {
  var app = express()
  var mainRoutes = require('./main').build(new Storage(db || realDb))
  app.use('/', mainRoutes)
  return app
}
