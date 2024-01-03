import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min } from "class-validator";

export class createCategoryDTO{
    @ApiProperty({name:"title",type:String,required:true,description:'Enter title for category!'})
    @IsNotEmpty({message:"فیلد عنوان نمی تواند خالی بماند"})
    @Min(3,{message:"حدواقل حروف وارد شده نمی تواند کمتر از ۳ کارکتر باشد"})
    title:string
    @ApiProperty({name:"parent",type:String,required:false,description:"Enter parent for category"})
    
    parent:string
}