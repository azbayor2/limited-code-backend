'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    /** users 생성 */
    await queryInterface.createTable('users', {
      /** primary key: id */
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      /** username, unique */
      username: {
        type: Sequelize.CHAR(255),
        unique: true,
        allowNull: false,
      },
      /** email, unique */
      email: {
        type: Sequelize.CHAR(255),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      /** createdAt */
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('current'),
      },
      /** deletedAt */
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      /** isAdmin */
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      /** password */
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users');
  },
};
