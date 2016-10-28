var express = require('express')
var app = express()
var storage = require('./storage')
var mainRoutes = require('./main').build(storage)

app.use('/', mainRoutes)

module.exports = app
