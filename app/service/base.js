const Service = require('egg').Service
// 公共service
class BaseService extends Service {
  run(callback) {
    const { app, ctx } = this
    try {
      return callback && callback(ctx, app)
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

module.exports = BaseService
