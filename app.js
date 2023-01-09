module.exports = (app) => {
  const store = {}

  app.sesstionStore = {
    async get(key) {
      console.log('--store--', store)
      return store[key]
    },
    async set(key, value, maxAge) {
      store[key] = value
    },

    async destory(key) {
      store[key] = null
    },
  }

  // 启用自定义插件

  // app.config.coreMiddleware.push('allowHosts')
  // app.config.coreMiddleware.push('notFound')
  // app.config.coreMiddleware.push('auth')
  const mids = app.config.coreMiddleware
  app.config.coreMiddleware = [
    ...mids,
    ...['interfaceLimit', 'allowHosts', 'notFound', 'auth', 'interfaceCache'],
  ]
  console.log(app.config.coreMiddleware)
}
