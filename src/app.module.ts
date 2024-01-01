import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoURL } from './config/mongoose.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [MongooseModule.forRoot(getMongoURL()), AuthModule, UserModule],
})
export class AppModule {}
