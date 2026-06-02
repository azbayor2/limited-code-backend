import {
  Catch,
  HttpStatus,
  Logger,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BusinessException } from './BusinessException.type';

@Catch(BusinessException)
export class BusinessExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('BusinessException');

  catch(exception: BusinessException, host: ArgumentsHost) {
    switch (exception.errorCode) {
      /** 안에 BusinessException 별로 로깅하고, 상황에 맞는 HttpException을 던진다 */

      /** 최후의 수단, 비권장 */
      default:
        this.logger.error(exception.message, exception.stack);

        super.catch(
          new HttpException('unknown error', HttpStatus.INTERNAL_SERVER_ERROR),
          host,
        );

        break;
    }
  }
}
