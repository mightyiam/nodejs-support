/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const Enumeration = require('../../../main/enums/Enumeration')
const ClassNotExtendableError = require('../../../main/errors/ClassNotExtendableError')

describe('unit tests of Enumeration', function () {
  it('should convert camelCaseToSnakeCase', () => {
    expect(Enumeration._camelCaseToSnake('FooBarBaz')).to.equal('foo_bar_baz')
    expect(Enumeration._camelCaseToSnake('Foo')).to.equal('foo')
    expect(Enumeration._camelCaseToSnake('foo')).to.equal('foo')
  })

  it('should create a new enum', () => {
    const E = Enumeration.new({ name: 'BooleanValue', values: ['TRUE', 'FALSE'] })
    expect(E.TRUE).to.be.ok()
    expect(E.FALSE).to.be.ok()
    expect(E.BOGUS).not.to.be.ok()
    expect(E.isInstance(E.TRUE)).to.be.true()
    expect(E.isClass(E)).to.be.true()
    expect(E.of(E.TRUE)).to.equal(E.TRUE)
    expect(E.of('TRUE')).to.equal(E.TRUE)
    expect(E.of(0)).to.equal(E.TRUE)
    expect(() => E.of('BOGUS')).to.throw(E.$ERROR$)
      .that.has.property('code').that.equals('E_UNKNOWN_BOOLEAN_VALUE_ENUM_VALUE')
    expect(Enumeration.isEnumerationInstance(E.TRUE)).to.be.true()
    expect(Enumeration.isEnumerationClass(E)).to.be.true()
  })

  it('should not allow extensions of enum classes', function () {
    const Super = Enumeration.new({ name: 'Super', values: ['Super'] })
    class Sub extends Super {}
    expect(() => new Sub()).to.throw(ClassNotExtendableError)
  })
})
