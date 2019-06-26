# `nodejs-support`
This package contains various building blocks for use in Node.js-based applications.

## `services`
This folder contains various classes to help you write well-behaved services.

### `ServiceSupport`
This is a helper class that provides static methods to wrap functions in a try/catch in order to
* ensure service methods always return success/failure information with payloads, and
* prevent service methods from throwing.

### `@returnsServiceResponse`
This is a decorator-based aspect, based on [`@scispike/aspectify`](https://www.npmjs.com/package/@scispike/aspectify) & `ServiceSupport`, that allows you to simply _decorate_ a service method in order to ensure that it behaves as described above.
Simply ensure that you are returning plain, ol' values (including objects, if desired), from your service methods.

This aspect will wrap the service method's return value (`returnValue` below) into an object of the form
```javascript
{
  data: returnValue,
  meta: {
    status: 'SUCCESS',
    elapsedMillis: ...
  }
}
```
If your method `throw`s an `Error`, the aspect catches it and returns a response of the form
```javascript
{
  error: {
    name: ...,
    message: ...,
    code: ..., // if your error has a code property
    info: ..., // if your error has an info property
    cause: ..., // recursive cause(s) error here if your error has a `cause` property
    stack: ..., // if you used @returnsServiceResponse({ includeStacktrace: true})
  },
  meta: {
    status: 'FAILURE',
    elapsedMillis: ...
  }
}
```

## `entities`

Usage example:
```javascript
const DayOfWeek = require('@scispike/nodejs-support').entities.DayOfWeek
// ...use DayOfWeek.SUNDAY, etc
```

This folder contains
* convenient enumerations using a pattern that builds on [`enumify`](https://www.npmjs.com/package/enumify),
* fundamental traits based on [`mutrait`](https://www.npmjs.com/package/mutrait) meant to be used by other `class`es,
* fundamental `class`es that may be convenient in other parts of the stack.

See the source for more information.

## `errors`

Usage example:
```javascript
const IllegalArgumentError = require('@scispike/nodejs-support').errors.IllegalArgumentError
throw new IllegalArgumentError('foobar')
```

This folder contains a base error class, `CodedError`, upon which are built many other convenient error classes.
Here is an example of defining your own error classes using `CodedError`:

```javascript
const CodedError = require('@scispike/nodejs-support').errors.CodedError

module.exports = CodedError({ code: 'E_SOMETHING_WICKED_THIS_WAY_COMES' })
```

The `logger` function accepts two parameters:
* `name`: required, the name of your application or module
* `opts`: optional, default `{}`, any [`bunyan`](https://www.npmjs.com/package/bunyan) options you want to set

See the source for more information.

## `logger`

Usage example:
```javascript
// in your own file "index.js" in a directory called "log", "logger" or whatever
const appLogger = require('@scispike/nodejs-support').logger('foobar')
module.exports = appLogger // has methods info, warn, etc
```

This folder exports a function that allows you to easily use [`bunyan`](https://www.npmjs.com/package/bunyan) & [`bunyaner`](https://www.npmjs.com/package/bunyaner) in your own projects.

See the source for more information.

## `require`
Usage example:
```javascript
// in your own index.js file in some directory with lots of things you want to export
const req = require('@scispike/nodejs-support').require
module.exports = req.jsFilesExceptIndexIn(__dirname)
```

This folder exports an object that makes it easy to export an entire directory of artifacts.
Each file or directory in the given directory _as an absolute path_ is added as a key on the returned object.

The methods it offers are the following:
* `dirsIn(dir)`: given an absolute path of directory `dir`, returns an object where each key is the result of `require`ing each child directory of `dir`
* `jsFilesIn(dir)`: given an absolute path of directory `dir`, returns an object where each key is the result of `require`ing each file in `dir` that has a `.js` extension; each key name is the filename without the `.js` extension.
* `jsFilesExceptIndexIn(dir)`: same as `jsFilesIn(dir)`, except that it skips the file `index.js`
* `jsonFilesIn(dir)`: given an absolute path of directory `dir`, returns an object where each key is the result of `require`ing each file in `dir` that has a `.json` extension; each key name is the filename without the `.json` extension.

This module actually eats its own dog food, using this object to export directories and files contained under `src/main`.
See `src/main/index.js` or `src/main/entities/index.js` for examples

## `contexts`

Contexts allow you to place information in a continuation-local storage space (like Java's thread-local storage).

There two flavors to choose from: one based on [`cls-hooked`](https://www.npmjs.com/package/cls-hooked), and one based on [`zone.js`](https://www.npmjs.com/package/zone.js).
Use whichever one you want to; the `Context` API is the same:
* Run code in a context: `Context().run(() => { /* your code here */ }, { your: 'context', values: 'here')`
* Set a value in a context: `Context().set('name', 'value')`
* Get a value from a context: `Context().get('name')`

>NOTE:
If you are using `ZoneJsContext`, you must install `zone.js` and then `require('zone.js/dist/zone-node')` at the right time for your application.
If you are using `ClsHookedContext`, you must install `cls-hooked` yourself.
See this project's `package.json` `devDependencies` section for the versions of `cls-hooked` and `zone.js` was built against and try to install compatible ones.

Usage example:
```javascript
const Context = require('@scispike/nodejs-support').context.ClsHookedContext // or ZoneJsContext

Context().run(() => { // uses the default context; pass a string name for a custom context
  // Do whatever you want here.
  // Context values are accessible anywhere in the sync or async call stack:
  const foo = Context().get('foo') // returns 'bar'
  
  // You can set & get values with:
  Context().set('baz', 'snafu')
  const baz = Context().get('baz') // returns 'snafu'
}, {
  foo: 'bar' // puts the value 'bar' into the context at key 'foo'
})
```

## `Enumeration`

TODO

* TL;DR:  `const BooleanValue = Enumeration.new( { name: 'BooleanValue', values: ['TRUE', 'FALSE'] } )`
* Codification of pattern in `Enumeration.new()`
* static `$ERROR$` property
* `isEnumerationInstance`, `isEnumerationClass`, `isInstance` & `isClass`
* Document breaking changes: `$ERROR$` replaces `error()`
