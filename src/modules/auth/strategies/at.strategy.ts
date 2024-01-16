import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { Payload, PayloadRt } from '../types';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req && (req?.headers ||req?.cookies)) {
            
            token=this.getToken(req.headers) || req.cookies['access_token'];
            
          }
          
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY,
      passReqToCallback: false,
    });
  }

  async validate(payload: Payload): Promise<Payload> {
    
    return payload;
  }
  private getToken(headers:any):string | null {
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if (token && ["Bearer", "bearer"].includes(bearer)) return token;
    return null;
  }
}
