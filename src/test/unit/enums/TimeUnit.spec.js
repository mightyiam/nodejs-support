/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const TimeUnit = require('../../../main/enums/TimeUnit')

describe('unit tests of DayOfWeek', function () {
  it('should retrieve enum', () => {
    expect(TimeUnit.of('MINUTE')).to.equal(TimeUnit.MINUTE)
    expect(TimeUnit.of(6)).to.equal(TimeUnit.MINUTE)
  })
})
