/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect
const fail = expect.fail

const { Enum } = require('enumify')

const IllegalArgumentError = require('../../../main/errors/IllegalArgumentError')
const UnknownEnumError = require('../../../main/errors/UnknownEnumError')
const UnknownOneTwoEnumError = UnknownEnumError.subclass({ code: 'E_UNKNOWN_ONETWO_ENUM' })
const log = require('../../../main/logger')('EnumPattern')

class OneTwo extends Enum {}

OneTwo.initEnum([
  'ONE', 'TWO'
])

OneTwo.prototype.next = function (count = 1) {
  let ordinal = (this.ordinal + count) % 2
  if (ordinal < 0) ordinal = 2 + ordinal
  return OneTwo.of(ordinal)
}

OneTwo.prototype.prev = function (count = 1) {
  return this.next(-count)
}

OneTwo.of = it => {
  let e
  if (typeof it === 'number') e = OneTwo.enumValues[it]
  if (e) return e

  e = OneTwo.enumValueOf(it && it.toString())
  if (e) return e

  throw log.error(new UnknownOneTwoEnumError({ msg: it }))
}

describe('unit tests of enum pattern', function () {
  it('should calculate next & prev correctly', () => {
    expect(OneTwo.ONE.next(0)).to.be.equal(OneTwo.ONE)
    expect(OneTwo.TWO.next(0)).to.be.equal(OneTwo.TWO)

    expect(OneTwo.ONE.next()).to.be.equal(OneTwo.TWO)
    expect(OneTwo.TWO.next()).to.be.equal(OneTwo.ONE)

    expect(OneTwo.ONE.next(2)).to.be.equal(OneTwo.ONE)
    expect(OneTwo.TWO.next(2)).to.be.equal(OneTwo.TWO)

    expect(OneTwo.ONE.prev(0)).to.be.equal(OneTwo.ONE)
    expect(OneTwo.TWO.prev(0)).to.be.equal(OneTwo.TWO)

    expect(OneTwo.ONE.prev()).to.be.equal(OneTwo.TWO)
    expect(OneTwo.TWO.prev()).to.be.equal(OneTwo.ONE)

    expect(OneTwo.ONE.prev(2)).to.be.equal(OneTwo.ONE)
    expect(OneTwo.TWO.prev(2)).to.be.equal(OneTwo.TWO)
  })

  it('should throw UnknownOneTwoEnumError', () => {
    [3, 'FARTS', ''].forEach(bad => {
      try {
        OneTwo.of(bad)
        fail(`should have thrown UnknownOneTwoEnumError with ${bad}`)
      } catch (e) {
        expect(e).to.be.instanceOf(UnknownOneTwoEnumError)
        expect(e).to.be.instanceOf(UnknownEnumError)
        expect(e).to.be.instanceOf(IllegalArgumentError)
        expect(e.code).to.equal(UnknownOneTwoEnumError.CODE)
        expect(e.message).to.match(new RegExp(`${bad}$`))
      }
    })
  })
})
