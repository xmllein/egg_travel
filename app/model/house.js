// 房屋模型
module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize
  const House = app.model.define('house', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    info: STRING(150),
    price: INTEGER,
    publishTime: {
      type: DATE,
      get() {
        // 转换时间戳
        return new Date(this.getDataValue('publishTime')).getTime()
      },
    },
    cityCode: STRING(20),
    showCount: INTEGER,
    startTime: {
      type: DATE,
      get() {
        // 转换时间戳
        return new Date(this.getDataValue('startTime')).getTime()
      },
    },
    endTime: {
      type: DATE,
      get() {
        // 转换时间戳
        return new Date(this.getDataValue('endTime')).getTime()
      },
    },
  })

  // 关联图片
  House.associate = () => {
    app.model.House.hasMany(app.model.Imgs, { foreignKey: 'houseId' })
  }

  return House
}
