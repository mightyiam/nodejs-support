'use strict'

const IllegalArgumentError = require('./IllegalArgumentError')

module.exports = IllegalArgumentError.subclass({ code: 'E_MISSING_REQUIRED_ARGUMENT' })
