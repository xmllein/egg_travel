const dayjs = require('dayjs')

module.exports = {
  // 格式化时间
  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
  },
  // 时间戳
  timestamp(data) {
    return new Date(data).getTime()
  },
  // base64转码
  base64Encode(str = '') {
    return Buffer.from(str).toString('base64')
  },
  /**
   * 从一个对象中排除某些属性
   * @param {*} souce
   * @param {*} arr
   * @returns
   */
  unPick(souce, arr) {
    if (Array.isArray(arr)) {
      let obj = {}
      for (let key in souce) {
        if (!arr.includes(key)) {
          obj[key] = souce[key]
        }
      }
      return obj
    }
  },
}
