'use strict'

const ResponseStatus = require('../enums/ResponseStatus')

class ServiceSupport {
  static async respondWithDtoFrom (fn, includeStackTrace = false) {
    const begin = Date.now()

    let response

    try {
      response = {
        data: await fn(), // fn() expected to return a DTO
        meta: {
          status: ResponseStatus.SUCCESS.name
        }
      }
    } catch (e) {
      response = {
        error: ServiceSupport.formatError(e, includeStackTrace),
        meta: {
          status: ResponseStatus.ERROR.name
        }
      }
    } finally {
      response.meta.elapsedMillis = Date.now() - begin
    }

    return response
  }

  static formatError (e, includeStacktrace) {
    if (!e) return e

    const err = { name: e.name, message: e.message }

    if (e.code !== undefined) err.code = e.code
    if (e.info !== undefined) err.info = e.info
    if (e.cause !== undefined) err.cause = ServiceSupport.formatError(e.cause)

    if (includeStacktrace) err.stack = e.stack
    return err
  }
}

module.exports = ServiceSupport
