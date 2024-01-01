import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches } from "class-validator"


export class CheckOtpDto{
    @ApiProperty({name:'code',description:"کد تایید ارسال شده را وارد کنید",type:Number,required:true,})
    @Matches(/^\d{5}$/,{message:"کد ارسال شده صجیح نمیباشد!"})
    code:string
    
    @ApiProperty({name:"phone",type:String,required:true,example:"09914275883",description:"شماره موبایل با فرمت IR را وارد کنید"})
    @Matches(/^(?:(?:\+|00)98|0)?9[0-9]{9}$/, { message: "فرمت شماره موبایل  صحیح نیست" })
    phone: string;
}