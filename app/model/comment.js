// 评论模型
module.exports = (app) => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize
  const Comment = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: INTEGER,
    houseId: INTEGER,
    msg: STRING(500),
    createTime: DATE,
  })

  // 关联用户
  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    })
  }
  return Comment
}
