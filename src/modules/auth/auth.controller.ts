import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiForbiddenResponse, ApiHeader, ApiHeaders, ApiOkResponse, ApiOperation, ApiProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {  SendOtpDto } from './dtos/send-otp-dto';
import { ContentType, SwaggerTags } from 'src/common/enums/swagger.enum';
import { AuthMessage } from './auth.message';
import { CheckOtpDto } from './dtos/check-otp-dto';
import { AuthGuard } from '@nestjs/passport';
import { CheckPolicie, GetCurrentUser } from 'src/common/decorators';
import { PayloadRt } from './types';
import { Action } from 'src/common/enums';
import { Course } from 'src/common/schemas';

@ApiTags(SwaggerTags.AUTHORIZATION)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @ApiOperation({summary:'login user and get one time Password',tags:[SwaggerTags.AUTHORIZATION]})
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
    @ApiOperation({summary:'Check otp and send tokens',tags:[SwaggerTags.AUTHORIZATION]})
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
    @ApiHeader({name:'reresh_token',description:"ارسال رفرش توکن برای گرفتن اکسس توکن جدید"})
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @ApiOperation({summary:'Get refresh token and send new Tokens',tags:[SwaggerTags.AUTHORIZATION]})

    @ApiOkResponse({status:HttpStatus.OK,description:"ارسال توکن های جدید!"})
    @ApiUnauthorizedResponse({status:HttpStatus.UNAUTHORIZED,description:"عدم اعتبار سنجی"})
    @ApiForbiddenResponse({status:HttpStatus.FORBIDDEN,description:'عدم اعتبار رفرش توکن!'})
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('/refresh')
    async refreshToken(@GetCurrentUser() payload:PayloadRt){
        const tokens=await this.authService.refreshToken(payload);
        return {
            statusCode:HttpStatus.OK,
            message:AuthMessage.CREATE_NEW_ACCESS_TOKEN,
            data:tokens
        }
    }
    

}
