import { Module } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
