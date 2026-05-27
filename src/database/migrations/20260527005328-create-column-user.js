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

    /** users 테이블에 updatedAt 추가 */
    await queryInterface.addColumn('users', 'updatedAt', {
      defaultValue: Sequelize.literal('current_timestamp'), // 기본값
      onUpdate: Sequelize.literal('current_timestamp'), // 갱신 시 최신 시간으로 갱신
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
