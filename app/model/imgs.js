// 图片模型
module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize
  const Imgs = app.model.define('imgs', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    url: STRING(500),
    houseId: INTEGER,
    createTime: DATE,
  })
  return Imgs
}
