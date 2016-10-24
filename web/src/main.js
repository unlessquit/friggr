var express = require('express')
var router = express.Router()
var db = require('./db')

router.get('/', function (req, res) {
  db.query('SELECT $1::text as name', ['World'])
    .then((result) => {
      res.send('Hello ' + result.rows[0].name + '!')
    })
    .catch((error) => {
      res.send(error.message)
    })
})

router.post('/inbox', function (req, res) {
  res.send('Whatever')
})

router.use('/view', express.static('/data'))

module.exports = router
