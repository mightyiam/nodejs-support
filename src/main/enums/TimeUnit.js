'use strict'

const Enumeration = require('./Enumeration')

const MILLISECOND = 1
const SECOND = MILLISECOND * 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 30 // approximate
const QUARTER = DAY * 90 // approximate
const YEAR = DAY * 365 // approximate

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

const TimeUnit = Enumeration.new({
  name: 'TimeUnit',
  values: units
})

units.forEach(it => {
  Object.keys(VALUES[it]).forEach(key => {
    TimeUnit[it][key] = VALUES[it][key]
  })
})

module.exports = TimeUnit
