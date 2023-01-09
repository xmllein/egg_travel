const Controller = require('egg').Controller
// 公共controller
class BaseController extends Controller {
  // 成功返回
  success(data = {}) {
    this.ctx.body = {
      status: 200,
      data,
    }
  }

  // 失败返回
  error(errMsg = '服务器错误', status = 500) {
    this.ctx.body = {
      status,
      errMsg,
    }
  }
}

module.exports = BaseController
