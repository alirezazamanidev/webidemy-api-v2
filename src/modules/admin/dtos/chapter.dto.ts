import { ApiHeader, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class createChapterDTO{
    @ApiProperty({name:'courseId',type:String,required:true,description:"Enter object id course for Add chapter"})
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,{message:'مقدار فیلد  دوره وارد شده صحیح نیست'})
    courseId:string
    @ApiProperty({type:String,required:true})
    @IsNotEmpty({message:'فیلد عنوان نمی تواند خالی بماند!'})
    title:string
    @ApiProperty({type:String,required:false})
    text:string;

}

export class chapterIdParamsDTO{
    
    @Matches(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,{message:'مقدار   ایدی وارد شده صحیح نیست'})
    chapterId:string

}

export class updateChapterDTO{
    @ApiProperty({name:'courseId',type:String,required:false,description:"Enter object id course for Add chapter"})
    courseId:string
    @ApiProperty({type:String,required:false})
    title:string
    @ApiProperty({type:String,required:false})
    text:string;
}
