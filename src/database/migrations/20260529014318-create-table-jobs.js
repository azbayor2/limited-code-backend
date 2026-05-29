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

    const Datatype = Sequelize.DataTypes; // 편의성
    const t = await queryInterface.sequelize.transaction(); // 트랜잭션 생성

    try {
      await queryInterface.createTable(
        'jobTypes',
        {
          id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          jobName: {
            type: Datatype.STRING,
            allowNull: false,
            unique: true,
            comment: '작업 이름을 명시합니다',
          },
          createdAt: {
            type: Datatype.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('current_timestamp'),
          },
        },
        { transaction: t },
      );

      /** jobs table  생성 */
      await queryInterface.createTable(
        'jobs',
        {
          id: {
            type: Datatype.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          jobTypeId: {
            type: Datatype.INTEGER,
            allowNull: false,
            comment: '작업 ID를 외래키로 명시합니다.',
          },
          meta: {
            type: Datatype.JSON,
            allowNull: true,
            comment: '작업에 대한 메타데이터를 넣습니다',
          },
          status: {
            type: Datatype.ENUM('PENDING', 'SUCCESS', 'FAILED'),
            defaultValue: 'PENDING',
            allowNull: false,
            comment: '작업의 진행 상태를 넣습니다',
          },
          createdAt: {
            type: Datatype.DATE,
            defaultValue: Sequelize.literal('current_timestamp'),
            allowNull: false,
          },
          updatedAt: {
            type: Datatype.DATE,
            defaultValue: Sequelize.literal('current_timestamp'),
            allowNull: false,
            onDelete: Sequelize.literal('current_timestamp'),
          },
        },
        { transaction: t },
      );

      /** 외래키 추가 */
      await queryInterface.addConstraint('jobs', {
        type: 'foreign key',
        name: 'fk_constraint_jobTypes',
        fields: ['jobTypeId'],
        references: {
          table: 'jobTypes',
          field: 'id',
        },
      });

      /** 빠른 조회를 위해 인덱스 생성 */
      await queryInterface.addIndex('jobs', ['status', 'createdAt'], {
        transaction: t,
        name: 'jobIndex',
      });

      await t.commit();
    } catch {
      await t.rollback();
    }

    /** jobTypes table 생성 */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const t = await queryInterface.sequelize.transaction(); // 트랜잭션 생성
    try {
      await queryInterface.removeIndex('jobs', 'jobIndex', { transaction: t });

      await queryInterface.dropTable('jobs', { transaction: t });
      await queryInterface.dropTable('jobTypes', { transaction: t });
      await t.commit();
    } catch {
      t.rollback();
    }
  },
};
