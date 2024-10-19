'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tutor_age_groups', {
      tutor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tutors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      age_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'age_groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tutor_age_groups');
  }
};
