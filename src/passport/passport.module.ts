import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './passport-local.strategy';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [PassportModule, UserModule, CryptoModule],
  providers: [LocalStrategy],
  exports: [LocalStrategy],
})
export default class CustomPassportModule {}
