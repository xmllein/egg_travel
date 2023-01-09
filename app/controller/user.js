const Controller = require('egg').Controller
const md5 = require('md5')
const dayjs = require('dayjs')
// 公共controller
const BaseController = require('./base')

class UserController extends BaseController {
  // 生成token
  async createToken({ id, username }) {
    const { ctx, app } = this
    // 生成token
    const token = app.jwt.sign(
      {
        id,
        username,
      },
      app.config.jwt.secret
    )
    // redis保存
    await app.redis.set(username, token, 'EX', app.config.redisExpire)
    // 返回token
    return token
  }

  // 返回结果
  parseResult(ctx, user) {
    return {
      ...ctx.helper.unPick(user.dataValues, ['password']),
      createTime: ctx.helper.timestamp(user.createTime),
    }
  }

  // 用户注册
  async register() {
    const { ctx, app } = this
    const { username, password } = ctx.params()
    // 判断用户是否存在
    const user = await ctx.service.user.getUser(username)
    if (user) {
      this.error('用户已存在')
    } else {
      // 添加用户
      const newUser = await ctx.service.user.addUser({
        username,
        password: md5(password + app.config.salt),
        createTime: ctx.helper.time(),
      })
      if (newUser) {
        // 生成token
        const token = await this.createToken({
          id: newUser.id,
          username: newUser.username,
        })
        // 返回结果
        this.success({
          ...this.parseResult(ctx, newUser),
          token,
        })
      } else {
        this.error('注册失败')
      }
    }
  }

  // 用户登录
  async login() {
    const { ctx, app } = this

    const { username, password } = ctx.params()

    // 判断用户是否存在
    const user = await ctx.service.user.getUser(username, password)

    if (user) {
      // 生成token
      const token = await this.createToken({
        id: user.id,
        username: user.username,
      })
      // 返回结果
      this.success({
        ...this.parseResult(ctx, user),
        token,
      })
    } else {
      this.error('用户名或密码错误')
    }
  }

  // 获取用户信息
  async detail() {
    const { ctx, app } = this
    // token获取
    const username = ctx.username
    // 判断用户是否存在
    const user = await ctx.service.user.getUser(username)
    if (user) {
      this.success({
        ...this.parseResult(ctx, user),
      })
    } else {
      this.error('用户不存在')
    }
  }

  // 用户编辑
  async edit() {
    const { ctx, app } = this
    const result = ctx.service.user.edit({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
    })

    if (result) {
      this.success(result)
    } else {
      this.error('编辑失败')
    }
  }

  // 用户退出
  async logout() {
    const { ctx, app } = this
    try {
      // 清除session
      ctx.session[ctx.username] = null
      // 清除redis
      await app.redis.del(ctx.username)
      this.success('退出成功')
    } catch (error) {
      this.error('退出失败')
    }
  }
}

module.exports = UserController
