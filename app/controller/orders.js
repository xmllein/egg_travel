const Controller = require('egg').Controller

const BaseController = require('./base')

class OrdersController extends BaseController {
  // 是否存在订单
  async hasOrder() {
    const { ctx, app } = this
    const result = await ctx.service.orders.hasOrder({
      ...ctx.params(),
      userId: ctx.userId,
    })
    this.success(result)
  }
  // 添加订单
  async addOrder() {
    const { ctx, app } = this
    const result = await ctx.service.orders.addOrder({
      userId: ctx.userId,
      houseId: ctx.params('id'),
      isPayed: 0,
      createTime: ctx.helper.time(),
    })
    this.success(result)
  }
  // 删除订单
  async delOrder(params) {
    const { ctx, app } = this
    // 获取房屋id
    const id = ctx.params('id')
    const result = await ctx.service.orders.delOrder(id)
    this.success(result)
  }

  // 获取订单列表
  async lists() {
    const { ctx, app } = this
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId,
    })
    this.success(result)
  }

  // 模拟支付
  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime(),
    }
  }

  // 支付订单
  async pay(params) {
    const { ctx, app } = this
    // 获取订单id
    const id = ctx.params('id')
    // 是否存在订单
    const order = await ctx.model.Orders.findByPk(id)
    if (!order) {
      this.error('订单不存在')
    } else {
      try {
        const beforePay = await this.invokePay({ id })
        // 支付订单
        const result = await ctx.service.orders.pay({
          orderNumber: beforePay.orderNumber,
          id,
        })
        this.success(result)
      } catch (error) {
        this.error('订单支付失败')
      }
    }
  }
}

module.exports = OrdersController
