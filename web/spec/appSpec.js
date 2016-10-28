/* global spyOn, describe, it, beforeEach, fail */
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
      .get('/')
      .expect(200)
      .expect('Hello World!')
      .catch(fail)
      .then(done)
  })

  describe('/inbox', function () {
    it('rejects non-test users', function (done) {
      agent
        .post('/inbox')
        .field('userId', 'any-non-test')
        .attach('photoFile', file('200x200.jpg'))
        .expect(403)
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
                '/' + latestPhotoId + '.jpg')
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
