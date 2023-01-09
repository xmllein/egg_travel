const Service = require('egg').Service
const BaseService = require('./base')
class OrdersService extends BaseService {
  // 是否存在订单
  async hasOrder(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.findOne({
        where: {
          userId: params.userId,
          houseId: params.id,
        },
      })
      return result
    })
  }
  // 添加订单
  async addOrder(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.create(params)
      return result
    })
  }

  // 删除订单
  async delOrder(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.destroy({
        where: {
          id,
        },
      })
      return result
    })
  }

  // 获取订单列表
  async lists(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.findAll({
        where: {
          userId: params.userId,
          isPayed: params.isPayed,
        },
        limit: params.pageSize,
        // 分页
        offset: (params.pageNum - 1) * params.pageSize,
        // 关联查询
        include: [
          {
            model: app.model.House,
            as: 'house',
            // 图片
            include: [
              {
                model: app.model.Imgs,
                attributes: ['url'],
                limit: 1,
              },
            ],
          },
        ],
      })
      return result
    })
  }

  // 支付
  async pay(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.update(
        {
          isPayed: 1,
          orderNumber: params.orderNumber,
        },
        {
          where: {
            id: params.id,
          },
        }
      )
      return result
    })
  }
}

module.exports = OrdersService
