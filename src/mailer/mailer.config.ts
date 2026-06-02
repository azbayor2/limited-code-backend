import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';

export const MailerConfigFactory = (
  configService: ConfigService,
): MailerOptions => ({
  transport: {
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: configService.get<string>('mailer.user'),
      clientId: configService.get<string>('mailer.clientId'),
      clientSecret: configService.get<string>('mailer.clientSecret'),
      refreshToken: configService.get<string>('mailer.refreshToken'),
    },
  },

  defaults: {
    from: configService.get<string>('mailer.user'),
    subject: `"No Reply" <${configService.get<string>('mailer.email')}>`,
  },

  template: {
    dir: __dirname + '/email-templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
