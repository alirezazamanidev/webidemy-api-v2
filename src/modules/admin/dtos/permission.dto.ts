import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class createPermissionDTO{
    
    @ApiProperty({name:"name",type:String,required:true})
    @IsNotEmpty({message:"فیلد نام نمی تواند خالی بماند!"})
    name:string
    @ApiProperty({name:'description',type:String,required:false})
    description:string;
    @ApiProperty({name:'role',description:'Enter role object id!'})
    role:string;
    
}

export class updatePermissionDTO{
    
    @ApiProperty({name:"name",type:String,required:true})

    title:string
    @ApiProperty({name:'description',type:String,required:false})
    description:string;
   
}