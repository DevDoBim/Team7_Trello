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
        type: Sequelize.INTEGER,
      },
      // ListId: {
      //   type: Sequelize.INTEGER,
      // }, // List와 Card는 1대N 관계, card CRUD 작성 우선 후 연결
      // cardOrder: {
      //   type: Sequelize.INTEGER,
      // }, // List에서 확인 가능한 Card 목록의 순서를 조정하는 용도, card CRUD 우선 후 활성화
      title: {
        type: Sequelize.STRING,
      },
      content: {
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
