/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

global.chai.use(require('chai-spies'));
global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.hyperion = require('hyperion');
global.permissions = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.permissions_COV
    ? require('../../lib-cov/permissions/' + name)
    : require('../../lib/permissions/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__permissions = {};
