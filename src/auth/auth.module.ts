import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JWTCustomService } from './jwt.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entity/User.entity';
import { EmailVerification } from './entity/EmailVerification.entity';
import { EmailVerificationService } from './emailVerification.service';
import { CryptoModule } from 'src/crypto/crypto.module';
import { EmailVerificationController } from './emailVerification.controller';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([User, EmailVerification]),
    CryptoModule,
    JobModule,
  ],
  providers: [JWTCustomService, EmailVerificationService],
  exports: [JWTCustomService, EmailVerificationService],
  controllers: [EmailVerificationController],
})
export class AuthModule {}
