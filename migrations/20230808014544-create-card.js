'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      cardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
      ListId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Lists',
          key: 'listId',
        },
        onDelete: 'CASCADE',
      },
      // cardOrder: {
      //   type: Sequelize.INTEGER,
      // }, // List에서 확인 가능한 Card 목록의 순서를 조정하는 용도, card CRUD 우선 후 활성화
      status: {
        allowNull: false,
        type: Sequelize.ENUM('준비', '진행', '완료', '장애'),
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  },
};
