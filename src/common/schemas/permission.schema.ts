import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:true})
class Permission {
    @Prop({type:Types.ObjectId,ref:'role'})
    role:string
    @Prop({type:String,required:true})
    name:string
    @Prop({type:String,default:''})
    description:string
    
}
export const PermissionSchema=SchemaFactory.createForClass(Permission);
export type PermissionDocument=Permission & Document;
