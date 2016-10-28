var mv = require('mv')
var uuid = require('uuid')
var db = require('./db')

class NotFoundError extends Error {}
class AccessDeniedError extends Error {}

class PhotoInfo {
  constructor (id, userId) {
    this.id = id
    this.userId = userId
  }
}

exports.filesRoot = '/data'

function storagePath (userId, photoId) {
  return exports.filesRoot + '/' + userId + '/' + photoId + '.jpg'
}

exports.getLatestPhoto = function (userId) {
  return db.getLatestPhoto(userId)
    .then((photoRow) => {
      if (!photoRow) {
        throw new NotFoundError()
      }

      return new PhotoInfo(photoRow.id, userId)
    })
}

exports.addPhotoFile = function (userId, photoPath) {
  var photoId = uuid.v4()

  if (userId !== 'test') {
    return Promise.reject(new AccessDeniedError(
      'Only "test" user is allowed to upload photos'
    ))
  }

  return new Promise(
    function (resolve, reject) {
      mv(photoPath, storagePath(userId, photoId), {mkdirp: true}, (error) => {
        if (error) {
          reject(new Error(error))
          return
        }

        db.insertPhoto(photoId, userId)
          .then(_ => resolve(new PhotoInfo(photoId, userId)))
          .catch(error => reject(new Error(error)))
      })
    }
  )
}

exports.AccessDeniedError = AccessDeniedError
exports.NotFoundError = NotFoundError
exports.PhotoInfo = PhotoInfo
