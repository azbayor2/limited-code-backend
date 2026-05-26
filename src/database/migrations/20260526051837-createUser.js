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
    const DataTypes = Sequelize.DataTypes;
    await queryInterface.createTable('users', {
      /** primary key: id */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      /** username, unique */
      username: {
        type: DataTypes.CHAR(255),
        unique: true,
        allowNull: false,
      },
      /** email, unique */
      email: {
        type: DataTypes.CHAR(255),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      /** createdAt */
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('current_timestamp'),
      },
      /** deletedAt */
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      /** isAdmin */
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      /** password */
      password: {
        type: DataTypes.STRING,
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
