import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { Sequelize } from 'sequelize-typescript';
import { Controller, Get } from '@nestjs/common';

@Controller('/health')
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private sequelize: Sequelize,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return await this.healthCheckService.check([
      async () => {
        try {
          await this.sequelize.authenticate();

          return { database: { status: 'up' } };
        } catch (error) {
          return {
            database: { status: 'down', message: (error as Error).message },
          };
        }
      },
    ]);
  }

  @Get('/ping')
  ping(): object {
    return { status: 'healthy' };
  }
}
