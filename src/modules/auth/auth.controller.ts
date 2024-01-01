import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { ContentType, SwaggerTags } from 'src/common/enums/swagger.enum';

@ApiTags(SwaggerTags.AUTHORIZATION)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @ApiOkResponse({status:HttpStatus.OK,description:'ارسال کد یک لار مصرف'})
    @ApiBadRequestResponse({status:HttpStatus.BAD_REQUEST,description:'bad request'})
    @Post('/send-otp')
    async sendOtp(@Body() userDTO:LoginDTO ){
        
        
    }

}
