import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({timestamps:true,versionKey:false,id:false})
class Episode extends Document {
  @Prop({type:String,required:true})
  title:string
  @Prop({type:String,default:''})
  text:string
  @Prop({type:String,required:true}) // free , vip ,cash
  type:string
  @Prop({type:String,required:true})
  videoAddress:string


}

@Schema({timestamps:true,versionKey:false,id:false})
class Chapter extends Document {
  @Prop({type:String,required:true})
  title:string
  @Prop({type:String,default:''})
  text:string
  @Prop({type:[Episode],default:[]})
  episodes:Episode[]
}
@Schema({ timestamps: true, versionKey: false, id: false ,toJSON:{virtuals:true}})
export class Course extends Document {
  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  teacher: string;
  @Prop({ type: Types.ObjectId, ref: 'category', required: true })
  category: string;
  @Prop({ type: Boolean, default: false })
  IsPublished: boolean;
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  slug: string;
  @Prop({ type: String, required: true })
  short_text: string;
  @Prop({ type: String, default: 0 })
  price: string;
  @Prop({ type: String, default: 'free' }) // vip,free,cash
  type: string;
  @Prop({ type: [String], default: [] })
  tags: string[];
  @Prop({ type: String, required: true })
  photo: string;
  photoURL:string
  @Prop({ type: String, default: '00:00:00' })
  time: string;

  @Prop({ type: [Chapter], default: [] })
  chapters: [Chapter];
  @Prop({ type: [Types.ObjectId], default: [] })
  students: string;
  @Prop({ type: Number, default: 0 })
  disCount: string;
}

export const courseSchema = SchemaFactory.createForClass(Course);
courseSchema.virtual('photoUrl').get(function () {
  return `${process.env.APP_TYPE}://${process.env.APP_HOST}:${process.env.APP_PORT}${this.photo}`;
});

function autoPopulate(next:any){

  this.populate([{
    path:"category",
    select:['title']
  },{
    path:'teacher',
    select:['fullname','username']
  }])
  next();
}
courseSchema.pre('find',autoPopulate).pre('findOne',autoPopulate);