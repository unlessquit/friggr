class DbStub {
  constructor () {
    this.photos = []
  }

  query (query, args) {
    return new Error('Not Implemented')
  }

  getLatestPhoto (userId) {
    return Promise.resolve(
      this.photos.find(photo => photo.user_id === userId)
    )
  }

  getAllPhotos (userId) {
    return Promise.resolve(
      this.photos.filter(photo => photo.user_id === userId)
    )
  }

  insertPhoto (photoId, userId, caption) {
    this.photos.unshift({ id: photoId, user_id: userId, caption: caption })
    return Promise.resolve({})
  }
}

module.exports = DbStub
