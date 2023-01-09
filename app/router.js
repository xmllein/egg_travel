'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  // 用户是否存在中间件
  const userExist = app.middleware.userExist()
  // 用户注册
  router.post('/api/user/register', controller.user.register)
  // 用户登录
  router.post('/api/user/login', controller.user.login)
  // 获取用户信息
  router.post('/api/user/detail', userExist, controller.user.detail)
  // 修改用户信息
  router.post('/api/user/edit', controller.user.edit)
  // 用户退出
  router.post('/api/user/logout', controller.user.logout)
  // 获取城市列表
  router.post('/api/commons/citys', controller.commons.citys)
  // 获取热门房源
  router.post('/api/house/hot', controller.house.hot)
  // 搜索房源
  router.post('/api/house/search', controller.house.search)
  // 获取房源详情
  router.post('/api/house/detail', controller.house.detail)
  // 添加评论
  router.post('/api/comment/add', controller.comment.add)
  // 评论列表
  router.post('/api/comment/lists', controller.comment.lists)
  // 是否存在订单
  router.post('/api/orders/hasOrder', userExist, controller.orders.hasOrder)
  // 添加订单
  router.post('/api/orders/addOrder', userExist, controller.orders.addOrder)
  // 删除订单
  router.post('/api/orders/delOrder', userExist, controller.orders.delOrder)
  // 获取订单列表
  router.post('/api/orders/lists', userExist, controller.orders.lists)
  // 支付订单
  router.post('/api/orders/pay', userExist, controller.orders.pay)
}
