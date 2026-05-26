import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  providers: [],
  imports: [CryptoModule],
  controllers: [TestController],
})
export class TestModule {}
