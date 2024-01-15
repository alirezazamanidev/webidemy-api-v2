import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";


export class createCourseDTO{
   
    userId:string
    @ApiProperty({name:'title',type:String,required:true})
    @IsNotEmpty({message:'فیلد عنوان نمی تواند خالی بماند!'})
    title:string
    @ApiProperty({name:'slug',type:String,required:false,description:'You can Enter slug for course'})
    slug:string
    @IsNotEmpty({message:'فیلد متن کوتاه دوره نمی تواند خالی بماند'})
    @ApiProperty({name:'short_text',type:String,required:false})
    short_text:string
    @ApiProperty({name:'text',type:String,required:true})
    @IsNotEmpty({message:'فیلد متن اصلی سایت نمی تواند خالی بماند!'})
    text:string
    @ApiProperty({name:'category',type:String,description:'Object Id category!'})
    @IsNotEmpty({message:'فیلد دسته بندی نمی تواند خالی بماند!'})
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,{message:'مقدار فیلد دسته بندی وارد شده صحیح نیست'})
    category:string
    @ApiProperty({name:'type',enum:['vip','free','cash'],required:true})
    @IsNotEmpty({message:'فیلد تایپ نمی تواند خالی بماند!'})
    type:string
    @ApiProperty({name:'price',type:String,required:false,default:0})
    
    price:string
    @ApiProperty({name:'tags',type:String,required:true,description:'Enter tags with # example @tags1#tags2#tags3'})
    tags:string | string[]
    @ApiProperty({name:'photo',type:'string',format:'binary',required:true})
    @IsNotEmpty({message:'فیلد تصویره دوره نمیتواند خالی بماند!'})   
    photo:Express.Multer.File;

    constructor(data:Partial<createCourseDTO>){
        Object.assign(this,data);
    }

    validationAsync(){
        
    }
}