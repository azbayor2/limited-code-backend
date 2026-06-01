// import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CryptoService } from 'src/crypto/crypto.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cryptoService: CryptoService) {
    // eslint-disable-next-line
    super(); /** 나중에 수정 */
  }

  // async validate(username: string, password: string) {}
}
