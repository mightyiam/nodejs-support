'use strict'

const { Enum } = require('enumify')

const UnknownDayOfWeekEnumError = require('../errors/UnknownEnumError')
  .subclass({ code: 'E_UNKNOWN_DAY_OF_WEEK_ENUM' })

class DayOfWeek extends Enum {}

DayOfWeek.initEnum([
  'LAST', // convenient 0 value matches recurrify's "last" concept and makes SUNDAY's ordinal equal to 1
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
])

DayOfWeek.error = () => UnknownDayOfWeekEnumError

DayOfWeek.prototype.next = function (count = 1) {
  if (this === DayOfWeek.LAST) return null
  let ordinal = (this.ordinal - 1 + count) % 7
  if (ordinal < 0) ordinal = ordinal + 7
  return DayOfWeek.of(ordinal + 1)
}

DayOfWeek.prototype.prev = function (count = 1) {
  return this.next(-count)
}

DayOfWeek.of = it => {
  let e
  if (typeof it === 'number') e = DayOfWeek.enumValues[it]
  if (e) return e

  e = DayOfWeek.enumValueOf(it && it.toString())
  if (e) return e

  throw new UnknownDayOfWeekEnumError(it)
}

module.exports = DayOfWeek
