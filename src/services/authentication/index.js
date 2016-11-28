'use strict';

const authentication = require('feathers-authentication');
const oauth2 = require('feathers-authentication-oauth2');

const GithubStrategy = require('passport-github').Strategy;

module.exports = function() {
  const app = this;

  let config = app.get('auth');
  
  app.set('auth', config);
  app.configure(authentication(config))
    .configure(oauth2({
      name: 'github',
      Strategy: GithubStrategy
    }));
};
