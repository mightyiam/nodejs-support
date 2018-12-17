/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const Context = require('../../../main').enums.Context

describe('unit tests of Context', function () {
  it('should retrieve enum', () => {
    expect(Context.of('SCHEDULING')).to.equal(Context.SCHEDULING)
    expect(Context.of(0)).to.equal(Context.SCHEDULING)
  })
  it('should fail to retrieve unknown enum', () => {
    expect(() => Context.of('BOGUS')).to.throw(Context.error())
  })
})
