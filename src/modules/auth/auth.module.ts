import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema,User } from '../user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategies';

@Module({
    imports:[JwtModule.register({global:true,}),MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
    controllers: [AuthController],
    providers: [AuthService,RefreshTokenStrategy]
})
export class AuthModule {}
