import { Prop, Schema,SchemaFactory} from "@nestjs/mongoose";
import {Document,Types} from "mongoose";

@Schema({timestamps:true,versionKey:false})
class Category {
    @Prop({type:String,required:true})
    title:string
    @Prop({type:Types.ObjectId,ref:'category',default:null})
    parent:string[]

}



export type categoryDocumemnt=Document & Category;
export const categorySchema= SchemaFactory.createForClass(Category);
