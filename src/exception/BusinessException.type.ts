/** 여기에 에러 코드 정의 */
export enum BusinessErrorCode {
  UNKNOWN_ERROR = 'unknown error',
  EMAIL_SENT_FAILED = 'email sent failed',
  EMAIL_VERIFICATION_DATA_NOT_FOUND = 'entity of emailVerification not found',
  EMAIL_AUTH_EXPIRED = 'email authentication code expired',
}

/** 여기에 각 에러코드에 맞는 세부 정보 맵핑 (status, message) */
export const BusinessErrorRegistry: Record<
  BusinessErrorCode,
  { status: number; message: string }
> = {
  [BusinessErrorCode.UNKNOWN_ERROR]: {
    status: 999,
    message: 'real unkown error',
  },
  [BusinessErrorCode.EMAIL_SENT_FAILED]: {
    status: 1,
    message: 'email sent failed',
  },

  [BusinessErrorCode.EMAIL_VERIFICATION_DATA_NOT_FOUND]: {
    status: 2,
    message: 'data of EmailVerification is not found',
  },

  [BusinessErrorCode.EMAIL_AUTH_EXPIRED]: {
    status: 2,
    message: 'email authentication expired',
  },
};

/** 비즈니스 에러 클래스 */
export class BusinessException extends Error {
  public readonly errorCode: BusinessErrorCode;
  public readonly meta: Record<string, any> | undefined;

  constructor(
    errorCode: BusinessErrorCode,
    customMessage?: string,
    meta?: Record<string, any>,
  ) {
    super(customMessage || BusinessErrorRegistry[errorCode].message);

    this.name = 'BusinessError';
    this.errorCode = errorCode;
    this.meta = meta;
  }
}
