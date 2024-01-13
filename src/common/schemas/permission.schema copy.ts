import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:true})
class Permission {
    @Prop({type:String,required:true})
    name:string
    @Prop({type:String,default:''})
    description:string
    
}
export const RoleSchema=SchemaFactory.createForClass(Permission);
export type RoleDocument=Permission & Document;
