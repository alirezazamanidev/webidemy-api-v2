import './config/enviorment.config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'src/common/utils/init_redis';
import SwaggerConfig from './config/swagger.config';
import { getGlobalFilters } from './common/exceptions';
import { ValidationPipeErorr } from './common/pips';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  SwaggerConfig(app);
  const httpAdapter = app.get(HttpAdapterHost);
  
  app.useGlobalFilters(...getGlobalFilters(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipeErorr()
  )
  app.useStaticAssets('public')
  await app.listen(process.env.APP_PORT,()=>{
    console.log(`run > ${process.env.APP_TYPE}://${process.env.APP_HOST}:${process.env.APP_PORT}`)
  });
}
bootstrap();
