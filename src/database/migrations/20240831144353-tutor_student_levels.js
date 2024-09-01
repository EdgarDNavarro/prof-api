'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tutor_student_levels', {
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
      student_level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'student_levels',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tutor_student_levels');
  }
};
