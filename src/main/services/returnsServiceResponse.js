'use strict'

const { AsyncAround } = require('@scispike/aspectify')
const ServiceSupport = require('../services/ServiceSupport')

const aspect = ({ includeStacktrace = false } = {}) => AsyncAround(async ({ thisJoinPoint }) => {
  return ServiceSupport.respondWithDtoFrom(thisJoinPoint.proceed, includeStacktrace)
})

module.exports = aspect
