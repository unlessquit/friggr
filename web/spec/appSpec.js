/* global spyOn, describe, it, beforeEach, fail */
var request = require('supertest-as-promised')
var app = require('../src/app')
var db = require('../src/db')
var path = require('path')

var agent
var file = function (name) {
  return path.join(__dirname, 'data', name)
}

describe('app', function () {
  beforeEach(function () {
    agent = request.agent(app)
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
      var latestPhotoId = 'latest-id'
      spyOn(db, 'getLatestPhoto').and.returnValue(
        Promise.resolve({id: latestPhotoId}))

      agent
        .get('/view/test/latest.jpg')
        .expect(302)
        .expect('Found. Redirecting to /view/test/' + latestPhotoId + '.jpg')
        .catch(fail)
        .then(done)
    })

    it('returns 404 if user does not exist', function (done) {
      spyOn(db, 'getLatestPhoto').and.returnValue(
        Promise.resolve(null))

      agent
        .get('/view/test/latest.jpg')
        .expect(404)
        .catch(fail)
        .then(done)
    })
  })
})
