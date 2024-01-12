import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min } from "class-validator";

export class createCategoryDTO{
    @ApiProperty({name:"title",type:String,required:true,description:'Enter title for category!'})
    @IsNotEmpty({message:"فیلد عنوان نمی تواند خالی بماند"})
    title:string
    @ApiProperty({name:"parent",type:String,required:false,description:"Enter parent for category"})
    
    parent:string
}

export class updateCtegoryDTO {
    @ApiProperty({name:'title',type:String,required:false,description:"Enter title for update category"})
    title:string
}