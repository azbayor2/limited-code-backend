import { Sequelize } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from 'sequelize-typescript';
import { JobType } from './JobType.entity';

@Table({ tableName: 'jobs' })
export class Job extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => JobType)
  @AllowNull(false)
  @Column
  declare jobTypeId: number;

  @AllowNull(true)
  @Column({ type: DataType.JSON })
  declare meta: Record<string, any>;

  @Default('PENDING')
  @AllowNull(false)
  @Column
  declare status: 'PENDING' | 'SUCCESS' | 'FAILED';

  @Default(Sequelize.literal('current_timestamp'))
  @AllowNull(false)
  @CreatedAt
  @Column
  declare createdAt: Date;

  @Default(Sequelize.literal('current_timestamp'))
  @AllowNull(false)
  @CreatedAt
  @Column
  declare updatedAt: Date;

  /** 여러개의 Job은 하나의 Job에 속해 있을 수 있음 */
  @BelongsTo(() => JobType)
  declare jobType: JobType;
}
