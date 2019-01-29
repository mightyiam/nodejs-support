/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const log = require('../../../main/logger')('CodedError')

const CodedError = require('../../../main/errors/CodedError')

describe('unit tests of CodedError', function () {
  it('should have name, code & no cause', () => {
    const NAME = 'MyError'
    const CODE = 'E_MY_ERROR'

    const MyError = CodedError({ code: CODE, name: NAME })

    const msg = 'boom'
    const e = new MyError({ msg })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(e.name).to.equal(NAME)
    expect(e.code).to.equal(CODE)
    expect(e.message).to.equal(`${CODE}: ${msg}`)
    log.error(e)
  })

  it('should have code & no name or cause', () => {
    const CODE = 'E_MY_ERROR'

    const MyError = CodedError({ code: CODE })

    const msg = 'boom'
    const e = new MyError({ msg })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(e.name).to.equal(CODE)
    expect(e.code).to.equal(CODE)
    expect(e.message).to.equal(`${CODE}: ${msg}`)
    log.error(e)
  })

  it('should have a cause and code as name', () => {
    const CAUSE_CODE = 'E_MY_ERROR_CAUSE'
    const CODE = 'E_MY_ERROR'

    const MyErrorCause = CodedError({ code: CAUSE_CODE })
    const MyError = CodedError({ code: CODE })

    const msg = 'boom'
    const causeMsg = 'because many badness so high'
    const cause = new MyErrorCause({ msg: causeMsg })
    const e = new MyError({ msg, cause })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(MyError.CODE).to.equal(CODE)
    expect(MyErrorCause.CODE).to.equal(CAUSE_CODE)
    expect(e.name).to.equal(CODE)
    expect(e.code).to.equal(CODE)
    expect(e.message).to.equal(`${CODE}: ${msg}: ${CAUSE_CODE}: ${causeMsg}`)
    log.error(e)
  })

  it('should work with no args', () => {
    const CAUSE_CODE = 'E_MY_ERROR_CAUSE'
    const CODE = 'E_MY_ERROR'

    const MyErrorCause = CodedError({ code: CAUSE_CODE })
    const MyError = CodedError({ code: CODE })

    const cause = new MyErrorCause()
    const e = new MyError({ cause })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(e.name).to.equal(CODE)
    expect(e.code).to.equal(CODE)
    expect(e.message).to.equal(`${CODE}: ${CAUSE_CODE}`)
    log.error(e)
  })

  it('should work with a supererror & no name', () => {
    const SUPERCODE = 'E_SUPER'
    const SUBCODE = 'E_SUB'

    const Super = CodedError({ code: SUPERCODE })
    const Sub = Super.subclass({ code: SUBCODE })

    const e = new Sub()

    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(Sub)
    expect(e).to.be.instanceOf(Super)
    expect(e.name).to.equal(SUBCODE)
    expect(e.code).to.equal(SUBCODE)
    expect(e.message).to.equal(`${SUBCODE}`)
    expect(() => { throw new Sub() }).to.throw(Sub)
    expect(() => { throw new Sub() }).to.throw(Super)
    log.error(e)
  })

  it('should work with a supererror, a subclass & a subclass subclass', () => {
    const SUPERCODE = 'E_SUPER'
    const SUBCODE = 'E_SUB'
    const SUB2CODE = 'E_SUB2'

    const Super = CodedError({ code: SUPERCODE })
    const Sub = Super.subclass({ code: SUBCODE })
    const Sub2 = Sub.subclass({ code: SUB2CODE })

    const e = new Sub2()

    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(Sub2)
    expect(e).to.be.instanceOf(Sub)
    expect(e).to.be.instanceOf(Super)
    expect(e.name).to.equal(SUB2CODE)
    expect(e.code).to.equal(SUB2CODE)
    expect(e.message).to.equal(`${SUB2CODE}`)
    log.error(e)
  })

  it('should work with named error & supererror', () => {
    const SUPERCODE = 'E_SUPER'
    const SUPERNAME = 'Super'
    const SUBCODE = 'E_SUB'
    const SUBNAME = 'Sub'

    const Super = CodedError({ code: SUPERCODE, name: SUPERNAME })
    const Sub = Super.subclass({ code: SUBCODE, name: SUBNAME })

    const e = new Sub()

    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(Sub)
    expect(e).to.be.instanceOf(Super)
    expect(e.name).to.equal(SUBNAME)
    expect(e.code).to.equal(SUBCODE)
    expect(e.message).to.equal(`${SUBCODE}`)
    log.error(e)
  })
})
