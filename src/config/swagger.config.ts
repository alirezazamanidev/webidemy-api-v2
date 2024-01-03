import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTags } from 'src/common/enums/swagger.enum';

export default function SwaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Webidemy Api')

    .setContact('alireza', null, 'alirezazamanidev80@gmail.com')
    .setDescription('The Webidemy api document!')
    .setVersion('1.0')
    .addTag(SwaggerTags.AUTHORIZATION,"Auth user")
    .addTag(SwaggerTags.ADMIN_PANEL,"Admin panel for create,Get,delete,update actions")

    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api-doc', app, document);
}
