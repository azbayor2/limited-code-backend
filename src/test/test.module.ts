import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CryptoModule } from 'src/crypto/crypto.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [],
  imports: [CryptoModule, AuthModule],
  controllers: [TestController],
})
export class TestModule {}
