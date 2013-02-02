/*!
 * Hyperion Mixin (Permissions) - Default `unauthorized` handle
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/**
 * Default `unauthorized` handle will create
 * a 401 error from the applications error registry
 * and pass it on to be evaluated by the clients
 * highest-priority `accepts` format.
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 * @param {Array} permissions that failed
 */

module.exports = function (req, res, next, permissions) {
  var err = res.createError(401);
  err.permissions = permissions;
  next(err);
};
