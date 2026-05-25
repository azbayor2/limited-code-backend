import { ValidationPipe } from '@nestjs/common';

const validationPipe = new ValidationPipe({
  transform: true,
  disableErrorMessages: false,
});

export default validationPipe;
