'use strict'

const IllegalStateError = require('./IllegalStateError')

module.exports = IllegalStateError.subclass({ code: 'E_CLASS_NOT_EXTENDABLE' })
