'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const Datatypes = Sequelize.DataTypes;

    /** email 인증번호를 저장하는 스키마 생성 */
    await queryInterface.createTable('emailVerifications', {
      /** pk id */
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      /** 이메일 주소 */
      email: {
        type: Datatypes.CHAR(255),
        allowNull: false,
      },
      /** 이메일 인증번호 */
      verificationCode: {
        type: Datatypes.CHAR(10),
        allowNull: false,
      },
      /** 검증되었는지 여부 */
      verified: {
        type: Datatypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      /** 생성시간 */
      createdAt: {
        type: Datatypes.DATE,
        defaultValue: Sequelize.literal('current_timestamp'),
        allowNull: false,
      },
      /** 갱신 시간 */
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('current_timestamp'),
        onUpdate: Sequelize.literal('current_timestamp'),
        allowNull: false,
      },
      /** 삭제 시간 */
      deletedAt: {
        type: Datatypes.DATE,
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

    await queryInterface.dropTable('emailVerifications');
  },
};
