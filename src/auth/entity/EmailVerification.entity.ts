import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Default,
} from 'sequelize-typescript';

@Table
export class EmailVerification extends Model {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  verificationCode: string;

  @Default(false)
  @AllowNull(false)
  @Column
  verified: boolean;

  @AllowNull(false)
  @Column
  declare createdAt: Date;

  @AllowNull(false)
  @Column
  declare updatedAt: Date;

  @AllowNull(true)
  @Column
  declare deletedAt: Date;
}
