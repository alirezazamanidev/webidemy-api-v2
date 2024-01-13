import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:true})
class Role {
    @Prop({type:String,required:true})
    title:string
    @Prop({type:String,default:''})
    description:string
    
    @Prop({type:[Types.ObjectId],ref:'permission',default:[]})
    permissions:[]
}
export const RoleSchema=SchemaFactory.createForClass(Role);
export type RoleDocument=Role & Document;
