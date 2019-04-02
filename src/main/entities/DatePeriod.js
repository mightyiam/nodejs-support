'use strict'

const moment = require('moment-timezone')
const { superclass } = require('mutrait')
const Persistable = require('./Persistable')
const Period = require('./Period')
const TimeUnit = require('./TimeUnit')
const IllegalArgumentError = require('../errors/IllegalArgumentError')

class DatePeriod extends superclass(Period).expressing(Persistable) {
  static beginningAtWithDays (begin, days) {
    return new DatePeriod(begin.clone(), begin.clone().add(days, TimeUnit.DAY.key))
  }

  constructor (begin, end) {
    super(...arguments)
    this.begin = begin
    this.end = end
    this._type = 'DatePeriod'
  }

  _checkBegin (value) {
    if (!value) return value
    value = moment.utc(value)
    DatePeriod._checkGranularity(value)
    // TODO: use Period-specific errors
    if (!value.isValid() || this._end?.isBefore(value)) throw new IllegalArgumentError(`value:${value}`)
    return value
  }

  _checkEnd (value) {
    if (!value) return value
    value = moment.utc(value)
    DatePeriod._checkGranularity(value)
    if (!value.isValid() || this._begin?.isAfter(value)) throw new IllegalArgumentError(`value:${value}`)
    return value
  }

  static _checkGranularity (value) {
    if (value.valueOf() !== moment.utc({ year: value.year(), month: value.month(), date: value.date() }).valueOf()) {
      throw new IllegalArgumentError(`value:${value}`)
    }
  }
}

module.exports = DatePeriod
