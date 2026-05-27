import { Body, Controller, Post, Injectable, Get } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { CryptoTestDto, JwtSignTestDto } from './test.dto';
import { JWTCustomService } from 'src/auth/jwt.service';
import { UserService } from 'src/user/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/test')
@ApiTags('test')
export class TestController {
  constructor(
    private cryptoService: CryptoService,
    private jwtService: JWTCustomService,
    private userService: UserService,
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

  @ApiOperation({ summary: 'DB에 사용자가 조회되는지 테스트합니다.' })
  @Get('/userInfo')
  async getUser() {
    return await this.userService.find({ username: 'azbayor2' });
  }
}
