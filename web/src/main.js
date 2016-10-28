var express = require('express')
var multer = require('multer')
var db = require('./db')
var errors = require('./errors')

var upload = multer({ dest: '/tmp/' })

exports.build = function (storage) {
  var router = express.Router()
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
    var userId = req.body.userId

    storage.addPhotoFile(userId, req.file.path)
      .then(photoInfo => res.redirect(viewPhotoPath(photoInfo)))
      .catch(error => {
        if (error instanceof errors.AccessDeniedError) {
          res.status(403).send('Forbidden')
        } else {
          throw error
        }
      })
      .catch(internalErrorHandler(res))
  })

  router.get('/view/:userId/latest.jpg', function (req, res) {
    var userId = req.params.userId

    storage.getLatestPhoto(userId)
      .then(photoInfo => res.redirect(viewPhotoPath(photoInfo)))
      .catch(error => {
        if (error instanceof errors.NotFoundError) {
          res.status(404).send('Not Found')
        } else {
          throw error
        }
      })
      .catch(internalErrorHandler(res))
  })

  router.use('/view', express.static(storage.filesRoot, {maxAge: '1year'}))

  return router
}

function viewPhotoPath (photoInfo) {
  return '/view/' + photoInfo.userId + '/' + photoInfo.id + '.jpg'
}

function internalErrorHandler (res) {
  return function (error) {
    console.error(error)
    res.status(500).send('Internal Error')
  }
}
