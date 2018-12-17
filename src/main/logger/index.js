'use strict'

const _ = require('lodash')
const bunyan = require('bunyan')
const bunyaner = require('bunyaner')

const log = (name, opts = {}) => bunyaner(bunyan.createLogger(
  _.merge({
    name,
    serializers: bunyan.stdSerializers
  }, opts)))

module.exports = log
