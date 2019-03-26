/* global describe, it, before */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const uuid = require('uuid/v4')
const ClsHookedContext = require('../../../main').context.ClsHookedContext
const ZoneJsContext = require('../../../main').context.ZoneJsContext

const value = uuid()

const testSetTimeout = (Context, name, done) => {
  Context(name).run(() => {
    setTimeout(() => {
      try {
        expect(Context(name).get('value')).to.equal(value)
        done()
      } catch (e) {
        done(e)
      }
    }, 5)
  }, {
    value
  })
}

const testPromiseResolve = (Context, name, done) => {
  Context(name).run(() => {
    Promise.resolve()
      .then(() => {
        expect(Context(name).get('value')).to.equal(value)
      })
      .then(() => done())
      .catch(e => done(e))
  }, {
    value
  })
}

const testPromiseReject = (Context, name, done) => {
  Context(name).run(() => {
    Promise.reject(new Error('because'))
      .catch(() => {
        expect(Context(name).get('value')).to.equal(value)
      })
      .then(() => done())
      .catch(e => done(e))
  }, {
    value
  })
}

const testAsyncAwait = async (Context, name) => {
  return Context(name).run(async () => {
    await Promise.resolve(1)
    expect(Context(name).get('value')).to.equal(value)
  }, {
    value
  })
}

describe('unit tests of Context', function () {
  let Context

  describe('ClsHookedTest', function () {
    before(function () {
      Context = ClsHookedContext
    })

    it('should work with setTimeout', function (done) {
      testSetTimeout(Context, uuid(), done)
    })

    it('should work with Promise.resolve', function (done) {
      testPromiseResolve(Context, uuid(), done)
    })

    it('should work with Promise.reject', function (done) {
      testPromiseReject(Context, uuid(), done)
    })

    it('should work with async/await', async function () {
      return testAsyncAwait(Context, uuid())
    })
  })

  describe('ZoneJsTest', function () {
    before(function () {
      Context = ZoneJsContext
    })

    it('should work with setTimeout', function (done) {
      testSetTimeout(Context, uuid(), done)
    })

    it('should work with Promise.resolve', function (done) {
      testPromiseResolve(Context, uuid(), done)
    })

    it('should work with Promise.reject', function (done) {
      testPromiseReject(Context, uuid(), done)
    })

    it('should work with async/await', async function () {
      return testAsyncAwait(Context, uuid())
    })
  })
})
