const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const authentication = require('feathers-authentication');
const permissions = require('feathers-permissions');

exports.before = {
  all: [],
  find: [
    authentication.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
  get: [
    authentication.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted()
  ],
  create: [
    authentication.hooks.authenticate(['jwt'])
  ],
  update: [
    authentication.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
  patch: [
    authentication.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
}

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
