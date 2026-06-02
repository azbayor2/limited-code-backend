'use strict';

const { query } = require('winston');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const Datatype = Sequelize.DataTypes;

    /** expiredAt 추가 */
    await queryInterface.addColumn('emailVerifications', 'expiredAt', {
      type: Datatype.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        '(current_timestamp + interval 10 minute)',
      ),
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn('emailVerifications', 'expiredAt');
  },
};
