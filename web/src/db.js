var pg = require('pg')

var config = {
  user: process.env.PGUSER || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long to keep idle client
}

var pool = new pg.Pool(config)

exports.query = function (query, args) {
  return pool.query(query, args)
}
