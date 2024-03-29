import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document,Types} from "mongoose";


@Schema({timestamps:true,id:false,versionKey:false,toJSON:{virtuals:true}})
export class Category extends Document  {
    @Prop({type:String,required:true})
    title:string
    @Prop({type:Types.ObjectId,ref:'category',required:false})
    parent:string
}
export const categorySchema=SchemaFactory.createForClass(Category);

categorySchema.virtual('children',{
    ref:'category',
    localField:'_id',
    foreignField:"parent"
});

function autoPopulate(next:any){
    this.populate([{
        path:'children',
        
        
    }])
    next();
}

categorySchema.pre('find',autoPopulate).pre('findOne',autoPopulate)
