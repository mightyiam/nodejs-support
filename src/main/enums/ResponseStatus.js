'use strict'

const Enumeration = require('./Enumeration')

module.exports = Enumeration.new({
  name: 'ResponseStatus',
  values: [
    'ERROR',
    'SUCCESS',
    'PARTIAL'
  ]
})
