'use strict'

const { Trait } = require('mutrait')

const Persistable = Trait(s => class extends s {})

module.exports = Persistable
