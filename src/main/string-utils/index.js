'use strict'

const camelCaseToSnake = it => {
  if (!it) return it

  return it
    .toString()
    .replace(/(^([A-Z]))/, (match, upper) => `${upper.toLowerCase()}`)
    .replace(/([A-Z])/g, (match, upper) => `_${upper.toLowerCase()}`)
}

const camelCaseToUpperCaseSnake = it => {
  it = camelCaseToSnake(it)
  return it && it.toUpperCase()
}

const snakeToCamelCase = it => {
  if (!it) return it

  return it
    .toString()
    .split('_')
    .reduce((accum, next) => {
      if (!next) return accum

      return `${accum}${next.toLowerCase().replace(/^([a-z])/, (match, lower) => lower.toUpperCase())}`
    }, '')
}

module.exports = {
  camelCaseToSnake,
  camelCaseToUpperCaseSnake,
  snakeToCamelCase
}
