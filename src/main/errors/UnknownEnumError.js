'use strict'

const IllegalArgumentError = require('./IllegalArgumentError')

module.exports = IllegalArgumentError.subclass({ code: 'E_UNKNOWN_ENUM' })
