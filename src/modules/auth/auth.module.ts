import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategies';
import { AccessTokenStrategy } from './strategies/at.strategy';
import { UserSchema } from 'src/common/schemas';

@Module({
    imports:[JwtModule.register({global:true,}),MongooseModule.forFeature([{name:'user',schema:UserSchema}])],
    controllers: [AuthController],
    providers: [AuthService,RefreshTokenStrategy,AccessTokenStrategy]
})
export class AuthModule {}
