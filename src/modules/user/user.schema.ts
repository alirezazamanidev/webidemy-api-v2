import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({versionKey:false,timestamps:{createdAt:false}})
class otpSchema {
  @Prop({type:String,required:true})
  code:string
  @Prop({type:Number,required:true})
  expireIn:number
  @Prop({type:Boolean,default:false})
  used:boolean
}
@Schema({ versionKey: false, timestamps: { createdAt: true } })
export class User {
  @Prop({ type: String, required: false })
  fullname: string;
  @Prop({type:String,required:true})
  phone:string
  @Prop({type:String,default:null})
  email?:string
  @Prop({type:Boolean,default:false})
  active?:boolean
  @Prop({type:String,default:null})
  biography?: string
  @Prop({type:String,default:undefined})
  avatar:string
  @Prop({type:otpSchema})
  otp:otpSchema
}
export type userDocument=User & mongoose.Document
export const UserSchema = SchemaFactory.createForClass(User);