/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const ResponseStatus = require('../../../main').enums.ResponseStatus

describe('unit tests of ResponseStatus', function () {
  it('should retrieve enum', () => {
    expect(ResponseStatus.of('SUCCESS')).to.equal(ResponseStatus.SUCCESS)
    expect(ResponseStatus.of(0)).to.equal(ResponseStatus.ERROR)
  })
  it('should fail to retrieve unknown enum', () => {
    expect(() => ResponseStatus.of('BOGUS')).to.throw(ResponseStatus.$ERROR$)
  })
})
