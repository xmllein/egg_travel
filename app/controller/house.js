const BaseController = require('./base')

const Controller = require('egg').Controller

class HouseController extends BaseController {
  // 热门房源
  async hot() {
    const { ctx, app } = this
    const result = await ctx.service.house.hot()
    this.success(result)
  }

  // 搜索房源
  async search() {
    const { ctx, app } = this
    const params = ctx.params()
    const result = await ctx.service.house.search(params)
    this.success(result)
  }

  // 房源详情
  async detail() {
    const { ctx, app } = this
    const result = await ctx.service.house.detail(ctx.params())
    this.success({
      info: result,
      banner: result.imgs,
    })
  }
}

module.exports = HouseController
