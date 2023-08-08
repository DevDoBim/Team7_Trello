'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Boards : Lists (1:N)
      this.belongsTo(models.Boards, {
        targetKey: 'boardId',
        foreignKey: 'BoardId',
      });

      // Lists : Cards (1:N)
      this.hasMany(models.Cards, {
        sourceKey: 'listId',
        foreignKey: 'ListId',
      });
    }
  }
  Lists.init(
    {
      listId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      BoardId: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      listOrder: {
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
      modelName: 'Lists',
    },
  );
  return Lists;
};
