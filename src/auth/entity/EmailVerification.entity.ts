import { DataTypes, Sequelize } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
  UpdatedAt,
  CreatedAt,
  DeletedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'emailVerifications' })
export class EmailVerification extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare email: string;

  @AllowNull(false)
  @Column
  declare verificationCode: string;

  @Default(false)
  @AllowNull(false)
  @Column
  declare verified: boolean;

  @CreatedAt
  @Default(DataTypes.NOW)
  @AllowNull(false)
  @Column
  declare createdAt: Date;

  @UpdatedAt
  @Default(DataTypes.NOW)
  @AllowNull(false)
  @Column
  declare updatedAt: Date;

  @DeletedAt
  @AllowNull(true)
  @Column
  declare deletedAt: Date;

  @Default(false)
  @AllowNull(false)
  @Column
  declare sent: boolean;

  @AllowNull(false)
  @Column({
    defaultValue: Sequelize.literal('(current_timestamp + interval 10 minute)'),
  })
  declare expiredAt: Date;
}
