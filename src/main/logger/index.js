'use strict'

const _ = {
  merge: require('lodash.merge')
}

const bunyan = require('bunyan')
const bunyaner = require('bunyaner')

const log = (name, bunyanOpts = {}, bunyanerOpts = {}) => bunyaner(bunyan.createLogger(
  _.merge({
    name,
    serializers: ('serializers' in bunyanerOpts) ? bunyanOpts.serializers : bunyan.stdSerializers
  }, bunyanOpts)), {
  forceWrap: ('forceWrap' in bunyanerOpts) ? bunyanerOpts.forceWrap : true,
  wrapperKey: ('wrapperKey' in bunyanerOpts) ? bunyanerOpts.wrapperKey : undefined
})

module.exports = log
