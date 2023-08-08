'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User : Comment (1:N)
      this.hasOne(models.user, {
        sourceKey: 'commentId',
        foreignKey: 'CommentId',
      });
      // Card : Comment (1:N)
      this.hasOne(models.card, {
        sourceKey: 'commentId',
        foreignKey: 'CommentId',
      });
    }
  }
  Comment.init(
    {
      cardId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      text: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    },
  );
  return Comment;
};
