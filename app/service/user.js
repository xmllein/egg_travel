const Service = require('egg').Service
const md5 = require('md5')
// 公共service
const BaseService = require('./base')
class UserService extends BaseService {
  // 获取用户
  async getUser(username, password) {
    return this.run(async (ctx, app) => {
      const _where = password
        ? {
            username,
            password: md5(password + app.config.salt),
          }
        : {
            username,
          }

      const user = await app.model.User.findOne({
        where: _where,
      })

      return user
    })
  }

  // 添加用户
  async addUser(params) {
    return this.run(async (ctx, app) => {
      const user = await app.model.User.create(params)
      return user
    })
  }

  // 更新用户
  async edit(params) {
    return this.run(async (ctx, app) => {
      console.log(params)
      const user = await app.model.User.update(params, {
        where: {
          username: ctx.username,
        },
      })
      return user
    })
  }
}

module.exports = UserService
