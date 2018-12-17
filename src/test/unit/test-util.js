'use strict'

const moment = require('moment-timezone')
const Slot = require('../../main/entities/Slot.js')
const Period = require('../../main/entities/Period.js')

/**
 * Makes it easy to chai expect(..).to.deep.equal(somethingWithMomentsInIt)
 *
 * @param it
 * @return {*}
 */
function momentsToDateStringsIn (it) {
  if (moment.isMoment(it)) return it.utc().toISOString()
  if (Array.isArray(it)) return it.map(it => momentsToDateStringsIn(it))

  if (typeof it === 'object') {
    return Object.keys(it)
      .map(k => ({ [k]: momentsToDateStringsIn(it[k]) }))
      .reduce((accum, next) => Object.assign(accum, next), {})
  }

  return it
}

const busySlot = (begin, durationMins) => Slot.busy(Period.beginningAtWithMinutes(begin, durationMins))
const freeSlot = (begin, durationMins) => Slot.free(Period.beginningAtWithMinutes(begin, durationMins))

module.exports = { momentsToDateStringsIn, busySlot, freeSlot }
