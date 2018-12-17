'use strict'

const { Enum } = require('enumify')

const UnknownResponseStatusEnumError = require('../errors/UnknownEnumError')
  .subclass({ code: 'E_UNKNOWN_RESPONSE_STATUS_ENUM' })

class ResponseStatus extends Enum {}

ResponseStatus.initEnum([
  'ERROR',
  'SUCCESS'
])

ResponseStatus.error = () => UnknownResponseStatusEnumError

ResponseStatus.of = it => {
  let e
  if (typeof it === 'number') e = ResponseStatus.enumValues[it]
  if (e) return e

  e = ResponseStatus.enumValueOf(it && it.toString())
  if (e) return e

  throw new UnknownResponseStatusEnumError(it)
}

module.exports = ResponseStatus
