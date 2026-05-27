import { Module } from '@nestjs/common';
import { User } from './entity/User.entity';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
})
export class UserModule {}
