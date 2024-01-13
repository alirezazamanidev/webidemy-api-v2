import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createRoleDTO{
    
    @ApiProperty({name:"title",type:String,required:true})
    @IsNotEmpty({message:"فیلد عنوان نمی تواند خالی بماند!"})
    title:string
    @ApiProperty({name:'description',type:String,required:false})
    description:string;
}

export class updateRoleDTO{
    
    @ApiProperty({name:"title",type:String,required:true})
    title:string
    @ApiProperty({name:'description',type:String,required:false})
    description:string;
}