/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const DayOfWeek = require('../../../main/enums/DayOfWeek')

describe('unit tests of DayOfWeek', function () {
  it('should calculate next & prev correctly', () => {
    expect(DayOfWeek.LAST.next()).to.be.equal(null)
    expect(DayOfWeek.LAST.prev()).to.be.equal(null)
    expect(DayOfWeek.LAST.next(2)).to.be.equal(null)
    expect(DayOfWeek.LAST.prev(2)).to.be.equal(null)

    expect(DayOfWeek.SUNDAY.next(0)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.MONDAY.next(0)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.TUESDAY.next(0)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.WEDNESDAY.next(0)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.THURSDAY.next(0)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.FRIDAY.next(0)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.SATURDAY.next(0)).to.be.equal(DayOfWeek.SATURDAY)

    expect(DayOfWeek.SUNDAY.next()).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.MONDAY.next()).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.TUESDAY.next()).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.WEDNESDAY.next()).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.THURSDAY.next()).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.FRIDAY.next()).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.SATURDAY.next()).to.be.equal(DayOfWeek.SUNDAY)

    expect(DayOfWeek.SUNDAY.next(2)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.MONDAY.next(2)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.TUESDAY.next(2)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.WEDNESDAY.next(2)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.THURSDAY.next(2)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.FRIDAY.next(2)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.SATURDAY.next(2)).to.be.equal(DayOfWeek.MONDAY)

    expect(DayOfWeek.SUNDAY.prev()).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.MONDAY.prev()).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.TUESDAY.prev()).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.WEDNESDAY.prev()).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.THURSDAY.prev()).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.FRIDAY.prev()).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.SATURDAY.prev()).to.be.equal(DayOfWeek.FRIDAY)

    expect(DayOfWeek.SUNDAY.prev(2)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.MONDAY.prev(2)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.TUESDAY.prev(2)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.WEDNESDAY.prev(2)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.THURSDAY.prev(2)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.FRIDAY.prev(2)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.SATURDAY.prev(2)).to.be.equal(DayOfWeek.THURSDAY)

    expect(DayOfWeek.SUNDAY.next(7)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.MONDAY.next(7)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.TUESDAY.next(7)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.WEDNESDAY.next(7)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.THURSDAY.next(7)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.FRIDAY.next(7)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.SATURDAY.next(7)).to.be.equal(DayOfWeek.SATURDAY)

    expect(DayOfWeek.SUNDAY.next(8)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.MONDAY.next(8)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.TUESDAY.next(8)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.WEDNESDAY.next(8)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.THURSDAY.next(8)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.FRIDAY.next(8)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.SATURDAY.next(8)).to.be.equal(DayOfWeek.SUNDAY)

    expect(DayOfWeek.SUNDAY.next(9)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.MONDAY.next(9)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.TUESDAY.next(9)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.WEDNESDAY.next(9)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.THURSDAY.next(9)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.FRIDAY.next(9)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.SATURDAY.next(9)).to.be.equal(DayOfWeek.MONDAY)

    expect(DayOfWeek.SUNDAY.prev(8)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.MONDAY.prev(8)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.TUESDAY.prev(8)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.WEDNESDAY.prev(8)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.THURSDAY.prev(8)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.FRIDAY.prev(8)).to.be.equal(DayOfWeek.THURSDAY)
    expect(DayOfWeek.SATURDAY.prev(8)).to.be.equal(DayOfWeek.FRIDAY)

    expect(DayOfWeek.SUNDAY.prev(9)).to.be.equal(DayOfWeek.FRIDAY)
    expect(DayOfWeek.MONDAY.prev(9)).to.be.equal(DayOfWeek.SATURDAY)
    expect(DayOfWeek.TUESDAY.prev(9)).to.be.equal(DayOfWeek.SUNDAY)
    expect(DayOfWeek.WEDNESDAY.prev(9)).to.be.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.THURSDAY.prev(9)).to.be.equal(DayOfWeek.TUESDAY)
    expect(DayOfWeek.FRIDAY.prev(9)).to.be.equal(DayOfWeek.WEDNESDAY)
    expect(DayOfWeek.SATURDAY.prev(9)).to.be.equal(DayOfWeek.THURSDAY)
  })

  it('should retrieve enum', () => {
    expect(DayOfWeek.of('MONDAY')).to.equal(DayOfWeek.MONDAY)
    expect(DayOfWeek.of(2)).to.equal(DayOfWeek.MONDAY)
  })
  it('should fail to retrieve unknown enum', () => {
    expect(() => DayOfWeek.of('BOGUS')).to.throw(DayOfWeek.$ERROR$)
  })
})
