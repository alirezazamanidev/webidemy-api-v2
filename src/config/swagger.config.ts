import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function SwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Webidemy Api')

    .setContact('alireza', null, 'alirezazamanidev80@gmail.com')
    .setDescription('The Webidemy api document!')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api-doc', app, document);
}
