'use strict'

const IllegalArgumentError = require('./IllegalArgumentError')

module.exports = IllegalArgumentError.subclass({ code: 'E_ILLEGAL_ARGUMENT_TYPE' })
