// import { Injectable } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CryptoService } from 'src/crypto/crypto.service';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/exception/BusinessException.type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly userService: UserService,
  ) {
    // eslint-disable-next-line
    super(); /** 나중에 수정 */
  }

  async validate(username: string, password: string) {
    const user = await this.userService.find(
      { username },
      { excludePassword: false },
    );

    if (!user) throw new BusinessException(BusinessErrorCode.USER_NOT_FOUND);

    const result = await this.cryptoService.comparePassword(
      password,
      user.password,
    );
    if (!result) {
      throw new BusinessException(BusinessErrorCode.WRONG_PASSPORD);
    }

    return user;
  }
}
