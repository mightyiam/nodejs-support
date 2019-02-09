'use strict'

const { Enum } = require('enumify')

const UnknownTimeUnitEnumError = require('../errors/UnknownEnumError')
  .subclass({ code: 'E_UNKNOWN_TIME_UNIT_ENUM' })

class TimeUnit extends Enum {}

const MILLISECOND = 1
const SECOND = MILLISECOND * 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 30
const QUARTER = DAY * 90
const YEAR = DAY * 365

const VALUES = {
  YEAR: { key: 'y', ms: YEAR },
  QUARTER: { key: 'Q', ms: QUARTER },
  MONTH: { key: 'M', ms: MONTH },
  WEEKS: { key: 'w', ms: WEEK },
  DAY: { key: 'd', ms: DAY },
  HOUR: { key: 'h', ms: HOUR },
  MINUTE: { key: 'm', ms: MINUTE },
  SECOND: { key: 's', ms: SECOND },
  MILLISECOND: { key: 'ms', ms: MILLISECOND }
}

const units = Object.keys(VALUES)

TimeUnit.initEnum(units)

units.forEach(it => {
  Object.keys(VALUES[it]).forEach(key => {
    TimeUnit[it][key] = VALUES[it][key]
  })
})

TimeUnit.error = () => UnknownTimeUnitEnumError

TimeUnit.of = it => {
  if (it instanceof TimeUnit) return it

  let e
  if (typeof it === 'number') e = TimeUnit.enumValues[it]
  if (e) return e

  e = TimeUnit.enumValueOf(it && it.toString())
  if (e) return e

  throw new UnknownTimeUnitEnumError(it)
}

module.exports = TimeUnit
