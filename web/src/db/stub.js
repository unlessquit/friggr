class DbStub {
  constructor () {
    this.photos = []
  }

  query (query, args) {
    return new Error('Not Implemented')
  }

  getLatestPhoto (userId) {
    return Promise.resolve(
      this.photos.find(photo => photo.userId === userId)
    )
  }

  insertPhoto (photoId, userId) {
    this.photos.unshift({ id: photoId, userId: userId })
    return Promise.resolve({})
  }
}

module.exports = DbStub
