import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps:true,toJSON:{virtuals:true}})
class Role {
    @Prop({type:String,required:true})
    title:string
    @Prop({type:String,default:''})
    description:string
}
export const RoleSchema=SchemaFactory.createForClass(Role);
export type RoleDocument=Role & Document;

function autoPopulate(next:any){
     this.populate([{
        path:'permissions',
        
        
    }])
    next();
}
RoleSchema.pre('find',autoPopulate).pre('findOne',autoPopulate)
RoleSchema.virtual('permissions',{
    ref:"permission",
    localField:'_id',
    foreignField:'role'
})