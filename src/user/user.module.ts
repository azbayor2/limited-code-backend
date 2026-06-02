import { Module } from '@nestjs/common';
import { User } from './entity/User.entity';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { EmailVerification } from 'src/auth/entity/EmailVerification.entity';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [
    SequelizeModule.forFeature([User, EmailVerification]),
    CryptoModule,
  ],
  controllers: [UserController],
})
export class UserModule {}
