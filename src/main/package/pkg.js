'use strict'

const path = require('path')
const fs = require('fs')
const IllegalStateError = require('@scispike/nodejs-support/errors/IllegalStateError')

/**
 * Returns the require()'ing of the nearest package.json file up the directory tree, starting in the given directory.
 * Throws IllegalStateError if not found.
 *
 * @param dir The directory to start in, default process.cwd()
 * @return {any}
 */
module.exports = dir => {
  if (!(dir = dir?.toString())) dir = process.cwd()

  let i = 0
  let pkg
  do {
    pkg = path.resolve(path.join.apply(
      [dir].concat(Array(i++).fill('..')).push('package.json')))
  } while (pkg !== path.sep && !fs.existsSync(pkg))

  return pkg === path.sep
    ? throw new IllegalStateError({ msg: 'no package.json found' })
    : require(pkg)
}
