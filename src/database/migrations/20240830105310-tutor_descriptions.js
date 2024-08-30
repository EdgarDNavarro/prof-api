'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tutor_descriptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tutor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tutors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tutor_descriptions');
  }
};
