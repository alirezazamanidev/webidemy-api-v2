import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SendOtpDto } from './dtos/send-otp-dto';
import { randomInt } from 'crypto';
import { AuthMessage } from './auth.message';
import { CheckOtpDto } from './dtos/check-otp-dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadRt, Tokens } from './types';
import redisClient from 'src/common/utils/init_redis';
import { Payload } from './types';
import { User } from 'src/common/schemas';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private JwtService: JwtService,
  ) {}

  async sendOtp(userDTO: SendOtpDto) {
    const { phone } = userDTO;
    const user = await this.userModel.findOne({ phone });
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expireIn: now + 2 * 60 * 1000,
    };
    if (!user) {
      const newUser = await this.userModel.create({
        phone,
        otp,
      });
      return {
        code: otp.code,
        phone: newUser.phone,
        expireIn: '2 min',
      };
    }
    if (user?.otp && user.otp.expireIn > now)
      throw new BadRequestException(AuthMessage.OtpCodeNotExpired);
    await user.updateOne({ otp: otp });
    return {
      code: otp.code,
      phone: user.phone,
      expireIn: '2 min',
    };
  }
  async checkOtp(checkOtpDTO: CheckOtpDto):Promise<Tokens> {
    const { code, phone } = checkOtpDTO;
    const user = await this.checkExistUserByPhone(phone);
    const now = new Date().getTime();
    // check otp code
    
    if (user.otp.expireIn < now)
      throw new BadRequestException(AuthMessage.OtpCodeExpired);
    if (user.otp.code !== code)
      throw new BadRequestException(AuthMessage.OtpCodeIsIncorrect);
    if(user.otp.code===code&& user.otp.used) throw new BadRequestException(AuthMessage.ALREADYUSEDCODE);
    if (!user.active) user.active = true;
    if(!user.otp.used) user.otp.used=true;
    await user.save();
    //create access token & refresh token
    const tokens=await this.generateToken(user);
    return tokens;
  }

  private async checkExistUserByPhone(
    phone: string,
  ): Promise<User | undefined> {
    const user = await this.userModel.findOne({ phone });
    if (!user) throw new NotFoundException(AuthMessage.NotFound);
    return user;
  }

  private async generateToken(user: User):Promise<Tokens> {
      const payload:Payload = {
        phone: user.phone,
        role:user.role,
        id: user._id,
      };
  
 
      const [at, rt] = await Promise.all([
        this.JwtService.sign(payload, {
          secret: process.env.ACCESS_TOKEN_SECRET_KEY,
          expiresIn: '6h',
        }),
        this.JwtService.sign(
          payload,
          {
            secret: process.env.REFRESH_TOKEN_SECRET_KEY,
            expiresIn: '10d',
          },
        ),
      ]);
    
      
      await redisClient.SETEX(user.id,(360*60*60*12),rt);
      return {
        access_token: at,
        refresh_token: rt,
      };
  }
  async refreshToken(payload:PayloadRt){
    const {phone}=payload;
    
    const user=await this.userModel.findOne({phone});
    if(!user) throw new UnauthorizedException(AuthMessage.NOT_FOUNT_ACCOUNT);
    const refreshToken=await redisClient.get(user?.id || 'key_default');
    if(!refreshToken) throw new ForbiddenException('Access deind!');
    const tokens=await this.generateToken(user);
    await redisClient.SETEX(user.id,(360*60*60*12),tokens.refresh_token);
    return tokens;
  }
  

  
}
