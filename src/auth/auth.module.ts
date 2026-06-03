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
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({}),
    SequelizeModule.forFeature([User, EmailVerification]),
    CryptoModule,
    JobModule,
    UserModule,
  ],
  providers: [JWTCustomService, EmailVerificationService, LoginService],
  exports: [JWTCustomService, EmailVerificationService],
  controllers: [EmailVerificationController, LoginController],
})
export class AuthModule {}
