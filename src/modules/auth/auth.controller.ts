import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { ContentType, SwaggerTags } from 'src/common/enums/swagger.enum';

@ApiTags(SwaggerTags.AUTHORIZATION)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @Post('/send-otp')
    async sendOtp(@Body() userDTO:LoginDTO ){
        return 'hello'
        
    }

}
