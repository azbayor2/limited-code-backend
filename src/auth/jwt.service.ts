import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { Payload } from './types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTCustomService {
  private readonly JWT_ACCESS_SECRETS: string;
  private readonly JWT_REFRESH_SECRETS: string;
  private readonly accessTokenExpiration: StringValue;
  private readonly refreshTokenExpiration: StringValue;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_ACCESS_SECRETS =
      this.configService.get<string>('JWT.ACCESS_SECRETS') || '';
    this.JWT_REFRESH_SECRETS =
      this.configService.get<string>('JWT.REFRESH_SECRETS') || '';
    this.accessTokenExpiration = '1H';
    this.refreshTokenExpiration = '7D';
  }
  /** access 토큰을 생성함. */
  async signAccessToken(id: number, username: string) {
    const payload: Payload = { sub: id, username };

    const accessToken = await this.jwtService.signAsync<Payload>(payload, {
      secret: this.JWT_ACCESS_SECRETS,
      expiresIn: this.accessTokenExpiration,
    });

    return accessToken;
  }
  /** refreshToken을 발급 */
  async signRefreshToken(id: number, username: string) {
    const payload: Payload = { sub: id, username };

    const refreshToken = await this.jwtService.signAsync<Payload>(payload, {
      secret: this.JWT_REFRESH_SECRETS,
      expiresIn: this.refreshTokenExpiration,
    });

    return refreshToken;
  }
  /** accessToken을 검증함. */
  async verifyToken(refreshToken: string) {
    const payload: Promise<Payload> = this.jwtService.verifyAsync(refreshToken);

    return payload;
  }
}
