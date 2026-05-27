import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JWTCustomService } from './jwt.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entity/user.entity';
import { EmailVerification } from './entity/EmailVerification.entity';
import { EmailVerificationService } from './emailVerification.service';

@Module({
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([User, EmailVerification]),
  ],
  providers: [JWTCustomService, EmailVerificationService],
  exports: [JWTCustomService],
  controllers: [],
})
export class AuthModule {}
