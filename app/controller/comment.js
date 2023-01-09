const Controller = require('egg').Controller

const BaseController = require('./base')

class CommentController extends BaseController {
  // 添加评论
  async add() {
    const { ctx, app } = this
    const params = ctx.params()
    // 获取用户信息
    const user = await ctx.service.user.getUser(ctx.username)
    const result = await ctx.service.comment.add({
      ...params,
      userId: user.id,
      msg: ctx.params('comment'),
      createTime: ctx.helper.time(),
    })
    this.success(result)
  }

  // 获取评论列表
  async lists() {
    const { ctx, app } = this
    // 获取用户信息
    const user = await ctx.service.user.getUser(ctx.username)
    const result = await ctx.service.comment.lists({
      ...ctx.params(),
      userId: user.id,
    })
    this.success(result)
  }
}

module.exports = CommentController
