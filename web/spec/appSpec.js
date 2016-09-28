/* global spyOn, describe, it, beforeEach, fail */
var request = require('supertest-as-promised')
var app = require('../src/app')
var db = require('../src/db')

var agent

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
})
