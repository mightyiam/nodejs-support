'use strict'

const DEFAULT_CONTEXT_NAME = '__CLS_HOOKED_CONTEXT'
const contexts = {}

class ClsHookedContext {
  constructor (name) {
    const cls = require('cls-hooked')
    this.name = name || DEFAULT_CONTEXT_NAME
    this._context = cls.getNamespace(this.name) || cls.createNamespace(this.name)
  }

  set (name, value) {
    this._context.set(name, value)
  }

  get (name) {
    return this._context.get(name)
  }

  run (fn, values = {}) {
    return this._context.runAndReturn(() => {
      Object.keys(values).forEach(key => this.set(key.toString(), values[key]))
      return fn()
    })
  }
}

module.exports = name => contexts[name || DEFAULT_CONTEXT_NAME] || (contexts[name || DEFAULT_CONTEXT_NAME] = new ClsHookedContext(name))
