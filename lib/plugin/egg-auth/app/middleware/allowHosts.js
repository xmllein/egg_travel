// 防止csrf攻击
module.exports = (options) => {
  return async (ctx, next) => {
    const { referer } = ctx.request.header
    console.log(referer)
    if (referer) {
      const url = new URL(referer)
      const host = url.host
      console.log(host)
      console.log(options)
      if (!options.includes(host)) {
        ctx.body = {
          status: 403,
          errMsg: `host ${host} 非法请求`,
        }
      } else {
        await next()
      }
    } else {
      await next()
    }
  }
}
