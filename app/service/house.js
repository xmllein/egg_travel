const Service = require('egg').Service

const BaseService = require('./base')

class HouseService extends BaseService {
  // 返回公共条件
  commonAttr(app) {
    return {
      // 排序
      order: [['showCount', 'DESC']],
      // 返回字段
      attributes: {
        // 排除字段
        exclude: ['startTime', 'endTime', 'publishTime'],
      },
      // 关联查询
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          // 返回字段
          attributes: ['url'],
        },
      ],
    }
  }

  // 热门房源
  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        // 查询条件
        limit: 4,
        ...this.commonAttr(app),
      })

      return result
    })
  }

  // 搜索房源
  async search(params) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op
      console.log('params', params)
      // 查询条件
      const where = {
        cityCode: params.code,
        startTime: {
          [lte]: params.startTime,
        },
        endTime: {
          [gte]: params.endTime,
        },
        // 模糊查询
        name: {
          [like]: `%${params.houseName}%`,
        },
      }
      // 如果用户不搜索（节约性能）
      if (!params.houseName) {
        delete where.name
      }
      const result = await ctx.model.House.findAll({
        // 查询条件
        limit: 8,
        ...this.commonAttr(app),
        // 分页
        offset: (params.pageNum - 1) * params.pageSize,
        // 搜索条件
        where,
      })

      return result
    })
  }

  // 房屋详情
  async detail(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        // 查询条件
        where: {
          id: params.id,
        },
        // 关联查询
        include: [
          {
            model: app.model.Imgs,
            // 返回字段
            attributes: ['url'],
          },
        ],
      })

      // 每次访问详情 showCount 都会 +1
      await ctx.model.House.update(
        {
          showCount: result.showCount + 1,
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

module.exports = HouseService
