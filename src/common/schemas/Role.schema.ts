import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:true})
class Role {
    @Prop({type:String,required:true})
    title:string
    @Prop({type:String,default:''})
    description:string
}
export const RoleSchema=SchemaFactory.createForClass(Role);
export type RoleDocument=Role & Document;
