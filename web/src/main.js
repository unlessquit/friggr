var path = require('path')
var express = require('express')
var multer = require('multer')
var db = require('./db')
var errors = require('./errors')
var validate = require('./validate')
var gm = require('gm').subClass({imageMagick: true})

function jpegOnly (req, file, cb) {
  cb(null, file.mimetype === 'image/jpeg')
}

var tmpdir = '/tmp'
var upload = multer({dest: tmpdir, fileFilter: jpegOnly})
var photoMaxAge = '1year'
var clientRoot = path.join(__dirname, '..', 'client', 'build')

exports.build = function (storage) {
  var router = express.Router()

  router.get('/status.json', function (req, res) {
    db.query('SELECT $1::text as name', ['World'])
      .then((result) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({
          message: 'Hello ' + result.rows[0].name + '!'
        }))
      })
      .catch(internalErrorHandler(res))
  })

  router.post('/inbox', upload.single('photoFile'), function (req, res) {
    var userId = req.body.userId

    if (!validate.userId(userId)) {
      inputError(res, 'Invalid userId')
      return
    }

    if (!req.file) {
      inputError(res, 'Invalid photoFile')
      return
    }

    storage.addPhotoFile(userId, req.file.path, req.body.caption)
      .then(photoInfo => res.redirect(viewUserPath(userId)))
      .catch(error => {
        if (error instanceof errors.AccessDeniedError) {
          res.status(403).send('Forbidden')
        } else {
          throw error
        }
      })
      .catch(internalErrorHandler(res))
  })

  router.get('/view/:userId/data.json', function (req, res) {
    var userId = req.params.userId
    if (!validate.userId(userId)) {
      inputError(res, 'Invalid userId')
      return
    }

    storage.getAllPhotos(userId)
      .then(result => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({photos: result}))
      })
      .catch(internalErrorHandler(res))
  })

  router.get('/view/:userId/latest.jpg', function (req, res) {
    var userId = req.params.userId

    res.header('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')

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

  router.use('/view', express.static(storage.filesRoot, {maxAge: photoMaxAge}))

  router.get('/view/:userId/:photoId/:width/:height', function (req, res) {
    var userId = req.params.userId
    var photoId = req.params.photoId
    var width = req.params.width
    var height = req.params.height

    if (!validate.resizedPhotoWidth(width)) {
      inputError(res, 'Invalid width')
      return
    }

    if (!validate.resizedPhotoHeight(height)) {
      inputError(res, 'Invalid height')
      return
    }

    storage.getPhoto(userId, photoId)
      .then(photoInfo => {
        var original = storage.photoOriginalPath(photoInfo)
        var resized = path.join(
          tmpdir, photoInfo.id + '.' + width + 'x' + height + '.jpg')

        return new Promise((resolve, reject) => {
          gm(original)
            .resize(width, height, '>')
            .write(
              resized,
              error => error
                ? reject(error)
                : resolve(resized)
            )
        })
      })
      .then(resized => res.sendFile(resized, {maxAge: photoMaxAge}))
      .catch(error => {
        if (error instanceof errors.NotFoundError) {
          res.status(404).send('Not Found')
        } else {
          throw error
        }
      })
      .catch(internalErrorHandler(res))
  })

  // Serve client on all other URLs
  router.use('/', express.static(clientRoot))
  router.get('*', function (req, res) {
    res.sendFile(path.join(clientRoot, 'index.html'))
  })

  return router
}

function viewUserPath (userId) {
  return '/view/' + userId
}

function viewPhotoPath (photoInfo) {
  return '/view/' + photoInfo.userId + '/' + photoInfo.id + '/2000/2000'
}

function internalErrorHandler (res) {
  return function (error) {
    console.error(error)
    res.status(500).send('Internal Error')
  }
}

function inputError (res, message) {
  return res.status(400).send(message)
}
