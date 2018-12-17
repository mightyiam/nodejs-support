/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const { traits } = require('mutrait')
const Identifiable = require('../../../main').entities.Identifiable

describe('unit tests of Identifiable', function () {
  it('should work', () => {
    class Thing extends traits(Identifiable) {
      constructor (name) {
        super(name)
        this.name = name
      }
    }
    const name = 'Fritz'
    const thing1 = new Thing(name)
    const thing2 = new Thing(name)
    expect(thing1.name).to.equal(thing2.name)
    expect(thing1.id).to.be.ok()
    expect(thing2.id).to.be.ok()
    expect(thing1.identifies(thing2)).to.be.false()
    thing2.id = thing1.id
    expect(thing1.identifies(thing2)).to.be.true()
    expect(new Thing(name).withId(thing1.id).identifies(thing2)).to.be.true()
  })
})
