'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // board : Comment (1:N)
      this.hasOne(models.board, {
        sourceKey: 'listId',
        foreignKey: 'ListId',
      });

      // List : Card (1:N)
      this.hasOne(models.card, {
        sourceKey: 'listId',
        foreignKey: 'ListId',
      });
    }
  }
  List.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      boardId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      listOrder: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'List',
    },
  );
  return List;
};
