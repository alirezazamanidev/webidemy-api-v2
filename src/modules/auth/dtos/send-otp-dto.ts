import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches } from "class-validator"


export class SendOtpDto{
    @ApiProperty({name:'fullname',example:"Alireza Zamani",type:String,required:true,
    description:'نام کامل کاربر را وارد کنید!'})
    @IsNotEmpty({message:"فیلد نام کامل نمی تواند خالی باشد!"})
    fullname:string
    @ApiProperty({name:"phone",type:String,required:true,example:"09914275883",description:"شماره موبایل با فرمت IR را وارد کنید"})
    @Matches(/^(?:(?:\+|00)98|0)?9[0-9]{9}$/, { message: "فرمت شماره موبایل  صحیح نیست" })
    phone: string;
}