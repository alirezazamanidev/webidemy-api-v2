import './config/enviorment.config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './config/swagger.config';
import { getGlobalFilters } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(...getGlobalFilters(httpAdapter));
  await app.listen(process.env.PORT);
}
bootstrap();
