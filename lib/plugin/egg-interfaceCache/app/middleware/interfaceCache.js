// 缓存接口
// 将一些常用访问接口缓存起来（放在redis中），减少数据库压力
// 查询redis 有缓存，返回接口
// 没有缓存，将接口结果保存到redis中
module.exports = (options) => {
  return async (ctx, next) => {
    const { url } = ctx.request
    // redis 中 查询 key
    const cache = await ctx.app.redis.get(url)
    if (options.include.includes(url)) {
      if (cache) {
        ctx.body = JSON.parse(cache)
      } else {
        console.log('没有缓存')
        await next()
        // 将接口结果保存到redis中 8s
        await ctx.app.redis.set(
          url,
          JSON.stringify(ctx.response.body),
          'EX',
          options.expire
        )
      }
    } else {
      await next()
    }
  }
}
