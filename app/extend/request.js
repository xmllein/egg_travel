// request 扩展
module.exports = {
  // 获取token
  get token() {
    console.log('header', this.header)
    return this.get('token')
  },
}
