/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const log = require('../../../main/logger')('CodedError')

const CodedError = require('../../../main/errors/CodedError')
const IllegalArgumentError = require('../../../main/errors/IllegalArgumentError')
const UnknownEnumError = require('../../../main/errors/UnknownEnumError')

describe('unit tests of CodedError', function () {
  it('should have code & no name or cause', () => {
    const code = 'E_MY'
    const name = 'MyError'

    const MyError = CodedError({ code })

    const msg = 'boom'
    const e = new MyError({ msg })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(e.name).to.equal(name)
    expect(e.code).to.equal(code)
    expect(e.message).to.equal(`${code}: ${msg}`)
    log.error(e)
  })

  it('should have a cause and code as name', () => {
    const causeCode = 'E_MY_ERROR_CAUSE'
    const code = 'E_MY'
    const name = 'MyError'

    const MyErrorCause = CodedError({ code: causeCode })
    const MyError = CodedError({ code })

    const msg = 'boom'
    const causeMsg = 'because many badness so high'
    const cause = new MyErrorCause({ msg: causeMsg })
    const e = new MyError({ msg, cause })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(MyError.CODE).to.equal(code)
    expect(MyErrorCause.CODE).to.equal(causeCode)
    expect(e.name).to.equal(name)
    expect(e.code).to.equal(code)
    expect(e.message).to.equal(`${code}: ${msg}: ${causeCode}: ${causeMsg}`)
    log.error(e)
  })

  it('should work with no args', () => {
    const causeCode = 'E_MY_ERROR_CAUSE'
    const code = 'E_MY'

    const MyErrorCause = CodedError({ code: causeCode })
    const MyError = CodedError({ code: code })

    const cause = new MyErrorCause()
    const e = new MyError({ cause })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(e.name).to.equal('MyError')
    expect(e.code).to.equal(code)
    expect(e.message).to.equal(`${code}: ${causeCode}`)
    log.error(e)
  })

  it('should work with a supererror & no name', () => {
    const superCode = 'E_SUPER'
    const subCode = 'E_SUB'

    const Super = CodedError({ code: superCode })
    const Sub = Super.subclass({ code: subCode })

    const e = new Sub()

    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(Sub)
    expect(e).to.be.instanceOf(Super)
    expect(e.name).to.equal('SubError')
    expect(e.code).to.equal(subCode)
    expect(e.message).to.equal(`${subCode}`)
    expect(() => { throw new Sub() }).to.throw(Sub)
    expect(() => { throw new Sub() }).to.throw(Super)
    log.error(e)
  })

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

  it('should have name & no cause', () => {
    const name = 'MyError'
    const code = 'E_MY'

    const MyError = CodedError({ name })

    const msg = 'boom'
    const e = new MyError({ msg })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(e.name).to.equal(name)
    expect(e.code).to.equal(code)
    expect(e.message).to.equal(`${code}: ${msg}`)
    log.error(e)
  })

  it('should have a cause and code as name', () => {
    const causeName = 'MyCauseError'
    const causeCode = 'E_MY_CAUSE'
    const name = 'MyError'
    const code = 'E_MY'

    const MyCauseError = CodedError({ name: causeName })
    const MyError = CodedError({ name })

    const msg = 'boom'
    const causeMsg = 'because many badness so high'
    const cause = new MyCauseError({ msg: causeMsg })
    const e = new MyError({ msg, cause })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(MyError.CODE).to.equal(code)
    expect(MyCauseError.CODE).to.equal(causeCode)
    expect(e.name).to.equal(name)
    expect(e.code).to.equal(code)
    expect(e.message).to.equal(`${code}: ${msg}: ${causeCode}: ${causeMsg}`)
    log.error(e)
  })

  it('should work with no args', () => {
    const causeName = 'MyCauseError'
    const causeCode = 'E_MY_CAUSE'
    const name = 'MyError'
    const code = 'E_MY'

    const MyErrorCause = CodedError({ name: causeName })
    const MyError = CodedError({ name })

    const cause = new MyErrorCause()
    const e = new MyError({ cause })
    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(MyError)
    expect(e.name).to.equal(name)
    expect(e.code).to.equal(code)
    expect(e.message).to.equal(`${code}: ${causeCode}`)
    log.error(e)
  })

  it('should work with a supererror, a subclass & a subclass subclass', () => {
    const superCode = 'E_SUPER'
    const subCode = 'E_SUB'
    const sub2Code = 'E_SUB2'

    const Super = CodedError({ code: superCode })
    const Sub = Super.subclass({ code: subCode })
    const Sub2 = Sub.subclass({ code: sub2Code })

    const e = new Sub2()

    expect(e).to.be.instanceOf(Error)
    expect(e).to.be.instanceOf(Sub2)
    expect(e).to.be.instanceOf(Sub)
    expect(e).to.be.instanceOf(Super)
    expect(e.name).to.equal('Sub2Error')
    expect(e.code).to.equal(sub2Code)
    expect(e.message).to.equal(`${sub2Code}`)
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

  it('should return correctly from isInstance', () => {
    const uee = new UnknownEnumError()
    const iae = new IllegalArgumentError()

    expect(UnknownEnumError.isInstance(uee)).to.be.true()
    expect(IllegalArgumentError.isInstance(uee)).to.be.true()
    expect(IllegalArgumentError.isInstance(iae)).to.be.true()
    expect(UnknownEnumError.isInstance(iae)).to.be.false()
    expect(UnknownEnumError.isInstance(new Error())).to.be.false()
    expect(UnknownEnumError.isInstance({})).to.be.false()
    expect(UnknownEnumError.isInstance(42)).to.be.false()
  })
})
