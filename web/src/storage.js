var mv = require('mv')
var uuid = require('uuid')
var errors = require('./errors')

class PhotoInfo {
  constructor (id, userId) {
    this.id = id
    this.userId = userId
  }
}

class Storage {
  constructor (db) {
    this.db = db
  }

  get filesRoot () {
    return '/data'
  }

  getLatestPhoto (userId) {
    return this.db.getLatestPhoto(userId)
      .then((photoRow) => {
        if (!photoRow) {
          throw new errors.NotFoundError()
        }

        return new PhotoInfo(photoRow.id, userId)
      })
  }

  addPhotoFile (userId, photoPath) {
    var photoId = uuid.v4()

    if (userId !== 'test') {
      return Promise.reject(new errors.AccessDeniedError(
        'Only "test" user is allowed to upload photos'
      ))
    }

    var storedPath = this.filesRoot + '/' + userId + '/' + photoId + '.jpg'

    return new Promise(
      (resolve, reject) => {
        mv(photoPath, storedPath, {mkdirp: true}, error => {
          if (error) {
            reject(new Error(error))
            return
          }

          this.db.insertPhoto(photoId, userId)
            .then(_ => resolve(new PhotoInfo(photoId, userId)))
            .catch(error => reject(new Error(error)))
        })
      }
    )
  }
}

exports.Storage = Storage
