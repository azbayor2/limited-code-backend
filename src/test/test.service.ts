import { Injectable } from '@nestjs/common';
import {
  BusinessErrorCode,
  BusinessException,
} from 'src/exception/BusinessException.type';

@Injectable()
export class TestService {
  constructor() {}

  throwError() {
    throw new BusinessException(BusinessErrorCode.UNKNOWN_ERROR);
  }
}
