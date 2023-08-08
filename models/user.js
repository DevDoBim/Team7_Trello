'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User : Membership (1:N)
      this.hasOne(models.membership, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
      // User : Comment (1:N)
      this.hasOne(models.comment, {
        sourceKey: 'userId',
        foreignKey: 'UserId',
      });
    }
  }
  User.init(
    {
      eamil: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
