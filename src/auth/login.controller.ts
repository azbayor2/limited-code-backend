import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';
import { User } from 'src/user/entity/User.entity';
import { LoginService } from './login.service';
import type { Response, Request } from 'express';
import type { RequestWithUser } from './auth.type';
import { LoginDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @UseGuards(AuthGuard('local'))
  async localStrategyLogin(
    @Body() loginDto: LoginDto,
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: User = req?.user;

    const { refreshToken, accessToken } =
      await this.loginService.handleLogin(user);

    res.cookie('JWT_ACCESS_TOKEN', accessToken, {
      maxAge: 1 * 60 * 60 * 1000, // 1 hour
    });
    res.cookie('JWT_REFRESH_TOKEN', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return;
  }
}
