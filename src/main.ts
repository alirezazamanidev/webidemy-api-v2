import './config/enviorment.config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'src/common/utils/init_redis';
import SwaggerConfig from './config/swagger.config';
import { getGlobalFilters } from './common/exceptions';
import {  ValidationPipe } from '@nestjs/common';
import ValidationException from './common/exceptions/validation.exception';
import * as bodyParser from 'body-parser';
import { ValidationError } from 'class-validator';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig(app);
  const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalFilters(...getGlobalFilters(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages: object[] = errors.map(err => ({
          [err.property]: Object.values(err.constraints),
        }));
        return new ValidationException(messages);
      }
    })
  )
  await app.listen(process.env.APP_PORT,()=>{
    console.log(`run > ${process.env.APP_TYPE}://${process.env.APP_HOST}:${process.env.APP_PORT}`)
  });
}
bootstrap();
