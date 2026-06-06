import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/filter/allException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

//   app.setGlobalPrefix('v1');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // this will omit non-declared elements in dto
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    console.log(`NESTAPI Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}
bootstrap();
