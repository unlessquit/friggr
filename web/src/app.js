var express = require('express')
var app = express()
var mainRoutes = require('./main')

app.use('/', mainRoutes)

module.exports = app
