'use strict'

/**
 * Formats an error message.
 *
 * @param {string} code The error code.
 * @param {string} [msg] The error message.
 * @param {Error} [cause] The error's cause.
 * @return {string} The formatted error message.
 */
function message (code, msg, cause) {
  let m = code
  if (msg) m += `: ${msg}`
  if (cause?.message) m += `: ${cause?.message}`

  return m
}

/**
 * A base error class.
 */
class CodedError extends Error {
  /**
   * Constructs a new instance of this class.
   *
   * @param {Error} [cause] An optional cause of this error.
   * @param {string} [msg] An optional message.
   * @param {*} [info] An optional value of any kind.
   * @param {string} [_n]  A name for instances of this class.
   * @param {string} [_c] A code for instances of this class.
   */
  constructor ({ cause, msg, info, _n, _c } = {}) {
    super(message(_c, msg, cause))

    this.name = _n
    this.code = _c
    this.cause = cause
    this.info = info
  }
}

/**
 * Defines a new error class.
 *
 * @param {string} [name]  A name for instances of this class
 * @param {string} [code] A code for instances of this class
 * @param {*} [supererror] An optional superclass previously returned by this function.
 */
const defineErrorClass = ({ code, name, supererror }) => {
  if (!code) throw new Error('code is required')

  const C = class extends (supererror || CodedError) {
    /**
     * Constructs a new instance of this class.
     *
     * @param {Error} [cause] An optional cause of this error.
     * @param {string} [msg] An optional message.
     * @param {*} [info] An optional value of any kind.
     * @param {string} [_n] An optional name for instances of this class; defaults to {@param _c}.
     * @param {string} [_c] An optional code for instances of this class; defaults to the code value when the class was defined.
     */
    constructor ({ cause, msg, info, _n, _c } = {}) {
      if (typeof arguments[0] === 'string') {
        msg = arguments[0]
      }
      _c = _c || code
      _n = _n || name || _c
      super({ cause, msg, info, _c, _n })
      this.message = message(_c, msg, cause)
    }
  }

  /**
   * The symbolic error code of the class.
   *
   * @type {string}
   */
  C.CODE = code

  C.subclass = ({ code, name }) => defineErrorClass({ code, name, supererror: C })

  return C
}

module.exports = defineErrorClass
