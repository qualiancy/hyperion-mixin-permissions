module.exports = process.env.permissions_COV
  ? require('./lib-cov/permissions')
  : require('./lib/permissions');
