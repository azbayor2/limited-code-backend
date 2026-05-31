import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export const MailerConfigFactory = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    host: configService.get<string>('mailer.host'),
    port: configService.get<number>('mailer.port'),
    auth: {
      user: configService.get<string>('mailer.user'),
      pass: configService.get<string>('mailer.pass'),
    },

    defaults: {
      from: `"No Reply" <${configService.get<string>('mailer.email')}>`,
    },

    template: {
      dis: __dirname + 'email-templates',
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
});
