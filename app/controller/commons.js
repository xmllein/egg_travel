const Controller = require('egg').Controller
const BaseController = require('./base')

class CommonsController extends BaseController {
  // 城市列表
  async citys() {
    this.success([
      [
        { label: '杭州', value: '10001' },
        { label: '苏州', value: '10002' },
        { label: '上海', value: '10003' },
        { label: '绍兴', value: '10004' },
        { label: '大同', value: '10005' },
        { label: '嘉兴', value: '10006' },
        { label: '芜湖', value: '10007' },
        { label: '上尧', value: '10008' },
      ],
    ])
    // 调佣远程服务
    // try {
    //   const { ctx, app } = this
    //   const result = await app.httpclient.request(
    //     'https://apis.imooc.com/?icode=89773B5DA84CA283',
    //     { dataType: 'json' }
    //   )
    //   console.log('result', result)
    //   if ((result.status = 200)) {
    //     this.success(result.data.citys)
    //   } else {
    //     this.error('获取城市列表失败')
    //   }
    // } catch (error) {
    //   this.error('获取城市列表失败')
    // }
  }
}

module.exports = CommonsController
