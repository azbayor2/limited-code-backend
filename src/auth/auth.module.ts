import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JWTCustomService } from './jwt.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entity/User.entity';
import { EmailVerification } from './entity/EmailVerification.entity';
import { EmailVerificationService } from './emailVerification.service';
import { CryptoModule } from 'src/crypto/crypto.module';
import { EmailVerificationController } from './emailVerification.controller';

@Module({
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([User, EmailVerification]),
    CryptoModule,
  ],
  providers: [JWTCustomService, EmailVerificationService],
  exports: [JWTCustomService],
  controllers: [EmailVerificationController],
})
export class AuthModule {}
