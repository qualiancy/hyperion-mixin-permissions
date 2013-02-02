/*!
 * Hyperion Mixin (Permissions) - Define
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Primary Exports (closure)
 */

module.exports = function (opts) {
  var permissions = opts.permissions;

  /**
   * Define one or more permissions that can be
   * included in a permission set for a request.
   *
   * @param {String|Object} string name or object of name:cb pairs
   * @param {Function} permission handle
   * @api public
   */

  return function define (key, handle) {
    if ('object' === typeof key) {
      for (var name in key) define(name, key[name]);
      return this;
    }

    if ('function' !== typeof handle) {
      throw new Error('Permission "' + key + '" requires a function.');
    }

    permissions[key] = handle;
    return this;
  };
};
