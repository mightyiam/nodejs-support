/* global describe, it */

'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const returnsServiceResponse = require('../../../main/services/returnsServiceResponse')
const ResponseStatus = require('../../../main/enums/ResponseStatus')
const CodedError = require('../../../main/errors/CodedError')
const OopsyError = CodedError({ name: 'Oopsy' })

class AdditionService {
  @returnsServiceResponse({ includeStacktrace: true })
  async add ({ a, b }) {
    return this._add({ a, b })
  }

  @returnsServiceResponse()
  async addNoStacktrace () {
    return this._add(arguments[0])
  }

  async _add ({ a, b }) {
    if (typeof a !== 'number') throw new OopsyError({ msg: 'first argument not of type number', info: a })
    if (typeof b !== 'number') throw new OopsyError({ msg: 'first argument not of type number', info: b })

    return { a, b, sum: a + b }
  }
}

const adder = new AdditionService()

describe('unit tests of @returnsServiceResponse', () => {
  it('should return successful response', async function () {
    const dto = { a: 1, b: 2 }

    const expected = {
      data: { sum: dto.a + dto.b, ...dto },
      meta: {
        status: ResponseStatus.SUCCESS.name
      }
    }

    const actual = await adder.add(dto)

    expect(actual?.meta?.elapsedMillis).to.be.at.least(0)
    delete actual.meta.elapsedMillis

    expect(actual).to.deep.equal(expected)
  })

  it('should return error response', async function () {
    const dto = { a: 1, b: 'foo' }

    const expected = {
      error: {
        name: 'Oopsy',
        message: 'E_OOPSY: first argument not of type number',
        code: 'E_OOPSY',
        info: dto.b
      },
      meta: {
        status: ResponseStatus.ERROR.name
      }
    }

    let actual = await adder.add(dto)

    expect(actual?.meta?.elapsedMillis).to.be.at.least(0)
    delete actual.meta.elapsedMillis

    expect(typeof actual?.error?.stack).to.equal('string')
    delete actual.error.stack

    expect(actual).to.deep.equal(expected)

    actual = await adder.addNoStacktrace(dto)

    expect(actual?.meta?.elapsedMillis).to.be.at.least(0)
    delete actual.meta.elapsedMillis

    expect(actual?.error?.stack).not.to.be.ok()

    expect(actual).to.deep.equal(expected)
  })
})
