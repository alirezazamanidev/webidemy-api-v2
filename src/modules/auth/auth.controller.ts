import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {  SendOtpDto } from './dtos/send-otp-dto';
import { ContentType, SwaggerTags } from 'src/common/enums/swagger.enum';
import { AuthMessage } from './auth.message';
import { CheckOtpDto } from './dtos/check-otp-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags(SwaggerTags.AUTHORIZATION)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @ApiOkResponse({status:HttpStatus.OK,description:'ارسال کد یک بار مصرف'})
    @ApiBadRequestResponse({status:HttpStatus.BAD_REQUEST,description:'bad request'})
    @Post('/send-otp')
    async sendOtp(@Body() userDTO:SendOtpDto ){
        const data=await this.authService.sendOtp(userDTO);
        return {
            statusCode:HttpStatus.OK,
            message:AuthMessage.SendOtpSuccessFuylly,
            data
        }
        
    }
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @ApiOkResponse({status:HttpStatus.OK,description:"تایید کد یک بار مصرف"})
    @ApiBadRequestResponse({status:HttpStatus.BAD_REQUEST,description:"عدم تایید کد دریافتی"})
    @HttpCode(HttpStatus.OK)
    @Post('/check-otp')
    async checkOtp(@Body() checkOtpDTO:CheckOtpDto){

        const tokens=await this.authService.checkOtp(checkOtpDTO);
        return {
            statusCode:HttpStatus.OK,
            message:AuthMessage.CreatedTokens,
            data:tokens
        }

    }
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('/refresh')
    async refreshToken(){
        
    }

}
