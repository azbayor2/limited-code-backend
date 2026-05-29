import { Logger, Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { CryptoModule } from 'src/crypto/crypto.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TestService } from './test.service';

@Module({
  providers: [TestService],
  imports: [CryptoModule, AuthModule, UserModule],
  controllers: [TestController],
})
export class TestModule {}
