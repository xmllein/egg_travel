// 订单模型
module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize
  const Orders = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    orderNumber: STRING(20),
    userId: INTEGER,
    houseId: INTEGER,
    isPayed: INTEGER,
    createTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('createTime')).getTime()
      },
    },
    updateTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('updateTime')).getTime()
      },
    },
  })
  // 关联图片
  Orders.associate = () => {
    app.model.Orders.belongsTo(app.model.House, {
      foreignKey: 'houseId',
      as: 'house',
    })
  }
  return Orders
}
