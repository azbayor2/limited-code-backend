import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CryptoService } from 'src/crypto/crypto.service';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cryptoService: CryptoService) {
    super();
  }

  async validate(username: string, password: string) {}
}
