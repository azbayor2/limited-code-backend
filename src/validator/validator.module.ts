import { Module } from '@nestjs/common';
import validationPipe from './validator.config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [{ provide: APP_PIPE, useValue: validationPipe }],
})
export class ValidatorModule {}
