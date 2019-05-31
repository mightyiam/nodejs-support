/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const { camelCaseToSnake, snakeToCamelCase } = require('../../../main/string-utils')

describe('unit tests of string-utils', function () {
  it('should convert camel case to snake', () => {
    expect(camelCaseToSnake('FooBarBaz')).to.equal('foo_bar_baz')
    expect(camelCaseToSnake('Foo')).to.equal('foo')
    expect(camelCaseToSnake('foo')).to.equal('foo')
    expect(camelCaseToSnake(undefined)).to.equal(undefined)
  })

  it('should convert snake to camel case', () => {
    expect(snakeToCamelCase('ONE_TWO_THREE')).to.equal('OneTwoThree')
    expect(snakeToCamelCase('ONE__TWO_THREE')).to.equal('OneTwoThree')
    expect(snakeToCamelCase(undefined)).to.equal(undefined)
    expect(snakeToCamelCase('ONE')).to.equal('One')
  })
})
