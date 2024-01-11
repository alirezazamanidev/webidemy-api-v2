import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document,Types} from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate'


@Schema({timestamps:true,id:false,versionKey:false})
class Category {
    @Prop({type:String,required:true})
    title:string
    @Prop({type:Types.ObjectId,ref:'category',required:false})
    parent:string
}
export type CategoryDocument=Category & Document;
export const categorySchema=SchemaFactory.createForClass(Category);
mongoosePaginate(categorySchema);