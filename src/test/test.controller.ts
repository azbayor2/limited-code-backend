import {
  Body,
  Controller,
  Post,
  Injectable,
  Get,
  Logger,
  LoggerService,
  Inject,
  Response,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { CryptoTestDto, JwtSignTestDto } from './test.dto';
import { JWTCustomService } from 'src/auth/jwt.service';
import { UserService } from 'src/user/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/test')
@ApiTags('test')
export class TestController {
  private logger = new Logger(TestController.name);
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

  @ApiOperation({ summary: '로깅이 제대로 되는지 확인합니다.' })
  @Post('/log')
  @HttpCode(HttpStatus.OK)
  testLog() {
    this.logger.error('hello world');

    return { message: 'ok' };
  }
}
