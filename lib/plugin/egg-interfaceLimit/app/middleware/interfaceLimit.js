// 对接口进行限流，防止恶意请求
// 3秒内最多请求3次
// 设置计数器 每次请求+1，保存起始时间
// 超过3秒，计数器大于3， 则提示请求频繁；计数器清零，起始时间修改为当前时间
// 超过3秒，计数器小于3， 则计数器清零，起始时间修改为当前时间
module.exports = (options) => {
  // 计数器
  let count = 0
  // 起始时间
  let firstTime = new Date().getTime()
  return async (ctx, next) => {
    // 是否大于3秒
    if (new Date().getTime() - firstTime > options.time) {
      if (count >= options.maxCount) {
        count = 0
        firstTime = new Date().getTime()
        ctx.body = {
          status: 500,
          errMsg: '请求频繁',
        }
        return
      } else {
        // 小于3秒
        count = 0
        firstTime = new Date().getTime()
        await next()
      }
    } else {
      // 不超过3秒
      count++
      await next()
    }
  }
}
