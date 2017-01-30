var dbConfig = require('./config').db
var pg = require('pg')

var pool = new pg.Pool(dbConfig)

// For prototyping only
exports.query = function (query, args) {
  return pool.query(query, args)
}

exports.getPhoto = function (userId, photoId) {
  return pool.query(
    'SELECT id, user_id, caption FROM uphoto WHERE user_id = $1 AND id = $2',
    [userId, photoId]
  ).then(result => result.rows[0])
}

exports.getAllPhotos = function (userId) {
  return pool.query(
    'SELECT id, user_id, caption FROM uphoto WHERE user_id = $1 ORDER BY ts DESC',
    [userId]
  ).then(result => result.rows)
}

exports.getLatestPhoto = function (userId) {
  return pool.query(
    'SELECT id, caption FROM uphoto WHERE user_id = $1 ORDER BY ts DESC LIMIT 1',
    [userId]
  ).then(result => result.rows[0])
}

exports.insertPhoto = function (photoId, userId, caption) {
  return pool.query(
    'INSERT INTO uphoto (id, ts, user_id, caption) VALUES ($1, now(), $2, $3)',
    [photoId, userId, caption]
  )
}
