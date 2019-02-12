'use strict'

module.exports = require('../enumGenerator')({
  name: require('path').basename(__filename).replace(/\..*$/, ''),
  values: [
    'ERROR',
    'SUCCESS'
  ]
})
