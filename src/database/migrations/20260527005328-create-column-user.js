'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const DataTypes = Sequelize.DataTypes;

    await queryInterface.addColumn('users', 'updatedAt', {
      defaultValue: Sequelize.literal('current_timestamp'),
      onUpdate: Sequelize.literal('current_timestamp'),
      type: DataTypes.DATE,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('users', 'updatedAt');
  },
};
