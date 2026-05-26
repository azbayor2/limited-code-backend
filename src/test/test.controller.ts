import { Body, Controller, Post } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { CryptoTestDto } from './test.dto';

@Controller('/test')
export class TestController {
  constructor(private cryptoService: CryptoService) {}

  @Post('/crypto')
  async testCrypto(@Body() cryptoTestDto: CryptoTestDto) {
    const hashed = await this.cryptoService.hashPassword(
      cryptoTestDto.password,
    );

    return {
      hashed,
    };
  }
}
