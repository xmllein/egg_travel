/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1672993202734_421'

  // add your middleware config here
  // 应用到全局中间件
  config.middleware = ['httpLog']
  // 日志中间件
  config.httpLog = {
    type: 'all',
  }

  // 安全配置
  config.security = {
    csrf: {
      enable: false,
    },
  }

  // allowHosts配置
  config.allowHosts = ['localhost:8000', '127.0.01:8000']
  // interfaceLimit配置
  config.interfaceLimit = {
    maxCount: 3, // 最大请求次数
    time: 3 * 1000, // 间隔时间 3s
  }
  // interfaceCache配置
  config.interfaceCache = {
    expire: 10, // 缓存时间 10s
    include: ['/api/user/detail'], // 需要缓存的接口
  }

  // 配置mysql
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    timezone: '+08:00',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'egg_house',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }

  // 配置jwt
  config.jwt = {
    secret: 'muke',
  }

  // 设置session
  config.session = {
    key: 'MUKE_SESS',
    httpOnly: true,
    // 过期时间50s
    maxAge: 1000 * 50,
    renew: true,
  }

  // 配置redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  }
  config.auth = {
    exclude: ['/api/user/login', '/api/user/register'],
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // 盐
    salt: 'muke',
    // redis过期时间 24小时
    redisExpire: 24 * 60 * 60,
  }

  return {
    ...config,
    ...userConfig,
  }
}
