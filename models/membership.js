'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User : Comment (1:N)
      this.hasOne(models.user, {
        sourceKey: 'listId',
        foreignKey: 'ListId',
      });
      // board : Comment (1:N)
      this.hasOne(models.board, {
        sourceKey: 'listId',
        foreignKey: 'ListId',
      });
    }
  }
  Membership.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true,
      },
      boardId: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Membership',
    },
  );
  return Membership;
};
