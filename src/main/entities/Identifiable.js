'use strict'

const uuid = require('uuid/v4')
const { Trait } = require('mutrait')

const Identifiable = Trait(s => class extends s {
  constructor () {
    super(...arguments)
    this.id = uuid()
  }

  get id () { return this._id }

  set id (value) {
    this._id = value
  }

  withId (value) {
    this.id = value
    return this
  }

  identifies (that) {
    return that && this.id === that.id
  }
})

module.exports = Identifiable
