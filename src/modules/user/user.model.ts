import mongoose from 'mongoose';

const otpSchema=new mongoose.Schema({
    code:{type:String,required:true},
    expires:{type:Number,required:true}
},{timestamps:{createdAt:false},versionKey:false,id:false});
export const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  biography: { type: String, defualt: null },
  role: { type: String, default: 'user' },
  adminPassword: { type: String, default: undefined },
  avatar: { type: String, default: undefined },
  otp:{type:otpSchema},

},{versionKey:false,id:false});

