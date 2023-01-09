const Service = require('egg').Service

const BaseService = require('./base')

class CommentService extends BaseService {
  // 添加评论
  async add(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Comment.create(params)
      return result
    })
  }

  // 获取评论列表
  async lists(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Comment.findAll({
        where: {
          houseId: params.houseId,
          userId: params.userId,
        },
        limit: params.pageSize,
        // 分页
        offset: (params.pageNum - 1) * params.pageSize,
        // 排序
        order: [['createTime', 'DESC']],
        // 关联查询
        include: [
          {
            model: app.model.User,
            // 返回字段
            attributes: ['username', 'avatar'],
          },
        ],
      })
      return result
    })
  }
}

module.exports = CommentService
