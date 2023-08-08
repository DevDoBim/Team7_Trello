'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // List : Board (1:N)
      this.hasMany(models.list, {
        sourceKey: 'cardId',
        foreignKey: 'CardId',
      });
      // Board : Comments (1:N)
      this.hasMany(models.comment, {
        sourceKey: 'cardId',
        foreignKey: 'CardId',
      });
    }
  }
  Card.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      listId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      cardOrder: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Card',
    },
  );
  return Card;
};
