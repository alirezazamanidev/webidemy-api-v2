import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoURL } from './config/mongoose.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { AdminModule } from './modules/admin/admin.module';
import { CaslModule } from './modules/casl/casl.module';

@Module({
  imports: [MongooseModule.forRoot(getMongoURL()), AuthModule, AdminModule, CaslModule],
})
export class AppModule {}
