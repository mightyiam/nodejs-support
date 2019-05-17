'use strict'

const { Enum } = require('enumify')
const ClassNotExtendableError = require('../errors/ClassNotExtendableError')

class Enumeration extends Enum {
  static isEnumerationInstance (it) {
    return Enumeration.isEnumerationClass(it?.constructor)
  }

  static isEnumerationClass (it) {
    return it && Object.getPrototypeOf(it).name === 'Enumeration'
  }

  static new ({
    name,
    values,
    error: {
      code = null,
      msg = null,
      info = null
    } = {}
  } = {}) {
    code = code || `E_UNKNOWN_${Enumeration._camelCaseToSnake(name).toUpperCase()}_ENUM_VALUE`
    const EnumError = require('../errors/UnknownEnumError').subclass({ code })

    const E = {
      [name]: class extends Enumeration {
        static isInstance (it) {
          return Enumeration.isEnumerationInstance(it) && it.constructor.name === name
        }

        static isClass (it) {
          return Enumeration.isEnumerationClass(it) && it.name === name
        }

        static of (it) {
          if (E.isInstance(it)) return it

          let e
          if (typeof it === 'number') e = E.enumValues[it]
          if (e) return e

          e = E.enumValueOf(it && it.toString())
          if (e) return e

          throw new EnumError({ code, msg, info: info || { value: it } })
        }

        constructor (...args) {
          super(...args)
          if (this.constructor !== E) throw new ClassNotExtendableError()
        }
      }
    }[name]

    E.initEnum(values)

    E.$ERROR$ = EnumError

    return E
  }

  static _camelCaseToSnake (it) {
    return it
      ?.toString()
      ?.replace(/(^([A-Z]))/, (match, upper) => `${upper.toLowerCase()}`)
      ?.replace(/([A-Z])/g, (match, upper) => `_${upper.toLowerCase()}`)
  }
}

module.exports = Enumeration
