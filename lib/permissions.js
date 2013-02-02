/*!
 * Hyperion Mixin (Permissions)
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * External dependencies
 */

var extend = require('tea-extend')
  , type = require('tea-type');

/*!
 * Internal dependencies
 */

var define = require('./permissions/define')
  , invoke = require('./permissions/invoke')
  , unauthorized = require('./permissions/unauthorized');

/**
 * Provide convience method to automatically
 * import permissions. Alternatively, a simple
 * function can be provided that will be called
 * upon detection of an unauthorized request.
 *
 * Options:
 * - `unauthorized` {Function}
 * - `permissions` {Object} key:cb pairs of permissions
 *
 * @param {Function|Object} unauthorized function or options object
 * @return {Function} for use with `.mixin(fn)`.
 */

module.exports = function (_opts) {
  _opts = _opts || {};
  var opts = {};

  if ('function' === type(_opts)) {
    opts.unauthorized = _opts;
    opts.permissions = {};
  } else if ('object' === type(_opts)) {
    opts.unauthorized = _opts.unauthorized || unauthorized;
    opts.permissions = extend({}, _opts.permissions || {});
  }

  return function (app, mixin) {
    mixin('definePermission', define(opts));
    mixin('permission', invoke(opts));
  };
};
