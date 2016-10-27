var mv = require('mv')
var uuid = require('uuid')
var express = require('express')
var router = express.Router()
var multer = require('multer')
var db = require('./db')

var upload = multer({ dest: '/tmp/' })

router.get('/', function (req, res) {
  db.query('SELECT $1::text as name', ['World'])
    .then((result) => {
      res.send('Hello ' + result.rows[0].name + '!')
    })
    .catch((error) => {
      res.send(error.message)
    })
})

router.post('/inbox', upload.single('photoFile'), function (req, res) {
  var photoId = uuid.v4()
  var userId = req.body.userId

  if (userId !== 'test') {
    res.status(403).send('Forbidden')
    return
  }

  mv(req.file.path, storagePath(userId, photoId), {mkdirp: true}, (error) => {
    if (error) {
      console.error(error)
      res.status(500).send('Internal Error')
      return
    }

    db.query(
      'INSERT INTO uphoto (id, ts, user_id) VALUES ($1, now(), $2)',
      [photoId, userId]
    ).then(() => {
      res.redirect(viewPath(userId, photoId))
      return
    }).catch((error) => {
      console.error(error)
      res.status(500).send('Internal Error')
      return
    })
  })
})

router.get('/view/:userId/latest.jpg', function (req, res) {
  var userId = req.params.userId

  db.query(
    'SELECT id FROM uphoto WHERE user_id = $1 ORDER BY ts DESC LIMIT 1',
    [userId]
  ).then((result) => {
    if (result.rows.length === 0) {
      res.status(404).send('Not Found')
      return
    }

    var photoId = result.rows[0].id
    res.redirect(viewPath(userId, photoId))
    return
  }).catch((error) => {
    console.error(error)
    res.status(500).send('Internal Error')
    return
  })
})

router.use('/view', express.static('/data'))

function storagePath (userId, photoId) {
  return '/data/' + userId + '/' + photoId + '.jpg'
}

function viewPath (userId, photoId) {
  return '/view/' + userId + '/' + photoId + '.jpg'
}

module.exports = router
