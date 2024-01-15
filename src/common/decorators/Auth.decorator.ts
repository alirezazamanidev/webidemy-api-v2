import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity } from "@nestjs/swagger";


export const Auth=()=>applyDecorators(ApiSecurity('access_token'),UseGuards(AuthGuard('jwt')))