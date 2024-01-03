import { Prop, Schema,SchemaFactory} from "@nestjs/mongoose";
import {Document,Types} from "mongoose";
import * as mongoosePaginate from 'mongoose-paginate'
@Schema({timestamps:true,versionKey:false})
class Category {
    @Prop({type:String,required:true})
    title:string
    @Prop({type:Types.ObjectId,ref:'category',default:null})
    parent:string[]

}



export type categoryDocumemnt=Document & Category;
const categorySchema= SchemaFactory.createForClass(Category);
categorySchema.plugin(mongoosePaginate);


export default categorySchema