import { createLogger, format, transports } from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import { utilities, WinstonModule } from 'nest-winston';

/** Production: ECS Format */
const ECS_FORMAT: ConsoleTransportOptions = {
  format: ecsFormat({
    serviceName: 'Y_LIMITED_BACKEND',
  }),
};

/** Dev: Pretty Format */
const NON_ECS_FORMAT: ConsoleTransportOptions = {
  format: format.combine(
    format.timestamp(),
    format.ms(),
    utilities.format.nestLike('Y_LIMITED_BACKEND', {
      colors: true,
      prettyPrint: true,
      processId: true,
      appName: true,
    }),
  ),
};

/** 윈스턴 로거 설정 */
export const winstonLoggerInstance = createLogger({
  level: 'info',
  transports: [
    new transports.Console(
      /** production 일 때는 ECS, 아니면 디버깅 로거로 설정 */
      process.env.NODE_ENV === 'production' ? ECS_FORMAT : NON_ECS_FORMAT,
    ),
  ],
});
