import {
  Table,
  Column,
  Model,
  CreatedAt,
  DeletedAt,
  PrimaryKey,
  NotNull,
  Unique,
  AllowNull,
  AutoIncrement,
  Default,
  Sequelize,
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @Column
  @CreatedAt
  declare createdAt: Date;

  @DeletedAt
  @AllowNull
  @Column
  declare deletedAt: Date;

  @Default(false)
  @NotNull
  @AllowNull(false)
  @Column
  isAdmin: boolean;

  @Column
  @Unique
  @Column
  email: string;

  @Default(Sequelize.literal('current_timestamp'))
  @NotNull
  @AllowNull(false)
  @Column
  declare updatedAt: Date;
}
