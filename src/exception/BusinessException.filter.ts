import {
  Catch,
  HttpStatus,
  Logger,
  HttpException,
  ArgumentsHost,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { BusinessErrorCode, BusinessException } from './BusinessException.type';

@Catch(BusinessException)
export class BusinessExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('BusinessException');

  catch(exception: BusinessException, host: ArgumentsHost) {
    switch (exception.errorCode) {
      /** 안에 BusinessException 별로 로깅하고, 상황에 맞는 HttpException을 던진다 */
      case BusinessErrorCode.WRONG_PASSPORD:
        // super.catch(new UnauthorizedException('cannot authorize'), host);
        throw new UnauthorizedException('cannot authorize');
        break;

      case BusinessErrorCode.USER_NOT_FOUND:
        throw new NotFoundException('user not found');
        // super.catch(new NotFoundException('user not found'), host);
        break;

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
