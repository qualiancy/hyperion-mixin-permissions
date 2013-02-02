/*!
 * Hyperion Mixin (Permissions) - Invoke
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Primary Exports (closure)
 */

module.exports = function (opts) {
  var permissions = opts.permissions
    , unauthorized = opts.unauthorized;

  /**
   * Register one or many permissions to be invoked
   * upon this entry in the request stack. More than
   * one permission can be defined for this callback.
   *
   * When multiple permissions are listed in a single
   * statement they will be evaluated serially as an
   * "OR" statement. Practically, when one of the
   * permissions pass for a given request, the remainder
   * are ignored and the authorization set exits to the
   * application handler.
   *
   * If all permissions fail validation, the `unauthorized`
   * callback for this mixin instance will be invoked.
   *
   * @param {String} permission name (repeatable)
   * @return {Function} stackable
   */

  return function registryPermission () {
    var test = [].slice.call(arguments);

    // ensure permission is defined
    test.forEach(function (name) {
      if (!permissions[name]) {
        throw new Error('Permission not defined: ' + name);
      }
    });

    // return stackable function
    return function invokePermissions (req, res, next) {
      function iterate (i) {
        var name = test[i]
        if (!name) return unauthorized(req, res, next, test.slice(0));
        permissions[name](req, res, function allowed (err, authorized) {
          if (err) return next(err);
          if (true === authorized) return next();
          iterate(++i);
        });
      }

      iterate(0);
    }
  }
};
