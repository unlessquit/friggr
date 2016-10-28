var dbConfig = require('./config').db
var pg = require('pg')

var pool = new pg.Pool(dbConfig)

// For prototyping only
exports.query = function (query, args) {
  return pool.query(query, args)
}

exports.getLatestPhoto = function (userId) {
  return pool.query(
    'SELECT id FROM uphoto WHERE user_id = $1 ORDER BY ts DESC LIMIT 1',
    [userId]
  ).then((result) => {
    return result.rows.length === 0
      ? null
      : result.rows[0]
  })
}

exports.insertPhoto = function (photoId, userId) {
  return pool.query(
    'INSERT INTO uphoto (id, ts, user_id) VALUES ($1, now(), $2)',
    [photoId, userId]
  )
}
