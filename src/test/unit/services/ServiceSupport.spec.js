/* global describe, it */

'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const ServiceSupport = require('../../../main/services/ServiceSupport')
const ResponseStatus = require('../../../main/enums/ResponseStatus')
const CodedError = require('../../../main/errors/CodedError')
const UnsupportedActionError = CodedError({ name: 'UnsupportedActionError' })

describe('unit tests of ServiceSupport', () => {
  it('should create service response from dto', async function () {
    const dto = { my: 'dto' }

    const expected = {
      data: dto,
      meta: {
        status: ResponseStatus.SUCCESS.name
      }
    }

    const actual = await ServiceSupport.respondWithDtoFrom(() => dto)

    expect(actual?.meta?.elapsedMillis).to.be.at.least(0)
    delete actual.meta.elapsedMillis

    expect(actual).to.deep.equal(expected)
  })

  it('should create service response from error', async function () {
    const causeMsg = 'because'
    const msg = 'message'
    const code = UnsupportedActionError.CODE
    const info = { foo: 'bar' }

    const expected = {
      error: {
        cause: {
          message: causeMsg,
          name: 'Error'
        },
        code,
        message: `${code}: ${msg}: ${causeMsg}`,
        name: 'UnsupportedActionError',
        info
      },
      meta: {
        status: ResponseStatus.ERROR.name
      }
    }

    const actual = await ServiceSupport.respondWithDtoFrom(
      () => throw new UnsupportedActionError({ msg, cause: new Error(causeMsg), info }))

    expect(actual?.meta?.elapsedMillis).to.be.at.least(0)
    delete actual.meta.elapsedMillis

    expect(actual).to.deep.equal(expected)
  })
})
