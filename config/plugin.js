'use strict'
const path = require('path')
// mysql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}
// sequelize
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
}

// jwt
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
}

// auth
exports.auth = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-auth'),
}

// redis
exports.redis = {
  enable: true,
  package: 'egg-redis',
}

// notFound
exports.notFound = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-notFound'),
}

// allowHosts
exports.allowHosts = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-allowHosts'),
}

// interfaceLimit
exports.interfaceLimit = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-interfaceLimit'),
}

// interfaceCache
exports.interfaceCache = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-interfaceCache'),
}
