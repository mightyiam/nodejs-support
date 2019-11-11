/* global describe, it */
'use strict'

const _ = require('lodash')
const { Trait, trait } = require('mutrait')

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

describe('_.merge', () => {
  it('should invoke inherited property methods correctly', () => {
    let itSet = 0
    let itGet = 0
    let xSet = 0
    let xGet = 0

    class HasX {
      set x (value) {
        xSet++
        this._x = value
      }

      get x () {
        xGet++
        return this._x
      }
    }

    class Foo extends HasX {
      set it (value) {
        itSet++
        this._it = value
      }

      get it () {
        itGet++
        return this._it
      }
    }

    const f = 'f'
    const g = 'g'

    const foo = new Foo()

    foo.it = f
    expect(foo._it).to.equal(f)
    expect(itSet).to.equal(1)
    expect(foo.it).to.equal(f)
    expect(itGet).to.equal(1)

    foo.x = g
    expect(foo._x).to.equal(g)
    expect(xSet).to.equal(1)
    expect(foo.x).to.equal(g)
    expect(xGet).to.equal(1)

    const o = { it: f + 'o', x: g + 'o' }

    _.merge(foo, o)

    expect(itSet).to.equal(2)
    expect(xSet).to.equal(2)
    expect(foo.it).to.equal(o.it)
    expect(foo._it).to.equal(o.it)
    expect(foo.x).to.equal(o.x)
    expect(foo._x).to.equal(o.x)
  })

  it('should invoke expressed property methods correctly', () => {
    let itSet = 0
    let itGet = 0
    let xSet = 0
    let xGet = 0

    const HasX = s => class extends (s || class {}) {
      set x (value) {
        xSet++
        this._x = value
      }

      get x () {
        xGet++
        return this._x
      }
    }

    class Foo extends HasX() {
      set it (value) {
        itSet++
        this._it = value
      }

      get it () {
        itGet++
        return this._it
      }
    }

    const f = 'f'
    const g = 'g'

    const foo = new Foo()

    foo.it = f
    expect(foo._it).to.equal(f)
    expect(itSet).to.equal(1)
    expect(foo.it).to.equal(f)
    expect(itGet).to.equal(1)

    foo.x = g
    expect(foo._x).to.equal(g)
    expect(xSet).to.equal(1)
    expect(foo.x).to.equal(g)
    expect(xGet).to.equal(1)

    const o = { it: f + 'o', x: g + 'o' }

    _.merge(foo, o)

    expect(itSet).to.equal(2)
    expect(xSet).to.equal(2)
    expect(foo.it).to.equal(o.it)
    expect(foo._it).to.equal(o.it)
    expect(foo.x).to.equal(o.x)
    expect(foo._x).to.equal(o.x)
  })

  it('should invoke expressed property methods correctly when used in ctors', () => {
    let itSet = 0
    let xSet = 0

    const HasX = s => class extends (s || class {}) {
      set x (value) {
        xSet++
        this._x = value
      }

      get x () {
        return this._x
      }
    }

    class Foo extends HasX() {
      constructor (it, x) {
        super(...arguments)
        this.it = it
        this.x = x
      }

      set it (value) {
        itSet++
        this._it = value
      }

      get it () {
        return this._it
      }
    }

    const f = 'f'
    const g = 'g'

    const foo = new Foo(f, g)
    expect(itSet).to.equal(1)
    expect(xSet).to.equal(1)
    expect(foo._it).to.equal(f)
    expect(foo._x).to.equal(g)

    const h = 'h'
    const i = 'i'

    foo.it = h
    expect(foo._it).to.equal(h)
    expect(itSet).to.equal(2)
    expect(foo.it).to.equal(h)

    foo.x = i
    expect(foo._x).to.equal(i)
    expect(xSet).to.equal(2)
    expect(foo.x).to.equal(i)

    const o = { it: f + 'o', x: g + 'o' }

    _.merge(foo, o)

    expect(itSet).to.equal(3)
    expect(xSet).to.equal(3)
    expect(foo.it).to.equal(o.it)
    expect(foo._it).to.equal(o.it)
    expect(foo.x).to.equal(o.x)
    expect(foo._x).to.equal(o.x)
  })

  it('should invoke mutrait-expressed property methods correctly when used in ctors', () => {
    let itSet = 0
    let xSet = 0

    const HasX = Trait(s => class extends (s || class {}) {
      set x (value) {
        xSet++
        this._x = value
      }

      get x () {
        return this._x
      }
    })

    class Foo extends trait(HasX) {
      constructor (it, x) {
        super(...arguments)
        this.it = it
        this.x = x
      }

      set it (value) {
        itSet++
        this._it = value
      }

      get it () {
        return this._it
      }
    }

    const f = 'f'
    const g = 'g'

    const foo = new Foo(f, g)
    expect(itSet).to.equal(1)
    expect(xSet).to.equal(1)
    expect(foo._it).to.equal(f)
    expect(foo._x).to.equal(g)

    const h = 'h'
    const i = 'i'

    foo.it = h
    expect(foo._it).to.equal(h)
    expect(itSet).to.equal(2)
    expect(foo.it).to.equal(h)

    foo.x = i
    expect(foo._x).to.equal(i)
    expect(xSet).to.equal(2)
    expect(foo.x).to.equal(i)

    const o = { it: f + 'o', x: g + 'o' }

    _.merge(foo, o)

    expect(itSet).to.equal(3)
    expect(xSet).to.equal(3)
    expect(foo.it).to.equal(o.it)
    expect(foo._it).to.equal(o.it)
    expect(foo.x).to.equal(o.x)
    expect(foo._x).to.equal(o.x)
  })
})
