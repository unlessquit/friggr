/* global spyOn, describe, it, beforeEach, fail, expect */
var request = require('supertest-as-promised')
var app = require('../src/app')
var DbStub = require('../src/db/stub')
var path = require('path')

var agent
var db
var file = function (name) {
  return path.join(__dirname, 'data', name)
}

describe('app', function () {
  beforeEach(function () {
    agent = request.agent(app.build(db = new DbStub()))
  })

  it('works', function (done) {
    spyOn(db, 'query').and.returnValue(
      Promise.resolve({rows: [{name: 'World'}]}))

    agent
      .get('/status.json')
      .expect(200)
      .expect({message: 'Hello World!'})
      .catch(fail)
      .then(done)
  })

  describe('/inbox', function () {
    it('rejects request with missing userId', function (done) {
      agent
        .post('/inbox')
        .attach('photoFile', file('200x200.jpg'))
        .expect(400)
        .expect('Invalid userId')
        .catch(fail)
        .then(done)
    })

    it('rejects request with missing photoFile', function (done) {
      agent
        .post('/inbox')
        .field('userId', 'test')
        .expect(400)
        .expect('Invalid photoFile')
        .catch(fail)
        .then(done)
    })

    it('rejects non-jpeg files', function (done) {
      agent
        .post('/inbox')
        .field('userId', 'test')
        .attach('photoFile', file('file.txt'))
        .expect(400)
        .expect('Invalid photoFile')
        .catch(fail)
        .then(done)
    })
  })

  describe('/view/:userId/data.json', function () {
    it('provides list of user\'s photos', function (done) {
      var userId = 'user'
      var previousPhotoId = 'previous-id'
      var latestPhotoId = 'latest-id'
      var latestPhotoCaption = 'latest-caption'

      db.insertPhoto(previousPhotoId, userId)
      db.insertPhoto(latestPhotoId, userId, latestPhotoCaption)

      agent
        .get('/view/' + userId + '/data.json')
        .expect(200)
        .expect(res => {
          expect(res.body.photos.length).toBe(2)

          expect(res.body.photos[0].id).toBe(latestPhotoId)
          expect(res.body.photos[0].caption).toBe(latestPhotoCaption)

          expect(res.body.photos[1].id).toBe(previousPhotoId)
        })
        .catch(fail)
        .then(done)
    })
  })

  describe('/view/:userId/latest.jpg', function () {
    it('redirects to latest photo', function (done) {
      var userId = 'some-user-id'
      var previousPhotoId = 'previous-id'
      var latestPhotoId = 'latest-id'

      db.insertPhoto(previousPhotoId, userId)
      db.insertPhoto(latestPhotoId, userId)

      agent
        .get('/view/' + userId + '/latest.jpg')
        .expect(302)
        .expect('Found. Redirecting to /view/' + userId +
                '/' + latestPhotoId + '/2000/2000')
        .catch(fail)
        .then(done)
    })

    it('returns 404 if user does not exist', function (done) {
      agent
        .get('/view/unknown/latest.jpg')
        .expect(404)
        .catch(fail)
        .then(done)
    })
  })
})
