var mv = require('mv')
var uuid = require('uuid')
var errors = require('./errors')

class PhotoInfo {
  constructor (id, userId, caption) {
    this.id = id
    this.userId = userId
    this.caption = caption
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
      .then(photoRow => {
        if (!photoRow) {
          throw new errors.NotFoundError()
        }

        return new PhotoInfo(photoRow.id, userId, photoRow.caption)
      })
  }

  getPhoto (userId, photoId) {
    return this.db.getPhoto(userId, photoId)
      .then(photoRow => {
        if (!photoRow) {
          throw new errors.NotFoundError()
        }

        return new PhotoInfo(photoRow.id, photoRow.user_id, photoRow.caption)
      })
  }

  getAllPhotos (userId) {
    return this.db.getAllPhotos(userId)
      .then(photoRows => {
        return photoRows.map(
          photoRow => new PhotoInfo(photoRow.id, photoRow.user_id, photoRow.caption)
        )
      })
  }

  addPhotoFile (userId, photoPath, caption) {
    var photoId = uuid.v4()

    var storedPath = this.filesRoot + '/' + userId + '/' + photoId + '.jpg'

    return new Promise(
      (resolve, reject) => {
        mv(photoPath, storedPath, {mkdirp: true}, error => {
          if (error) {
            reject(new Error(error))
            return
          }

          this.db.insertPhoto(photoId, userId, caption)
            .then(_ => resolve(new PhotoInfo(photoId, userId, caption)))
            .catch(error => reject(new Error(error)))
        })
      }
    )
  }

  photoOriginalPath (photoInfo) {
    return this.filesRoot + '/' + photoInfo.userId + '/' + photoInfo.id + '.jpg'
  }
}

exports.Storage = Storage
