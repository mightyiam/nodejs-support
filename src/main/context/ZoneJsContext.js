/* global Zone */
'use strict'

require('zone.js/dist/zone-node')
const DEFAULT_CONTEXT_NAME = '__ZONE_JS_CONTEXT'
const PROPERTIES = 'properties'
const contexts = {}

class ZoneContext {
  constructor (name) {
    this.name = name || DEFAULT_CONTEXT_NAME
    this._context = Zone.current.fork({ name: this.name, properties: { [PROPERTIES]: {} } })
  }

  set (name, value) {
    this._context.get(PROPERTIES)[name] = value
  }

  get (name) {
    return this._context.get(PROPERTIES)[name]
  }

  run (fn, values = {}) {
    return this._context.run(() => {
      Object.keys(values).forEach(key => this.set(key.toString(), values[key]))
      return fn()
    })
  }
}

module.exports = name => contexts[name || DEFAULT_CONTEXT_NAME] || (contexts[name || DEFAULT_CONTEXT_NAME] = new ZoneContext(name))
