'use strict'

const { Enum } = require('enumify')
const MissingRequiredArgumentError = require('../errors/MissingRequiredArgumentError')

const createNamedSubclass = ({ name }) => ({ [name]: class extends Enum {} })[name]
const camelToSnake = it => it.split(/(?=[A-Z])/).join('_')

module.exports = ({ name, values, errorClassName, errorCode } = {}) => {
  if (!(name = name?.toString())) throw new MissingRequiredArgumentError({ msg: name })
  if (!values) throw new MissingRequiredArgumentError({ msg: 'values' })
  if (!Array.isArray(values)) values = [values]
  values = values.map((it, i) => {
    it = it?.toString()
    if (!it) throw new MissingRequiredArgumentError({ msg: `values[${i}]` })
  })
  errorClassName = errorClassName?.toString() || `Unknown${name}EnumError`
  if (!errorCode) errorCode = errorCode || `E_${camelToSnake(errorClassName).toUpperCase()}`.replace(/_ERROR$/, '')

  const UnknownEnumError = require('../errors/UnknownEnumError').subclass({ code: errorCode })

  const EnumClass = createNamedSubclass({ name }) // dynamically names class

  EnumClass.of = it => {
    if (it instanceof EnumClass) return it

    let e
    if (typeof it === 'number') e = EnumClass.enumValues[it]
    if (e) return e

    e = EnumClass.enumValueOf(it && it.toString())
    if (e) return e

    throw new UnknownEnumError(it)
  }

  EnumClass.error = () => UnknownEnumError // this is a function because ERROR might conflict with an enum value

  EnumClass.initEnum(values)

  return EnumClass
}
