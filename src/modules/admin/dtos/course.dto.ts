import { ApiProperty } from "@nestjs/swagger";


export class createCourseDTO{
    @ApiProperty({name:'title',type:String,required:true})
    title:string
    @ApiProperty({name:'short_text',type:String,required:true})
    short_text:string
    @ApiProperty({name:'text',type:String,required:true})
    text:string
    @ApiProperty({name:'type',enum:['vip','free','cash'],required:true})
    type:string
    @ApiProperty({name:'price',type:String,default:0})
    price:string
    @ApiProperty({name:'tags',type:String,required:true,description:'Enter tags with # example @tags1#tags2#tags3'})
    tags:string
    @ApiProperty({name:'photo',type:'string',format:'binary',required:true})
    photo:Express.Multer.File;

}