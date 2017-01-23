/* global describe, it, expect, pending */
var db = require('../src/db')
var uuid = require('uuid')

describe('db', function () {
  if (process.env.CI) {
    pending('These tests require real database.')
  }

  describe('getLatestPhoto', function () {
    it('returns latest photo for given user', function (done) {
      var photoId = uuid.v4()
      var userId = 'test'

      db.insertPhoto(photoId, userId)
        .then(_ => db.getLatestPhoto(userId))
        .then(row => {
          expect(row.id).toEqual(photoId)
        })
        .then(done)
        .catch(done.fail)
    })
  })

  describe('getPhoto', function () {
    it('returns row from uphoto table', function (done) {
      var photoId = uuid.v4()
      var userId = 'test'

      db.insertPhoto(photoId, userId)
        .then(_ => db.getPhoto(userId, photoId))
        .then(row => {
          expect(row.id).toEqual(photoId)
          expect(row.user_id).toEqual(userId)
        })
        .then(done)
        .catch(done.fail)
    })

    it('returns row from uphoto table', function (done) {
      var photoId = uuid.v4()
      var userId = 'test'

      db.getPhoto(userId, photoId)
        .then(row => {
          expect(row).not.toBeDefined()
        })
        .then(done)
        .catch(done.fail)
    })
  })

  describe('getAllPhotos', function () {
    it('returns all user\'s photos', function (done) {
      var photoId1 = uuid.v4()
      var photoId2 = uuid.v4()
      var userId = uuid.v4()

      db.insertPhoto(photoId1, userId)
          .then(_ => db.insertPhoto(photoId2, userId))
        .then(_ => db.getAllPhotos(userId))
        .then(rows => {
          expect(rows.length).toEqual(2)
          expect(rows[0].id).toEqual(photoId2)
          expect(rows[1].id).toEqual(photoId1)
        })
        .then(done)
        .catch(done.fail)
    })
  })
})

