// 用户是否存在
module.exports = (options, app) => {
  return async (ctx, next) => {
    const user = await ctx.service.user.getUser(ctx.username)
    if (user) {
      await next()
    } else {
      ctx.body = {
        status: 1002,
        errMsg: '用户不存在',
      }
    }
  }
}
