'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MembershipUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //   Memberships : MembershipUsers (1:N)
      this.belongsTo(models.Memberships, {
        targetKey: 'membershipId',
        foreignKey: 'membershipId',
      });
      // // board : Comment (1:N)
      // this.hasOne(models.board, {
      //   sourceKey: 'listId',
      //   foreignKey: 'ListId',
      // });
    }
  }
  MembershipUsers.init(
    {
      MembershipUserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
      MembershipId: {
        type: DataTypes.INTEGER,
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
      modelName: 'MembershipUsers',
    },
  );
  return MembershipUsers;
};
