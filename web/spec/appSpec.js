/* global describe, it, beforeEach, fail */
var request = require('supertest-as-promised')
var app = require('../src/app')

var agent

describe('app', function () {
  beforeEach(function () {
    agent = request.agent(app)
  })

  it('works', function (done) {
    agent
      .get('/')
      .expect(200)
      .expect('Hello World!')
      .catch(fail)
      .then(done)
  })
})
