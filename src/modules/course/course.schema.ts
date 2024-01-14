import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document, Types } from "mongoose";

@Schema({timestamps:true,versionKey:false,id:false})
export class Course extends Document {
    @Prop({type:Types.ObjectId,ref:'user',required:true})
    teacher:string
    @Prop({type:Types.ObjectId,ref:"category",required:true})
    category:string
    @Prop({type:String,required:true})
    title:string
    @Prop({type:String,required:true})
    short_text:string
    @Prop({type:String,default:0})
    price:string
    @Prop({type:String,default:'free'}) // vip,free,cash
    type:string
    @Prop({type:String,required:true})
    photo:string
    @Prop({type:String,default:'00:00:00'})
    time:string
    @Prop({type:[],default:[]})
    chapters:[]
    @Prop({type:[Types.ObjectId],default:[]})
    students:string
    @Prop({type:Number,default:0})
    disCount:string
}

export const courseSchema=SchemaFactory.createForClass(Course);

