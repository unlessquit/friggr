var dbConfig = require('./config').db
var pg = require('pg')

var pool = new pg.Pool(dbConfig)

exports.query = function (query, args) {
  return pool.query(query, args)
}
