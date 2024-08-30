'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('externalservicesusers', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id',
        },
      },
      externalServiceId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'externalServices', 
              key: 'id',
          },
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('externalservicesusers');
  }
};
