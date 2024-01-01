import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '../user/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports:[MongooseModule.forFeature([{name:'user',schema:userSchema}])],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
