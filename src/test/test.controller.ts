import { Body, Controller, Post, Injectable } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { CryptoTestDto, JwtSignTestDto } from './test.dto';
import { JWTCustomService } from 'src/auth/jwt.service';

@Controller('/test')
export class TestController {
  constructor(
    private cryptoService: CryptoService,
    private jwtService: JWTCustomService,
  ) {}

  @Post('/crypto')
  async testCrypto(@Body() cryptoTestDto: CryptoTestDto) {
    const hashed = await this.cryptoService.hashPassword(
      cryptoTestDto.password,
    );

    return {
      hashed,
    };
  }

  @Post('/signToken')
  async testSignToken(@Body() { id, username }: JwtSignTestDto) {
    const token = await this.jwtService.signAccessToken(id, username);

    return { result: token };
  }
}
