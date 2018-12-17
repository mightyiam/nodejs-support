'use strict'

const { Enum } = require('enumify')

const UnknownContextEnumError = require('../errors/UnknownEnumError')
  .subclass({ code: 'E_UNKNOWN_CONTEXT_ENUM' })

class Context extends Enum {}

Context.initEnum([
  'SCHEDULING'
])

Context.error = () => UnknownContextEnumError

Context.of = it => {
  let e
  if (typeof it === 'number') e = Context.enumValues[it]
  if (e) return e

  e = Context.enumValueOf(it && it.toString())
  if (e) return e

  throw new UnknownContextEnumError(it)
}

module.exports = Context
