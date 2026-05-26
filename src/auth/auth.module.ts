import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JWTCustomService } from './jwt.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [JWTCustomService],
  exports: [JWTCustomService],
  controllers: [],
})
export class AuthModule {}
