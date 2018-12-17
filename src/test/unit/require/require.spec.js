/* global describe, it */
'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const req = require('../../../main/require')

describe('req', () => {
  it('should require all .js files', () => {
    const result = req.jsFilesIn(`${__dirname}/dirWithJsFiles`)
    expect(result.file0).to.equal(0)
    expect(result.file1).to.equal(1)
    expect(result.index.zero).to.equal(0)
    expect(result.index.one).to.equal(1)
  })

  it('should require all .js files except index.js', () => {
    const result = req.jsFilesExceptIndexIn(`${__dirname}/dirWithJsFiles`)
    expect(result.file0).to.equal(0)
    expect(result.file1).to.equal(1)
    expect(result.index).to.equal(undefined)
  })

  it('should require all dirs', () => {
    const result = req.dirsIn(`${__dirname}/dirWithDirs`)
    expect(result.dir0).to.equal(0)
    expect(result.dir1).to.equal(1)
  })

  it('should require all .json files', () => {
    const result = req.jsonFilesIn(`${__dirname}/dirWithJsonFiles`)
    expect(result.file0).to.equal(0)
    expect(result.file1).to.equal(1)
  })
})
