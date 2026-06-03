import { Injectable } from '@nestjs/common';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/exception/BusinessException.type';
import { JWTCustomService } from './jwt.service';
import { User } from 'src/user/entity/User.entity';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JWTCustomService) {}

  async handleLogin(user: User) {
    if (!user) throw new BusinessException(BusinessErrorCode.USER_NOT_FOUND);

    const accessToken = await this.jwtService.signAccessToken(
      user.id,
      user.username,
    );
    const refreshToken = await this.jwtService.signRefreshToken(
      user.id,
      user.username,
    );

    return { accessToken, refreshToken };
  }
}
