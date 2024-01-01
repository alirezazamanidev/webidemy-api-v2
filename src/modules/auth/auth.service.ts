import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.schema';
import { LoginDTO } from './dtos/login.dto';
import { randomInt } from 'crypto';
import { AuthMessage } from './auth.message';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async sendOtp(userDTO: LoginDTO) {
      const { fullname, phone } = userDTO;
      const user = await this.userModel.findOne({ phone });
      const now = new Date().getTime();
      const otp = {
        code: randomInt(10000, 99999),
        expireIn: now + (2 * 60 * 1000),
      };
      if(!user){
        const newUser= await this.userModel.create({
            fullname,
            phone,
            otp
        })
        return {
          code:otp.code,
          phone:newUser.phone,
          expireIn:'2 min'
        }
      }
      if(user?.otp &&user.otp.expireIn >now) throw new BadRequestException(AuthMessage.OtpCodeNotExpired);
      await user.updateOne({otp:otp});
      return {
        code:otp.code,
        phone:user.phone,
        expireIn:'2 min'
      }


  
  }
}
