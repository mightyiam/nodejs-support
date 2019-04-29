/* global describe, it */
'use strict'

const uuid = require('uuid/v4')
const Context = require('../../../main/context/ZoneJsContext')

const tests = require('./context-tests')

describe('ZoneJsTest', function () {
  it('should work with sync fn returning a value', function () {
    tests.testSyncFnReturningValue(Context, uuid())
  })

  it('should work with awaiting sync fn returning a value', async function () {
    await tests.testAwaitingSyncFnReturningValue(Context, uuid())
  })

  it('should work with awaiting async fn returning a value', async function () {
    await tests.testAwaitingAsyncFnReturningValue(Context, uuid())
  })

  it('should work with setTimeout', function (done) {
    tests.testContextValueAvailableInSetTimeout(Context, uuid(), done)
  })

  it('should work with Promise.resolve', function (done) {
    tests.testContextValueAvailableInPromiseResolve(Context, uuid(), done)
  })

  it('should work with Promise.reject', function (done) {
    tests.testContextValueAvailableInPromiseReject(Context, uuid(), done)
  })

  it('should work with async/await', async function () {
    return tests.testContextValueAvailableInAsyncAwait(Context, uuid())
  })
})
