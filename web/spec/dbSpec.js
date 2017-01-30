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
      var caption = 'caption'

      db.insertPhoto(photoId, userId, caption)
        .then(_ => db.getLatestPhoto(userId))
        .then(row => {
          expect(row.id).toEqual(photoId)
          expect(row.caption).toEqual(caption)
        })
        .then(done)
        .catch(done.fail)
    })
  })

  describe('getPhoto', function () {
    it('returns row from uphoto table', function (done) {
      var photoId = uuid.v4()
      var userId = 'test'
      var caption = 'test caption'

      db.insertPhoto(photoId, userId, caption)
        .then(_ => db.getPhoto(userId, photoId))
        .then(row => {
          expect(row.id).toEqual(photoId)
          expect(row.user_id).toEqual(userId)
          expect(row.caption).toEqual(caption)
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
      var photo1Caption = 'photo #1'

      var photoId2 = uuid.v4()
      var photo2Caption = 'photo #2'

      var userId = uuid.v4()

      db.insertPhoto(photoId1, userId, photo1Caption)
        .then(_ => db.insertPhoto(photoId2, userId, photo2Caption))
        .then(_ => db.getAllPhotos(userId))
        .then(rows => {
          expect(rows.length).toEqual(2)

          expect(rows[0].id).toEqual(photoId2)
          expect(rows[0].caption).toEqual(photo2Caption)

          expect(rows[1].id).toEqual(photoId1)
          expect(rows[1].caption).toEqual(photo1Caption)
        })
        .then(done)
        .catch(done.fail)
    })
  })
})

