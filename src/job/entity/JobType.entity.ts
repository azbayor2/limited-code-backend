import { Sequelize } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Default,
  HasMany,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Job } from './Job.entity';

@Table({ tableName: 'jobTypes', timestamps: false })
export class JobType extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare jobName: string;

  @Default(Sequelize.literal('current_timestamp'))
  @CreatedAt
  @Column
  declare createdAt: Date;

  /** 하나의 jobTypes는 여러개의 Job을 가지고 있음 */
  @HasMany(() => Job)
  declare jobs: Job[];
}
