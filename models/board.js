'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User : Board (1:N)
      this.hasMany(models.user, {
        sourceKey: 'boardId',
        foreignKey: 'BoardId',
      });
      // Membership : Board (1:N)
      this.hasMany(models.membership, {
        sourceKey: 'boardId',
        foreignKey: 'BoardId',
      });
    }
  }
  Board.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      desc: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Board',
    },
  );
  return Board;
};
