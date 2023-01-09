// 上下文扩展
module.exports = {
  // 参数
  params(key) {
    const method = this.request.method
    if (method === 'GET') {
      return key ? this.query[key] : this.query
    } else {
      return key ? this.request.body[key] : this.request.body
    }
  },
  // 获取用户名
  get username() {
    const token = this.request.header.token
    const tokenCache = token
      ? this.app.jwt.verify(token, this.app.config.jwt.secret)
      : undefined
    // console.log('tokenCache', tokenCache)
    return tokenCache ? tokenCache.username : undefined
  },
  // 获取用户id
  get userId() {
    const token = this.request.header.token
    const tokenCache = token
      ? this.app.jwt.verify(token, this.app.config.jwt.secret)
      : undefined
    return tokenCache ? tokenCache.id : undefined
  },
}
