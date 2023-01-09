module.exports = (options) => {
  return async (ctx, next) => {
    // console.log(ctx.app.router)
    // 验证请求路径 (是否存在)
    const flag = ctx.app.router.stack.filter((item) => {
      return item.regexp.test(ctx.request.url)
    })

    //  接口存在
    if (flag.length) {
      await next()
    } else {
      // 接口不存在
      ctx.body = {
        status: 404,
        errMsg: '接口 ' + ctx.request.url + ' 不存在',
      }
    }
  }
}
