'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Lists : Cards (1:N)
      // this.belongsTo(models.Lists, {
      //   targetKey: 'listId',
      //   foreignKey: 'ListId',
      // });
      // Cards : Comments (1:N)
      this.hasMany(models.Comments, {
        sourceKey: 'cardId',
        foreignKey: 'CardId',
      });
    }
  }
  Cards.init(
    {
      cardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      // ListId: {
      //   allowNull: false, // NOT NULL
      //   type: DataTypes.INTEGER,
      // }, // List와 Card는 1대N 관계, card CRUD 작성 우선 후 연결
      // cardOrder: {
      //   allowNull: false, // NOT NULL
      //   type: DataTypes.STRING,
      // }, // List에서 확인 가능한 Card 목록의 순서를 조정하는 용도, card CRUD 우선 후 활성화
      status: {
        allowNull: false,
        type: DataTypes.ENUM('준비', '진행', '완료', '장애'),
      },
      title: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Cards',
    },
  );
  return Cards;
};
