var express = require('express')
var app = express()
var Storage = require('./storage').Storage
var mainRoutes = require('./main').build(new Storage())

app.use('/', mainRoutes)

module.exports = app
